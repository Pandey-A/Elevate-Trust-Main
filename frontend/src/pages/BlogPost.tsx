import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import BlogArticleBody from "../components/blog/BlogArticleBody";
import BlogHtmlContent from "../components/blog/BlogHtmlContent";
import { parseBlogDescription } from "../components/blog/parseBlogDescription";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import { getBlogSections } from "../data/blogSections";
import { looksLikeHtml } from "../lib/blogContent";
import { usePublicBlogs } from "../hooks/useAdminData";
import { fetchPublicBlogById, type BlogPost as ApiBlogPost } from "../lib/blogsApi";
import { getErrorMessage } from "../lib/api";
import { getOptimizedImageUrl } from "../lib/optimizeImageUrl";

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const { blogs } = usePublicBlogs();
  const [post, setPost] = useState<ApiBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchPublicBlogById(slug);
        if (!cancelled) {
          setPost(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setPost(null);
          setError(getErrorMessage(err, "Blog not found."));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPost();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (post) document.title = `${post.title} | ElevateTrust.AI`;
  }, [post]);

  const sections = useMemo(() => {
    if (!post) return [];
    if (looksLikeHtml(post.description)) return [];
    const staticSections = getBlogSections(slug);
    if (staticSections?.length) return staticSections;
    return parseBlogDescription(post.description);
  }, [slug, post]);

  const htmlContent = post && looksLikeHtml(post.description) ? post.description : "";

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white text-sm text-[#848b9b]">
        Loading blog...
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/resources/blogs" replace />;
  }

  const related = blogs.filter((item) => item.id !== post.id).slice(0, 3);

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
            Blog
          </p>
          <h1 className="m-0 text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.25] tracking-tight text-white">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-[#a1b1cb] sm:text-base">
            ElevateTrust.AI · <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </p>
        </div>
      </section>

      <article className="relative w-full overflow-hidden bg-white">
        <div className="page-breadcrumb-wrap">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="text-inherit no-underline hover:text-[#2365aa]">
              Home
            </Link>
            <span className="text-[#848b9b]">»</span>
            <span>Resources</span>
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
        </div>

        <div className="relative mx-auto w-full max-w-[920px] px-5 pb-10 pt-0 sm:px-8 lg:px-10">

          {post.imageUrl ? (
            <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-[#e8eef3] shadow-[0_18px_50px_-32px_rgba(17,61,119,0.45)]">
              <img
                src={getOptimizedImageUrl(post.imageUrl, {
                  width: 1200,
                  height: 675,
                  crop: "fill",
                })}
                alt=""
                decoding="async"
                fetchPriority="high"
                className="aspect-[16/9] h-auto w-full object-cover"
              />
            </div>
          ) : null}

          {error ? (
            <p className="mt-6 text-sm text-[#2365aa]">{error}</p>
          ) : null}

          <div className="mt-10 sm:mt-12">
            {htmlContent ? (
              <BlogHtmlContent html={htmlContent} />
            ) : (
              <BlogArticleBody sections={sections} />
            )}
          </div>

          <div className="mx-auto mt-14 flex max-w-[42rem] flex-col gap-3 border-t border-[#e2ebf3] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/resources/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2365aa] no-underline hover:text-[#1a5490]"
            >
              <ArrowLeft size={16} />
              Back to all blogs
            </Link>
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#2365aa] px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-[#1a5490] sm:w-auto"
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
                  key={item.id}
                  className="overflow-hidden rounded-[18px] border border-[#d7e6f3] bg-white shadow-[0_12px_36px_-28px_rgba(17,61,119,0.4)]"
                >
                  <Link to={`/resources/blogs/${item.id}`} className="block bg-[#e8eef3]">
                    {item.imageUrl ? (
                      <img
                        src={getOptimizedImageUrl(item.imageUrl, {
                          width: 640,
                          height: 400,
                          crop: "fill",
                        })}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-[16/10] w-full bg-[#e8eef3]" />
                    )}
                  </Link>
                  <div className="px-5 py-5">
                    <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[#2365aa]">
                      Blog
                    </p>
                    <h3 className="mt-2 text-[clamp(15px,1.2vw,18px)] font-bold leading-snug text-[#1F2432]">
                      <Link
                        to={`/resources/blogs/${item.id}`}
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
