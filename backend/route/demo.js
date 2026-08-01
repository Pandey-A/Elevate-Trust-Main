import express from "express";
import {
  createDemoHandler,
  deleteDemoHandler,
  getAdminDemos,
  getPublicDemos,
  toggleDemoVisibilityHandler,
  updateDemoHandler,
} from "../controllers/demoController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { uploadDemoFields } from "../middleware/upload.js";

const router = express.Router();

const demoMultipart = uploadDemoFields.fields([{ name: "thumbnail", maxCount: 1 }]);

router.get("/", getPublicDemos);
router.get("/admin", requireAuth, requireAdmin, getAdminDemos);
router.get("/admin/all", requireAuth, requireAdmin, getAdminDemos);
router.post("/", requireAuth, requireAdmin, demoMultipart, createDemoHandler);
router.patch("/:id/visibility", requireAuth, requireAdmin, toggleDemoVisibilityHandler);
router.put("/:id", requireAuth, requireAdmin, demoMultipart, updateDemoHandler);
router.delete("/:id", requireAuth, requireAdmin, deleteDemoHandler);

export default router;
