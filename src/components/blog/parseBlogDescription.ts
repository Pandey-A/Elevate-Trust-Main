import type { BlogSection } from "../../data/blogSections";

function isLikelyHeading(line: string) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("- ")) return false;
  if (/^\d+\.\s/.test(trimmed)) return true;
  if (trimmed.length <= 120 && !trimmed.endsWith(".")) return true;
  if (/^[A-Z][^.\n]{0,120}:/.test(trimmed) && trimmed.length <= 140) return true;
  return false;
}

function isBulletBlock(block: string) {
  const lines = block
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length > 0 && lines.every((line) => /^-\s/.test(line));
}

function isOrderedBlock(block: string) {
  const lines = block
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length > 0 && lines.every((line) => /^\d+\.\s/.test(line));
}

/** Converts flat blog description text into renderable sections. */
export function parseBlogDescription(text: string): BlogSection[] {
  const blocks = text
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const sections: BlogSection[] = [];
  let current: BlogSection | null = null;

  const pushCurrent = () => {
    if (!current) return;
    if (current.heading || current.paragraphs.length > 0 || current.bullets?.length) {
      sections.push(current);
    }
    current = null;
  };

  for (const block of blocks) {
    if (isBulletBlock(block)) {
      const bullets = block
        .split("\n")
        .map((line) => line.trim().replace(/^-\s*/, ""))
        .filter(Boolean);

      if (!current) current = { paragraphs: [] };
      current.bullets = [...(current.bullets || []), ...bullets];
      continue;
    }

    if (isOrderedBlock(block)) {
      const bullets = block
        .split("\n")
        .map((line) => line.trim().replace(/^\d+\.\s*/, ""))
        .filter(Boolean);

      if (!current) current = { paragraphs: [] };
      current.bullets = [...(current.bullets || []), ...bullets];
      continue;
    }

    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 1 && isLikelyHeading(lines[0])) {
      pushCurrent();
      current = { heading: lines[0], paragraphs: [] };
      continue;
    }

    if (!current) current = { paragraphs: [] };
    current.paragraphs.push(lines.join(" "));
  }

  pushCurrent();
  return sections;
}
