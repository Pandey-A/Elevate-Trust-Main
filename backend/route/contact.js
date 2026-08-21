import express from "express";
import { submitContactLead } from "../controllers/contactController.js";
import { createRateLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

const contactRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests. Please try again later.",
});

router.post("/", contactRateLimit, submitContactLead);

export default router;
