import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool, { closePool, testDbConnection } from "./config/db.js";
import careerRouter from "./route/career.js";
import authRouter from "./route/auth.js";
import demoRouter from "./route/demo.js";
import tagRouter from "./route/tags.js";
import blogRouter from "./route/blogs.js";
import testimonialRouter from "./route/testimonials.js";
import contactRouter from "./route/contact.js";
import jobRouter from "./route/jobs.js";
import { logMailStatus } from "./config/mail.js";
import { maybeSeedDashboardUsersOnStart } from "./scripts/seedDashboardUsers.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PREFERRED_PORT = Number(process.env.PORT || 5000);
const MAX_PORT_TRIES = Number(process.env.PORT_TRIES || 20);
const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  "http://localhost:5173,https://et-revamp-2-1.vercel.app"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOriginPatterns = (
  process.env.CORS_ORIGIN_PATTERNS || ""
)
  .split(",")
  .map((pattern) => pattern.trim())
  .filter(Boolean)
  .map((pattern) => {
    try {
      return new RegExp(pattern, "i");
    } catch (error) {
      console.warn("Invalid CORS_ORIGIN_PATTERNS entry ignored:", pattern, error);
      return null;
    }
  })
  .filter(Boolean);

function isLocalDevOrigin(origin) {
  if (process.env.NODE_ENV === "production") return false;
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (isLocalDevOrigin(origin)) return true;
  return allowedOriginPatterns.some((pattern) => pattern.test(origin));
}

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin / non-browser tools (curl, Postman) have no Origin header.
      if (isAllowedOrigin(origin)) {
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
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.set("trust proxy", process.env.TRUST_PROXY || 1);
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || "10mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: process.env.URLENCODED_BODY_LIMIT || "10mb",
  }),
);
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

app.get("/api/health", async (_req, res) => {
  const dbStatus = await testDbConnection();
  const isHealthy = dbStatus.ok;
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "ok" : "degraded",
    service: "elevate-revamp-backend",
    database: isHealthy ? "connected" : "disconnected",
    dbLatencyMs: dbStatus.latencyMs ?? null,
    dbError: dbStatus.error || undefined,
    port: Number(process.env.RUNTIME_PORT || PREFERRED_PORT),
    uptimeSeconds: Math.floor(process.uptime()),
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

async function ensureDatabaseSchema() {
  const schemaPath = path.join(__dirname, "sql/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  await pool.query(schema);

  await pool.query(`
    DO $$
    BEGIN
      BEGIN
        ALTER TABLE demos ALTER COLUMN video_id DROP NOT NULL;
      EXCEPTION WHEN others THEN NULL;
      END;
      BEGIN
        ALTER TABLE demos ALTER COLUMN youtube_url DROP NOT NULL;
      EXCEPTION WHEN others THEN NULL;
      END;
    END $$;

    -- Automatically sanitize any existing localhost/loopback media URLs to clean relative paths
    UPDATE demos
    SET video_url = REGEXP_REPLACE(video_url, '^https?://(?:localhost|127\\.0\\.0\\.1)(?::[0-9]+)?', '')
    WHERE video_url ~* '^https?://(?:localhost|127\\.0\\.0\\.1)';

    UPDATE demos
    SET thumbnail_url = REGEXP_REPLACE(thumbnail_url, '^https?://(?:localhost|127\\.0\\.0\\.1)(?::[0-9]+)?', '')
    WHERE thumbnail_url ~* '^https?://(?:localhost|127\\.0\\.0\\.1)';

    UPDATE blogs
    SET image_url = REGEXP_REPLACE(image_url, '^https?://(?:localhost|127\\.0\\.0\\.1)(?::[0-9]+)?', '')
    WHERE image_url ~* '^https?://(?:localhost|127\\.0\\.0\\.1)';

    UPDATE testimonials
    SET logo_url = REGEXP_REPLACE(logo_url, '^https?://(?:localhost|127\\.0\\.0\\.1)(?::[0-9]+)?', '')
    WHERE logo_url ~* '^https?://(?:localhost|127\\.0\\.0\\.1)';

    UPDATE testimonials
    SET profile_url = REGEXP_REPLACE(profile_url, '^https?://(?:localhost|127\\.0\\.0\\.1)(?::[0-9]+)?', '')
    WHERE profile_url ~* '^https?://(?:localhost|127\\.0\\.0\\.1)';

    UPDATE career_applications
    SET cv_url = REGEXP_REPLACE(cv_url, '^https?://(?:localhost|127\\.0\\.0\\.1)(?::[0-9]+)?', '')
    WHERE cv_url ~* '^https?://(?:localhost|127\\.0\\.0\\.1)';
  `);
}

function setupGracefulShutdown(server) {
  let isShuttingDown = false;
  const shutdown = async (signal) => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);

    server.close(async () => {
      console.log("HTTP server closed.");
      await closePool();
      console.log("PostgreSQL connections closed.");
      process.exit(0);
    });

    // Force exit after 10 seconds if connections refuse to close
    setTimeout(() => {
      console.error("Graceful shutdown timed out. Forcing process exit.");
      process.exit(1);
    }, 10_000).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

async function startServer() {
  try {
    await ensureDatabaseSchema();
    console.log("Database schema ensured.");
  } catch (error) {
    console.error("Failed to ensure database schema:", error?.message || error);
    process.exit(1);
  }

  try {
    await maybeSeedDashboardUsersOnStart();
  } catch (error) {
    console.error(
      "Failed to seed dashboard users on start:",
      error?.message || error,
    );
    process.exit(1);
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
      console.log(`Auth API: POST http://localhost:${port}/api/auth/register|login|logout`);
      console.log(`Career API: POST http://localhost:${port}/api/careers`);
      console.log(`Jobs API: GET/POST http://localhost:${port}/api/jobs`);
      console.log(`Contact API: POST http://localhost:${port}/api/contact`);
      logMailStatus();

      setupGracefulShutdown(server);

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

if (process.env.NODE_ENV !== "test") {
  startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}

export default app;
