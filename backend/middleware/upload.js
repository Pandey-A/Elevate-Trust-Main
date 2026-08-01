import fs from "fs";
import path from "path";
import multer from "multer";
import { Readable } from "stream";
import { fileURLToPath } from "url";
import cloudinary from "../config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsCvDir = path.join(__dirname, "../uploads/cvs");
export const uploadsBlogDir = path.join(__dirname, "../uploads/blogs");
export const uploadsTestimonialDir = path.join(__dirname, "../uploads/testimonials");

if (!fs.existsSync(uploadsCvDir)) {
  fs.mkdirSync(uploadsCvDir, { recursive: true });
}

if (!fs.existsSync(uploadsBlogDir)) {
  fs.mkdirSync(uploadsBlogDir, { recursive: true });
}

if (!fs.existsSync(uploadsTestimonialDir)) {
  fs.mkdirSync(uploadsTestimonialDir, { recursive: true });
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

/** Parses multipart FormData for demos (fields + optional thumbnail). */
export const uploadDemoFields = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
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

function uploadCvToCloudinary(file) {
  if (!file?.buffer) {
    return Promise.resolve(null);
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return Promise.reject(new Error("Cloudinary is not configured"));
  }

  const ext = getExtension(file.originalname, file.mimetype);
  const publicId = `${Date.now()}-${safeBaseName(file.originalname)}.${ext}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "elevate-trust/careers",
        public_id: publicId,
        type: "upload",
        access_mode: "public",
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      },
    );

    Readable.from(file.buffer).pipe(stream);
  });
}

function uploadImageToCloudinary(file, folder = "elevate-trust/blogs") {
  if (!file?.buffer) {
    return Promise.resolve(null);
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return Promise.reject(new Error("Cloudinary is not configured"));
  }

  const publicId = `${Date.now()}-${safeBaseName(file.originalname)}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder,
        public_id: publicId,
        type: "upload",
        access_mode: "public",
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      },
    );

    Readable.from(file.buffer).pipe(stream);
  });
}

async function isPubliclyReadable(url) {
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) return false;
    const bytes = Buffer.from(await response.arrayBuffer());
    return bytes.length > 0;
  } catch {
    return false;
  }
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

function buildPublicUrl(req, folder, storedName) {
  const base =
    process.env.PUBLIC_API_URL ||
    `${req.protocol}://${req.get("host")}` ||
    "http://localhost:5000";
  return `${base.replace(/\/$/, "")}/uploads/${folder}/${storedName}`;
}

/** Prefer Cloudinary only if the file is publicly openable; otherwise use local disk. */
export async function storeCvFile(file, req) {
  if (!file?.buffer) {
    throw new Error("Resume file is required.");
  }

  try {
    const uploaded = await uploadCvToCloudinary(file);
    if (uploaded?.secure_url) {
      const readable = await isPubliclyReadable(uploaded.secure_url);
      if (readable) {
        return {
          cvFilename: file.originalname,
          cvUrl: uploaded.secure_url,
          cvPath: uploaded.public_id || null,
          storage: "cloudinary",
        };
      }

      console.warn(
        "Cloudinary uploaded but URL is not publicly readable (often 401). Using local storage instead.",
        uploaded.secure_url,
      );
    }
  } catch (error) {
    console.warn(
      "Cloudinary upload failed, saving resume locally:",
      error?.message || error,
    );
  }

  const storedName = await saveCvLocally(file);
  return {
    cvFilename: file.originalname,
    cvUrl: buildPublicUrl(req, "cvs", storedName),
    cvPath: storedName,
    storage: "local",
  };
}

/** Blog cover image: Cloudinary with local fallback. */
export async function storeBlogImage(file, req) {
  if (!file?.buffer) {
    throw new Error("Blog image is required.");
  }

  try {
    const uploaded = await uploadImageToCloudinary(file, "elevate-trust/blogs");
    if (uploaded?.secure_url) {
      const readable = await isPubliclyReadable(uploaded.secure_url);
      if (readable) {
        return {
          imageUrl: uploaded.secure_url,
          imagePath: uploaded.public_id || null,
          storage: "cloudinary",
        };
      }

      console.warn(
        "Cloudinary blog image uploaded but URL is not publicly readable. Using local storage instead.",
        uploaded.secure_url,
      );
    }
  } catch (error) {
    console.warn(
      "Cloudinary blog image upload failed, saving locally:",
      error?.message || error,
    );
  }

  const storedName = await saveBlogImageLocally(file);
  return {
    imageUrl: buildPublicUrl(req, "blogs", storedName),
    imagePath: storedName,
    storage: "local",
  };
}

/** Testimonial logo/profile image: Cloudinary with local fallback. */
export async function storeTestimonialImage(file, req, kind = "profile") {
  if (!file?.buffer) {
    throw new Error(`Testimonial ${kind} image is required.`);
  }

  try {
    const uploaded = await uploadImageToCloudinary(
      file,
      "elevate-trust/testimonials",
    );
    if (uploaded?.secure_url) {
      const readable = await isPubliclyReadable(uploaded.secure_url);
      if (readable) {
        return {
          imageUrl: uploaded.secure_url,
          imagePath: uploaded.public_id || null,
          storage: "cloudinary",
        };
      }

      console.warn(
        "Cloudinary testimonial image uploaded but URL is not publicly readable. Using local storage instead.",
        uploaded.secure_url,
      );
    }
  } catch (error) {
    console.warn(
      "Cloudinary testimonial image upload failed, saving locally:",
      error?.message || error,
    );
  }

  const storedName = await saveTestimonialImageLocally(file);
  return {
    imageUrl: buildPublicUrl(req, "testimonials", storedName),
    imagePath: storedName,
    storage: "local",
  };
}
