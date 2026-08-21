import { api, getErrorMessage } from "./api";

export type ContactLeadSource = "footer" | "contact" | "newsletter" | "other";

export async function submitContactLead(input: {
  email: string;
  source: ContactLeadSource;
}): Promise<string> {
  const { data } = await api.post<{ success: boolean; message?: string }>(
    "/api/contact",
    {
      email: input.email.trim().slice(0, 254),
      source: input.source,
    },
  );

  if (!data.success) {
    throw new Error(data.message || "Unable to submit email.");
  }

  return data.message || "Thanks we received your email and will reach out soon.";
}

export { getErrorMessage };
