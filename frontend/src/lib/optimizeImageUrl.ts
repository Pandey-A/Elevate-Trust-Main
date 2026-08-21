/**
 * Optimize delivery URLs for Cloudinary images (blogs, testimonials, demos).
 * Leaves non-Cloudinary / already-transformed URLs unchanged.
 */
export function getOptimizedImageUrl(
  url: string | null | undefined,
  options: { width?: number; height?: number; crop?: "fill" | "limit" } = {},
): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return url;
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
