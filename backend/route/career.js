import express from "express";
import {
  careerForm,
  getCareerApplications,
  removeAllCareerApplications,
  removeCareerApplication,
} from "../controllers/careerForm.js";
import { uploadCv } from "../middleware/upload.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, requireAdmin, getCareerApplications);
router.delete("/", requireAuth, requireAdmin, removeAllCareerApplications);
router.delete("/:id", requireAuth, requireAdmin, removeCareerApplication);
router.post("/", uploadCv.single("cv"), careerForm);

export default router;
