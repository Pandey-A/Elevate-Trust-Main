import { api } from "./api";

const TOKEN_KEY = "et_auth_token";
const USER_KEY = "et_auth_user";

export const AUTH_CHANGED_EVENT = "et-auth-changed";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type AuthSession = {
  email: string;
  name: string;
  role: string;
};

/** Full dashboard access (role: admin). */
export function isSuperAdminRole(role?: string | null) {
  return String(role || "") === "admin";
}

export function isDashboardRole(role?: string | null) {
  const value = String(role || "");
  return value === "admin" || value === "sales";
}

export function canManageAdminContent(role?: string | null) {
  return isSuperAdminRole(role);
}

type AuthResponse = {
  success: boolean;
  message?: string;
  data: {
    token: string;
    user: AuthUser;
  };
};

function notifyAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAuthSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAuthSession());
}

function persistSession(token: string, user: AuthUser) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      email: user.email,
      name: user.name,
      role: user.role,
    } satisfies AuthSession),
  );
  notifyAuthChanged();
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  notifyAuthChanged();
  // Call server to clear HttpOnly cookie
  api.post("/api/auth/logout").catch(() => {});
}

export async function loginUser(email: string, password: string) {
  const { data } = await api.post<AuthResponse>("/api/auth/login", {
    email,
    password,
  });

  if (!data.success || !data.data?.token || !data.data.user) {
    throw new Error(data.message || "Unable to log in.");
  }

  persistSession(data.data.token, data.data.user);
  return data.data.user;
}

export async function fetchCurrentUser() {
  const token = getToken();

  try {
    const { data } = await api.get<{
      success: boolean;
      data: { user: AuthUser };
    }>("/api/auth/me", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!data.success || !data.data?.user) {
      if (token) logoutUser();
      return null;
    }

    persistSession(token || "", data.data.user);
    return data.data.user;
  } catch {
    if (token) logoutUser();
    return null;
  }
}

/** Attach JWT to API requests when present (Bearer fallback). */
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only clear session when a token/cookie was rejected as unauthorized (401).
    if (error?.response?.status === 401) {
      const hadSession = Boolean(getAuthSession());
      if (hadSession) {
        logoutUser();
      }
    }
    return Promise.reject(error);
  },
);

/** Clear old localStorage-only auth/demo keys from previous frontend setup. */
export function clearLegacyLocalAdminData() {
  [
    "et_admin_demos",
    "et_admin_demos_schema",
    "et_admin_auth",
    "et_admin_users",
  ].forEach((key) => localStorage.removeItem(key));
}
