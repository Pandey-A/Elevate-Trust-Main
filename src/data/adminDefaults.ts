import { SITE_INDUSTRIES, type SiteIndustry } from "./industries";

export type IndustryTag = SiteIndustry;

export const INDUSTRY_TAGS: IndustryTag[] = [...SITE_INDUSTRIES];

export type AdminDemo = {
  id: string;
  title: string;
  videoId: string;
  youtubeUrl: string;
  industries: IndustryTag[];
  thumbnailUrl: string | null;
};

export type AdminJob = {
  id: string;
  title: string;
  tag: string;
  description: string;
  type: string;
  location: string;
  category: string;
  categorySubtitle: string;
};

export const DEFAULT_DEMOS: AdminDemo[] = [
  {
    id: "demo-company-overview",
    title: "Company Overview",
    videoId: "ZjBnaOVtEdo",
    youtubeUrl: "https://www.youtube.com/watch?v=ZjBnaOVtEdo",
    industries: [
      "Healthcare and Life Sciences",
      "Financial Services & FinTech",
      "Manufacturing & Industry 4.0",
    ],
  },
  {
    id: "demo-competitor-analysis",
    title: "Competitor Analysis Agent",
    videoId: "lJjVyGpAnks",
    youtubeUrl: "https://www.youtube.com/watch?v=lJjVyGpAnks",
    industries: ["E-commerce & Retail", "Financial Services & FinTech"],
  },
  {
    id: "demo-pii",
    title: "PII Detection and Anonymization",
    videoId: "MMGWqlV5toU",
    youtubeUrl: "https://youtube.com/watch?v=MMGWqlV5toU",
    industries: [
      "Healthcare and Life Sciences",
      "Financial Services & FinTech",
      "Public Sector & Government",
    ],
  },
  {
    id: "demo-redaction",
    title: "Redaction Agent",
    videoId: "-PZ-ryisPms",
    youtubeUrl: "https://www.youtube.com/watch?v=-PZ-ryisPms",
    industries: [
      "Healthcare and Life Sciences",
      "Financial Services & FinTech",
      "Public Sector & Government",
    ],
  },
  {
    id: "demo-weapon",
    title: "Weapon Detection",
    videoId: "aUNhr044nMg",
    youtubeUrl: "https://www.youtube.com/watch?v=aUNhr044nMg",
    industries: ["Public Sector & Government", "Social Media & Entertainment"],
  },
  {
    id: "demo-fencing",
    title: "Virtual Fencing",
    videoId: "Qw2mNdE-CV8",
    youtubeUrl: "https://www.youtube.com/watch?v=Qw2mNdE-CV8",
    industries: [
      "Manufacturing & Industry 4.0",
      "Logistics & Supply Chain",
      "Public Sector & Government",
    ],
  },
  {
    id: "demo-deepfake",
    title: "Deepfake Detection",
    videoId: "IwE_OB2SL2s",
    youtubeUrl: "https://www.youtube.com/watch?v=IwE_OB2SL2s",
    industries: ["Social Media & Entertainment", "Public Sector & Government"],
  },
  {
    id: "demo-face",
    title: "Face Matching",
    videoId: "NLq1-R5V3n8",
    youtubeUrl: "https://www.youtube.com/watch?v=NLq1-R5V3n8",
    industries: ["Education & E-Learning", "Public Sector & Government"],
  },
  {
    id: "demo-llmops",
    title: "LLMOps",
    videoId: "9kQ4Kkvj4MQ",
    youtubeUrl: "https://www.youtube.com/watch?v=9kQ4Kkvj4MQ",
    industries: ["Financial Services & FinTech", "Manufacturing & Industry 4.0"],
  },
  {
    id: "demo-fire",
    title: "Fire Detection",
    videoId: "S4y2eyQGG9U",
    youtubeUrl: "https://www.youtube.com/watch?v=S4y2eyQGG9U",
    industries: [
      "Manufacturing & Industry 4.0",
      "Logistics & Supply Chain",
      "Public Sector & Government",
    ],
  },
  {
    id: "demo-crowd",
    title: "Crowd Detection",
    videoId: "7JRrDnwnRmc",
    youtubeUrl: "https://www.youtube.com/watch?v=7JRrDnwnRmc",
    industries: [
      "Public Sector & Government",
      "Social Media & Entertainment",
      "Education & E-Learning",
    ],
  },
  {
    id: "demo-fall",
    title: "Fall Detection",
    videoId: "d-ihRwEEA4Q",
    youtubeUrl: "https://www.youtube.com/watch?v=d-ihRwEEA4Q",
    industries: ["Healthcare and Life Sciences", "Public Sector & Government"],
  },
  {
    id: "demo-attendance",
    title: "Attendance System",
    videoId: "WuWnquV-qN4",
    youtubeUrl: "https://www.youtube.com/watch?v=WuWnquV-qN4",
    industries: ["Education & E-Learning"],
  },
  {
    id: "demo-automation",
    title: "Automation Agent (email, social media)",
    videoId: "KduEH6YNS9g",
    youtubeUrl: "https://www.youtube.com/watch?v=KduEH6YNS9g",
    industries: ["Social Media & Entertainment", "E-commerce & Retail"],
  },
  {
    id: "demo-crop",
    title: "Crop Price Prediction",
    videoId: "HKLDbLyT77I",
    youtubeUrl: "https://youtube.com/watch?v=HKLDbLyT77I",
    industries: ["Logistics & Supply Chain", "Manufacturing & Industry 4.0"],
  },
  {
    id: "demo-sdlc",
    title: "SDLC AI Agent",
    videoId: "_BJRVBx0f7o",
    youtubeUrl: "https://youtube.com/watch?v=_BJRVBx0f7o",
    industries: ["Manufacturing & Industry 4.0", "Financial Services & FinTech"],
  },
  {
    id: "demo-depth",
    title: "Depth Detection",
    videoId: "gDnsadEYUfU",
    youtubeUrl: "https://www.youtube.com/watch?v=gDnsadEYUfU",
    industries: ["Manufacturing & Industry 4.0", "Logistics & Supply Chain"],
  },
  {
    id: "demo-medical",
    title: "Medical Coding Agent",
    videoId: "KMoa9WMmHcw",
    youtubeUrl: "https://www.youtube.com/watch?v=KMoa9WMmHcw",
    industries: ["Healthcare and Life Sciences"],
  },
  {
    id: "demo-unauthorized",
    title: "Unauthorized Access",
    videoId: "0tnD44KAkUI",
    youtubeUrl: "https://www.youtube.com/watch?v=0tnD44KAkUI",
    industries: ["Public Sector & Government", "Financial Services & FinTech"],
  },
  {
    id: "demo-healthcare-analytics",
    title: "Healthcare Analytics",
    videoId: "gNg-JSWIcDQ",
    youtubeUrl: "https://www.youtube.com/watch?v=gNg-JSWIcDQ",
    industries: ["Healthcare and Life Sciences"],
  },
];

