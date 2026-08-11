/**
 * Delivery URL for Cloudinary demo videos: keeps uploaded HD source,
 * streams a web-friendly 1280p H.264 variant so playback starts faster.
 */
export function getOptimizedDemoVideoUrl(url: string): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/video/upload/")) {
    return url;
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
