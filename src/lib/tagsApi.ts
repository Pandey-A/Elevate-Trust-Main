import { api } from "./api";
import { ADMIN_DATA_EVENT } from "./adminStorage";

export type DemoTag = {
  id: string;
  name: string;
  createdAt: string;
};

function notifyTagsChanged() {
  window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
}

export async function fetchDemoTags(): Promise<DemoTag[]> {
  const { data } = await api.get<{ success: boolean; data: DemoTag[] }>(
    "/api/demo-tags",
  );
  if (!data.success || !Array.isArray(data.data)) {
    throw new Error("Unable to load tags.");
  }
  return data.data;
}

export async function createDemoTag(name: string): Promise<DemoTag> {
  const { data } = await api.post<{
    success: boolean;
    message?: string;
    data: DemoTag;
  }>("/api/demo-tags", { name });

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to create tag.");
  }

  notifyTagsChanged();
  return data.data;
}
