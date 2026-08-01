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
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { uploadBlogImage } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getPublicBlogs);
router.get("/admin", requireAuth, requireAdmin, getAdminBlogs);
router.get("/admin/all", requireAuth, requireAdmin, getAdminBlogs);
router.get("/:id", getPublicBlogById);
router.post(
  "/",
  requireAuth,
  requireAdmin,
  uploadBlogImage.single("image"),
  createBlogHandler,
);
router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  uploadBlogImage.single("image"),
  updateBlogHandler,
);
router.patch(
  "/:id/visibility",
  requireAuth,
  requireAdmin,
  toggleBlogVisibilityHandler,
);
router.delete("/:id", requireAuth, requireAdmin, deleteBlogHandler);

export default router;
