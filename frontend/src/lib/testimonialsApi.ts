import { api } from "./api";
import { ADMIN_DATA_EVENT } from "./adminStorage";

export type Testimonial = {
  id: string;
  name: string;
  title: string;
  quote: string;
  fullQuote: string;
  logoUrl: string;
  profileUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type TestimonialApiRow = {
  id: string;
  name: string;
  title: string;
  quote: string;
  fullQuote?: string;
  logoUrl?: string;
  profileUrl?: string;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
};

function mapTestimonial(row: TestimonialApiRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    title: row.title || "",
    quote: row.quote || "",
    fullQuote: row.fullQuote || "",
    logoUrl: row.logoUrl || "",
    profileUrl: row.profileUrl || "",
    sortOrder: Number(row.sortOrder) || 0,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function notifyTestimonialsChanged() {
  window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
}

export async function fetchPublicTestimonials(): Promise<Testimonial[]> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const { data } = await api.get<{ success: boolean; data: TestimonialApiRow[] }>(
        "/api/testimonials",
        { timeout: 12_000 },
      );
      if (!data.success || !Array.isArray(data.data)) {
        throw new Error("Unable to load testimonials.");
      }
      return data.data.map(mapTestimonial);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Unable to load testimonials.");
}

export async function fetchAdminTestimonials(): Promise<Testimonial[]> {
  const { data } = await api.get<{ success: boolean; data: TestimonialApiRow[] }>(
    "/api/testimonials/admin/all",
  );
  if (!data.success || !Array.isArray(data.data)) {
    throw new Error("Unable to load testimonials.");
  }
  return data.data.map(mapTestimonial);
}

function buildTestimonialFormData(testimonial: {
  id?: string;
  name: string;
  title: string;
  quote: string;
  fullQuote?: string;
  sortOrder?: number;
  logoFile?: File | null;
  profileFile?: File | null;
}): FormData {
  const form = new FormData();
  if (testimonial.id) form.append("id", testimonial.id);
  form.append("name", testimonial.name);
  form.append("title", testimonial.title);
  form.append("quote", testimonial.quote);
  form.append("fullQuote", testimonial.fullQuote || "");
  form.append("sortOrder", String(testimonial.sortOrder ?? 0));
  if (testimonial.logoFile) form.append("logo", testimonial.logoFile);
  if (testimonial.profileFile) form.append("profile", testimonial.profileFile);
  return form;
}

export async function createTestimonial(testimonial: {
  id?: string;
  name: string;
  title: string;
  quote: string;
  fullQuote?: string;
  sortOrder?: number;
  logoFile?: File | null;
  profileFile: File;
}): Promise<Testimonial> {
  const { data } = await api.post<{
    success: boolean;
    message?: string;
    data: TestimonialApiRow;
  }>("/api/testimonials", buildTestimonialFormData(testimonial), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to create testimonial.");
  }

  notifyTestimonialsChanged();
  return mapTestimonial(data.data);
}

export async function updateTestimonial(
  id: string,
  testimonial: {
    name: string;
    title: string;
    quote: string;
    fullQuote?: string;
    sortOrder?: number;
    logoFile?: File | null;
    profileFile?: File | null;
  },
): Promise<Testimonial> {
  const { data } = await api.put<{
    success: boolean;
    message?: string;
    data: TestimonialApiRow;
  }>(`/api/testimonials/${encodeURIComponent(id)}`, buildTestimonialFormData(testimonial), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to update testimonial.");
  }

  notifyTestimonialsChanged();
  return mapTestimonial(data.data);
}

export async function deleteTestimonial(id: string) {
  const { data } = await api.delete<{ success: boolean; message?: string }>(
    `/api/testimonials/${encodeURIComponent(id)}`,
  );

  if (!data.success) {
    throw new Error(data.message || "Unable to delete testimonial.");
  }

  notifyTestimonialsChanged();
}
