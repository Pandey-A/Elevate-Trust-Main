export function getDemoDocumentKind(nameOrUrl = "", mime = "") {
  const clean = String(nameOrUrl || "")
    .split("?")[0]
    .split("#")[0]
    .toLowerCase();
  const slash = clean.lastIndexOf("/");
  const name = slash >= 0 ? clean.slice(slash + 1) : clean;
  const dot = name.lastIndexOf(".");
  const ext = dot >= 0 ? name.slice(dot + 1) : "";
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

export function getDemoDocumentKindFromFile(file) {
  if (!file) return null;
  return getDemoDocumentKind(file.originalname || file.filename || "", file.mimetype);
}

export function createDocumentCoverSvg(kind) {
  const label = String(kind || "FILE");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#DC2626"/>
  <text x="640" y="400" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="168" font-weight="700" fill="#FFFFFF">${label}</text>
</svg>`;
}
