import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import {
  createDocumentCoverSvg,
  getDemoDocumentKindFromFile,
} from "../utils/demoMedia.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsCvDir = path.join(__dirname, "../uploads/cvs");
export const uploadsBlogDir = path.join(__dirname, "../uploads/blogs");
export const uploadsTestimonialDir = path.join(__dirname, "../uploads/testimonials");
export const uploadsDemoDir = path.join(__dirname, "../uploads/demos");
const demoUploadTmpDir = path.join(uploadsDemoDir, ".tmp");

/** Max demo video / multipart file size (supports high-quality uploads). */
export const DEMO_VIDEO_MAX_BYTES = 500 * 1024 * 1024;


for (const dir of [
  uploadsCvDir,
  uploadsBlogDir,
  uploadsTestimonialDir,
  uploadsDemoDir,
  demoUploadTmpDir,
]) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (error) {
    console.warn(`Unable to create upload dir ${dir}:`, error?.message || error);
  }
}

async function cleanupTempUpload(file) {
  if (!file?.path) return;
  try {
    await fs.promises.unlink(file.path);
  } catch {
    // ignore missing/already-removed temp files
  }
}

/** Remove unused multer temp files (e.g. validation failed before Cloudinary store). */
export async function cleanupDemoTempFiles(req) {
  const bag = req?.files;
  if (!bag || typeof bag !== "object") return;

  const files = Object.values(bag).flatMap((entry) =>
    Array.isArray(entry) ? entry : entry ? [entry] : [],
  );
  await Promise.all(files.map((file) => cleanupTempUpload(file)));
}

function hasUploadPayload(file) {
  return Boolean(file?.buffer?.length || file?.path);
}

const cvFileFilter = (_req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
};

const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  "image/bmp",
  "image/x-ms-bmp",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "image/heic",
  "image/heif",
]);

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "svg",
  "avif",
  "bmp",
  "ico",
  "heic",
  "heif",
]);

function getFileExtension(originalName = "") {
  const parts = String(originalName).toLowerCase().split(".");
  return parts.length > 1 ? parts.at(-1) : "";
}

const imageFileFilter = (_req, file, cb) => {
  const mime = String(file.mimetype || "").toLowerCase();
  const ext = getFileExtension(file.originalname);

  // Accept any browser image MIME, plus SVG/common formats when MIME is empty/octet-stream.
  const mimeOk =
    mime.startsWith("image/") ||
    ALLOWED_IMAGE_MIME_TYPES.has(mime) ||
    mime === "" ||
    mime === "application/octet-stream";
  const extOk = !ext || ALLOWED_IMAGE_EXTENSIONS.has(ext) || mime.startsWith("image/");

  if (mimeOk && extOk) {
    cb(null, true);
    return;
  }

  cb(new Error("Only image files are allowed (JPG, PNG, WEBP, GIF, SVG, and similar browser formats)"));
};

export const uploadCv = multer({
  storage: multer.memoryStorage(),
  fileFilter: cvFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadBlogImage = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadTestimonialImages = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/** Parses multipart FormData for demos (fields + optional thumbnail/video).
 * Disk storage so large HD videos don't blow Node heap; Cloudinary uses chunked upload from path.
 */
export const uploadDemoFields = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, demoUploadTmpDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || "").slice(0, 16);
      cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    const field = String(file.fieldname || "");
    if (field === "video") {
      const mime = String(file.mimetype || "").toLowerCase();
      const ext = getFileExtension(file.originalname);
      const videoExts = ["mp4", "webm", "mov", "m4v", "ogg"];
      const documentExts = ["pdf", "ppt", "pptx", "doc", "docx"];
      const documentMimes = [
        "application/pdf",
        "application/msword",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const isDocument =
        documentExts.includes(ext) || documentMimes.includes(mime);
      const isVideo =
        mime.startsWith("video/") ||
        videoExts.includes(ext) ||
        ((mime === "" || mime === "application/octet-stream") &&
          (!ext || videoExts.includes(ext)));
      if (isDocument || isVideo) {
        cb(null, true);
        return;
      }
      cb(
        new Error(
          "Only video (MP4, WEBM, MOV) or document (PPTX, PDF, DOCX) files are allowed.",
        ),
      );
      return;
    }

    imageFileFilter(_req, file, cb);
  },
  limits: {
    fileSize: DEMO_VIDEO_MAX_BYTES,
  },
});

function safeBaseName(originalName) {
  return originalName
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 80);
}

