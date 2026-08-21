import express from "express";
import {
  careerForm,
  getCareerApplications,
  removeAllCareerApplications,
  removeCareerApplication,
} from "../controllers/careerForm.js";
import { uploadCv } from "../middleware/upload.js";
import { requireAuth, requireSuperAdmin } from "../middleware/auth.js";
import { createRateLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

const careerSubmitRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: "Too many applications. Please try again later.",
});

router.get("/", requireAuth, requireSuperAdmin, getCareerApplications);
router.delete("/", requireAuth, requireSuperAdmin, removeAllCareerApplications);
router.delete("/:id", requireAuth, requireSuperAdmin, removeCareerApplication);
router.post("/", careerSubmitRateLimit, uploadCv.single("cv"), careerForm);

export default router;
