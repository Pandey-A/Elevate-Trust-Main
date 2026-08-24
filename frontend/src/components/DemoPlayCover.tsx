import { Play } from "lucide-react";
import type { AdminDemo } from "../data/adminDefaults";
import { getDemoDocumentKind, isDemoDocumentDemo } from "../lib/demoMedia";
import { getDemoTitleImage, hasDemoTitleImage } from "../lib/demoThumbnails";
import { getOptimizedImageUrl } from "../lib/optimizeImageUrl";

type DemoPlayCoverProps = {
  demo: AdminDemo;
  onPlay?: () => void;
  className?: string;
  aspectClassName?: string;
  /** Show demo title on the image (top) */
  showTitle?: boolean;
  asButton?: boolean;
  compact?: boolean;
};

export default function DemoPlayCover({
  demo,
  onPlay,
  className = "",
  aspectClassName = "aspect-video",
  showTitle = true,
  asButton = true,
  compact = false,
}: DemoPlayCoverProps) {
  const documentKind = getDemoDocumentKind(demo.videoUrl || "");
  const isDocument = Boolean(documentKind);
  const src = getOptimizedImageUrl(getDemoTitleImage(demo), {
    width: 960,
    height: 540,
    crop: "fill",
  });
  const branded = hasDemoTitleImage(demo) || isDocument;

  const content = (
    <>
      {demo.thumbnailUrl || !isDocument ? (
        <img
          src={src || undefined}
          alt={demo.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#DC2626] transition duration-500 ease-out group-hover:scale-[1.03]">
          <span className="text-[clamp(28px,4vw,56px)] font-bold tracking-wide text-white">
            {documentKind}
          </span>
        </div>
      )}

      {/* Top title bar — always readable */}
      {showTitle ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] bg-gradient-to-b from-[#06101f]/90 via-[#06101f]/55 to-transparent px-3 pb-8 pt-2.5 sm:px-3.5 sm:pt-3">
          <span
            className={`block truncate font-semibold tracking-wide text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] ${
              compact ? "text-[12px] sm:text-[13px]" : "text-sm sm:text-[15px]"
            }`}
          >
            {demo.title}
          </span>
        </div>
      ) : null}

      {/* Center play — only when falling back to YouTube frame (branded cards already include it) */}
      {!branded ? (
        <span className="absolute inset-0 z-10 flex items-center justify-center">
          <span className="relative inline-flex items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-black/25 [animation-duration:2s]" />
            <span
              className={`relative inline-flex items-center justify-center rounded-full border border-white/40 bg-black/70 text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.7)] transition duration-300 group-hover:scale-110 group-hover:bg-black/80 ${
                compact ? "size-12" : "size-14 sm:size-16"
              }`}
            >
              <Play
                size={compact ? 18 : 22}
                fill="currentColor"
                className="ml-0.5"
              />
            </span>
          </span>
        </span>
      ) : null}
    </>
  );

  const sharedClassName = `group relative isolate block w-full overflow-hidden bg-[#0d1117] ${aspectClassName} ${className}`;

  if (asButton) {
    return (
      <button
        type="button"
        onClick={() => onPlay?.()}
        className={`${sharedClassName} cursor-pointer border-0 p-0 text-left`}
        aria-label={isDemoDocumentDemo(demo) ? `Open ${demo.title}` : `Play ${demo.title}`}
      >
        {content}
      </button>
    );
  }

  return <div className={sharedClassName}>{content}</div>;
}
