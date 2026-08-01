import sectionsBySlug from "./blogSections.json";

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

const sections = sectionsBySlug as Record<string, BlogSection[]>;

export function getBlogSections(slug: string): BlogSection[] | undefined {
  return sections[slug];
}
