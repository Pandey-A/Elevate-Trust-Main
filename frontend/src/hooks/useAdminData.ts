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
import type { Testimonial } from "../lib/testimonialsApi";
import { fetchAdminTestimonials, fetchPublicTestimonials } from "../lib/testimonialsApi";
import { fetchDemoTags, type DemoTag } from "../lib/tagsApi";
import { INDUSTRY_TAGS } from "../data/adminDefaults";

/** Keep list pages snappy when navigating away and back. */
const PUBLIC_CACHE_TTL_MS = 60_000;

type ResourceCache<T> = {
  peek: () => T | null;
  isFresh: () => boolean;
  invalidate: () => void;
  get: (force?: boolean) => Promise<T>;
};

function createResourceCache<T>(fetcher: () => Promise<T>): ResourceCache<T> {
  let data: T | null = null;
  let fetchedAt = 0;
  let inflight: Promise<T> | null = null;

  return {
    peek: () => data,
    isFresh: () => data !== null && Date.now() - fetchedAt < PUBLIC_CACHE_TTL_MS,
    invalidate: () => {
      fetchedAt = 0;
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
          return result;
        })
        .finally(() => {
          inflight = null;
        });

      return inflight;
    },
  };
}

const publicDemosCache = createResourceCache(fetchPublicDemos);
const publicBlogsCache = createResourceCache(fetchPublicBlogs);
const publicDemoTagsCache = createResourceCache(async () => {
  const data = await fetchDemoTags();
  const names = data.map((tag: DemoTag) => tag.name).filter(Boolean);
  return names.length > 0 ? names : [...INDUSTRY_TAGS];
});

/** Warm cache before the user lands on Demo/Blog (e.g. nav hover). */
export function prefetchPublicDemos() {
  return publicDemosCache.get(false);
}

export function prefetchPublicBlogs() {
  return publicBlogsCache.get(false);
}

export function prefetchDemoTags() {
  return publicDemoTagsCache.get(false);
}

export function prefetchDemoPage() {
  return Promise.all([prefetchPublicDemos(), prefetchDemoTags()]);
}

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

export function usePublicTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPublicTestimonials();
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
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
  }, [refresh]);

  return { testimonials, loading, error, refresh };
}

export function useAdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
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
    return () => window.removeEventListener(ADMIN_DATA_EVENT, onChange);
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
