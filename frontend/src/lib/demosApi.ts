import type { AdminDemo, IndustryTag } from "../data/adminDefaults";
import { normalizeIndustryTags } from "../data/industries";
import { api } from "./api";
import { ADMIN_DATA_EVENT } from "./adminStorage";

type DemoApiRow = {
  id: string;
  title: string;
  videoId?: string | null;
  youtubeUrl?: string | null;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  industries: string[];
  isPublic?: boolean;
};

function mapDemo(row: DemoApiRow): AdminDemo {
  const industries = normalizeIndustryTags(row.industries ?? []) as IndustryTag[];
  return {
    id: row.id,
    title: row.title,
    videoId: row.videoId || "",
    youtubeUrl: row.youtubeUrl || "",
    videoUrl: row.videoUrl ?? null,
    industries,
    thumbnailUrl: row.thumbnailUrl ?? null,
    isPublic: row.isPublic !== false,
  };
}

function notifyDemosChanged() {
  window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
}

export async function fetchPublicDemos(): Promise<AdminDemo[]> {
  const { data } = await api.get<{ success: boolean; data: DemoApiRow[] }>(
    "/api/demos",
  );
  if (!data.success || !Array.isArray(data.data)) {
    throw new Error("Unable to load demos.");
  }
  return data.data.map(mapDemo);
}

export async function fetchAdminDemos(): Promise<AdminDemo[]> {
  const { data } = await api.get<{ success: boolean; data: DemoApiRow[] }>(
    "/api/demos/admin/all",
  );
  if (!data.success || !Array.isArray(data.data)) {
    throw new Error("Unable to load demos.");
  }
  return data.data.map(mapDemo);
}

/** @deprecated Use fetchPublicDemos or fetchAdminDemos */
export async function fetchDemos(): Promise<AdminDemo[]> {
  return fetchPublicDemos();
}

function buildDemoFormData(demo: {
  id?: string;
  title: string;
  youtubeUrl: string;
  industries: IndustryTag[];
  isPublic: boolean;
  thumbnailFile?: File | null;
  videoFile?: File | null;
}): FormData {
  const form = new FormData();
  if (demo.id) form.append("id", demo.id);
  form.append("title", demo.title);
  form.append("youtubeUrl", demo.youtubeUrl || "");
  form.append("isPublic", String(demo.isPublic));
  demo.industries.forEach((tag) => form.append("industries", tag));
  if (demo.thumbnailFile) form.append("thumbnail", demo.thumbnailFile);
  if (demo.videoFile) form.append("video", demo.videoFile);
  return form;
}

/** Allow large HD uploads (matches backend DEMO_VIDEO_MAX_BYTES). */
export const DEMO_VIDEO_MAX_BYTES = 500 * 1024 * 1024;
const DEMO_UPLOAD_TIMEOUT_MS = 15 * 60 * 1000;

type DemoUploadOptions = {
  onUploadProgress?: (percent: number) => void;
};

export async function createDemo(
  demo: {
    id?: string;
    title: string;
    youtubeUrl: string;
    industries: IndustryTag[];
    isPublic: boolean;
    thumbnailFile?: File | null;
    videoFile?: File | null;
  },
  options?: DemoUploadOptions,
): Promise<AdminDemo> {
  const { data } = await api.post<{
    success: boolean;
    message?: string;
    data: DemoApiRow;
  }>("/api/demos", buildDemoFormData(demo), {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: DEMO_UPLOAD_TIMEOUT_MS,
    onUploadProgress: (event) => {
      if (!options?.onUploadProgress || !event.total) return;
      options.onUploadProgress(Math.min(100, Math.round((event.loaded / event.total) * 100)));
    },
  });

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to create demo.");
  }

  notifyDemosChanged();
  return mapDemo(data.data);
}

export async function updateDemo(
  id: string,
  demo: {
    title: string;
    youtubeUrl: string;
    industries: IndustryTag[];
    isPublic: boolean;
    thumbnailFile?: File | null;
    videoFile?: File | null;
  },
  options?: DemoUploadOptions,
): Promise<AdminDemo> {
  const { data } = await api.put<{
    success: boolean;
    message?: string;
    data: DemoApiRow;
  }>(`/api/demos/${encodeURIComponent(id)}`, buildDemoFormData(demo), {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: DEMO_UPLOAD_TIMEOUT_MS,
    onUploadProgress: (event) => {
      if (!options?.onUploadProgress || !event.total) return;
      options.onUploadProgress(Math.min(100, Math.round((event.loaded / event.total) * 100)));
    },
  });

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to update demo.");
  }

  notifyDemosChanged();
  return mapDemo(data.data);
}

export async function toggleDemoVisibility(id: string, isPublic: boolean): Promise<AdminDemo> {
  const { data } = await api.patch<{
    success: boolean;
    message?: string;
    data: DemoApiRow;
  }>(`/api/demos/${encodeURIComponent(id)}/visibility`, { isPublic });

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to update demo visibility.");
  }

  notifyDemosChanged();
  return mapDemo(data.data);
}

export async function deleteDemo(id: string) {
  const { data } = await api.delete<{ success: boolean; message?: string }>(
    `/api/demos/${encodeURIComponent(id)}`,
  );

  if (!data.success) {
    throw new Error(data.message || "Unable to delete demo.");
  }

  notifyDemosChanged();
}
