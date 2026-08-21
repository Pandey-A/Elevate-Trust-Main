import express from "express";
import {
  createJobHandler,
  deleteJobHandler,
  getAdminJobs,
  getPublicJobs,
  updateJobHandler,
} from "../controllers/jobController.js";
import { requireAuth, requireSuperAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPublicJobs);
router.get("/admin", requireAuth, requireSuperAdmin, getAdminJobs);
router.get("/admin/all", requireAuth, requireSuperAdmin, getAdminJobs);
router.post("/", requireAuth, requireSuperAdmin, createJobHandler);
router.put("/:id", requireAuth, requireSuperAdmin, updateJobHandler);
router.delete("/:id", requireAuth, requireSuperAdmin, deleteJobHandler);

export default router;
