import DOMPurify from "dompurify";

type BlogHtmlContentProps = {
  html: string;
};

export default function BlogHtmlContent({ html }: BlogHtmlContentProps) {
  const sanitized = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });

  return (
    <article
      className="blog-html-content mx-auto max-w-[42rem] font-['Lay_Grotesk_Trial',sans-serif] [&_a]:font-semibold [&_a]:text-[#2365aa] [&_a]:underline [&_a]:decoration-[#2365aa]/35 [&_a]:underline-offset-[3px] [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-[clamp(1.35rem,2vw,1.75rem)] [&_h2]:font-bold [&_h2]:leading-[1.35] [&_h2]:tracking-[-0.02em] [&_h2]:text-[#1f2432] [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-[clamp(1.15rem,1.6vw,1.45rem)] [&_h3]:font-bold [&_h3]:leading-[1.35] [&_h3]:text-[#1f2432] [&_li]:leading-[1.8] [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-5 [&_p]:text-[clamp(1rem,1.05vw,1.125rem)] [&_p]:leading-[1.85] [&_p]:text-[#4b5568] [&_strong]:font-semibold [&_strong]:text-[#1f2432] [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
