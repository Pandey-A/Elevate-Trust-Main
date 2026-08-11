import {
  createDemoTag,
  deleteDemoTag,
  findDemoTagById,
  findDemoTagByName,
  listDemoTags,
  updateDemoTag,
} from "../module/tagModules.js";

export async function getDemoTags(_req, res) {
  try {
    const tags = await listDemoTags();
    return res.status(200).json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.error("List demo tags error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load tags right now.",
    });
  }
}

export async function createDemoTagHandler(req, res) {
  try {
    const name = String(req.body.name || req.body.tag || "").trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Tag name is required.",
      });
    }

    if (name.length < 2 || name.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Tag name must be between 2 and 120 characters.",
      });
    }

    const existing = await findDemoTagByName(name);
    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Tag already exists.",
        data: existing,
      });
    }

    const tag = await createDemoTag(name);
    return res.status(201).json({
      success: true,
      message: "Tag created successfully.",
      data: tag,
    });
  } catch (error) {
    console.error("Create demo tag error:", error);
    if (error?.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A tag with this name already exists.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Unable to create tag right now.",
    });
  }
}

export async function updateDemoTagHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    const name = String(req.body.name || req.body.tag || "").trim();

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Tag id is required.",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Tag name is required.",
      });
    }

    if (name.length < 2 || name.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Tag name must be between 2 and 120 characters.",
      });
    }

    const current = await findDemoTagById(id);
    if (!current) {
      return res.status(404).json({
        success: false,
        message: "Tag not found.",
      });
    }

    const existing = await findDemoTagByName(name);
    if (existing && existing.id !== id) {
      return res.status(409).json({
        success: false,
        message: "A tag with this name already exists.",
      });
    }

    const tag = await updateDemoTag(id, name);
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tag updated successfully.",
      data: tag,
    });
  } catch (error) {
    console.error("Update demo tag error:", error);
    if (error?.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A tag with this name already exists.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Unable to update tag right now.",
    });
  }
}

export async function deleteDemoTagHandler(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Tag id is required.",
      });
    }

    const deleted = await deleteDemoTag(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Tag not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tag deleted successfully.",
      data: { id: deleted.id },
    });
  } catch (error) {
    console.error("Delete demo tag error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete tag right now.",
    });
  }
}
