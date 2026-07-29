import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import { BLOG_POSTS, getBlogPost } from "../data/blogs";

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug);

  useEffect(() => {
    if (post) document.title = `${post.title} | ElevateTrust.AI`;
  }, [post]);

  if (!post) {
    return <Navigate to="/resources/blogs" replace />;
  }

  const related = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      <section className="service-page-hero" aria-label={post.title}>
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content max-w-[920px]">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#8eb4df]">
            {post.category}
          </p>
          <h1 className="m-0 text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.25] tracking-tight text-white">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-[#a1b1cb] sm:text-base">
            {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        </div>
      </section>

      <article className="relative w-full overflow-hidden bg-white">
        <div className="relative mx-auto w-full max-w-[920px] px-5 pb-10 pt-3 sm:px-8 lg:px-10">
          <nav
            className="mb-8 flex flex-wrap items-center gap-2.5 pt-8 text-[clamp(13px,1.2vw,16px)] text-[#272935]"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="text-inherit no-underline hover:text-[#2365aa]">
              Home
            </Link>
            <span className="text-[#848b9b]">»</span>
            <Link
              to="/resources/blogs"
              className="text-inherit no-underline hover:text-[#2365aa]"
            >
              Blog
            </Link>
            <span className="text-[#848b9b]">»</span>
            <span className="line-clamp-1 text-[#848b9b]">{post.title}</span>
          </nav>

          <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-[#e8eef3] shadow-[0_18px_50px_-32px_rgba(17,61,119,0.45)]">
            <img
              src={post.cover}
              alt=""
              className="aspect-[16/9] h-auto w-full object-cover"
            />
          </div>

          <div className="mt-10 space-y-8 sm:mt-12">
            {post.sections.map((section, index) => (
              <section key={`${section.heading ?? "intro"}-${index}`}>
                {section.heading ? (
                  <h2 className="m-0 text-[clamp(20px,2.2vw,28px)] font-bold leading-snug text-[#1F2432]">
                    {section.heading}
                  </h2>
                ) : null}

                {section.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={`${index}-p-${pIndex}`}
                    className={`text-[clamp(14px,1.15vw,17px)] leading-7 text-[#4b5568] sm:leading-8 ${
                      section.heading || pIndex > 0 ? "mt-4" : "mt-0"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-[clamp(14px,1.15vw,17px)] leading-7 text-[#4b5568]">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={`${index}-b-${bIndex}`}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[#e2ebf3] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/resources/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2365aa] no-underline hover:text-[#1a5490]"
            >
              <ArrowLeft size={16} />
              Back to all blogs
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2365aa] px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-[#1a5490]"
            >
              Talk to our team
              <ArrowUpRight size={15} strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-[#eef3f8] bg-[#F5F9FC] py-[clamp(40px,5vw,72px)]">
          <div className="mx-auto w-full max-w-[1692px] px-5 sm:px-8 lg:px-10 xl:px-12">
            <h2 className="m-0 text-center text-[clamp(22px,2.6vw,32px)] font-bold text-[#1F2432]">
              More articles
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {related.map((item) => (
                <article
                  key={item.slug}
                  className="overflow-hidden rounded-[18px] border border-[#d7e6f3] bg-white shadow-[0_12px_36px_-28px_rgba(17,61,119,0.4)]"
                >
                  <Link to={`/resources/blogs/${item.slug}`} className="block bg-[#e8eef3]">
                    <img
                      src={item.cover}
                      alt=""
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </Link>
                  <div className="px-5 py-5">
                    <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[#2365aa]">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-[clamp(15px,1.2vw,18px)] font-bold leading-snug text-[#1F2432]">
                      <Link
                        to={`/resources/blogs/${item.slug}`}
                        className="text-inherit no-underline hover:text-[#2365aa]"
                      >
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FlyCTA />
    </div>
  );
}
