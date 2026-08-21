/**
 * Lightweight in-memory rate limiter for public form routes.
 * No external dependency required.
 */

export function createRateLimiter({
  windowMs = 15 * 60 * 1000,
  max = 20,
  message = "Too many requests. Please try again later.",
} = {}) {
  const hits = new Map();

  function prune(now) {
    for (const [key, entry] of hits.entries()) {
      if (now - entry.start >= windowMs) hits.delete(key);
    }
  }

  return function rateLimit(req, res, next) {
    const now = Date.now();
    if (hits.size > 5000) prune(now);

    const forwarded = String(req.headers["x-forwarded-for"] || "")
      .split(",")[0]
      .trim();
    const ip = forwarded || req.ip || req.socket?.remoteAddress || "unknown";
    const key = `${req.method}:${req.baseUrl}${req.path}:${ip}`;

    let entry = hits.get(key);
    if (!entry || now - entry.start >= windowMs) {
      entry = { start: now, count: 0 };
      hits.set(key, entry);
    }

    entry.count += 1;
    if (entry.count > max) {
      return res.status(429).json({
        success: false,
        message,
      });
    }

    return next();
  };
}
