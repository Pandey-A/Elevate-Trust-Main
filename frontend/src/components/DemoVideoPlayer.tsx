import { getOptimizedDemoVideoUrl } from "../lib/demoVideoUrl";

type Props = {
  title: string;
  videoUrl?: string | null;
  videoId?: string | null;
  poster?: string | null;
};

function youtubeEmbed(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/** Prefer Cloudinary/native video; temporary YouTube iframe fallback. */
export default function DemoVideoPlayer({ title, videoUrl, videoId, poster }: Props) {
  if (videoUrl) {
    const playbackUrl = getOptimizedDemoVideoUrl(videoUrl);
    return (
      <video
        key={playbackUrl}
        className="absolute inset-0 h-full w-full bg-black object-contain"
        src={playbackUrl}
        poster={poster || undefined}
        controls
        autoPlay
        playsInline
        preload="metadata"
        controlsList="nodownload"
      >
        Your browser does not support HTML5 video.
      </video>
    );
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
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black px-6 text-center text-sm text-white/80">
      No playable video found for this demo.
    </div>
  );
}
