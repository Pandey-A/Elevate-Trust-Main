import type { AdminDemo } from "../data/adminDefaults";

export type DemoDocumentKind = "PPT" | "PDF" | "DOCX";

export const DEMO_MEDIA_ACCEPT =
  "video/mp4,video/webm,video/quicktime,video/*,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.mp4,.webm,.mov,.pdf,.ppt,.pptx,.doc,.docx";

function extensionFrom(value: string) {
  const clean = String(value || "").split("?")[0].split("#")[0].toLowerCase();
  const slash = clean.lastIndexOf("/");
  const name = slash >= 0 ? clean.slice(slash + 1) : clean;
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1) : "";
}

export function getDemoDocumentKind(
  nameOrUrl = "",
  mime = "",
): DemoDocumentKind | null {
  const ext = extensionFrom(nameOrUrl);
  const type = String(mime || "").toLowerCase();

  if (ext === "pdf" || type === "application/pdf") return "PDF";
  if (
    ext === "ppt" ||
    ext === "pptx" ||
    type.includes("powerpoint") ||
    type.includes("presentationml")
  ) {
    return "PPT";
  }
  if (
    ext === "doc" ||
    ext === "docx" ||
    type === "application/msword" ||
    type.includes("wordprocessingml")
  ) {
    return "DOCX";
  }
  return null;
}

export function getDemoDocumentKindFromFile(file: File | null | undefined) {
  if (!file) return null;
  return getDemoDocumentKind(file.name, file.type);
}

export function isDemoDocumentDemo(
  demo: Pick<AdminDemo, "videoUrl"> | null | undefined,
) {
  return Boolean(demo?.videoUrl && getDemoDocumentKind(demo.videoUrl));
}

export function openDemoDocument(
  _demo: Pick<AdminDemo, "videoUrl" | "title"> | null | undefined,
) {
  // Downloads / raw file opens are disabled for demos.
  return false;
}

export async function createDocumentCoverFile(kind: DemoDocumentKind) {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to create document cover.");
  }

  ctx.fillStyle = "#DC2626";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 168px Arial, Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(kind, canvas.width / 2, canvas.height / 2 + 8);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("Cover export failed."))),
      "image/png",
    );
  });

  return new File([blob], `cover-${kind.toLowerCase()}.png`, { type: "image/png" });
}
