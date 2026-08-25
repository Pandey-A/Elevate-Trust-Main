import jwt from "jsonwebtoken";

function getJwtSecret() {
  return process.env.JWT_SECRET || "elevate-trust-dev-secret-change-me";
}

const DASHBOARD_ROLES = new Set(["admin", "sales"]);

export function isDashboardRole(role) {
  return DASHBOARD_ROLES.has(String(role || ""));
}

/** Full dashboard access (role: admin). Legacy name kept for call sites. */
export function isSuperAdminRole(role) {
  return String(role || "") === "admin";
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

/** Admin or Sales — dashboard login / demos view. */
export function requireAdmin(req, res, next) {
  if (!isDashboardRole(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: "Dashboard access required.",
    });
  }
  return next();
}

/** Admin only — create / edit / delete and full admin APIs. */
export function requireSuperAdmin(req, res, next) {
  if (!isSuperAdminRole(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }
  return next();
}
