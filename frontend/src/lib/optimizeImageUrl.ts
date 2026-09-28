import { API_URL } from "./api";

/**
 * Resolves local server uploads or absolute URLs.
 * If url starts with /uploads/, prepends API_URL when configured.
 */
export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  let trimmed = url.trim();

  // Strip accidental http://localhost:XXXX or http://127.0.0.1:XXXX before /uploads/
  trimmed = trimmed.replace(
    /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?=\/uploads\/)/i,
    "",
  );

  if (trimmed.startsWith("/uploads/")) {
    return API_URL ? `${API_URL}${trimmed}` : trimmed;
  }
  return trimmed;
}

/**
 * Optimize delivery URLs for media assets.
 * Leaves non-Cloudinary / local / already-transformed URLs unchanged.
 */
export function getOptimizedImageUrl(
  url: string | null | undefined,
  options: { width?: number; height?: number; crop?: "fill" | "limit" } = {},
): string {
  if (!url) return "";
  const resolved = resolveMediaUrl(url);
  if (!resolved.includes("res.cloudinary.com") || !resolved.includes("/image/upload/")) {
    return resolved;
  }

  // Already has transforms after /image/upload/
  if (/\/image\/upload\/(?:[^/]+,)+/.test(url) || /\/image\/upload\/[fqwc]_/.test(url)) {
    return url;
  }

  const width = options.width ?? 800;
  const crop = options.crop ?? "limit";
  const parts = [`f_auto`, `q_auto`, `c_${crop}`, `w_${width}`];
  if (options.height) parts.push(`h_${options.height}`);

  return url.replace("/image/upload/", `/image/upload/${parts.join(",")}/`);
}
