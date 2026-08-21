import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import partners1 from "../assets/homepage-icons/partners-1.svg";
import partners2 from "../assets/homepage-icons/partners-2.svg";
import visionGlobe from "../assets/homepage-icons/partner-globe.png";

const readMoreBtnClass =
  "mt-7 inline-flex items-center gap-2 rounded-full bg-white py-2.5 pl-5 pr-2.5 text-sm font-normal text-[#272935] transition hover:bg-white/90 sm:mt-8 sm:text-base lg:mt-9 min-[1920px]:mt-10 min-[1920px]:h-[53px] min-[1920px]:gap-[5px] min-[1920px]:py-0 min-[1920px]:pl-[27px] min-[1920px]:pr-[12px] min-[1920px]:text-[18px]";

const readMoreIconClass =
  "flex size-8 shrink-0 items-center justify-center rounded-full bg-[#113D77] text-white sm:size-9 min-[1920px]:size-[37px]";

export default function WhyPartner() {
  return (
    <section
      className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 xl:py-24 min-[1920px]:py-[88px]"
      aria-label="Why Partner With Us"
    >
      <div className="mx-auto w-full max-w-site">
        <div className="text-center">
          <p className="section-eyebrow font-semibold uppercase tracking-[0.16em]">
            <span className="text-[#272935]">Why Choose </span>
            <span className="text-[#2365AA]">Us</span>
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-[0.97] text-[#272935] sm:text-4xl lg:text-[44px] xl:text-[50px] 2xl:text-[56px] min-[1920px]:text-[75px]">
            Why Partner With Us
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:mt-14 lg:gap-7 xl:gap-8 min-[1920px]:mt-16 min-[1920px]:gap-7">
          {/* Our Vision — dark */}
          <article className="relative flex min-h-[340px] flex-col overflow-hidden rounded-[28px] bg-[#113D77] p-7 sm:min-h-[380px] sm:rounded-[32px] sm:p-8 lg:min-h-[440px] lg:rounded-[36px] lg:p-9 xl:min-h-[520px] xl:p-10 min-[1920px]:min-h-[654px] min-[1920px]:rounded-[40px] min-[1920px]:p-12">
            <img
              src={visionGlobe}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              draggable={false}
              className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-[85%] max-w-[520px] -translate-x-[12%] translate-y-[18%] object-contain object-left-bottom opacity-90 mix-blend-screen sm:w-[90%] sm:max-w-[580px] lg:w-[95%] lg:max-w-[640px] xl:max-w-[720px] min-[1920px]:max-w-[780px]"
            />

            <div className="relative z-[1] max-w-[433px]">
              <h3 className="m-0 text-2xl font-bold leading-[0.97] text-white sm:text-[28px] lg:text-[32px] xl:text-[40px] min-[1920px]:text-[48px]">
                Our Vision
              </h3>
              <p className="mt-4 text-[15px] leading-6 text-white sm:mt-5 sm:text-base sm:leading-7 lg:text-[17px] lg:leading-7 xl:text-[18px] xl:leading-[26px] min-[1920px]:mt-6 min-[1920px]:text-[20px] min-[1920px]:leading-[28px]">
                Be the top AI/ML implementation &amp; consulting partner which
                operates in an ethically upright manner to grow an organization
                and win the business.
              </p>
              <Link to="/about" className={readMoreBtnClass}>
                <span>Read More</span>
                <span className={readMoreIconClass}>
                  <ArrowUpRight className="size-4 sm:size-[18px] min-[1920px]:size-[22px]" strokeWidth={2.25} />
                </span>
              </Link>
            </div>

            <div className="relative z-[1] mt-auto flex items-end justify-end pt-6">
              <img
                src={partners1}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-auto w-[160px] object-contain pointer-events-none sm:w-[190px] lg:w-[210px] xl:w-[240px] min-[1920px]:w-[280px]"
              />
            </div>
          </article>

          {/* Expertise — light */}
          <article className="relative flex min-h-[340px] flex-col overflow-hidden rounded-[28px] bg-[#E8EEF5] p-7 sm:min-h-[380px] sm:rounded-[32px] sm:p-8 lg:min-h-[440px] lg:rounded-[36px] lg:p-9 xl:min-h-[520px] xl:p-10 min-[1920px]:min-h-[654px] min-[1920px]:rounded-[40px] min-[1920px]:p-12">
            <div className="relative z-[1] max-w-[433px]">
              <h3 className="m-0 text-2xl font-bold leading-[0.97] text-[#272935] sm:text-[28px] lg:text-[32px] xl:text-[40px] min-[1920px]:text-[48px]">
                Expertise
              </h3>
              <p className="mt-4 text-[15px] leading-6 text-[#5A5A5A] sm:mt-5 sm:text-base sm:leading-7 lg:text-[17px] lg:leading-7 xl:text-[18px] xl:leading-[26px] min-[1920px]:mt-6 min-[1920px]:text-[20px] min-[1920px]:leading-[28px]">
                Delivering machine learning, Generative AI and agentic-based
                solutions. Our core team consists of experts who can fast-track
                machine learning, Deep Learning, Generative AI and
                agentic-based solutions.
              </p>
              <Link to="/Services/ai-ml" className={readMoreBtnClass}>
                <span>Read More</span>
                <span className={readMoreIconClass}>
                  <ArrowUpRight className="size-4 sm:size-[18px] min-[1920px]:size-[22px]" strokeWidth={2.25} />
                </span>
              </Link>
            </div>

            <div className="relative z-[1] mt-auto flex items-end justify-end pt-6">
              <img
                src={partners2}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-auto w-[150px] object-contain pointer-events-none sm:w-[180px] lg:w-[200px] xl:w-[220px] min-[1920px]:w-[227px]"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
