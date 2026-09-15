import express from "express";
import { login, logout, me, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { createRateLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

const loginRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many login attempts. Please try again later.",
});

const registerRateLimit = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many registration attempts. Please try again later.",
});

router.post("/register", registerRateLimit, register);
router.post("/login", loginRateLimit, login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
