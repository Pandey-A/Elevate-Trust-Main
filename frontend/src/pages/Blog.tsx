import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import { usePublicBlogs } from "../hooks/useAdminData";
import { excerptFromContent } from "../lib/blogContent";
import { getOptimizedImageUrl } from "../lib/optimizeImageUrl";

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function excerpt(text: string, maxLength = 180) {
  return excerptFromContent(text, maxLength);
}

export default function Blog() {
  const { blogs, loading, error } = usePublicBlogs();

  useEffect(() => {
    document.title = "Blog | ElevateTrust.AI";
  }, []);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      <section className="service-page-hero" aria-label="Blog">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#8eb4df] 2xl:text-base">
            Resources
          </p>
          <h1 className="m-0 text-[clamp(32px,4vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            Blog
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            Advancing Your Business with Smart Tech insights on AI agents,
            generative AI, and enterprise delivery from ElevateTrust.AI.
          </p>
          <Link
            to="/contact"
            className="mt-[clamp(16px,2vw,28px)] inline-flex items-center gap-1.5 rounded-full bg-[#2365aa] py-3 pl-[26px] pr-3.5 text-base font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490] lg:py-2.5 lg:pl-[22px] lg:pr-2.5 lg:text-sm 2xl:py-3 2xl:pl-[26px] 2xl:pr-3.5 2xl:text-base"
          >
            Contact Us
            <span className="inline-flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white text-[#2365aa]">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-40 h-[280px] w-[280px] rounded-full bg-[#EFF7FC] blur-3xl sm:h-[360px] sm:w-[360px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-24 h-[240px] w-[240px] rounded-full bg-[#EFF7FC] blur-3xl sm:h-[320px] sm:w-[320px]"
        />

        <div className="page-breadcrumb-wrap">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link
              to="/"
              className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
            >
              Home
            </Link>
            <span className="text-[#848b9b]">»</span>
            <span>Resources</span>
            <span className="text-[#848b9b]">»</span>
            <span>Blog</span>
          </nav>
        </div>

        <div className="relative mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] pt-0 sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(28px,3.5vw,44px)] max-w-[52rem] text-center">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Insights that move AI from idea to impact
            </h2>
            <p className="mx-auto mt-4 max-w-[42rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px] 2xl:leading-8">
              Explore practical articles on agents, knowledge systems,
              generative AI, and production delivery patterns.
            </p>
          </header>

          {error ? (
            <p className="mb-6 text-center text-sm text-[#2365aa]">{error}</p>
          ) : null}
          {loading ? (
            <p className="mb-6 text-center text-sm text-[#848b9b]">Loading blogs...</p>
          ) : null}

          {!loading && blogs.length === 0 ? (
            <div className="rounded-[20px] border border-[#d7e6f3] bg-[#EFF7FC] px-6 py-14 text-center">
              <p className="m-0 text-sm text-[#687181]">
                No blog posts published yet. Check back soon.
              </p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:gap-8">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="flex flex-col overflow-hidden rounded-[20px] border border-[#d7e6f3] bg-white shadow-[0_14px_40px_-28px_rgba(17,61,119,0.35)] transition-shadow duration-300 hover:shadow-[0_18px_44px_-24px_rgba(17,61,119,0.5)]"
              >
                <Link
                  to={`/resources/blogs/${post.id}`}
                  className="relative block overflow-hidden bg-[#e8eef3]"
                >
                  {post.imageUrl ? (
                    <img
                      src={getOptimizedImageUrl(post.imageUrl, {
                        width: 800,
                        height: 500,
                        crop: "fill",
                      })}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={500}
                      className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="aspect-[16/10] w-full bg-[#e8eef3]" />
                  )}
                </Link>

                <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[12px] text-[#848b9b]">
                    <span className="rounded-full bg-[#EFF7FC] px-2.5 py-1 font-semibold text-[#2365aa]">
                      Blog
                    </span>
                    <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                  </div>

                  <h3 className="m-0 text-[clamp(16px,1.3vw,20px)] font-bold leading-snug text-[#1F2432] 2xl:text-[22px]">
                    <Link
                      to={`/resources/blogs/${post.id}`}
                      className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-3 line-clamp-3 text-[clamp(13px,1.1vw,15px)] leading-6 text-[#687181]">
                    {excerpt(post.description)}
                  </p>

                  <div className="mt-auto pt-5">
                    <Link
                      to={`/resources/blogs/${post.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2365aa] no-underline transition-colors hover:text-[#1a5490]"
                    >
                      Read article
                      <ArrowUpRight size={15} strokeWidth={2.4} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
