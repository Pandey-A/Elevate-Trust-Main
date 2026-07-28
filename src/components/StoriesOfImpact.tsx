import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import blueArrow from "../assets/homepage-icons/blue-arrow.png";
import arupaLogo from "../assets/client-strip/Arupa.svg";
import complyCoreLogo from "../assets/client-strip/ComplyCore.svg";
import qjumpersLogo from "../assets/client-strip/Qjumpers.svg";
import happyFeetLogo from "../assets/client-strip/travellers.svg";
import roshanHirePhoto from "../assets/testimonial/RoshanHireHappyFeet.png";
import naritaMahajanPhoto from "../assets/testimonial/happyFeetCEO.png";
import storiesVector from "../assets/homepage-icons/stories-vector.png";
import storyProfile1 from "../assets/homepage-icons/stories-1.svg";
import storyProfile2 from "../assets/homepage-icons/stories-2.svg";
import "./StoriesOfImpact.css";

const stories = [
  {
    logo: happyFeetLogo,
    profile: roshanHirePhoto,
    quote:
      "Working with Elevate Trust for our website development was a great experience. They understood our travel business needs and delivered a modern, user-friendly website with excellent support throughout the process. Highly professional team and we truly appreciate their dedication and efforts.",
    name: "Roshan Hire",
    title: "Co-Founder, Happy Feet Travellers",
  },
  {
    logo: happyFeetLogo,
    profile: naritaMahajanPhoto,
    quote:
      "Elevate Trust did an excellent job creating our website. Their team understood our vision, provided creative solutions, and delivered a website that truly represents our brand. Great communication, timely execution, and highly recommended!",
    name: "Narita Mahajan",
    title: "Owner, Happy Feet Travellers",
  },
  {
    logo: arupaLogo,
    profile: storyProfile1,
    quote:
      "Partnered with Elevate Trust for custom AI solutions and integration. The platform's adaptive learning and intelligent automation transformed our client success strategy and helped us deliver measurable ROI.",
    name: "Amet Consec",
    title: "CEO at ESI ecom",
  },
  {
    logo: complyCoreLogo,
    profile: storyProfile2,
    quote:
      "Working with Elevate trust to develop our marketing compliance platform was an excellent experience. The team quickly understood our product vision and translated complex requirements into a strong, practical technical solution. We appreciated their expertise, thoughtful approach, and commitment throughout the development process.",
    name: "Reshu Choudhary",
    title: "Co-Founder, ComplyCore",
  },
  {
    logo: arupaLogo,
    profile: storyProfile2,
    quote:
      "Elevate Trust helped us scale AI-driven workflows with confidence. Their team understood our domain quickly and delivered solutions that exceeded our expectations on timeline and quality.",
    name: "Amet Consec",
    title: "CEO at ESI ecom",
  },
  {
    logo: complyCoreLogo,
    profile: storyProfile1,
    quote:
      "Working with Elevate trust to develop our marketing compliance platform was an excellent experience. The team quickly understood our product vision and translated complex requirements into a strong, practical technical solution.",
    name: "Reshu Choudhary",
    title: "Co-Founder, ComplyCore",
  },
  {
    logo: qjumpersLogo,
    profile: storyProfile2,
    quote:
      "Their agentic AI framework accelerated our product development cycle. We now ship intelligent features faster while maintaining the security standards our enterprise clients require.",
    name: "Amet Consec",
    title: "CEO at Qjumpers",
  },
];

