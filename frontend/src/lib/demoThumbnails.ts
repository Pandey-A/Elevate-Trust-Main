import type { AdminDemo } from "../data/adminDefaults";
import { youtubeThumb } from "./adminStorage";

import companyOverview from "../assets/demo-thumbnails/company-overview.png";
import competitorAnalysis from "../assets/demo-thumbnails/competitoranalysis.png";
import piiDetection from "../assets/demo-thumbnails/pildetection.png";
import redaction from "../assets/demo-thumbnails/Redaction.png";
import weaponDetection from "../assets/demo-thumbnails/weapondetection.png";
import virtualFencing from "../assets/demo-thumbnails/virutalFencing.png";
import deepfake from "../assets/demo-thumbnails/deepfake.png";
import faceMatching from "../assets/demo-thumbnails/face-matching.png";
import llmops from "../assets/demo-thumbnails/LLMOPS.png";
import fireDetection from "../assets/demo-thumbnails/Fire Detection.png";
import crowdDetection from "../assets/demo-thumbnails/crowed-detection.png";
import fallDetection from "../assets/demo-thumbnails/fall.png";
import attendanceSystem from "../assets/demo-thumbnails/attendance-system.png";
import automation from "../assets/demo-thumbnails/Automation.png";
import cropPrice from "../assets/demo-thumbnails/demo-crop.png";
import sdlcAi from "../assets/demo-thumbnails/sdlc-ai.png";
import depthDetection from "../assets/demo-thumbnails/dept.png";
import medicalCoding from "../assets/demo-thumbnails/medical-coding.png";
import unauthorizedAccess from "../assets/demo-thumbnails/unauthorized-access.png";
import healthcareAnalytics from "../assets/demo-thumbnails/healthcarew-analytics.png";

type DemoThumbMeta = {
  id: string;
  videoId: string;
  titles: string[];
  image: string;
};

const DEMO_THUMBNAILS: DemoThumbMeta[] = [
  {
    id: "demo-company-overview",
    videoId: "ZjBnaOVtEdo",
    titles: ["company overview"],
    image: companyOverview,
  },
  {
    id: "demo-competitor-analysis",
    videoId: "lJjVyGpAnks",
    titles: ["competitor analysis agent", "competitor analysis"],
    image: competitorAnalysis,
  },
  {
    id: "demo-pii",
    videoId: "MMGWqlV5toU",
    titles: ["pii detection and anonymization", "pii detection"],
    image: piiDetection,
  },
  {
    id: "demo-redaction",
    videoId: "k_sDkUqKn3k",
    titles: ["redaction agent", "redaction"],
    image: redaction,
  },
  {
    id: "demo-weapon",
    videoId: "aUNhr044nMg",
    titles: ["weapon detection"],
    image: weaponDetection,
  },
  {
    id: "demo-fencing",
    videoId: "Qw2mNdE-CV8",
    titles: ["virtual fencing"],
    image: virtualFencing,
  },
  {
    id: "demo-deepfake",
    videoId: "IwE_OB2SL2s",
    titles: ["deepfake detection"],
    image: deepfake,
  },
  {
    id: "demo-face",
    videoId: "NLq1-R5V3n8",
    titles: ["face matching", "facial recognition"],
    image: faceMatching,
  },
  {
    id: "demo-llmops",
    videoId: "9kQ4Kkvj4MQ",
    titles: ["llmops"],
    image: llmops,
  },
  {
    id: "demo-fire",
    videoId: "S4y2eyQGG9U",
    titles: ["fire detection"],
    image: fireDetection,
  },
  {
    id: "demo-crowd",
    videoId: "7JRrDnwnRmc",
    titles: ["crowd detection"],
    image: crowdDetection,
  },
  {
    id: "demo-fall",
    videoId: "d-ihRwEEA4Q",
    titles: ["fall detection"],
    image: fallDetection,
  },
  {
    id: "demo-attendance",
    videoId: "WuWnquV-qN4",
    titles: ["attendance system"],
    image: attendanceSystem,
  },
  {
    id: "demo-automation",
    videoId: "KduEH6YNS9g",
    titles: ["automation agent (email, social media)", "automation agent"],
    image: automation,
  },
  {
    id: "demo-crop",
    videoId: "HKLDbLyT77I",
    titles: ["crop price prediction"],
    image: cropPrice,
  },
  {
    id: "demo-sdlc",
    videoId: "_BJRVBx0f7o",
    titles: ["sdlc ai agent", "sdlc"],
    image: sdlcAi,
  },
  {
    id: "demo-depth",
    videoId: "gDnsadEYUfU",
    titles: ["depth detection"],
    image: depthDetection,
  },
  {
    id: "demo-medical",
    videoId: "KMoa9WMmHcw",
    titles: ["medical coding agent", "medical coding"],
    image: medicalCoding,
  },
  {
    id: "demo-unauthorized",
    videoId: "0tnD44KAkUI",
    titles: ["unauthorized access"],
    image: unauthorizedAccess,
  },
  {
    id: "demo-healthcare-analytics",
    videoId: "gNg-JSWIcDQ",
    titles: ["healthcare analytics"],
    image: healthcareAnalytics,
  },
];

const BY_ID = Object.fromEntries(DEMO_THUMBNAILS.map((item) => [item.id, item.image]));
const BY_VIDEO_ID = Object.fromEntries(
  DEMO_THUMBNAILS.map((item) => [item.videoId.toLowerCase(), item.image]),
);
const BY_TITLE = Object.fromEntries(
  DEMO_THUMBNAILS.flatMap((item) => item.titles.map((title) => [title, item.image])),
);

function normalizeTitle(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getDemoTitleImage(
  demo: Pick<AdminDemo, "id" | "videoId" | "thumbnailUrl" | "title">,
) {
  if (demo.thumbnailUrl) return demo.thumbnailUrl;

  const byId = BY_ID[demo.id];
  if (byId) return byId;

  const byVideo = demo.videoId
    ? BY_VIDEO_ID[demo.videoId.trim().toLowerCase()]
    : undefined;
  if (byVideo) return byVideo;

  const byTitle = demo.title ? BY_TITLE[normalizeTitle(demo.title)] : undefined;
  if (byTitle) return byTitle;

  return demo.videoId ? youtubeThumb(demo.videoId) : "";
}

/** True when we resolved a branded title card (not a raw YouTube frame). */
export function hasDemoTitleImage(
  demo: Pick<AdminDemo, "id" | "videoId" | "thumbnailUrl" | "title">,
) {
  if (demo.thumbnailUrl) return true;
  if (BY_ID[demo.id]) return true;
  if (demo.videoId && BY_VIDEO_ID[demo.videoId.trim().toLowerCase()]) return true;
  if (demo.title && BY_TITLE[normalizeTitle(demo.title)]) return true;
  return false;
}
