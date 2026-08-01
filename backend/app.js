import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import careerRouter from "./route/career.js";
import authRouter from "./route/auth.js";
import demoRouter from "./route/demo.js";
import tagRouter from "./route/tags.js";
import blogRouter from "./route/blogs.js";
import testimonialRouter from "./route/testimonials.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PREFERRED_PORT = Number(process.env.PORT || 5000);
const MAX_PORT_TRIES = Number(process.env.PORT_TRIES || 20);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(
  cors({
    origin: CORS_ORIGIN,
  }),
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

app.use((error, _req, res, _next) => {
  console.error("Unhandled error:", error);

  if (
    error instanceof Error &&
    (error.message.includes("Only PDF") ||
      error.message.includes("Only JPG") ||
      error.message.includes("images are allowed"))
  ) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error?.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File is too large. Max size is 5MB.",
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
