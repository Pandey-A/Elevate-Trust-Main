import jwt from "jsonwebtoken";

function getJwtSecret() {
  return process.env.JWT_SECRET || "elevate-trust-dev-secret-change-me";
}

const DASHBOARD_ROLES = new Set(["admin", "sales", "editor", "superadmin"]);

export function isDashboardRole(role) {
  const normalized = String(role || "").trim().toLowerCase();
  return DASHBOARD_ROLES.has(normalized);
}

/** Full dashboard access for authorized team roles */
export function isSuperAdminRole(role) {
  const normalized = String(role || "").trim().toLowerCase();
  return DASHBOARD_ROLES.has(normalized);
}

export const AUTH_COOKIE_NAME = "et_token";

/**
 * Returns security-hardened cookie options.
 * Works for same-origin deployments (Nginx / CloudFront reverse proxy)
 * and cross-subdomain deployments (e.g. .elevatetrust.ai).
 */
export function getAuthCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  const domain = process.env.COOKIE_DOMAIN ? process.env.COOKIE_DOMAIN.trim() : undefined;

  const sameSiteEnv = (process.env.COOKIE_SAMESITE || "").toLowerCase();
  const sameSite =
    sameSiteEnv === "none" ? "none" : sameSiteEnv === "strict" ? "strict" : "lax";

  const secure = isProd ? process.env.COOKIE_SECURE !== "false" : false;

  return {
    httpOnly: true, // Immune to client-side XSS attacks
    secure, // HTTPS only in production
    sameSite: secure && sameSite === "none" ? "none" : sameSite,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (synchronized with JWT)
    ...(domain ? { domain } : {}),
  };
}

export function setAuthCookie(res, token) {
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
}

export function clearAuthCookie(res) {
  const options = getAuthCookieOptions();
  delete options.maxAge;
  res.clearCookie(AUTH_COOKIE_NAME, options);
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

/**
 * Resilient authentication middleware supporting:
 * 1. HttpOnly cookies (highest security, default in browsers)
 * 2. Authorization: Bearer <token> header (fallback for mobile, API, and cross-origin tools)
 */
export function requireAuth(req, res, next) {
  try {
    let token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token) {
      const header = req.headers.authorization || "";
      const [scheme, bearerToken] = header.split(" ");
      if (scheme === "Bearer" && bearerToken) {
        token = bearerToken;
      }
    }

    if (!token) {
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
      role: String(payload.role || "").trim().toLowerCase(),
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
