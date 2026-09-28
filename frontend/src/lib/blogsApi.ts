import { api } from "./api";
import { ADMIN_DATA_EVENT } from "./adminStorage";
import { resolveMediaUrl } from "./optimizeImageUrl";

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

type BlogApiRow = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

function mapBlog(row: BlogApiRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    description: row.description || "",
    imageUrl: resolveMediaUrl(row.imageUrl) || "",
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function notifyBlogsChanged() {
  window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
}

export async function fetchPublicBlogs(): Promise<BlogPost[]> {
  const { data } = await api.get<{ success: boolean; data: BlogApiRow[] }>("/api/blogs");
  if (!data.success || !Array.isArray(data.data)) {
    throw new Error("Unable to load blogs.");
  }
  return data.data.map(mapBlog);
}

export async function fetchAdminBlogs(): Promise<BlogPost[]> {
  const { data } = await api.get<{ success: boolean; data: BlogApiRow[] }>(
    "/api/blogs/admin/all",
  );
  if (!data.success || !Array.isArray(data.data)) {
    throw new Error("Unable to load blogs.");
  }
  return data.data.map(mapBlog);
}

export async function fetchPublicBlogById(id: string): Promise<BlogPost> {
  const { data } = await api.get<{ success: boolean; data: BlogApiRow }>(
    `/api/blogs/${encodeURIComponent(id)}`,
  );
  if (!data.success || !data.data) {
    throw new Error("Blog not found.");
  }
  return mapBlog(data.data);
}

function buildBlogFormData(blog: {
  id?: string;
  title: string;
  description: string;
  imageFile?: File | null;
}): FormData {
  const form = new FormData();
  if (blog.id) form.append("id", blog.id);
  form.append("title", blog.title);
  form.append("description", blog.description);
  if (blog.imageFile) form.append("image", blog.imageFile);
  return form;
}

export async function createBlog(blog: {
  id?: string;
  title: string;
  description: string;
  imageFile: File;
}): Promise<BlogPost> {
  const { data } = await api.post<{
    success: boolean;
    message?: string;
    data: BlogApiRow;
  }>("/api/blogs", buildBlogFormData(blog), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to create blog.");
  }

  notifyBlogsChanged();
  return mapBlog(data.data);
}

export async function updateBlog(
  id: string,
  blog: {
    title: string;
    description: string;
    imageFile?: File | null;
  },
): Promise<BlogPost> {
  const { data } = await api.put<{
    success: boolean;
    message?: string;
    data: BlogApiRow;
  }>(`/api/blogs/${encodeURIComponent(id)}`, buildBlogFormData(blog), {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!data.success || !data.data) {
    throw new Error(data.message || "Unable to update blog.");
  }

  notifyBlogsChanged();
  return mapBlog(data.data);
}

export async function deleteBlog(id: string) {
  const { data } = await api.delete<{ success: boolean; message?: string }>(
    `/api/blogs/${encodeURIComponent(id)}`,
  );

  if (!data.success) {
    throw new Error(data.message || "Unable to delete blog.");
  }

  notifyBlogsChanged();
}
