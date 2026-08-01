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
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.trim()) return message;
    if (!error.response) {
      return "Cannot reach the server. Check that the backend is running.";
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export { API_URL };