export default function StoriesOfImpact() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const maxIndex = stories.length - 1;

  const measureOffset = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return 0;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-story-card]"));
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 24;

    let x = 0;
    for (let i = 0; i < index && i < cards.length; i += 1) {
      x += cards[i].offsetWidth + gap;
    }
    return x;
  }, []);

  useLayoutEffect(() => {
    setOffset(measureOffset(activeIndex));
    // Remeasure after focused/side width classes settle
    const t = window.setTimeout(() => {
      setOffset(measureOffset(activeIndex));
    }, 50);
    return () => window.clearTimeout(t);
  }, [activeIndex, measureOffset]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onResize = () => setOffset(measureOffset(activeIndex));
    const observer = new ResizeObserver(onResize);
    observer.observe(track);
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [activeIndex, measureOffset]);

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(maxIndex, i + 1));

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, startX: event.clientX };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    setDragX(dragRef.current.startX - event.clientX);
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    const delta = dragRef.current.startX - event.clientX;
    if (delta > 60) goNext();
    else if (delta < -60) goPrev();

    dragRef.current.active = false;
    setDragX(0);
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section
      className="relative overflow-hidden bg-[#113D77] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 xl:py-24"
      aria-label="Client testimonials"
    >
      <img
        src={storiesVector}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[340px] w-auto object-contain object-right-top opacity-95 sm:h-[440px] lg:h-[560px] xl:h-[640px]"
      />

      <div className="relative mx-auto w-full max-w-site">
        <div className="text-center">
          <p className="section-eyebrow font-semibold uppercase tracking-[0.16em]">
            <span className="text-white">Client </span>
            <span className="text-[#2365AA]">Testimonials</span>
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-[44px] xl:text-[50px] 2xl:text-[56px] min-[1920px]:text-[75px] min-[1920px]:leading-[0.97]">
            Stories of Impact
          </h2>

          <Link
            to="/case-studies"
            className="btn-cta mt-5 bg-white text-[#272935] hover:bg-white/90 sm:mt-6"
          >
            View all
            <img src={blueArrow} alt="" aria-hidden className="h-7 w-7 object-contain" />
          </Link>
        </div>

        {/* Figma shell ~1694×942 @ 2012 */}
        <div className="relative mt-10 sm:mt-12 lg:mt-14">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#1a4d8c]/40 sm:rounded-[40px] lg:rounded-[48px] xl:rounded-[56px]">
            <div className="px-4 pb-7 pt-5 sm:px-6 sm:pb-9 sm:pt-6 lg:px-8 lg:pb-10 lg:pt-7 xl:px-10">
              <div className="mb-5 flex items-center justify-between sm:mb-6 lg:mb-8">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous testimonial"
                  className="flex size-[44px] items-center justify-center rounded-full border border-white text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35 sm:size-[52px] lg:size-[57px]"
                >
                  <ArrowLeft className="size-5 sm:size-6 lg:size-8" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={activeIndex >= maxIndex}
                  aria-label="Next testimonial"
                  className="flex size-[44px] items-center justify-center rounded-full border border-white text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35 sm:size-[52px] lg:size-[57px]"
                >
                  <ArrowRight className="size-5 sm:size-6 lg:size-8" strokeWidth={2} />
                </button>
              </div>

              <div className="overflow-hidden">
                <div
                  ref={trackRef}
                  className={`stories-track flex items-stretch gap-4 sm:gap-5 lg:gap-6 xl:gap-7 ${dragging ? "is-dragging" : ""}`}
                  style={{ transform: `translate3d(-${offset + dragX}px, 0, 0)` }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={finishDrag}
                  onPointerCancel={finishDrag}
                >
                  {stories.map((story, index) => {
                    const focused = index === activeIndex;

                    return (
                      <article
                        key={`story-${index}`}
                        data-story-card
                        data-focused={focused}
                        onClick={() => setActiveIndex(index)}
                        className={[
                          "relative flex shrink-0 cursor-pointer flex-col overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[30px]",
                          // Smaller only on laptop (lg/xl < 1536); 2xl+ keeps previous large-screen sizes
                          "min-h-0 lg:min-h-[480px] xl:min-h-[520px] 2xl:min-h-[640px] min-[1920px]:min-h-[711px]",
                          focused
                            ? "w-[min(86vw,300px)] bg-white sm:w-[340px] md:w-[420px] lg:w-[560px] xl:w-[620px] 2xl:w-[740px] min-[1920px]:w-[798px]"
                            : "w-[180px] bg-[#F4F7F9] sm:w-[210px] md:w-[260px] lg:w-[360px] xl:w-[420px] 2xl:w-[520px] min-[1920px]:w-[590px]",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "relative flex h-full flex-col",
                            focused
                              ? "p-3.5 sm:p-4 md:p-5 lg:p-6 xl:px-8 xl:pt-8 xl:pb-7 2xl:px-12 2xl:pt-12 2xl:pb-10"
                              : "p-3 sm:p-3.5 md:p-4 lg:p-5 xl:p-6 2xl:p-8",
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-2 sm:gap-3">
                            <img
                              src={story.logo}
                              alt=""
                              className={[
                                "w-auto object-contain",
                                focused
                                  ? "h-7 max-w-[110px] sm:h-8 sm:max-w-[130px] md:h-9 md:max-w-[150px] lg:h-[48px] lg:max-w-[180px] xl:h-[56px] xl:max-w-[200px] 2xl:h-[76px] 2xl:max-w-[222px]"
                                  : "h-6 max-w-[90px] sm:h-7 sm:max-w-[110px] md:h-8 md:max-w-[130px] lg:h-9 lg:max-w-[150px] xl:h-10 xl:max-w-[170px] 2xl:h-12 2xl:max-w-[206px]",
                              ].join(" ")}
                            />

                            <img
                              src={story.profile}
                              alt={story.name}
                              className={[
                                "shrink-0 rounded-[12px] object-cover object-top sm:rounded-[14px] lg:rounded-[24px] 2xl:rounded-[30px]",
                                focused
                                  ? "size-14 sm:size-16 md:size-20 lg:size-[140px] xl:size-[160px] 2xl:size-[206px]"
                                  : "size-11 sm:size-12 md:size-14 lg:size-[110px] xl:size-[130px] 2xl:size-[170px] min-[1920px]:size-[206px]",
                              ].join(" ")}
                            />
                          </div>

                          <p
                            className={[
                              "mt-3 flex-1 text-[#5A5A5A] sm:mt-4 md:mt-5 lg:mt-6 2xl:mt-10",
                              focused
                                ? "text-[13px] leading-5 sm:text-sm sm:leading-5 md:text-[15px] md:leading-6 lg:max-w-[420px] lg:text-lg lg:leading-7 xl:max-w-[460px] xl:text-xl xl:leading-8 2xl:max-w-[520px] 2xl:text-2xl 2xl:leading-[35px]"
                                : "text-[11px] leading-4 sm:text-xs sm:leading-4 md:text-sm md:leading-5 lg:text-base lg:leading-6 xl:text-lg xl:leading-7 2xl:text-xl 2xl:leading-8",
                            ].join(" ")}
                          >
                            “{story.quote.replace(/^["“]|["”]$/g, "")}”
                          </p>

                          <div className="relative mt-3 flex items-end justify-between gap-2 pt-2 sm:mt-4 lg:mt-auto lg:gap-3 lg:pt-4">
                            <div className="min-w-0">
                              <p
                                className={[
                                  "font-bold text-[#272935]",
                                  focused
                                    ? "text-sm sm:text-[15px] md:text-base lg:text-lg 2xl:text-xl"
                                    : "text-xs sm:text-sm lg:text-sm 2xl:text-base",
                                ].join(" ")}
                              >
                                {story.name}
                              </p>
                              <p
                                className={[
                                  "mt-0.5 text-[#272935]/60",
                                  focused
                                    ? "text-[11px] sm:text-xs md:text-sm lg:text-sm 2xl:text-base"
                                    : "text-[10px] sm:text-[11px] md:text-xs lg:text-xs 2xl:text-sm",
                                ].join(" ")}
                              >
                                {story.title}
                              </p>
                            </div>

                            <span
                              className={[
                                "pointer-events-none select-none font-[Georgia,'Times_New_Roman',serif] leading-none text-[#272935]/10",
                                focused
                                  ? "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[104px]"
                                  : "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl",
                              ].join(" ")}
                              aria-hidden
                            >
                              ”
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
