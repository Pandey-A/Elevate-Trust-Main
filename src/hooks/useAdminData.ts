import { useCallback, useEffect, useState } from "react";
import type { AdminDemo, AdminJob } from "../data/adminDefaults";
import { getErrorMessage } from "../lib/api";
import {
  ADMIN_DATA_EVENT,
  getJobs,
} from "../lib/adminStorage";
import {
  AUTH_CHANGED_EVENT,
  getAuthSession,
  type AuthSession,
} from "../lib/auth";
import { fetchAdminDemos, fetchPublicDemos } from "../lib/demosApi";
import type { BlogPost } from "../lib/blogsApi";
import { fetchAdminBlogs, fetchPublicBlogs } from "../lib/blogsApi";
import { fetchDemoTags, type DemoTag } from "../lib/tagsApi";
import { INDUSTRY_TAGS } from "../data/adminDefaults";

function useJobsSnapshot() {
  const [value, setValue] = useState<AdminJob[]>(() => getJobs());

  useEffect(() => {
    const refresh = () => setValue(getJobs());
    refresh();
    window.addEventListener(ADMIN_DATA_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(ADMIN_DATA_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return value;
}

export function usePublicDemos() {
  const [demos, setDemos] = useState<AdminDemo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPublicDemos();
      setDemos(data);
      setError("");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load demos."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onChange = () => {
      void refresh();
    };
    window.addEventListener(ADMIN_DATA_EVENT, onChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { demos, loading, error, refresh };
}

export function useAdminDemos() {
  const [demos, setDemos] = useState<AdminDemo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAdminDemos();
      setDemos(data);
      setError("");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load demos."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onChange = () => {
      void refresh();
    };
    window.addEventListener(ADMIN_DATA_EVENT, onChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { demos, loading, error, refresh };
}

export function usePublicBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPublicBlogs();
      setBlogs(data);
      setError("");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load blogs."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onChange = () => {
      void refresh();
    };
    window.addEventListener(ADMIN_DATA_EVENT, onChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { blogs, loading, error, refresh };
}

export function useAdminBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAdminBlogs();
      setBlogs(data);
      setError("");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load blogs."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onChange = () => {
      void refresh();
    };
    window.addEventListener(ADMIN_DATA_EVENT, onChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { blogs, loading, error, refresh };
}

export function useDemoTags() {
  const [tags, setTags] = useState<string[]>([...INDUSTRY_TAGS]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDemoTags();
      const names = data.map((tag: DemoTag) => tag.name).filter(Boolean);
      setTags(names.length > 0 ? names : [...INDUSTRY_TAGS]);
      setError("");
    } catch (err) {
      setTags([...INDUSTRY_TAGS]);
      setError(getErrorMessage(err, "Unable to load tags."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onChange = () => {
      void refresh();
    };
    window.addEventListener(ADMIN_DATA_EVENT, onChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { tags, loading, error, refresh };
}

export function useAdminJobs(): AdminJob[] {
  return useJobsSnapshot();
}

export function useAdminAuth(): AuthSession | null {
  const [session, setSession] = useState<AuthSession | null>(() =>
    getAuthSession(),
  );

  useEffect(() => {
    const refresh = () => setSession(getAuthSession());
    refresh();
    window.addEventListener(AUTH_CHANGED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return session;
}
