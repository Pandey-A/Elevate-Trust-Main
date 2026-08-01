import express from "express";
import {
  createDemoTagHandler,
  getDemoTags,
} from "../controllers/tagController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getDemoTags);
router.post("/", requireAuth, requireAdmin, createDemoTagHandler);

export default router;
