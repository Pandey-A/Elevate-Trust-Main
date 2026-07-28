import type { AdminDemo, IndustryTag } from "../data/adminDefaults";
import { normalizeIndustryTags } from "../data/industries";
import { api } from "./api";
import { ADMIN_DATA_EVENT } from "./adminStorage";

type DemoApiRow = {
  id: string;
  title: string;
  videoId: string;
  youtubeUrl: string;
  industries: string[];
};

function mapDemo(row: DemoApiRow): AdminDemo {
  const industries = normalizeIndustryTags(row.industries ?? []) as IndustryTag[];
  return {
    id: row.id,
    title: row.title,
    videoId: row.videoId,
    youtubeUrl: row.youtubeUrl,
    industries:
      industries.length > 0
        ? industries
        : (["Financial Services & FinTech"] as IndustryTag[]),
  };
}

function notifyDemosChanged() {
  window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
}

export async function fetchDemos(): Promise<AdminDemo[]> {
  const { data } = await api.get<{ success: boolean; data: DemoApiRow[] }>(
    "/api/demos",
  );
  if (!data.success || !Array.isArray(data.data)) {
    throw new Error("Unable to load demos.");
  }
  return data.data.map(mapDemo);
}

export async function createDemo(demo: {
  id?: string;
  title: string;
  youtubeUrl: string;
  industries: IndustryTag[];
}): Promise<AdminDemo> {
  const { data } = await api.post<{
    success: boolean;
    message?: string;
    data: DemoApiRow;
  }>("/api/demos", demo);

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
  },
): Promise<AdminDemo> {
  const { data } = await api.put<{
    success: boolean;
    message?: string;
    data: DemoApiRow;
  }>(`/api/demos/${encodeURIComponent(id)}`, demo);

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to update demo.");
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
