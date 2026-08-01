import jwt from "jsonwebtoken";

function getJwtSecret() {
  return process.env.JWT_SECRET || "elevate-trust-dev-secret-change-me";
}

export function signAuthToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.full_name,
      role: user.role,
    },
    getJwtSecret(),
    { expiresIn: "7d" },
  );
}

export function verifyAuthToken(token) {
  return jwt.verify(token, getJwtSecret());
}

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Please log in to continue.",
      });
    }

    const payload = verifyAuthToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please log in again.",
    });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }
  return next();
}
