import {
  type AdminDemo,
  type AdminJob,
  type IndustryTag,
} from "../data/adminDefaults";
import { normalizeIndustryTags } from "../data/industries";

export const ADMIN_DATA_EVENT = "et-admin-data-changed";

export function notifyAdminDataChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
  }
}

/** Normalize industry tags on demos loaded from the API. */
export function normalizeDemo(demo: AdminDemo): AdminDemo {
  const rawIndustries = Array.isArray(demo.industries) ? demo.industries : [];
  const normalized = normalizeIndustryTags(rawIndustries);

  return {
    ...demo,
    // Preserve empty industries array for document-type demos
    industries: normalized as IndustryTag[],
  };
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function extractYoutubeId(input: string): string | null {
  const value = String(input || "").trim();
  if (!value) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && id.length === 11 ? id : null;
    }
    const v = url.searchParams.get("v");
    if (v && v.length === 11) return v;
    const embed = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embed?.[1]) return embed[1];
    const shorts = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shorts?.[1]) return shorts[1];
  } catch {
    return null;
  }

  return null;
}

/** 
 * Dynamically resolves thumbnail URL for Youtube vs Uploaded Media
 */
export function getDemoThumbnailUrl(demo: Partial<AdminDemo>): string {
  if (demo.thumbnailUrl) {
    return demo.thumbnailUrl;
  }
  const ytId = demo.videoId || (demo.youtubeUrl ? extractYoutubeId(demo.youtubeUrl) : null);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return "/placeholder-demo.jpg";
}

/** Legacy helper for YouTube ID thumbnails (Kept for backwards compatibility) */
export function youtubeThumb(videoId?: string): string {
  const id = String(videoId || "").trim();
  if (!id) return "";
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function groupJobsByCategory(jobs: AdminJob[]) {
  const map = new Map<
    string,
    { category: string; subtitle: string; jobs: AdminJob[] }
  >();

  (jobs || []).forEach((job) => {
    const existing = map.get(job.category);
    if (existing) {
      existing.jobs.push(job);
    } else {
      map.set(job.category, {
        category: job.category,
        subtitle: job.categorySubtitle || "",
        jobs: [job],
      });
    }
  });

  return Array.from(map.values());
}

export type { AdminDemo, AdminJob, IndustryTag };