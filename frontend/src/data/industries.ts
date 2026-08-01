/** Site industries, keep in sync with navbar Industries mega-menu. */
export const SITE_INDUSTRIES = [
  "Healthcare and Life Sciences",
  "Financial Services & FinTech",
  "E-commerce & Retail",
  "Education & E-Learning",
  "Logistics & Supply Chain",
  "Manufacturing & Industry 4.0",
  "Social Media & Entertainment",
  "Public Sector & Government",
] as const;

export type SiteIndustry = (typeof SITE_INDUSTRIES)[number];

/** Maps older demo capability tags → current industry dropdown values. */
export const LEGACY_INDUSTRY_MAP: Record<string, SiteIndustry[]> = {
  Healthcare: ["Healthcare and Life Sciences"],
  "Healthcare and Life Sciences": ["Healthcare and Life Sciences"],
  "Financial Services & FinTech": ["Financial Services & FinTech"],
  "E-commerce & Retail": ["E-commerce & Retail"],
  "Education & Workplace": ["Education & E-Learning"],
  "Education & E-Learning": ["Education & E-Learning"],
  "Logistics & Supply Chain": ["Logistics & Supply Chain"],
  "Manufacturing & Industry 4.0": ["Manufacturing & Industry 4.0"],
  "Social Media & Entertainment": ["Social Media & Entertainment"],
  "Public Sector & Government": ["Public Sector & Government"],
  Agriculture: ["Manufacturing & Industry 4.0", "Logistics & Supply Chain"],
  "Security & Surveillance": ["Public Sector & Government"],
  "AI Agents": ["Financial Services & FinTech"],
  "Video Analytics": ["Public Sector & Government", "Manufacturing & Industry 4.0"],
  "Responsible AI": ["Healthcare and Life Sciences", "Financial Services & FinTech"],
  General: ["E-commerce & Retail"],
};

export function normalizeIndustryTags(tags: string[]): string[] {
  const next = new Set<string>();

  tags.forEach((tag) => {
    const trimmed = String(tag || "").trim();
    if (!trimmed) return;

    const mapped = LEGACY_INDUSTRY_MAP[trimmed];
    if (mapped) {
      mapped.forEach((industry) => next.add(industry));
      return;
    }

    if ((SITE_INDUSTRIES as readonly string[]).includes(trimmed)) {
      next.add(trimmed);
      return;
    }

    next.add(trimmed);
  });

  return Array.from(next);
}
