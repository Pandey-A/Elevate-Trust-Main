import {
  createBlog,
  deleteBlog,
  getBlogById,
  listAllBlogs,
  listPublicBlogs,
  updateBlog,
  updateBlogVisibility,
} from "../module/blogModules.js";
import { storeBlogImage } from "../middleware/upload.js";

function createId() {
  return `blog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

function validateBlogPayload(body, { requireImage = true, existingImageUrl = "" } = {}) {
  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const imageUrl = String(body.imageUrl || body.image_url || "").trim() || existingImageUrl;
  const isPublic = parseVisibility(body);

  const errors = [];
  if (!title) errors.push("title");
  if (!description) errors.push("description");
  if (requireImage && !imageUrl) errors.push("image");

  return { title, description, imageUrl, isPublic, errors };
}

/** Public website: only public blogs */
export async function getPublicBlogs(_req, res) {
  try {
    const blogs = await listPublicBlogs();
    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("List public blogs error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load blogs right now.",
    });
  }
}

/** Public website: single public blog */
export async function getPublicBlogById(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog id is required.",
      });
    }

    const blog = await getBlogById(id);
    if (!blog || !blog.isPublic) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Get public blog error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load blog right now.",
    });
  }
}

/** Admin dashboard: all blogs */
export async function getAdminBlogs(_req, res) {
  try {
    const blogs = await listAllBlogs();
    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("List admin blogs error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load blogs right now.",
    });
  }
}

export async function createBlogHandler(req, res) {
  try {
    let imageUrl = String(req.body.imageUrl || req.body.image_url || "").trim();

    if (req.file) {
      const stored = await storeBlogImage(req.file, req);
      imageUrl = stored.imageUrl;
    }

    const payload = validateBlogPayload(
      { ...req.body, imageUrl },
      { requireImage: true },
    );

    if (payload.errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing or invalid fields: ${payload.errors.join(", ")}`,
      });
    }

    const id = String(req.body.id || "").trim() || createId();
    const existing = await getBlogById(id);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A blog with this id already exists.",
      });
    }

    const blog = await createBlog({
      id,
      title: payload.title,
      description: payload.description,
      imageUrl: payload.imageUrl,
      isPublic: payload.isPublic,
    });

    return res.status(201).json({
      success: true,
      message: payload.isPublic
        ? "Blog published and visible on the website."
        : "Blog saved as private (hidden from website).",
      data: blog,
    });
  } catch (error) {
    console.error("Create blog error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to create blog right now.",
    });
  }
}

export async function updateBlogHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog id is required.",
      });
    }

    const existing = await getBlogById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    let imageUrl = String(req.body.imageUrl || req.body.image_url || "").trim();
    if (req.file) {
      const stored = await storeBlogImage(req.file, req);
      imageUrl = stored.imageUrl;
    }

    const payload = validateBlogPayload(
      { ...req.body, imageUrl },
      { requireImage: true, existingImageUrl: existing.imageUrl },
    );

    if (payload.errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing or invalid fields: ${payload.errors.join(", ")}`,
      });
    }

    const blog = await updateBlog(id, {
      title: payload.title,
      description: payload.description,
      imageUrl: payload.imageUrl,
      isPublic: payload.isPublic,
    });

    return res.status(200).json({
      success: true,
      message: payload.isPublic
        ? "Blog updated and visible on the website."
        : "Blog updated and set to private.",
      data: blog,
    });
  } catch (error) {
    console.error("Update blog error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to update blog right now.",
    });
  }
}

export async function deleteBlogHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog id is required.",
      });
    }

    const deleted = await deleteBlog(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog removed.",
      data: { id: deleted.id },
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete blog right now.",
    });
  }
}

export async function toggleBlogVisibilityHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog id is required.",
      });
    }

    const isPublic = parseVisibility(req.body);
    const blog = await updateBlogVisibility(id, isPublic);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: isPublic
        ? "Blog is now public on the website."
        : "Blog is now private (hidden from website).",
      data: blog,
    });
  } catch (error) {
    console.error("Toggle blog visibility error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update visibility right now.",
    });
  }
}
