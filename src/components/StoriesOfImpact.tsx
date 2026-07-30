import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import blueArrow from "../assets/homepage-icons/blue-arrow.png";
import arupaLogo from "../assets/client-strip/Arupa.svg";
import complyCoreLogo from "../assets/client-strip/ComplyCore.svg";
import qjumpersLogo from "../assets/client-strip/Qjumpers.svg";
import happyFeetLogo from "../assets/client-strip/travellers.svg";
import roshanHirePhoto from "../assets/testimonial/RoshanHireHappyFeet.png";
import naritaMahajanPhoto from "../assets/testimonial/happyFeetCEO.png";
import reshuChoudharyPhoto from "../assets/testimonial/reshu-complyCore.jpeg";
import simonQjumpersPhoto from "../assets/testimonial/simon-qjumper.png";
import storiesVector from "../assets/homepage-icons/stories-vector.png";
import storyProfile1 from "../assets/homepage-icons/stories-1.svg";
import storyProfile2 from "../assets/homepage-icons/stories-2.svg";
import "./StoriesOfImpact.css";

type Story = {
  logo: string;
  profile: string;
  quote: string;
  fullQuote?: string;
  name: string;
  title: string;
};

const stories: Story[] = [
  {
    logo: complyCoreLogo,
    profile: reshuChoudharyPhoto,
    quote:
      "Working with Elevate trust to develop our marketing compliance platform was an excellent experience. The team quickly understood our product vision and translated complex requirements into a strong, practical technical solution. We appreciated their expertise, thoughtful approach, and commitment throughout the development process.",
    name: "Reshu Choudhary",
    title: "Co-Founder, ComplyCore",
  },
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
    logo: arupaLogo,
    profile: storyProfile2,
    quote:
      "Elevate Trust helped us scale AI-driven workflows with confidence. Their team understood our domain quickly and delivered solutions that exceeded our expectations on timeline and quality.",
    name: "Amet Consec",
    title: "CEO at ESI ecom",
  },
  {
    logo: qjumpersLogo,
    profile: simonQjumpersPhoto,
    quote:
      "Elevate Trust has become a trusted extension of our team. Whenever we need additional expertise, capability, or development capacity, they are quick to step in and deliver. What sets them apart is their commitment to understanding the business outcome before discussing the technology.",
    fullQuote:
      "Elevate Trust has become a trusted extension of our team. Whenever we need additional expertise, capability, or development capacity, they are quick to step in and deliver.\n\nWhat sets them apart is their commitment to understanding the business outcome before discussing the technology. From day one, they have focused on our goals, challenging assumptions, contributing ideas, and ensuring that every technical decision supports a real business objective.\n\nWe've worked with many technology providers over the years, and the difference with Elevate Trust is clear. They don't view projects as transactions. They take ownership of the outcome, remain engaged throughout the journey, and work alongside us until we are genuinely satisfied with the result. Their flexibility, responsiveness, and customer-first mindset make them a pleasure to work with.\n\nOne of the most significant projects Elevate Trust has delivered for us is the AI matching engine within our recruitment platform. The solution automatically scores applicants, explains its recommendations, and identifies high-quality candidates from our talent pool. Today, it is a cornerstone of our platform and a key competitive differentiator.\n\nTo achieve this, the Elevate Trust team invested considerable time evaluating alternative approaches, researching the latest advancements in AI, and designing a solution tailored to our needs. The result is the most accurate candidate matching system I have seen, and they continue to innovate and refine it as technology evolves.\n\nI would highly recommend Elevate Trust to any organisation looking for a technology partner that combines technical excellence with a genuine commitment to achieving business results.",
    name: "Simon Oldham",
    title: "CEO & Co-Founder, QJumpers",
  },
];

const AUTO_ADVANCE_MS = 4500;

function StoryQuote({ text, className }: { text: string; className: string }) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  if (paragraphs.length <= 1) {
    return <p className={className}>“{text.replace(/^["“]|["”]$/g, "")}”</p>;
  }

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={index > 0 ? "mt-4" : ""}>
          {index === 0 ? "“" : ""}
          {paragraph}
          {index === paragraphs.length - 1 ? "”" : ""}
        </p>
      ))}
    </div>
  );
}

export default function StoriesOfImpact() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

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

  useEffect(() => {
    if (dragging || cardHovered || maxIndex <= 0 || expandedIndex !== null) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [activeIndex, dragging, cardHovered, maxIndex, expandedIndex]);

  useEffect(() => {
    if (expandedIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedIndex(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [expandedIndex]);

  const expandedStory = expandedIndex !== null ? stories[expandedIndex] : null;

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(maxIndex, i + 1));

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("button, a")) return;

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
                        onMouseEnter={() => setCardHovered(true)}
                        onMouseLeave={() => setCardHovered(false)}
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
                            “{story.quote.replace(/^["“]|["”]$/g, "")}
                            {story.fullQuote ? "..." : ""}”
                          </p>

                          {story.fullQuote && focused ? (
                            <button
                              type="button"
                              onPointerDown={(event) => event.stopPropagation()}
                              onClick={(event) => {
                                event.stopPropagation();
                                setExpandedIndex(index);
                              }}
                              className="relative z-10 mt-2 w-fit text-left text-sm font-semibold text-[#2365AA] transition hover:text-[#113D77] hover:underline sm:text-[15px] lg:text-base"
                            >
                              More
                            </button>
                          ) : null}

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

      {expandedStory
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b1220]/72 p-4 backdrop-blur-[2px] sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-label={`${expandedStory.name} testimonial`}
              onClick={() => setExpandedIndex(null)}
            >
              <article
                className="story-modal relative max-h-[90vh] w-full max-w-[860px] overflow-y-auto rounded-[24px] bg-white p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:rounded-[30px] sm:p-8 lg:p-10"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(null)}
                  className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-[#272935]/10 bg-[#F4F7F9] text-[#272935] transition hover:bg-[#E8EEF3] sm:right-6 sm:top-6"
                  aria-label="Close testimonial"
                >
                  <X className="size-5" />
                </button>

                <div className="flex items-start justify-between gap-4 pr-10 sm:gap-6 sm:pr-12">
                  <img
                    src={expandedStory.logo}
                    alt=""
                    className="h-8 w-auto max-w-[140px] object-contain sm:h-10 sm:max-w-[180px] lg:h-12 lg:max-w-[220px]"
                  />
                  <img
                    src={expandedStory.profile}
                    alt={expandedStory.name}
                    className="size-20 shrink-0 rounded-[16px] object-cover object-top sm:size-24 lg:size-32 lg:rounded-[24px]"
                  />
                </div>

                <StoryQuote
                  text={expandedStory.fullQuote ?? expandedStory.quote}
                  className="mt-6 text-[15px] leading-7 text-[#5A5A5A] sm:mt-8 sm:text-base sm:leading-7 lg:text-lg lg:leading-8"
                />

                <div className="relative mt-8 flex items-end justify-between gap-4 border-t border-[#272935]/10 pt-6">
                  <div>
                    <p className="text-base font-bold text-[#272935] sm:text-lg">{expandedStory.name}</p>
                    <p className="mt-1 text-sm text-[#272935]/60 sm:text-base">{expandedStory.title}</p>
                  </div>
                  <span
                    className="pointer-events-none select-none font-[Georgia,'Times_New_Roman',serif] text-5xl leading-none text-[#272935]/10 sm:text-6xl"
                    aria-hidden
                  >
                    ”
                  </span>
                </div>
              </article>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
