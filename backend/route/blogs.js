import express from "express";
import {
  createBlogHandler,
  deleteBlogHandler,
  getAdminBlogs,
  getPublicBlogById,
  getPublicBlogs,
  toggleBlogVisibilityHandler,
  updateBlogHandler,
} from "../controllers/blogController.js";
import { requireAdmin, requireAuth, requireSuperAdmin } from "../middleware/auth.js";
import { uploadBlogImage } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getPublicBlogs);
router.get("/admin", requireAuth, requireAdmin, getAdminBlogs);
router.get("/admin/all", requireAuth, requireAdmin, getAdminBlogs);
router.get("/:id", getPublicBlogById);
router.post(
  "/",
  requireAuth,
  requireSuperAdmin,
  uploadBlogImage.single("image"),
  createBlogHandler,
);
router.put(
  "/:id",
  requireAuth,
  requireSuperAdmin,
  uploadBlogImage.single("image"),
  updateBlogHandler,
);
router.patch(
  "/:id/visibility",
  requireAuth,
  requireSuperAdmin,
  toggleBlogVisibilityHandler,
);
router.delete("/:id", requireAuth, requireSuperAdmin, deleteBlogHandler);

export default router;
