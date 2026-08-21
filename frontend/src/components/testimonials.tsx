import elevateBadgeIcon from "../assets/testimonial/Group 84.svg";
import smartArrow from "../assets/homepage-icons/smart-arrow.png";
import { activePartners } from "../data/activePartners";
import { usePublicBlogs } from "../hooks/useAdminData";
import { getOptimizedImageUrl } from "../lib/optimizeImageUrl";
import WhoWeAre from "./WhoWeAre";
import { Link } from "react-router-dom";

function formatBlogDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function Testimonials() {
  const { blogs } = usePublicBlogs();
  const blogPosts = blogs.slice(0, 3);
  return (
    <>
      <WhoWeAre />

      <section className="bg-[#113D77] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 2xl:px-16">
        <div className="mx-auto max-w-site w-full">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[52px] xl:text-[58px] 2xl:text-[64px] min-[1920px]:text-[68px]">
              Our Active Partners
            </h2>

            <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:mt-12 lg:gap-5 xl:gap-6 2xl:gap-8">
              {activePartners.map((partner) => (
                <div
                  key={partner.name}
                  className="inline-flex h-16 items-center justify-center rounded-2xl bg-white px-4 py-2 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.35)] sm:h-[72px] sm:px-5 md:h-20 md:rounded-[20px] md:px-6 2xl:h-24 2xl:px-7"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                    className={
                      partner.tall
                        ? "h-10 w-auto max-w-[64px] object-contain sm:h-12 sm:max-w-[72px] md:h-14 md:max-w-[84px] 2xl:h-16 2xl:max-w-[96px]"
                        : "h-8 w-auto max-w-[88px] object-contain sm:h-9 sm:max-w-[100px] md:h-11 md:max-w-[120px] 2xl:h-12 2xl:max-w-[140px]"
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 2xl:px-16">
        <div className="mx-auto max-w-site w-full">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="section-eyebrow font-semibold uppercase tracking-[0.12em] text-[#2365AA]">
                Client Testimonials
              </span>
            </div>

            <h2 className="text-3xl font-bold text-[#272935] sm:text-4xl lg:text-[44px] xl:text-[50px] 2xl:text-[56px] min-[1920px]:text-[62px]">
              Explore Blogs
            </h2>

            <Link
              to="/resources/blogs"
              className="btn-cta mt-5 bg-[#2365AA] text-white hover:bg-[#1a5490]"
            >
              View All
              <img
                src={smartArrow}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="h-7 w-7 object-contain"
              />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 divide-y divide-[#E5E7EB] lg:mt-14 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="px-0 py-8 first:pt-0 last:pb-0 lg:px-8 lg:py-0"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={elevateBadgeIcon}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      className="h-9 w-9 shrink-0"
                    />
                    <span className="section-body-lg font-semibold text-[#272935]">
                      Elevate Trust AI
                    </span>
                  </div>
                  <time className="section-body-sm shrink-0 text-[#272935]/60">
                    {formatBlogDate(post.createdAt)}
                  </time>
                </div>

                <Link
                  to={`/resources/blogs/${post.id}`}
                  className="block overflow-hidden rounded-3xl"
                >
                  {post.imageUrl ? (
                    <img
                      src={getOptimizedImageUrl(post.imageUrl, {
                        width: 720,
                        height: 540,
                        crop: "fill",
                      })}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      width={720}
                      height={540}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[4/3] w-full bg-[#e8eef3]" />
                  )}
                </Link>

                <h3 className="section-body-xl mt-5 font-bold leading-snug text-[#272935] sm:text-lg lg:text-xl">
                  <Link
                    to={`/resources/blogs/${post.id}`}
                    className="text-inherit no-underline transition-colors hover:text-[#2365AA]"
                  >
                    {post.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
