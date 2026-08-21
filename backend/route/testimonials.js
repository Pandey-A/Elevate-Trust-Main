import express from "express";
import {
  createTestimonialHandler,
  deleteTestimonialHandler,
  getAdminTestimonials,
  getPublicTestimonials,
  updateTestimonialHandler,
} from "../controllers/testimonialController.js";
import { requireAuth, requireSuperAdmin } from "../middleware/auth.js";
import { uploadTestimonialImages } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getPublicTestimonials);
router.get("/admin", requireAuth, requireSuperAdmin, getAdminTestimonials);
router.get("/admin/all", requireAuth, requireSuperAdmin, getAdminTestimonials);
router.post(
  "/",
  requireAuth,
  requireSuperAdmin,
  uploadTestimonialImages.fields([
    { name: "logo", maxCount: 1 },
    { name: "profile", maxCount: 1 },
  ]),
  createTestimonialHandler,
);
router.put(
  "/:id",
  requireAuth,
  requireSuperAdmin,
  uploadTestimonialImages.fields([
    { name: "logo", maxCount: 1 },
    { name: "profile", maxCount: 1 },
  ]),
  updateTestimonialHandler,
);
router.delete("/:id", requireAuth, requireSuperAdmin, deleteTestimonialHandler);

export default router;
