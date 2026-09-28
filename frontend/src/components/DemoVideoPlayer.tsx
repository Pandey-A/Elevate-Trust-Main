import { useEffect, useRef, useState, type MouseEvent } from "react";
import { getDemoDocumentKind, type DemoDocumentKind } from "../lib/demoMedia";
import { getOptimizedDemoVideoUrl } from "../lib/demoVideoUrl";

type Props = {
  title: string;
  videoUrl?: string | null;
  videoId?: string | null;
  poster?: string | null;
  /** Website-only: block clicks/links inside PDF/PPT/DOCX embeds. */
  blockDocumentClicks?: boolean;
};

function youtubeEmbed(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
    params.set("widget_referrer", window.location.origin);
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

/** Prefer embedded viewers over raw file URLs so the browser download UI is reduced. */
function getDocumentViewerUrl(videoUrl: string, kind: DemoDocumentKind) {
  if (kind === "PDF") {
    const base = videoUrl.split("#")[0];
    return `${base}#toolbar=0&navpanes=0`;
  }
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(videoUrl)}`;
}

function blockContextMenu(event: MouseEvent) {
  event.preventDefault();
}

/**
 * Office Online shows a Word/PowerPoint splash logo while loading.
 * Keep a solid cover until the iframe has loaded + a short settle delay.
 */
function DocumentViewer({
  title,
  videoUrl,
  documentKind,
  blockDocumentClicks = false,
}: {
  title: string;
  videoUrl: string;
  documentKind: DemoDocumentKind;
  blockDocumentClicks?: boolean;
}) {
  const viewerUrl = getDocumentViewerUrl(videoUrl, documentKind);
  const isOfficeDoc = documentKind === "PPT" || documentKind === "DOCX";
  const [coverVisible, setCoverVisible] = useState(true);
  const revealTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setCoverVisible(true);
    return () => {
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
        revealTimerRef.current = null;
      }
    };
  }, [viewerUrl]);

  const reveal = () => {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
    }
    // Office splash (Word/PPT logo) often stays after iframe onLoad.
    revealTimerRef.current = window.setTimeout(
      () => setCoverVisible(false),
      isOfficeDoc ? 1800 : 400,
    );
  };

  // Website: no full-screen click overlay — it blocks wheel/touch scroll inside
  // cross-origin PDF/Office iframes. Sandbox (no allow-popups / top-nav) still
  // limits outbound link behavior.
  const sandboxed = isOfficeDoc && blockDocumentClicks;

  return (
    <div
      className="absolute inset-0 flex flex-col bg-white"
      onContextMenu={blockContextMenu}
    >
      <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-white">
        <iframe
          key={viewerUrl}
          src={viewerUrl}
          title={title}
          className={
            isOfficeDoc
              ? "absolute inset-x-0 top-0 h-[calc(100%+52px)] w-full border-0 bg-white"
              : "absolute inset-0 h-full w-full border-0 bg-white"
          }
          allowFullScreen
          onLoad={reveal}
          scrolling="yes"
          {...(sandboxed
            ? {
                sandbox:
                  "allow-scripts allow-same-origin allow-forms allow-presentation",
              }
            : {})}
          referrerPolicy="no-referrer"
        />
        {coverVisible ? (
          <div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-white"
            aria-busy="true"
            aria-label="Loading document"
          >
            <span className="size-8 animate-spin rounded-full border-2 border-[#d7e6f3] border-t-[#2365aa]" />
            <p className="m-0 text-sm font-medium text-[#687181]">Loading document…</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Prefer Cloudinary/native video; temporary YouTube iframe fallback. */
function NativeVideoPlayer({
  videoUrl,
  poster,
}: {
  videoUrl: string;
  poster?: string | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const optimizedUrl = getOptimizedDemoVideoUrl(videoUrl);
  const [playbackUrl, setPlaybackUrl] = useState(optimizedUrl);

  useEffect(() => {
    setPlaybackUrl(getOptimizedDemoVideoUrl(videoUrl));
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Modal opens on user click — try play with sound first.
    void video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => {});
    });
  }, [playbackUrl]);

  return (
    <video
      ref={videoRef}
      key={playbackUrl}
      className="absolute inset-0 h-full w-full bg-black object-contain"
      src={playbackUrl}
      poster={poster || undefined}
      controls
      playsInline
      preload="auto"
      controlsList="nodownload noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      onContextMenu={blockContextMenu}
      onDragStart={(event) => event.preventDefault()}
      onError={() => {
        if (playbackUrl !== videoUrl) {
          setPlaybackUrl(videoUrl);
        }
      }}
    >
      Your browser does not support HTML5 video.
    </video>
  );
}

export default function DemoVideoPlayer({
  title,
  videoUrl,
  videoId,
  poster,
  blockDocumentClicks = false,
}: Props) {
  if (videoUrl) {
    const documentKind = getDemoDocumentKind(videoUrl);
    if (documentKind) {
      return (
        <DocumentViewer
          title={title}
          videoUrl={videoUrl}
          documentKind={documentKind}
          blockDocumentClicks={blockDocumentClicks}
        />
      );
    }

    return <NativeVideoPlayer videoUrl={videoUrl} poster={poster} />;
  }

  if (videoId) {
    return (
      <iframe
        key={videoId}
        src={youtubeEmbed(videoId)}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onContextMenu={blockContextMenu}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black px-6 text-center text-sm text-white/80">
      No playable video found for this demo.
    </div>
  );
}
