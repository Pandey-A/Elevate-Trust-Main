/** Strip HTML tags and collapse whitespace for previews/excerpts. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** True when rich-text HTML has no visible text content. */
export function isRichTextEmpty(html: string): boolean {
  return stripHtml(html).length === 0;
}

/** Detect content saved from the rich text editor. */
export function looksLikeHtml(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

export function excerptFromContent(content: string, maxLength = 180): string {
  const text = looksLikeHtml(content) ? stripHtml(content) : content.trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
