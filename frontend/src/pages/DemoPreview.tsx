import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Copy, ExternalLink } from "lucide-react";
import DemoVideoPlayer from "../components/DemoVideoPlayer";
import elevateLogo from "../assets/nav/elevate-logo.svg";
import { fetchDemoById, getDemoStreamUrl, slugifyDemoTitle } from "../lib/demosApi";
import type { AdminDemo } from "../data/adminDefaults";

export default function DemoPreview() {
  const { id, slug } = useParams<{ id: string; slug?: string }>();
  const navigate = useNavigate();
  const [demo, setDemo] = useState<AdminDemo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("No demo ID provided.");
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchDemoById(id)
      .then((data) => {
        if (!isMounted) return;
        setDemo(data);
        const expectedSlug = slugifyDemoTitle(data.title);
        // Ensure the URL always has the friendly title slug
        if (!slug || slug !== expectedSlug) {
          navigate(`/demo/preview/${encodeURIComponent(data.id)}/${expectedSlug}`, {
            replace: true,
          });
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Unable to load demo.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, slug, navigate]);

  useEffect(() => {
    if (demo?.title) {
      document.title = `${demo.title} | Elevate Trust`;
    } else {
      document.title = "Demo Preview | Elevate Trust";
    }
  }, [demo?.title]);

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore clipboard error
    }
  };

  const streamUrl = demo ? getDemoStreamUrl(demo) : "";

  return (
    <div className="flex min-h-screen flex-col bg-[#06090e] text-slate-100 selection:bg-[#2365aa]/40">
      {/* Top Header */}
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#090e17]/90 px-4 backdrop-blur-md sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link
            to="/resources/demo"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            title="Back to all demos"
            aria-label="Back to all demos"
          >
            <ArrowLeft size={18} />
          </Link>

          <Link to="/" className="flex shrink-0 items-center gap-2">
            <img src={elevateLogo} alt="Elevate Trust" className="h-6 w-auto sm:h-7" />
          </Link>

          <div className="hidden h-5 w-px bg-white/10 sm:block" />

          {demo ? (
            <div className="min-w-0">
              <h1 className="m-0 truncate text-sm font-semibold text-white sm:text-base">
                {demo.title}
              </h1>
              {demo.industries?.length > 0 ? (
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="text-[11px] font-medium text-slate-400">
                    {demo.industries.join(" • ")}
                  </span>
                </div>
              ) : null}
            </div>
          ) : (
            <span className="text-sm font-medium text-slate-400">Loading Demo…</span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {streamUrl && demo?.videoUrl ? (
            <a
              href={streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white md:inline-flex"
              title="Open raw direct media stream"
            >
              <ExternalLink size={14} />
              <span>Direct Stream</span>
            </a>
          ) : null}

          <button
            type="button"
            onClick={copyShareLink}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#2365aa]/40 bg-[#2365aa]/15 px-3 py-1.5 text-xs font-medium text-[#7bb8f5] transition-colors hover:bg-[#2365aa]/25 hover:text-white"
            title="Copy preview link"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? "Link Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </header>

      {/* Main Preview Player Area */}
      <main className="relative flex flex-1 items-center justify-center p-3 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <span className="size-10 animate-spin rounded-full border-2 border-white/15 border-t-[#2365aa]" />
            <p className="m-0 text-sm font-medium text-slate-400">Loading preview…</p>
          </div>
        ) : error ? (
          <div className="max-w-md rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6 text-center">
            <h2 className="m-0 text-base font-semibold text-rose-300">Demo Not Found</h2>
            <p className="mt-2 text-sm text-slate-400">{error}</p>
            <Link
              to="/resources/demo"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2365aa] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <ArrowLeft size={14} />
              <span>Browse All Demos</span>
            </Link>
          </div>
        ) : demo ? (
          <div className="relative mx-auto flex h-[78vh] w-full max-w-[1240px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl shadow-black/80">
            <DemoVideoPlayer
              title={demo.title}
              videoUrl={demo.videoUrl}
              videoId={demo.videoId}
              poster={demo.thumbnailUrl}
            />
          </div>
        ) : null}
      </main>

      {/* Footer Info */}
      <footer className="border-t border-white/5 bg-[#04060a] px-4 py-3 text-center text-xs text-slate-500">
        <p className="m-0">
          Elevate Trust Demo Platform •{" "}
          <Link to="/" className="text-slate-400 hover:text-white hover:underline">
            elevatetrust.co.in
          </Link>
        </p>
      </footer>
    </div>
  );
}
