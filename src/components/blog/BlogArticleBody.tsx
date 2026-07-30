import type { BlogSection } from "../../data/blogSections";

function renderInlineText(text: string) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlPattern);

  return parts.map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      const href = part.replace(/[.,;:!?)]+$/, "");
      const trailing = part.slice(href.length);
      return (
        <span key={index}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#2365aa] underline decoration-[#2365aa]/35 underline-offset-[3px] hover:text-[#1a5490]"
          >
            {href}
          </a>
          {trailing}
        </span>
      );
    }

    const colonMatch = part.match(/^([^:]{2,80}):\s*(.+)$/);
    if (colonMatch && !part.startsWith("http")) {
      return (
        <span key={index}>
          <strong className="font-semibold text-[#1f2432]">{colonMatch[1]}:</strong>{" "}
          {colonMatch[2]}
        </span>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

type BlogArticleBodyProps = {
  sections: BlogSection[];
};

export default function BlogArticleBody({ sections }: BlogArticleBodyProps) {
  return (
    <article className="mx-auto max-w-[42rem] font-['Lay_Grotesk_Trial',sans-serif]">
      {sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="not-first:mt-8">
          {section.heading ? (
            <h3 className="m-0 mb-4 text-[clamp(1.25rem,2vw,1.625rem)] font-bold leading-[1.35] tracking-[-0.02em] text-[#1f2432] first:mt-0">
              {section.heading}
            </h3>
          ) : null}

          {section.paragraphs
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)
            .map((paragraph, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className="m-0 mb-5 text-[clamp(1rem,1.05vw,1.125rem)] leading-[1.85] text-[#4b5568] last:mb-0"
              >
                {renderInlineText(paragraph)}
              </p>
            ))}

          {section.bullets && section.bullets.length > 0 ? (
            <ul className="m-0 mb-5 list-disc space-y-2.5 pl-6 text-[clamp(1rem,1.05vw,1.125rem)] leading-[1.8] text-[#4b5568]">
              {section.bullets.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-1">
                  {renderInlineText(item)}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
