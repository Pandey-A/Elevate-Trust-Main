import express from "express";
import {
  createDemoTagHandler,
  deleteDemoTagHandler,
  getDemoTags,
  updateDemoTagHandler,
} from "../controllers/tagController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDemoTags);
router.post("/", requireAuth, requireAdmin, createDemoTagHandler);
router.put("/:id", requireAuth, requireAdmin, updateDemoTagHandler);
router.delete("/:id", requireAuth, requireAdmin, deleteDemoTagHandler);

export default router;
