import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
  /\/$/,
  "",
);

export const api = axios.create({
  baseURL: API_URL,
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
