import axios from "axios";

function resolveApiUrl() {
  const configured = String(import.meta.env.VITE_API_URL || "")
    .trim()
    .replace(/\/$/, "");

  if (configured) return configured;

  // Never silently point production builds at the visitor's localhost.
  if (import.meta.env.PROD) {
    console.error(
      "VITE_API_URL is missing in this production build. API requests will fail until it is configured.",
    );
    return "";
  }

  return "http://localhost:5000";
}

const API_URL = resolveApiUrl();

export const api = axios.create({
  baseURL: API_URL || undefined,
  headers: {
    Accept: "application/json",
  },
});

export function getErrorMessage(error: unknown, fallback = "Something went wrong.") {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    // Never surface internal / infra details from 5xx responses.
    if (status && status >= 500) return fallback;
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.trim()) return message;
    if (!error.response) {
      return "Cannot reach the server. Please try again in a moment.";
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export { API_URL };