export const DEFAULT_JOBS: AdminJob[] = [
  {
    id: "job-product-designer-1",
    title: "Product Designer",
    tag: "Designer",
    description: "We are looking for a mid-level product designer to join our team.",
    type: "Full-time",
    location: "Remotely",
    category: "Design",
    categorySubtitle: "Open position in our design team.",
  },
  {
    id: "job-product-designer-2",
    title: "Product Designer",
    tag: "Designer",
    description: "We are looking for a mid-level product designer to join our team.",
    type: "Full-time",
    location: "Remotely",
    category: "Design",
    categorySubtitle: "Open position in our design team.",
  },
  {
    id: "job-software-1",
    title: "Software Engineer",
    tag: "Software",
    description: "We are looking for a mid-level software engineer to join our AI team.",
    type: "Full-time",
    location: "Remotely",
    category: "Software Development",
    categorySubtitle: "Open position in our software team.",
  },
  {
    id: "job-software-2",
    title: "Frontend Engineer",
    tag: "Software",
    description: "We are looking for a frontend engineer experienced with React and Tailwind.",
    type: "Full-time",
    location: "Remotely",
    category: "Software Development",
    categorySubtitle: "Open position in our software team.",
  },
  {
    id: "job-software-3",
    title: "ML Engineer",
    tag: "Software",
    description: "We are looking for an ML engineer to build and deploy production AI systems.",
    type: "Full-time",
    location: "Remotely",
    category: "Software Development",
    categorySubtitle: "Open position in our software team.",
  },
];
