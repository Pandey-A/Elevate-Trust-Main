import express from "express";
import {
  createDemoHandler,
  deleteDemoHandler,
  getAdminDemos,
  getPublicDemoById,
  getPublicDemos,
  streamDemoMediaHandler,
  toggleDemoVisibilityHandler,
  updateDemoHandler,
} from "../controllers/demoController.js";
import { optionalAuth, requireAdmin, requireAuth, requireSuperAdmin } from "../middleware/auth.js";
import { uploadDemoFields } from "../middleware/upload.js";

const router = express.Router();

const demoMultipart = uploadDemoFields.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

router.get("/", getPublicDemos);
router.get("/admin", requireAuth, requireAdmin, getAdminDemos);
router.get("/admin/all", requireAuth, requireAdmin, getAdminDemos);
router.get("/:id", optionalAuth, getPublicDemoById);
router.get("/:id/stream", optionalAuth, streamDemoMediaHandler);
router.get("/:id/stream/:filename", optionalAuth, streamDemoMediaHandler);
router.post("/", requireAuth, requireSuperAdmin, demoMultipart, createDemoHandler);
router.patch("/:id/visibility", requireAuth, requireSuperAdmin, toggleDemoVisibilityHandler);
router.put("/:id", requireAuth, requireSuperAdmin, demoMultipart, updateDemoHandler);
router.delete("/:id", requireAuth, requireSuperAdmin, deleteDemoHandler);

export default router;
