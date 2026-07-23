import elevateBadgeIcon from "../assets/testimonial/Group 84.svg";
import smartArrow from "../assets/homepage-icons/smart-arrow.png";
import { activePartners } from "../data/activePartners";
import { BLOG_POSTS } from "../data/blogs";
import WhoWeAre from "./WhoWeAre";
import { Link } from "react-router-dom";

const blogPosts = BLOG_POSTS.slice(0, 3);

export default function Testimonials() {
  return (
    <>
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 2xl:px-16">
        <div className="mx-auto max-w-site w-full">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="section-eyebrow font-semibold uppercase tracking-[0.12em] text-[#2365AA]">
                Client Testimonials
              </span>
            </div>

            <h2 className="text-3xl font-bold text-[#272935] sm:text-4xl lg:text-[44px] xl:text-[50px] 2xl:text-[56px] min-[1920px]:text-[62px]">Explore Blogs</h2>

            <Link
              to="/resources/blogs"
              className="btn-cta mt-5 bg-[#2365AA] text-white hover:bg-[#1a5490]"
            >
              View All
              <img src={smartArrow} alt="" aria-hidden className="h-7 w-7 object-contain" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 divide-y divide-[#E5E7EB] lg:mt-14 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {blogPosts.map((post) => (
              <article key={post.slug} className="px-0 py-8 first:pt-0 last:pb-0 lg:px-8 lg:py-0">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img src={elevateBadgeIcon} alt="" aria-hidden className="h-9 w-9 shrink-0" />
                    <span className="section-body-lg font-semibold text-[#272935]">Elevate Trust AI</span>
                  </div>
                  <time className="section-body-sm shrink-0 text-[#272935]/60">{post.date}</time>
                </div>

                <Link to={`/resources/blogs/${post.slug}`} className="block overflow-hidden rounded-3xl">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </Link>

                <h3 className="section-body-xl mt-5 font-bold leading-snug text-[#272935] sm:text-lg lg:text-xl">
                  <Link
                    to={`/resources/blogs/${post.slug}`}
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

      <WhoWeAre />

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 2xl:px-16">
        <div className="mx-auto max-w-site w-full">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#272935] sm:text-4xl lg:text-[52px] xl:text-[58px] 2xl:text-[64px] min-[1920px]:text-[68px]">Our Active Partners</h2>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-10 sm:gap-12 lg:mt-12 lg:gap-16 xl:gap-20">
              {activePartners.map((partner) => (
                <img
                  key={partner.name}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-auto max-h-24 w-auto h-[200px] w-[300px] object-contain sm:max-h-28 sm:max-w-[220px]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
