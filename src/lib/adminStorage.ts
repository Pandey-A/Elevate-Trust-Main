import {
  DEFAULT_DEMOS,
  DEFAULT_JOBS,
  type AdminDemo,
  type AdminJob,
  type IndustryTag,
} from "../data/adminDefaults";
import { normalizeIndustryTags, SITE_INDUSTRIES } from "../data/industries";

const DEMOS_KEY = "et_admin_demos";
const DEMOS_SCHEMA_KEY = "et_admin_demos_schema";
const DEMOS_SCHEMA_VERSION = 2;
const JOBS_KEY = "et_admin_jobs";
const AUTH_KEY = "et_admin_auth";
const USERS_KEY = "et_admin_users";

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

function isSiteIndustry(tag: string): tag is IndustryTag {
  return (SITE_INDUSTRIES as readonly string[]).includes(tag);
}

function hasLegacyIndustryTags(tags: string[] | undefined) {
  return (tags ?? []).some((tag) => !isSiteIndustry(tag));
}

function industriesEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  return a.every((tag, index) => tag === b[index]);
}

/** Always return site industries only — remap legacy capability tags. */
export function normalizeDemo(demo: AdminDemo): AdminDemo {
  const fromDefaults =
    DEFAULT_DEMOS.find((item) => item.id === demo.id) ??
    DEFAULT_DEMOS.find((item) => item.videoId === demo.videoId);

  // Known default demos always use the latest industry mapping.
  if (fromDefaults && hasLegacyIndustryTags(demo.industries)) {
    return { ...demo, industries: [...fromDefaults.industries] };
  }

  if (fromDefaults && !hasLegacyIndustryTags(demo.industries)) {
    // Keep admin customizations when already on site industries.
    const industries = normalizeIndustryTags(demo.industries ?? []);
    return {
      ...demo,
      industries: industries.length > 0 ? industries : [...fromDefaults.industries],
    };
  }

  const industries = normalizeIndustryTags(demo.industries ?? []);
  return {
    ...demo,
    industries:
      industries.length > 0
        ? industries
        : (["Financial Services & FinTech"] as IndustryTag[]),
  };
}

function migrateDemosToSiteIndustries(raw: AdminDemo[]): AdminDemo[] {
  return raw.map((demo) => {
    const fromDefaults =
      DEFAULT_DEMOS.find((item) => item.id === demo.id) ??
      DEFAULT_DEMOS.find((item) => item.videoId === demo.videoId);

    // Force-refresh industry tags for shipped demos (fixes stale localStorage).
    if (fromDefaults) {
      return { ...demo, industries: [...fromDefaults.industries] };
    }

    return normalizeDemo(demo);
  });
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

export function getDemos(): AdminDemo[] {
  const schema = Number(localStorage.getItem(DEMOS_SCHEMA_KEY) || "0");
  const raw = readJson<AdminDemo[]>(DEMOS_KEY, DEFAULT_DEMOS);
  const hasLegacy = raw.some((demo) => hasLegacyIndustryTags(demo.industries));

  // Force remap whenever schema is behind OR any legacy capability tags remain.
  const demos =
    schema < DEMOS_SCHEMA_VERSION || hasLegacy
      ? migrateDemosToSiteIndustries(raw)
      : raw.map(normalizeDemo);

  const stored = localStorage.getItem(DEMOS_KEY);
  const needsRewrite =
    schema < DEMOS_SCHEMA_VERSION ||
    hasLegacy ||
    !stored ||
    demos.some((demo, index) => {
      const original = raw[index];
      if (!original) return true;
      return !industriesEqual(original.industries ?? [], demo.industries);
    });

  if (needsRewrite) {
    // Persist without notify — callers may be reading during render.
    localStorage.setItem(DEMOS_KEY, JSON.stringify(demos));
    localStorage.setItem(DEMOS_SCHEMA_KEY, String(DEMOS_SCHEMA_VERSION));
  }

  return demos;
}

export function saveDemos(demos: AdminDemo[]) {
  writeJson(DEMOS_KEY, demos.map(normalizeDemo));
  localStorage.setItem(DEMOS_SCHEMA_KEY, String(DEMOS_SCHEMA_VERSION));
}

export function upsertDemo(demo: AdminDemo) {
  const demos = getDemos();
  const normalized = normalizeDemo(demo);
  const index = demos.findIndex((item) => item.id === normalized.id);
  if (index >= 0) demos[index] = normalized;
  else demos.unshift(normalized);
  saveDemos(demos);
}

export function deleteDemo(id: string) {
  saveDemos(getDemos().filter((item) => item.id !== id));
}

export function getJobs(): AdminJob[] {
  return readJson(JOBS_KEY, DEFAULT_JOBS);
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

export type AdminUser = {
  name: string;
  email: string;
  password: string;
};

export function getUsers(): AdminUser[] {
  return readJson(USERS_KEY, []);
}

export function registerUser(user: AdminUser) {
  const users = getUsers();
  if (users.some((item) => item.email.toLowerCase() === user.email.toLowerCase())) {
    throw new Error("An account with this email already exists.");
  }
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function loginUser(email: string, password: string) {
  // Frontend-only: any credentials work. Optionally remember signup users too.
  const users = getUsers();
  const matched = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() && user.password === password,
  );

  const session = {
    email: matched?.email ?? email,
    name: matched?.name ?? email.split("@")[0] ?? "Admin",
    loggedInAt: Date.now(),
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  notify();
  return session;
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
  notify();
}

export function getAuthSession(): { email: string; name: string } | null {
  return readJson(AUTH_KEY, null);
}

export function isAuthenticated() {
  return Boolean(getAuthSession());
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
