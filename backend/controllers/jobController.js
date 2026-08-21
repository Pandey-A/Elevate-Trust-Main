import {
  createJob,
  deleteJob,
  getJobById,
  listJobs,
  updateJob,
} from "../module/jobModules.js";

function createId() {
  return `job-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function validateJobPayload(body) {
  const title = String(body.title || "").trim();
  const tag = String(body.tag || "").trim();
  const description = String(body.description || "").trim();
  const type = String(body.type || "").trim() || "Full-time";
  const location = String(body.location || "").trim() || "Remotely";
  const category = String(body.category || "").trim();
  const categorySubtitle =
    String(body.categorySubtitle || body.category_subtitle || "").trim() ||
    (category ? `Open position in our ${category.toLowerCase()} team.` : "");
  const sortOrder = Number(body.sortOrder ?? body.sort_order ?? 0);

  const errors = [];
  if (!title) errors.push("title");
  if (!description) errors.push("description");
  if (!category) errors.push("category");

  return {
    title,
    tag: tag || category,
    description,
    type,
    location,
    category,
    categorySubtitle,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    errors,
  };
}

export async function getPublicJobs(_req, res) {
  try {
    const jobs = await listJobs();
    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("List public jobs error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load jobs right now.",
    });
  }
}

export async function getAdminJobs(_req, res) {
  try {
    const jobs = await listJobs();
    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("List admin jobs error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load jobs right now.",
    });
  }
}

export async function createJobHandler(req, res) {
  try {
    const payload = validateJobPayload(req.body);
    if (payload.errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing or invalid fields: ${payload.errors.join(", ")}`,
      });
    }

    const id = String(req.body.id || "").trim() || createId();
    const existing = await getJobById(id);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A job with this id already exists.",
      });
    }

    const job = await createJob({
      id,
      title: payload.title,
      tag: payload.tag,
      description: payload.description,
      type: payload.type,
      location: payload.location,
      category: payload.category,
      categorySubtitle: payload.categorySubtitle,
      sortOrder: payload.sortOrder,
    });

    return res.status(201).json({
      success: true,
      message: "Job posting added.",
      data: job,
    });
  } catch (error) {
    console.error("Create job error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to create job right now.",
    });
  }
}

export async function updateJobHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Job id is required.",
      });
    }

    const existing = await getJobById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    const payload = validateJobPayload(req.body);
    if (payload.errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing or invalid fields: ${payload.errors.join(", ")}`,
      });
    }

    const job = await updateJob(id, {
      title: payload.title,
      tag: payload.tag,
      description: payload.description,
      type: payload.type,
      location: payload.location,
      category: payload.category,
      categorySubtitle: payload.categorySubtitle,
      sortOrder: payload.sortOrder,
    });

    return res.status(200).json({
      success: true,
      message: "Job posting updated.",
      data: job,
    });
  } catch (error) {
    console.error("Update job error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Unable to update job right now.",
    });
  }
}

export async function deleteJobHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Job id is required.",
      });
    }

    const deleted = await deleteJob(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job posting deleted.",
      data: { id: deleted.id },
    });
  } catch (error) {
    console.error("Delete job error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete job right now.",
    });
  }
}
