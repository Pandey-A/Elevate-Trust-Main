import {
  type AdminDemo,
  type AdminJob,
  type IndustryTag,
} from "../data/adminDefaults";
import { normalizeIndustryTags } from "../data/industries";

const JOBS_KEY = "et_admin_jobs";

export const ADMIN_DATA_EVENT = "et-admin-data-changed";

function notify() {
  window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  notify();
}

/** Normalize industry tags on demos loaded from the API. */
export function normalizeDemo(demo: AdminDemo): AdminDemo {
  const industries = normalizeIndustryTags(demo.industries ?? []);
  return {
    ...demo,
    industries:
      industries.length > 0
        ? (industries as IndustryTag[])
        : (["Financial Services & FinTech"] as IndustryTag[]),
  };
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function extractYoutubeId(input: string): string | null {
  const value = input.trim();
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

/** Prefer API-backed jobs. Local helpers kept only for grouping/utilities. */
export function getJobs(): AdminJob[] {
  return readJson(JOBS_KEY, [] as AdminJob[]);
}

export function saveJobs(jobs: AdminJob[]) {
  writeJson(JOBS_KEY, jobs);
}

export function upsertJob(job: AdminJob) {
  const jobs = getJobs();
  const index = jobs.findIndex((item) => item.id === job.id);
  if (index >= 0) jobs[index] = job;
  else jobs.unshift(job);
  saveJobs(jobs);
}

export function deleteJob(id: string) {
  saveJobs(getJobs().filter((item) => item.id !== id));
}

export function youtubeThumb(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function groupJobsByCategory(jobs: AdminJob[]) {
  const map = new Map<
    string,
    { category: string; subtitle: string; jobs: AdminJob[] }
  >();

  jobs.forEach((job) => {
    const existing = map.get(job.category);
    if (existing) {
      existing.jobs.push(job);
    } else {
      map.set(job.category, {
        category: job.category,
        subtitle: job.categorySubtitle,
        jobs: [job],
      });
    }
  });

  return Array.from(map.values());
}

export type { AdminDemo, AdminJob, IndustryTag };
