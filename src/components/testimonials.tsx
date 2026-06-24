import elevateBadgeIcon from "../assets/testimonial/Group 84.svg";
import blogImage1 from "../assets/testimonial/Rectangle 90.svg";
import blogImage2 from "../assets/testimonial/Rectangle 90 (1).svg";
import blogImage3 from "../assets/testimonial/Rectangle 90 (2).svg";
import partner3i from "../assets/testimonial/3i-Infotech-Logo 1.svg";
import partnerGenai from "../assets/testimonial/genai_logo-main 1.svg";
import partnerTeksoft from "../assets/testimonial/image 10.svg";
import partnerMagnor from "../assets/homepage-icons/magnor.png";
import partnerGeoNomads from "../assets/homepage-icons/geo-nomads.png";
import viewAllArrow from "../assets/nav/lets-connect.svg";
import WhoWeAre from "./WhoWeAre";

const blogPosts = [
  {
    date: "2026-02-09",
    image: blogImage1,
    title: "Building a Foundation Model for Personalized Recommendations",
  },
  {
    date: "2026-03-10",
    image: blogImage2,
    title: "Transforming Real Estate Search with Knowledge Graphs: A Technical Deep Dive",
  },
  {
    date: "2025-10-13",
    image: blogImage3,
    title: "Structuring an Al Knowledge Assistant- And Why It Matters",
  },
];

const partners = [
  { name: "Magnor", logo: partnerMagnor },
  { name: "3i Infotech", logo: partner3i },
  { name: "GENAI Consulting", logo: partnerGenai },
  { name: "Teksoft Solutions", logo: partnerTeksoft },
  { name: "GeoNomads", logo: partnerGeoNomads },
];

export default function Testimonials() {
  return (
    <>
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2365AA] sm:text-sm">
                Client Testimonials
              </span>
            </div>

            <h2 className="text-3xl font-bold text-[#272935] sm:text-4xl lg:text-[42px]">Explore Blogs</h2>

            <a
              href="#"
              className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#2365AA] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1a5490]"
            >
              View All
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                <img src={viewAllArrow} alt="" aria-hidden className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 divide-y divide-[#E5E7EB] lg:mt-14 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {blogPosts.map((post) => (
              <article key={post.title} className="px-0 py-8 first:pt-0 last:pb-0 lg:px-8 lg:py-0">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img src={elevateBadgeIcon} alt="" aria-hidden className="h-9 w-9 shrink-0" />
                    <span className="text-sm font-semibold text-[#272935] sm:text-base">Elevate Trust AI</span>
                  </div>
                  <time className="shrink-0 text-xs text-[#272935]/60 sm:text-sm">{post.date}</time>
                </div>

                <div className="overflow-hidden rounded-3xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                <h3 className="mt-5 text-base font-bold leading-snug text-[#272935] sm:text-lg lg:text-xl">
                  {post.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WhoWeAre />

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-[#272935] sm:text-4xl lg:text-[52px]">Our Active Partners</h2>

            <div className="mt-10 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-12 lg:mt-12 lg:gap-16">
              {partners.map((partner) => (
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
