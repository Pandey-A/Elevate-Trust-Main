import {
  createTestimonial,
  deleteTestimonial,
  getTestimonialById,
  listTestimonials,
  updateTestimonial,
} from "../module/testimonialModules.js";
import { storeTestimonialImage } from "../middleware/upload.js";

function createId() {
  return `testimonial-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function validateTestimonialPayload(
  body,
  { requireProfile = true, existingLogoUrl = "", existingProfileUrl = "" } = {},
) {
  const name = String(body.name || "").trim();
  const title = String(body.title || "").trim();
  const quote = String(body.quote || "").trim();
  const fullQuote = String(body.fullQuote || body.full_quote || "").trim();
  const logoUrl =
    String(body.logoUrl || body.logo_url || "").trim() || existingLogoUrl;
  const profileUrl =
    String(body.profileUrl || body.profile_url || "").trim() || existingProfileUrl;
  const sortOrder = Number(body.sortOrder ?? body.sort_order ?? 0);

  const errors = [];
  if (!name) errors.push("name");
  if (!title) errors.push("title");
  if (!quote) errors.push("quote");
  if (requireProfile && !profileUrl) errors.push("profile");

  return {
    name,
    title,
    quote,
    fullQuote,
    logoUrl,
    profileUrl,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    errors,
  };
}

function getUploadedFile(req, field) {
  if (req.files && typeof req.files === "object" && !Array.isArray(req.files)) {
    const list = req.files[field];
    return Array.isArray(list) ? list[0] : undefined;
  }
  return undefined;
}

/** Public website + admin list share the same ordered collection */
export async function getPublicTestimonials(_req, res) {
  try {
    const testimonials = await listTestimonials();
    res.setHeader(
      "Cache-Control",
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    );
    return res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error("List public testimonials error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load testimonials right now.",
    });
  }
}

export async function getAdminTestimonials(_req, res) {
  try {
    const testimonials = await listTestimonials();
    return res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error("List admin testimonials error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load testimonials right now.",
    });
  }
}

export async function createTestimonialHandler(req, res) {
  try {
    let logoUrl = String(req.body.logoUrl || req.body.logo_url || "").trim();
    let profileUrl = String(req.body.profileUrl || req.body.profile_url || "").trim();

    const logoFile = getUploadedFile(req, "logo");
    const profileFile = getUploadedFile(req, "profile");

    if (logoFile) {
      const stored = await storeTestimonialImage(logoFile, req, "logo");
      logoUrl = stored.imageUrl;
    }
    if (profileFile) {
      const stored = await storeTestimonialImage(profileFile, req, "profile");
      profileUrl = stored.imageUrl;
    }

    const payload = validateTestimonialPayload(
      { ...req.body, logoUrl, profileUrl },
      { requireProfile: true },
    );

    if (payload.errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing or invalid fields: ${payload.errors.join(", ")}`,
      });
    }

    const id = String(req.body.id || "").trim() || createId();
    const existing = await getTestimonialById(id);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A testimonial with this id already exists.",
      });
    }

    const testimonial = await createTestimonial({
      id,
      name: payload.name,
      title: payload.title,
      quote: payload.quote,
      fullQuote: payload.fullQuote,
      logoUrl: payload.logoUrl,
      profileUrl: payload.profileUrl,
      sortOrder: payload.sortOrder,
    });

    return res.status(201).json({
      success: true,
      message: "Testimonial added.",
      data: testimonial,
    });
  } catch (error) {
    console.error("Create testimonial error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to create testimonial right now.",
    });
  }
}

export async function updateTestimonialHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Testimonial id is required.",
      });
    }

    const existing = await getTestimonialById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    let logoUrl = String(req.body.logoUrl || req.body.logo_url || "").trim();
    let profileUrl = String(req.body.profileUrl || req.body.profile_url || "").trim();

    const logoFile = getUploadedFile(req, "logo");
    const profileFile = getUploadedFile(req, "profile");

    if (logoFile) {
      const stored = await storeTestimonialImage(logoFile, req, "logo");
      logoUrl = stored.imageUrl;
    }
    if (profileFile) {
      const stored = await storeTestimonialImage(profileFile, req, "profile");
      profileUrl = stored.imageUrl;
    }

    const payload = validateTestimonialPayload(
      { ...req.body, logoUrl, profileUrl },
      {
        requireProfile: true,
        existingLogoUrl: existing.logoUrl,
        existingProfileUrl: existing.profileUrl,
      },
    );

    if (payload.errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing or invalid fields: ${payload.errors.join(", ")}`,
      });
    }

    const testimonial = await updateTestimonial(id, {
      name: payload.name,
      title: payload.title,
      quote: payload.quote,
      fullQuote: payload.fullQuote,
      logoUrl: payload.logoUrl,
      profileUrl: payload.profileUrl,
      sortOrder: payload.sortOrder,
    });

    return res.status(200).json({
      success: true,
      message: "Testimonial updated.",
      data: testimonial,
    });
  } catch (error) {
    console.error("Update testimonial error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to update testimonial right now.",
    });
  }
}

export async function deleteTestimonialHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Testimonial id is required.",
      });
    }

    const deleted = await deleteTestimonial(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial removed.",
      data: { id: deleted.id },
    });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete testimonial right now.",
    });
  }
}
