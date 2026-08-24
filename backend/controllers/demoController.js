import {
  createDemo,
  deleteDemo,
  getDemoById,
  listAllDemos,
  listPublicDemos,
  updateDemo,
  updateDemoVisibility,
} from "../module/demoModules.js";
import {
  cleanupDemoTempFiles,
  storeDemoThumbnail,
  storeDemoVideo,
  storeGeneratedDocumentCover,
} from "../middleware/upload.js";
import { getDemoDocumentKind, getDemoDocumentKindFromFile } from "../utils/demoMedia.js";

function extractYoutubeId(input) {
  const value = String(input || "").trim();
  if (!value) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && id.length === 11 ? id : null;
    }
    const v = url.searchParams.get("v");
    if (v && v.length === 11) return v;
    const embed = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embed?.[1]) return embed[1];
    const shorts = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shorts?.[1]) return shorts[1];
  } catch {
    return null;
  }

  return null;
}

function createId() {
  return `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function parseVisibility(body) {
  if (typeof body.isPublic === "boolean") return body.isPublic;
  if (typeof body.is_public === "boolean") return body.is_public;
  if (typeof body.isPublic === "string") {
    return body.isPublic.toLowerCase() !== "false" && body.isPublic !== "0";
  }
  if (typeof body.is_public === "string") {
    return body.is_public.toLowerCase() !== "false" && body.is_public !== "0";
  }
  if (typeof body.visibility === "string") {
    return body.visibility.toLowerCase() !== "private";
  }
  return true;
}

function parseIndustries(body) {
  if (Array.isArray(body.industries)) {
    return body.industries.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof body.industries === "string" && body.industries.trim()) {
    const raw = body.industries.trim();
    if (raw.startsWith("[")) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item).trim()).filter(Boolean);
        }
      } catch {
        // fall through
      }
    }
    return [raw];
  }
  return [];
}

function getUploadedFile(req, field) {
  if (req.files && typeof req.files === "object" && !Array.isArray(req.files)) {
    const list = req.files[field];
    return Array.isArray(list) ? list[0] : undefined;
  }
  return undefined;
}

function validateDemoPayload(
  body,
  { hasVideoFile = false, existingVideoUrl = "", isDocument = false } = {},
) {
  const title = String(body.title || "").trim();
  const youtubeUrl = String(body.youtubeUrl || body.youtube_url || "").trim();
  const industries = isDocument ? [] : parseIndustries(body);
  const videoId = isDocument
    ? ""
    : extractYoutubeId(youtubeUrl) ||
      extractYoutubeId(body.videoId || body.video_id || "") ||
      "";
  const isPublic = parseVisibility(body);
  const hasYoutube = Boolean(videoId);
  const hasCloudVideo = hasVideoFile || Boolean(existingVideoUrl);

  const errors = [];
  if (!title) errors.push("title");
  if (!hasYoutube && !hasCloudVideo) errors.push("video");
  if (!isDocument && industries.length === 0) errors.push("industries");

  return {
    title,
    youtubeUrl: hasYoutube
      ? youtubeUrl || `https://www.youtube.com/watch?v=${videoId}`
      : "",
    industries,
    videoId,
    isPublic,
    errors,
  };
}

async function maybeStoreDocumentCover(kind, thumbnailFile, req) {
  if (!kind || thumbnailFile) return null;
  const stored = await storeGeneratedDocumentCover(kind, req);
  return stored?.imageUrl || null;
}

/** Public website: only public demos */
export async function getPublicDemos(_req, res) {
  try {
    const demos = await listPublicDemos();
    return res.status(200).json({
      success: true,
      data: demos,
    });
  } catch (error) {
    console.error("List public demos error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load demos right now.",
    });
  }
}

/** Admin dashboard: all demos (public + private) */
export async function getAdminDemos(_req, res) {
  try {
    const demos = await listAllDemos();
    return res.status(200).json({
      success: true,
      data: demos,
    });
  } catch (error) {
    console.error("List admin demos error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load demos right now.",
    });
  }
}