function getExtension(originalName, mimetype) {
  const fromName = originalName.includes(".")
    ? originalName.slice(originalName.lastIndexOf(".") + 1).toLowerCase()
    : "";
  if (fromName) return fromName;
  if (mimetype === "application/pdf") return "pdf";
  if (mimetype === "application/msword") return "doc";
  if (mimetype === "application/vnd.ms-powerpoint") return "ppt";
  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return "pptx";
  }
  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "docx";
  }
  if (mimetype === "image/png") return "png";
  if (mimetype === "image/webp") return "webp";
  if (mimetype === "image/gif") return "gif";
  if (mimetype === "image/svg+xml") return "svg";
  if (mimetype === "image/avif") return "avif";
  if (mimetype === "image/bmp" || mimetype === "image/x-ms-bmp") return "bmp";
  if (mimetype === "image/x-icon" || mimetype === "image/vnd.microsoft.icon") return "ico";
  if (mimetype === "image/jpeg" || mimetype === "image/jpg" || mimetype === "image/pjpeg") {
    return "jpg";
  }
  return "docx";
}



async function saveCvLocally(file) {
  const ext = getExtension(file.originalname, file.mimetype);
  const storedName = `${Date.now()}-${safeBaseName(file.originalname)}.${ext}`;
  const fullPath = path.join(uploadsCvDir, storedName);
  await fs.promises.writeFile(fullPath, file.buffer);
  return storedName;
}

async function saveBlogImageLocally(file) {
  const ext = getExtension(file.originalname, file.mimetype);
  const storedName = `${Date.now()}-${safeBaseName(file.originalname)}.${ext}`;
  const fullPath = path.join(uploadsBlogDir, storedName);
  await fs.promises.writeFile(fullPath, file.buffer);
  return storedName;
}

async function saveTestimonialImageLocally(file) {
  const ext = getExtension(file.originalname, file.mimetype);
  const storedName = `${Date.now()}-${safeBaseName(file.originalname)}.${ext}`;
  const fullPath = path.join(uploadsTestimonialDir, storedName);
  await fs.promises.writeFile(fullPath, file.buffer);
  return storedName;
}

async function saveDemoFileLocally(file) {
  const ext = getExtension(file.originalname, file.mimetype) || "mp4";
  const storedName = `${Date.now()}-${safeBaseName(file.originalname)}.${ext}`;
  const fullPath = path.join(uploadsDemoDir, storedName);
  if (file.path) {
    await fs.promises.copyFile(file.path, fullPath);
  } else {
    await fs.promises.writeFile(fullPath, file.buffer);
  }
  return storedName;
}

function buildPublicUrl(_req, folder, storedName) {
  const configured = (process.env.PUBLIC_API_URL || "").trim().replace(/\/$/, "");
  if (configured && !/localhost|127\.0\.0\.1/i.test(configured)) {
    return `${configured}/uploads/${folder}/${storedName}`;
  }
  return `/uploads/${folder}/${storedName}`;
}

/** Store resume locally on server */
export async function storeCvFile(file, req) {
  if (!file?.buffer) {
    throw new Error("Resume file is required.");
  }

  const storedName = await saveCvLocally(file);
  return {
    cvFilename: file.originalname,
    cvUrl: buildPublicUrl(req, "cvs", storedName),
    cvPath: storedName,
    storage: "local",
  };
}

/** Store blog cover image locally on server */
export async function storeBlogImage(file, req) {
  if (!file?.buffer) {
    throw new Error("Blog image is required.");
  }

  const storedName = await saveBlogImageLocally(file);
  return {
    imageUrl: buildPublicUrl(req, "blogs", storedName),
    imagePath: storedName,
    storage: "local",
  };
}

/** Store testimonial logo/profile image locally on server */
export async function storeTestimonialImage(file, req, kind = "profile") {
  if (!file?.buffer) {
    throw new Error(`Testimonial ${kind} image is required.`);
  }

  const storedName = await saveTestimonialImageLocally(file);
  return {
    imageUrl: buildPublicUrl(req, "testimonials", storedName),
    imagePath: storedName,
    storage: "local",
  };
}

/** Store demo thumbnail image locally on server */
export async function storeDemoThumbnail(file, req) {
  if (!hasUploadPayload(file)) {
    throw new Error("Demo thumbnail image is required.");
  }

  try {
    const storedName = await saveDemoFileLocally(file);
    return {
      imageUrl: buildPublicUrl(req, "demos", storedName),
      imagePath: storedName,
      storage: "local",
    };
  } finally {
    await cleanupTempUpload(file);
  }
}

/** Store demo video or document file locally on server */
export async function storeDemoVideo(file, req) {
  if (!hasUploadPayload(file)) {
    throw new Error("Demo video file is required.");
  }

  try {
    const storedName = await saveDemoFileLocally(file);
    return {
      videoUrl: buildPublicUrl(req, "demos", storedName),
      videoPath: storedName,
      storage: "local",
    };
  } finally {
    await cleanupTempUpload(file);
  }
}

export async function storeGeneratedDocumentCover(kind, req) {
  const svg = createDocumentCoverSvg(kind);
  const file = {
    originalname: `cover-${String(kind).toLowerCase()}.svg`,
    mimetype: "image/svg+xml",
    buffer: Buffer.from(svg),
  };
  return storeDemoThumbnail(file, req);
}

