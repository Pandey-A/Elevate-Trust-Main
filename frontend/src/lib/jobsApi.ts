import { api } from "./api";
import { ADMIN_DATA_EVENT } from "./adminStorage";
import type { AdminJob } from "../data/adminDefaults";

type JobApiRow = {
  id: string;
  title: string;
  tag?: string;
  description?: string;
  type?: string;
  location?: string;
  category?: string;
  categorySubtitle?: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
};

function mapJob(row: JobApiRow): AdminJob {
  return {
    id: row.id,
    title: row.title || "",
    tag: row.tag || "",
    description: row.description || "",
    type: row.type || "Full-time",
    location: row.location || "Remotely",
    category: row.category || "",
    categorySubtitle: row.categorySubtitle || "",
  };
}

function notifyJobsChanged() {
  window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
}

export async function fetchPublicJobs(): Promise<AdminJob[]> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const { data } = await api.get<{ success: boolean; data: JobApiRow[] }>(
        "/api/jobs",
        { timeout: 12_000 },
      );
      if (!data.success || !Array.isArray(data.data)) {
        throw new Error("Unable to load jobs.");
      }
      return data.data.map(mapJob);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Unable to load jobs.");
}

export async function fetchAdminJobs(): Promise<AdminJob[]> {
  const { data } = await api.get<{ success: boolean; data: JobApiRow[] }>(
    "/api/jobs/admin/all",
  );
  if (!data.success || !Array.isArray(data.data)) {
    throw new Error("Unable to load jobs.");
  }
  return data.data.map(mapJob);
}

export async function createJob(job: Omit<AdminJob, "id"> & { id?: string }): Promise<AdminJob> {
  const { data } = await api.post<{
    success: boolean;
    message?: string;
    data: JobApiRow;
  }>("/api/jobs", job);

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to create job.");
  }

  notifyJobsChanged();
  return mapJob(data.data);
}

export async function updateJob(id: string, job: Omit<AdminJob, "id">): Promise<AdminJob> {
  const { data } = await api.put<{
    success: boolean;
    message?: string;
    data: JobApiRow;
  }>(`/api/jobs/${encodeURIComponent(id)}`, job);

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to update job.");
  }

  notifyJobsChanged();
  return mapJob(data.data);
}

export async function deleteJob(id: string) {
  const { data } = await api.delete<{ success: boolean; message?: string }>(
    `/api/jobs/${encodeURIComponent(id)}`,
  );

  if (!data.success) {
    throw new Error(data.message || "Unable to delete job.");
  }

  notifyJobsChanged();
}