export async function createDemoHandler(req, res) {
  try {
    const videoFile = getUploadedFile(req, "video");
    const thumbnailFile = getUploadedFile(req, "thumbnail");
    const documentKind = getDemoDocumentKindFromFile(videoFile);
    const payload = validateDemoPayload(req.body, {
      hasVideoFile: Boolean(videoFile),
      isDocument: Boolean(documentKind),
    });
    if (payload.errors.length > 0) {
      await cleanupDemoTempFiles(req);
      return res.status(400).json({
        success: false,
        message: `Missing or invalid fields: ${payload.errors.join(", ")}`,
      });
    }

    const id = String(req.body.id || "").trim() || createId();
    const existing = await getDemoById(id);
    if (existing) {
      await cleanupDemoTempFiles(req);
      return res.status(409).json({
        success: false,
        message: "A demo with this id already exists.",
      });
    }

    let videoUrl = null;
    let thumbnailUrl = null;

    if (videoFile) {
      const stored = await storeDemoVideo(videoFile, req);
      videoUrl = stored.videoUrl;
    }

    if (thumbnailFile) {
      const storedThumb = await storeDemoThumbnail(thumbnailFile, req);
      thumbnailUrl = storedThumb.imageUrl;
    } else {
      thumbnailUrl = await maybeStoreDocumentCover(documentKind, thumbnailFile, req);
    }

    const demo = await createDemo({
      id,
      title: payload.title,
      videoId: payload.videoId,
      youtubeUrl: payload.youtubeUrl,
      videoUrl,
      thumbnailUrl,
      industries: payload.industries,
      isPublic: payload.isPublic,
    });

    return res.status(201).json({
      success: true,
      message: payload.isPublic
        ? "Demo added and visible on the website."
        : "Demo added as private (hidden from website).",
      data: demo,
    });
  } catch (error) {
    await cleanupDemoTempFiles(req);
    console.error("Create demo error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to create demo right now.",
    });
  }
}

export async function updateDemoHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Demo id is required.",
      });
    }

    const existing = await getDemoById(id);
    if (!existing) {
      await cleanupDemoTempFiles(req);
      return res.status(404).json({
        success: false,
        message: "Demo not found.",
      });
    }

    const videoFile = getUploadedFile(req, "video");
    const thumbnailFile = getUploadedFile(req, "thumbnail");
    const documentKind =
      getDemoDocumentKindFromFile(videoFile) ||
      getDemoDocumentKind(existing.videoUrl || "");
    const payload = validateDemoPayload(req.body, {
      hasVideoFile: Boolean(videoFile),
      existingVideoUrl: existing.videoUrl || "",
      isDocument: Boolean(documentKind),
    });
    if (payload.errors.length > 0) {
      await cleanupDemoTempFiles(req);
      return res.status(400).json({
        success: false,
        message: `Missing or invalid fields: ${payload.errors.join(", ")}`,
      });
    }

    let videoUrl = existing.videoUrl || null;
    let thumbnailUrl = existing.thumbnailUrl || null;

    if (videoFile) {
      const stored = await storeDemoVideo(videoFile, req);
      videoUrl = stored.videoUrl;
    }

    if (thumbnailFile) {
      const storedThumb = await storeDemoThumbnail(thumbnailFile, req);
      thumbnailUrl = storedThumb.imageUrl;
    } else if (getDemoDocumentKindFromFile(videoFile)) {
      thumbnailUrl =
        (await maybeStoreDocumentCover(documentKind, thumbnailFile, req)) ||
        thumbnailUrl;
    } else if (!thumbnailUrl && documentKind) {
      thumbnailUrl = await maybeStoreDocumentCover(documentKind, thumbnailFile, req);
    }

    const demo = await updateDemo(id, {
      title: payload.title,
      videoId: payload.videoId,
      youtubeUrl: payload.youtubeUrl,
      videoUrl,
      thumbnailUrl,
      industries: payload.industries,
      isPublic: payload.isPublic,
    });

    return res.status(200).json({
      success: true,
      message: payload.isPublic
        ? "Demo updated and visible on the website."
        : "Demo updated and set to private.",
      data: demo,
    });
  } catch (error) {
    await cleanupDemoTempFiles(req);
    console.error("Update demo error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to update demo right now.",
    });
  }
}

export async function deleteDemoHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Demo id is required.",
      });
    }

    const deleted = await deleteDemo(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Demo not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo removed from the website.",
      data: { id: deleted.id },
    });
  } catch (error) {
    console.error("Delete demo error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete demo right now.",
    });
  }
}

export async function toggleDemoVisibilityHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Demo id is required.",
      });
    }

    const isPublic = parseVisibility(req.body);
    const demo = await updateDemoVisibility(id, isPublic);

    if (!demo) {
      return res.status(404).json({
        success: false,
        message: "Demo not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: isPublic
        ? "Demo is now public on the website."
        : "Demo is now private (hidden from website).",
      data: demo,
    });
  } catch (error) {
    console.error("Toggle demo visibility error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update visibility right now.",
    });
  }
}
