import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js";
import careerRouter from "./route/career.js";
import authRouter from "./route/auth.js";
import demoRouter from "./route/demo.js";
import tagRouter from "./route/tags.js";
import blogRouter from "./route/blogs.js";
import testimonialRouter from "./route/testimonials.js";
import contactRouter from "./route/contact.js";
import jobRouter from "./route/jobs.js";
import { logMailStatus } from "./config/mail.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PREFERRED_PORT = Number(process.env.PORT || 5000);
const MAX_PORT_TRIES = Number(process.env.PORT_TRIES || 20);
const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  "http://localhost:5173,https://et-revamp-2-1.vercel.app"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function isLocalDevOrigin(origin) {
  if (process.env.NODE_ENV === "production") return false;
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin / non-browser tools (curl, Postman) have no Origin header.
      if (!origin || allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        return callback(null, true);
      }

      // Reject without throwing — throwing floods the global error handler.
      return callback(null, false);
    },
    credentials: true,
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders(res, filePath) {
      // Prefer inline viewing; never force attachment download for demo media.
      res.setHeader("Content-Disposition", "inline");
      res.setHeader("X-Content-Type-Options", "nosniff");
      const lower = String(filePath || "").toLowerCase();
      if (
        lower.endsWith(".pdf") ||
        lower.endsWith(".ppt") ||
        lower.endsWith(".pptx") ||
        lower.endsWith(".doc") ||
        lower.endsWith(".docx") ||
        lower.endsWith(".mp4") ||
        lower.endsWith(".webm") ||
        lower.endsWith(".mov")
      ) {
        res.setHeader("Cache-Control", "public, max-age=3600");
      }
    },
  }),
);

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Elevate Trust API is running",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "elevate-revamp-backend",
    port: Number(process.env.RUNTIME_PORT || PREFERRED_PORT),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/careers", careerRouter);
app.use("/api/demos", demoRouter);
app.use("/api/demo-tags", tagRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/contact", contactRouter);
app.use("/api/jobs", jobRouter);

app.use((error, _req, res, _next) => {
  console.error("Unhandled error:", error);

  if (
    error instanceof Error &&
    (error.message.includes("Only PDF") ||
      error.message.includes("Only JPG") ||
      error.message.includes("images are allowed") ||
      error.message.includes("Only video files"))
  ) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error?.code === "LIMIT_FILE_SIZE") {
    const isCareerCv = String(_req?.originalUrl || "").includes("/api/careers");
    return res.status(400).json({
      success: false,
      message: isCareerCv
        ? "Resume file is too large. Maximum size is 5MB."
        : "File is too large. Please try a smaller file.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again.",
  });
});

function listenOnPort(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port);

    const onError = (error) => {
      server.removeListener("listening", onListening);
      reject(error);
    };

    const onListening = () => {
      server.removeListener("error", onError);
      resolve(server);
    };

    server.once("error", onError);
    server.once("listening", onListening);
  });
}

async function startServer() {
  try {
    await pool.query(`
      ALTER TABLE demos ADD COLUMN IF NOT EXISTS video_url TEXT;
      ALTER TABLE demos ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
    `);
  } catch (error) {
    console.warn("Demo schema ensure skipped:", error?.message || error);
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id VARCHAR(120) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        tag VARCHAR(120) NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        type VARCHAR(120) NOT NULL DEFAULT 'Full-time',
        location VARCHAR(120) NOT NULL DEFAULT 'Remotely',
        category VARCHAR(255) NOT NULL DEFAULT '',
        category_subtitle VARCHAR(255) NOT NULL DEFAULT '',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_jobs_sort_order ON jobs (sort_order ASC, created_at DESC);
    `);
  } catch (error) {
    console.warn("Jobs schema ensure skipped:", error?.message || error);
  }

  let lastError = null;

  for (let offset = 0; offset < MAX_PORT_TRIES; offset += 1) {
    const port = PREFERRED_PORT + offset;

    try {
      const server = await listenOnPort(port);

      process.env.RUNTIME_PORT = String(port);
      process.env.PUBLIC_API_URL =
        process.env.PUBLIC_API_URL?.replace(/:\d+$/, `:${port}`) ||
        `http://localhost:${port}`;

      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Auth API: POST http://localhost:${port}/api/auth/register|login`);
      console.log(`Career API: POST http://localhost:${port}/api/careers`);
      console.log(`Jobs API: GET/POST http://localhost:${port}/api/jobs`);
      console.log(`Contact API: POST http://localhost:${port}/api/contact`);
      logMailStatus();

      if (port !== PREFERRED_PORT) {
        console.warn(
          `Port ${PREFERRED_PORT} was busy, so backend started on ${port}.`,
        );
        console.warn(
          `Update frontend/.env -> VITE_API_URL=http://localhost:${port} and restart frontend.`,
        );
      }

      server.on("error", (error) => {
        console.error("Server runtime error:", error);
      });

      return;
    } catch (error) {
      lastError = error;
      if (error?.code === "EADDRINUSE") {
        console.warn(`Port ${port} is in use, trying ${port + 1}...`);
        continue;
      }
      throw error;
    }
  }

  console.error(
    `Could not start server. Ports ${PREFERRED_PORT}-${PREFERRED_PORT + MAX_PORT_TRIES - 1} are all busy.`,
  );
  if (lastError) console.error(lastError);
  process.exit(1);
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
