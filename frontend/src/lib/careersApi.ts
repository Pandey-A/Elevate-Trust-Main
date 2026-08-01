import { api } from "./api";

export type CareerEnquiryInput = {
  fullName: string;
  email: string;
  phone: string;
  jobTitle?: string;
  education?: string;
  expertise?: string;
  message?: string;
  cv: File;
};

export type CareerApplication = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  education: string;
  expertise: string;
  message: string;
  cvFilename: string;
  cvUrl: string;
  createdAt: string;
};

export async function submitCareerEnquiry(input: CareerEnquiryInput) {
  const formData = new FormData();
  formData.append("fullName", input.fullName);
  formData.append("email", input.email);
  formData.append("phone", input.phone);
  if (input.jobTitle) formData.append("jobTitle", input.jobTitle);
  if (input.education) formData.append("education", input.education);
  if (input.expertise) formData.append("expertise", input.expertise);
  if (input.message) formData.append("message", input.message);
  formData.append("cv", input.cv);

  const { data } = await api.post<{
    success: boolean;
    message?: string;
  }>("/api/careers", formData);

  if (!data.success) {
    throw new Error(data.message || "Unable to submit your application.");
  }

  return data;
}

export async function fetchCareerApplications(): Promise<CareerApplication[]> {
  const { data } = await api.get<{
    success: boolean;
    message?: string;
    data: CareerApplication[];
  }>("/api/careers");

  if (!data.success || !Array.isArray(data.data)) {
    throw new Error(data.message || "Unable to load applications.");
  }

  return data.data;
}

export async function deleteCareerApplication(id: number) {
  const { data } = await api.delete<{
    success: boolean;
    message?: string;
  }>(`/api/careers/${id}`);

  if (!data.success) {
    throw new Error(data.message || "Unable to delete application.");
  }

  return data;
}
