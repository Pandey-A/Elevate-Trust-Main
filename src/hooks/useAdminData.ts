import { useEffect, useState } from "react";
import {
  ADMIN_DATA_EVENT,
  getAuthSession,
  getDemos,
  getJobs,
} from "../lib/adminStorage";
import type { AdminDemo, AdminJob } from "../data/adminDefaults";

function useAdminSnapshot<T>(reader: () => T) {
  const [value, setValue] = useState<T>(() => reader());

  useEffect(() => {
    const refresh = () => setValue(reader());
    refresh();
    window.addEventListener(ADMIN_DATA_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(ADMIN_DATA_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [reader]);

  return value;
}

export function useAdminDemos(): AdminDemo[] {
  return useAdminSnapshot(getDemos);
}

export function useAdminJobs(): AdminJob[] {
  return useAdminSnapshot(getJobs);
}

export function useAdminAuth() {
  return useAdminSnapshot(getAuthSession);
}
