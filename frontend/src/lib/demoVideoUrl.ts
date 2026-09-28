import { resolveMediaUrl } from "./optimizeImageUrl";

/**
 * Delivery URL for demo videos:
 * Handles local server uploads and Cloudinary URLs.
 */
export function getOptimizedDemoVideoUrl(url: string): string {
  const resolved = resolveMediaUrl(url);
  if (!resolved.includes("res.cloudinary.com") || !resolved.includes("/video/upload/")) {
    return resolved;
  }

  // Already transformed
  if (/\/video\/upload\/(?:[^/]+,)+/.test(url) || /\/video\/upload\/q_/.test(url)) {
    return url;
  }

  return url.replace(
    "/video/upload/",
    "/video/upload/q_auto:good,f_mp4,vc_h264,w_1280,c_limit/",
  );
}
