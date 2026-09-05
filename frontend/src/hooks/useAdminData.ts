import { useCallback, useEffect, useState } from "react";
import type { AdminDemo, AdminJob } from "../data/adminDefaults";
import { getErrorMessage } from "../lib/api";
import { ADMIN_DATA_EVENT } from "../lib/adminStorage";
import {
  AUTH_CHANGED_EVENT,
  getAuthSession,
  getToken,
  type AuthSession,
} from "../lib/auth";
import { fetchAdminDemos, fetchPublicDemos } from "../lib/demosApi";
import type { BlogPost } from "../lib/blogsApi";
import { fetchAdminBlogs, fetchPublicBlogs } from "../lib/blogsApi";
import type { Testimonial } from "../lib/testimonialsApi";
import { fetchAdminTestimonials, fetchPublicTestimonials } from "../lib/testimonialsApi";
import { fetchAdminJobs, fetchPublicJobs } from "../lib/jobsApi";
import { fetchDemoTags, type DemoTag } from "../lib/tagsApi";
import { INDUSTRY_TAGS } from "../data/adminDefaults";

/** Keep list pages snappy when navigating away and back (1 hour). */
const PUBLIC_CACHE_TTL_MS = 60 * 60 * 1000;

type ResourceCache<T> = {
  peek: () => T | null;
  isFresh: () => boolean;
  invalidate: () => void;
  get: (force?: boolean) => Promise<T>;
};

function createResourceCache<T>(
  fetcher: () => Promise<T>,
  storageKey?: string,
): ResourceCache<T> {
  let data: T | null = null;
  let fetchedAt = 0;
  let inflight: Promise<T> | null = null;

  if (storageKey) {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.data !== undefined) {
          data = parsed.data;
          fetchedAt = parsed.fetchedAt || 0;
        }
      }
    } catch {
      // Ignore storage read error
    }
  }

  return {
    peek: () => data,
    isFresh: () => data !== null && Date.now() - fetchedAt < PUBLIC_CACHE_TTL_MS,
    invalidate: () => {
      fetchedAt = 0;
      if (storageKey) {
        try {
          localStorage.removeItem(storageKey);
        } catch {
          // Ignore
        }
      }
    },
    get: (force = false) => {
      if (!force && data !== null && Date.now() - fetchedAt < PUBLIC_CACHE_TTL_MS) {
        return Promise.resolve(data);
      }
      if (inflight) return inflight;

      inflight = fetcher()
        .then((result) => {
          data = result;
          fetchedAt = Date.now();
          if (storageKey) {
            try {
              localStorage.setItem(
                storageKey,
                JSON.stringify({ data: result, fetchedAt: Date.now() }),
              );
            } catch {
              // Ignore storage write error
            }
          }
          return result;
        })
        .finally(() => {
          inflight = null;
        });

      return inflight;
    },
  };
}

const publicDemosCache = createResourceCache(fetchPublicDemos, "et_cache_public_demos");
const publicBlogsCache = createResourceCache(fetchPublicBlogs, "et_cache_public_blogs");
const publicTestimonialsCache = createResourceCache(fetchPublicTestimonials, "et_cache_public_testimonials");
const publicJobsCache = createResourceCache(fetchPublicJobs, "et_cache_public_jobs");
const publicDemoTagsCache = createResourceCache(async () => {
  const data = await fetchDemoTags();
  const names = data.map((tag: DemoTag) => tag.name).filter(Boolean);
  return names.length > 0 ? names : [...INDUSTRY_TAGS];
}, "et_cache_public_tags");

/** Schedule work after first paint / when the browser is idle (does not block LCP). */
export function scheduleIdlePrefetch(task: () => void) {
  if (typeof window === "undefined") return () => {};

  const ric = window.requestIdleCallback?.bind(window);
  if (typeof ric === "function") {
    const id = ric(() => task(), { timeout: 2500 });
    return () => window.cancelIdleCallback?.(id);
  }

  // Fallback: after first paint, then next task
  let cancelled = false;
  const raf = window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      if (!cancelled) task();
    }, 0);
  });
  return () => {
    cancelled = true;
    window.cancelAnimationFrame(raf);
  };
}

