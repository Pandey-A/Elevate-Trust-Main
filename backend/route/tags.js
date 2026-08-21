import express from "express";
import {
  createDemoTagHandler,
  deleteDemoTagHandler,
  getDemoTags,
  updateDemoTagHandler,
} from "../controllers/tagController.js";
import { requireAuth, requireSuperAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDemoTags);
router.post("/", requireAuth, requireSuperAdmin, createDemoTagHandler);
router.put("/:id", requireAuth, requireSuperAdmin, updateDemoTagHandler);
router.delete("/:id", requireAuth, requireSuperAdmin, deleteDemoTagHandler);

export default router;
