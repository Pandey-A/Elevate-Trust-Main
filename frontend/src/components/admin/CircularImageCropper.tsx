import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";

type CircularImageCropperProps = {
  imageSrc: string;
  fileName?: string;
  open: boolean;
  onCancel: () => void;
  onComplete: (file: File, previewUrl: string) => void;
};

const OUTPUT_SIZE = 512;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

function distanceBetween(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export default function CircularImageCropper({
  imageSrc,
  fileName = "profile.jpg",
  open,
  onCancel,
  onComplete,
}: CircularImageCropperProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchRef = useRef<{ startDistance: number; startZoom: number } | null>(
    null,
  );
  const dragRef = useRef<{
    x: number;
    y: number;
    ox: number;
    oy: number;
  } | null>(null);
  const zoomRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [viewport, setViewport] = useState(280);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    if (!open) return;
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    zoomRef.current = 1;
    offsetRef.current = { x: 0, y: 0 };
    pointersRef.current.clear();
    pinchRef.current = null;
    dragRef.current = null;
    setBusy(false);
  }, [open, imageSrc]);

  useEffect(() => {
    if (!open) return;
    const measure = () => {
      const width = viewportRef.current?.clientWidth ?? 280;
      setViewport(Math.max(220, Math.min(width, 360)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  const onImageLoad = () => {
    const img = imageRef.current;
    if (!img) return;
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
  };

  const coverScale =
    natural.w > 0 && natural.h > 0
      ? Math.max(viewport / natural.w, viewport / natural.h)
      : 1;
  const displayW = natural.w * coverScale * zoom;
  const displayH = natural.h * coverScale * zoom;

  const clampOffset = useCallback(
    (x: number, y: number, nextZoom: number) => {
      const nextCover =
        natural.w > 0 && natural.h > 0
          ? Math.max(viewport / natural.w, viewport / natural.h)
          : 1;
      const w = natural.w * nextCover * nextZoom;
      const h = natural.h * nextCover * nextZoom;
      const maxX = Math.max(0, (w - viewport) / 2);
      const maxY = Math.max(0, (h - viewport) / 2);
      return {
        x: Math.min(maxX, Math.max(-maxX, x)),
        y: Math.min(maxY, Math.max(-maxY, y)),
      };
    },
    [natural.h, natural.w, viewport],
  );

  const applyZoom = useCallback(
    (nextZoom: number) => {
      const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));
      const nextOffset = clampOffset(
        offsetRef.current.x,
        offsetRef.current.y,
        clamped,
      );
      zoomRef.current = clamped;
      offsetRef.current = nextOffset;
      setZoom(clamped);
      setOffset(nextOffset);
    },
    [clampOffset],
  );

  // Block browser page-zoom only when the gesture is on the crop circle.
  // Outside the circle, normal website pinch/scroll zoom stays enabled.
  useLayoutEffect(() => {
    if (!open) return;
    const el = viewportRef.current;
    if (!el) return;

    const isOnCircle = (target: EventTarget | null) =>
      target instanceof Node && el.contains(target);

    const touchHitsCircle = (event: TouchEvent) => {
      if (isOnCircle(event.target)) return true;
      for (let i = 0; i < event.touches.length; i += 1) {
        const touch = event.touches.item(i);
        if (!touch) continue;
        const hit = document.elementFromPoint(touch.clientX, touch.clientY);
        if (hit && el.contains(hit)) return true;
      }
      return false;
    };

    const stopBrowserZoom = (event: Event) => {
      if (isOnCircle(event.target) || pointersRef.current.size > 0) {
        event.preventDefault();
      }
    };

    const onWheelNative = (event: WheelEvent) => {
      if (!isOnCircle(event.target) && pointersRef.current.size === 0) return;
      event.preventDefault();
      const delta = event.deltaY > 0 ? -0.08 : 0.08;
      applyZoom(zoomRef.current + delta);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!touchHitsCircle(event) && pointersRef.current.size === 0) return;
      event.preventDefault();
    };

    // Capture on document so Safari/Chrome can't page-zoom during circle pinch.
    document.addEventListener("wheel", onWheelNative, {
      passive: false,
      capture: true,
    });
    document.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });
    document.addEventListener("gesturestart", stopBrowserZoom, {
      passive: false,
      capture: true,
    });
    document.addEventListener("gesturechange", stopBrowserZoom, {
      passive: false,
      capture: true,
    });
    document.addEventListener("gestureend", stopBrowserZoom, {
      passive: false,
      capture: true,
    });

    return () => {
      document.removeEventListener("wheel", onWheelNative, true);
      document.removeEventListener("touchmove", onTouchMove, true);
      document.removeEventListener("gesturestart", stopBrowserZoom, true);
      document.removeEventListener("gesturechange", stopBrowserZoom, true);
      document.removeEventListener("gestureend", stopBrowserZoom, true);
    };
  }, [open, applyZoom]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    const points = [...pointersRef.current.values()];
    if (points.length >= 2) {
      dragRef.current = null;
      pinchRef.current = {
        startDistance: distanceBetween(points[0], points[1]),
        startZoom: zoomRef.current,
      };
      return;
    }

    pinchRef.current = null;
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      ox: offsetRef.current.x,
      oy: offsetRef.current.y,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    const points = [...pointersRef.current.values()];
    if (points.length >= 2 && pinchRef.current) {
      const currentDistance = distanceBetween(points[0], points[1]);
      if (pinchRef.current.startDistance > 0) {
        const ratio = currentDistance / pinchRef.current.startDistance;
        applyZoom(pinchRef.current.startZoom * ratio);
      }
      return;
    }

    if (!dragRef.current || points.length !== 1) return;
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    const nextOffset = clampOffset(
      dragRef.current.ox + dx,
      dragRef.current.oy + dy,
      zoomRef.current,
    );
    offsetRef.current = nextOffset;
    setOffset(nextOffset);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointersRef.current.has(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pointersRef.current.delete(event.pointerId);

    const points = [...pointersRef.current.values()];
    if (points.length >= 2) {
      pinchRef.current = {
        startDistance: distanceBetween(points[0], points[1]),
        startZoom: zoomRef.current,
      };
      dragRef.current = null;
      return;
    }

    pinchRef.current = null;
    if (points.length === 1) {
      dragRef.current = {
        x: points[0].x,
        y: points[0].y,
        ox: offsetRef.current.x,
        oy: offsetRef.current.y,
      };
      return;
    }

    dragRef.current = null;
  };

  const applyCrop = async () => {
    if (!natural.w || !natural.h) return;
    setBusy(true);
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Unable to load image for crop."));
        img.src = imageSrc;
      });

      const canvas = document.createElement("canvas");
      canvas.width = OUTPUT_SIZE;
      canvas.height = OUTPUT_SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable.");

      const scale = OUTPUT_SIZE / viewport;
      const drawW = displayW * scale;
      const drawH = displayH * scale;
      const dx = OUTPUT_SIZE / 2 + offset.x * scale - drawW / 2;
      const dy = OUTPUT_SIZE / 2 + offset.y * scale - drawH / 2;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
      ctx.drawImage(img, dx, dy, drawW, drawH);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) resolve(result);
            else reject(new Error("Unable to export cropped image."));
          },
          "image/jpeg",
          0.92,
        );
      });

      const base = fileName.replace(/\.[^.]+$/, "") || "profile";
      const file = new File([blob], `${base}-cropped.jpg`, {
        type: "image/jpeg",
      });
      const previewUrl = URL.createObjectURL(blob);
      onComplete(file, previewUrl);
    } catch {
      setBusy(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center bg-[#0b1220]/72 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Adjust profile photo"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[420px] rounded-[20px] border border-[#d7e6f3] bg-white p-5 shadow-[0_24px_60px_-24px_rgba(17,61,119,0.55)] sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="m-0 text-lg font-bold text-[#1F2432]">
              Adjust profile photo
            </h3>
            <p className="mt-1 text-sm text-[#848b9b]">
              Drag to move. Pinch with two fingers (or scroll on desktop) to zoom
              in or out — like Instagram.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#d7e6f3] bg-[#f8fbfd] text-[#272935]"
            aria-label="Close cropper"
          >
            <X size={18} />
          </button>
        </div>

        <div
          ref={viewportRef}
          className="relative mx-auto mt-5 aspect-square w-full max-w-[320px] touch-none overflow-hidden rounded-full border-[3px] border-[#2365aa] bg-[#eef3f8] shadow-[inset_0_0_0_9999px_rgba(17,61,119,0.08)]"
          style={{ touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <img
            ref={imageRef}
            src={imageSrc}
            alt=""
            draggable={false}
            onLoad={onImageLoad}
            className="absolute left-1/2 top-1/2 max-w-none select-none"
            style={{
              width: displayW || "auto",
              height: displayH || "auto",
              transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
            }}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-[#d7e6f3] bg-[#f8fbfd] px-4 py-2.5 text-sm font-semibold text-[#2365aa]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={busy || !natural.w}
            onClick={() => void applyCrop()}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-0 bg-[#2365aa] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Check size={16} />
            {busy ? "Saving..." : "Use this crop"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}