/** Warm cache before the user lands on Demo/Blog (e.g. nav hover). */
export function prefetchPublicDemos() {
  return publicDemosCache.get(false);
}

export function prefetchPublicBlogs() {
  return publicBlogsCache.get(false);
}

export function prefetchPublicTestimonials() {
  return publicTestimonialsCache.get(false);
}

export function prefetchPublicJobs() {
  return publicJobsCache.get(false);
}

export function prefetchDemoTags() {
  return publicDemoTagsCache.get(false);
}

export function prefetchDemoPage() {
  return Promise.all([prefetchPublicDemos(), prefetchDemoTags()]);
}

export function usePublicJobs() {
  const initial = publicJobsCache.peek();
  const [jobs, setJobs] = useState<AdminJob[]>(() => initial ?? []);
  const [loading, setLoading] = useState(() => initial === null);
  const [error, setError] = useState("");

  const refresh = useCallback(async (force = false) => {
    const hadCache = publicJobsCache.peek() !== null;
    try {
      if (!hadCache) setLoading(true);
      const data = await publicJobsCache.get(force);
      setJobs(data);
      setError("");
    } catch (err) {
      if (publicJobsCache.peek() === null) {
        setJobs([]);
        setError(getErrorMessage(err, "Unable to load jobs."));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh(false);
    const onChange = () => {
      publicJobsCache.invalidate();
      void refresh(true);
    };
    window.addEventListener(ADMIN_DATA_EVENT, onChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { jobs, loading, error, refresh: () => refresh(true) };
}

export function usePublicDemos() {
  const initial = publicDemosCache.peek();
  const [demos, setDemos] = useState<AdminDemo[]>(() => initial ?? []);
  const [loading, setLoading] = useState(() => initial === null);
  const [error, setError] = useState("");

  const refresh = useCallback(async (force = false) => {
    const hadCache = publicDemosCache.peek() !== null;
    try {
      if (!hadCache) setLoading(true);
      const data = await publicDemosCache.get(force);
      setDemos(data);
      setError("");
    } catch (err) {
      if (publicDemosCache.peek() === null) {
        setError(getErrorMessage(err, "Unable to load demos."));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh(false);
    const onChange = () => {
      publicDemosCache.invalidate();
      void refresh(true);
    };
    window.addEventListener(ADMIN_DATA_EVENT, onChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { demos, loading, error, refresh: () => refresh(true) };
}

export function useAdminDemos() {
  const [demos, setDemos] = useState<AdminDemo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!getToken()) {
      setDemos([]);
      setLoading(false);
      setError("");
      return;
    }
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
    window.addEventListener(AUTH_CHANGED_EVENT, onChange);
    return () => {
      window.removeEventListener(ADMIN_DATA_EVENT, onChange);
      window.removeEventListener(AUTH_CHANGED_EVENT, onChange);
    };
  }, [refresh]);

  return { demos, loading, error, refresh };
}

export function usePublicBlogs() {
  const initial = publicBlogsCache.peek();
  const [blogs, setBlogs] = useState<BlogPost[]>(() => initial ?? []);
  const [loading, setLoading] = useState(() => initial === null);
  const [error, setError] = useState("");

  const refresh = useCallback(async (force = false) => {
    const hadCache = publicBlogsCache.peek() !== null;
    try {
      if (!hadCache) setLoading(true);
      const data = await publicBlogsCache.get(force);
      setBlogs(data);
      setError("");
    } catch (err) {
      if (publicBlogsCache.peek() === null) {
        setError(getErrorMessage(err, "Unable to load blogs."));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh(false);
    const onChange = () => {
      publicBlogsCache.invalidate();
      void refresh(true);
    };
    window.addEventListener(ADMIN_DATA_EVENT, onChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { blogs, loading, error, refresh: () => refresh(true) };
}

export function useAdminBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!getToken()) {
      setBlogs([]);
      setLoading(false);
      setError("");
      return;
    }
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
    window.addEventListener(AUTH_CHANGED_EVENT, onChange);
    return () => {
      window.removeEventListener(ADMIN_DATA_EVENT, onChange);
      window.removeEventListener(AUTH_CHANGED_EVENT, onChange);
    };
  }, [refresh]);

  return { blogs, loading, error, refresh };
}

export function usePublicTestimonials() {
  const initial = publicTestimonialsCache.peek();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => initial ?? []);
  const [loading, setLoading] = useState(() => initial === null);
  const [error, setError] = useState("");

  const refresh = useCallback(async (force = false) => {
    const cached = publicTestimonialsCache.peek();
    try {
      if (cached === null) setLoading(true);
      const data = await publicTestimonialsCache.get(force);
      setTestimonials(data);
      setError("");
    } catch (err) {
      if (publicTestimonialsCache.peek() === null) {
        setError(getErrorMessage(err, "Unable to load testimonials."));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh(false);
    const onChange = () => {
      publicTestimonialsCache.invalidate();
      void refresh(true);
    };
    window.addEventListener(ADMIN_DATA_EVENT, onChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { testimonials, loading, error, refresh: () => refresh(true) };
}

export function useAdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!getToken()) {
      setTestimonials([]);
      setLoading(false);
      setError("");
      return;
    }
    try {
      setLoading(true);
      const data = await fetchAdminTestimonials();
      setTestimonials(data);
      setError("");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load testimonials."));
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
    window.addEventListener(AUTH_CHANGED_EVENT, onChange);
    return () => {
      window.removeEventListener(ADMIN_DATA_EVENT, onChange);
      window.removeEventListener(AUTH_CHANGED_EVENT, onChange);
    };
  }, [refresh]);

  return { testimonials, loading, error, refresh };
}

export function useDemoTags() {
  const initial = publicDemoTagsCache.peek();
  const [tags, setTags] = useState<string[]>(() => initial ?? [...INDUSTRY_TAGS]);
  const [loading, setLoading] = useState(() => initial === null);
  const [error, setError] = useState("");

  const refresh = useCallback(async (force = false) => {
    const hadCache = publicDemoTagsCache.peek() !== null;
    try {
      if (!hadCache) setLoading(true);
      const data = await publicDemoTagsCache.get(force);
      setTags(data);
      setError("");
    } catch (err) {
      if (publicDemoTagsCache.peek() === null) {
        setTags([...INDUSTRY_TAGS]);
        setError(getErrorMessage(err, "Unable to load tags."));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh(false);
    const onChange = () => {
      publicDemoTagsCache.invalidate();
      void refresh(true);
    };
    window.addEventListener(ADMIN_DATA_EVENT, onChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { tags, loading, error, refresh: () => refresh(true) };
}

export function useAdminDemoTags() {
  const [tags, setTags] = useState<DemoTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDemoTags();
      setTags(data);
      setError("");
    } catch (err) {
      setTags([]);
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

export function useAdminJobs() {
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!getToken()) {
      setJobs([]);
      setLoading(false);
      setError("");
      return;
    }
    try {
      setLoading(true);
      const data = await fetchAdminJobs();
      setJobs(data);
      setError("");
    } catch (err) {
      setJobs([]);
      setError(getErrorMessage(err, "Unable to load jobs."));
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
    window.addEventListener(AUTH_CHANGED_EVENT, onChange);
    return () => {
      window.removeEventListener(ADMIN_DATA_EVENT, onChange);
      window.removeEventListener(AUTH_CHANGED_EVENT, onChange);
    };
  }, [refresh]);

  return { jobs, loading, error, refresh };
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
