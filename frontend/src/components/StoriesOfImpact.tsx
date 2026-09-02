import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import blueArrow from "../assets/homepage-icons/blue-arrow.png";
import storiesVector from "../assets/homepage-icons/stories-vector.png";
import { usePublicTestimonials } from "../hooks/useAdminData";
import { getOptimizedImageUrl } from "../lib/optimizeImageUrl";
import "./StoriesOfImpact.css";

type Story = {
  id: string;
  logo: string;
  profile: string;
  quote: string;
  fullQuote?: string;
  name: string;
  title: string;
};

const AUTO_ADVANCE_MS = 4500;

function StoryQuote({ text, className }: { text: string; className: string }) {
  const clean = text.replace(/^["“]|["”]$/g, "");
  const paragraphs = clean.split(/\n\n+/).filter(Boolean);

  if (paragraphs.length <= 1) {
    return <p className={className}>{clean}</p>;
  }

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={index > 0 ? "mt-4" : ""}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function StoriesOfImpact() {
  const { testimonials, loading, error, refresh } = usePublicTestimonials();
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const wasInViewRef = useRef(false);

  const stories: Story[] = testimonials.map((item) => ({
    id: item.id,
    logo: getOptimizedImageUrl(item.logoUrl, { width: 240, crop: "limit" }),
    profile: getOptimizedImageUrl(item.profileUrl, {
      width: 240,
      height: 240,
      crop: "fill",
    }),
    quote: item.quote,
    fullQuote: item.fullQuote || undefined,
    name: item.name,
    title: item.title,
  }));

  const maxIndex = Math.max(stories.length - 1, 0);

  useEffect(() => {
    setActiveIndex((prev) => {
      if (stories.length === 0) return 0;
      return Math.min(prev, stories.length - 1);
    });
  }, [stories.length]);

  // Start carousel only while visible; reset to first card when leaving / re-entering
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let retried = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.2);

        if (visible && !wasInViewRef.current) {
          setActiveIndex(0);
          if (!retried && (loading || error)) {
            retried = true;
            void refresh();
          }
        }
        if (!visible && wasInViewRef.current) {
          setActiveIndex(0);
          setExpandedIndex(null);
        }

        wasInViewRef.current = visible;
        setInView(visible);
      },
      { threshold: [0, 0.2, 0.35], rootMargin: "80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [error, loading, refresh]);

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
    const t = window.setTimeout(() => {
      setOffset(measureOffset(activeIndex));
    }, 50);
    return () => window.clearTimeout(t);
  }, [activeIndex, measureOffset, stories.length]);

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
  }, [activeIndex, measureOffset, stories.length]);

  useEffect(() => {
    if (
      !inView ||
      dragging ||
      cardHovered ||
      maxIndex <= 0 ||
      expandedIndex !== null ||
      stories.length === 0
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [activeIndex, cardHovered, dragging, expandedIndex, inView, maxIndex, stories.length]);

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
      ref={sectionRef}
      className="relative overflow-hidden bg-[#113D77] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 xl:py-24"
      aria-label="Client testimonials"
    >
      <img
        src={storiesVector}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute right-0 top-0 h-[340px] w-auto object-contain object-right-top opacity-95 sm:h-[440px] lg:h-[560px] xl:h-[640px]"
      />

      <div className="relative mx-auto w-full max-w-site">
        <div className="text-center">
          <p className="section-eyebrow font-semibold uppercase tracking-[0.16em]">
            <span className="text-white">Client </span>
            <span className="text-[#7DD3FC]">Testimonials</span>
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-[44px] xl:text-[50px] 2xl:text-[56px] min-[1920px]:text-[75px] min-[1920px]:leading-[0.97]">
            Stories of Impact
          </h2>

          <Link
            to="/case-studies"
            className="btn-cta mt-5 bg-white text-[#272935] hover:bg-white/90 sm:mt-6"
          >
            View all
            <img
              src={blueArrow}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="h-7 w-7 object-contain"
            />
          </Link>
        </div>

        <div className="relative mt-10 sm:mt-12 lg:mt-14">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#1a4d8c]/40 sm:rounded-[40px] lg:rounded-[48px] xl:rounded-[56px]">
            <div className="px-4 pb-7 pt-5 sm:px-6 sm:pb-9 sm:pt-6 lg:px-8 lg:pb-10 lg:pt-7 xl:px-10">
              {loading && stories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <p className="mt-3 text-sm text-white/80">Loading testimonials...</p>
                </div>
              ) : error && stories.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 text-center">
                  <p className="m-0 text-sm text-white/80">{error}</p>
                  <button
                    type="button"
                    onClick={() => void refresh()}
                    className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Retry
                  </button>
                </div>
              ) : stories.length === 0 ? (
                <p className="py-16 text-center text-sm text-white/80">
                  Testimonials will appear here once published.
                </p>
              ) : (
                <>
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
                            key={story.id}
                            data-story-card
                            data-focused={focused}
                            onClick={() => setActiveIndex(index)}
                            onMouseEnter={() => setCardHovered(true)}
                            onMouseLeave={() => setCardHovered(false)}
                            className={[
                              "relative flex shrink-0 cursor-pointer flex-col overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[30px]",
                              "min-h-0 lg:min-h-[480px] xl:min-h-[520px] 2xl:min-h-[640px] min-[1920px]:min-h-[711px]",
                              "w-[min(86vw,300px)] sm:w-[340px] md:w-[420px] lg:w-[560px] xl:w-[620px] 2xl:w-[740px] min-[1920px]:w-[798px]",
                              focused ? "bg-white" : "bg-[#F4F7F9]",
                            ].join(" ")}
                          >
                            <div className="relative flex h-full flex-col p-3.5 sm:p-4 md:p-5 lg:p-6 xl:px-8 xl:pt-8 xl:pb-7 2xl:px-12 2xl:pt-12 2xl:pb-10">
                              <div className="flex items-start justify-between gap-2 sm:gap-3">
                                {story.logo ? (
                                  <img
                                    src={story.logo}
                                    alt=""
                                    loading={focused ? "eager" : "lazy"}
                                    decoding="async"
                                    className="h-7 w-auto max-w-[110px] object-contain sm:h-8 sm:max-w-[130px] md:h-9 md:max-w-[150px] lg:h-[48px] lg:max-w-[180px] xl:h-[56px] xl:max-w-[200px] 2xl:h-[76px] 2xl:max-w-[222px]"
                                  />
                                ) : (
                                  <span />
                                )}
                              </div>

                              <p className="mt-2 flex-1 w-full text-[13px] leading-5 text-[#5A5A5A] sm:mt-2.5 sm:text-sm sm:leading-5 md:text-[15px] md:leading-6 lg:mt-3 lg:text-lg lg:leading-7 xl:text-xl xl:leading-8 2xl:text-2xl 2xl:leading-[35px]">
                                {story.quote.replace(/^["“]|["”]$/g, "")}
                                {story.fullQuote ? "..." : ""}
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

                              <div className="relative mt-3 flex items-center gap-2.5 pt-2 sm:mt-4 sm:gap-3 lg:mt-auto lg:gap-4 lg:pt-4">
                                <img
                                  src={story.profile}
                                  alt={story.name}
                                  loading={focused ? "eager" : "lazy"}
                                  decoding="async"
                                  className="size-16 shrink-0 rounded-full object-cover object-top sm:size-[72px] md:size-20 lg:size-24 xl:size-[104px] 2xl:size-[120px]"
                                />
                                <div className="min-w-0">
                                  <p className="text-sm font-bold text-[#272935] sm:text-[15px] md:text-base lg:text-lg 2xl:text-xl">
                                    {story.name}
                                  </p>
                                  <p className="mt-0.5 text-[11px] text-[#272935]/60 sm:text-xs md:text-sm lg:text-sm 2xl:text-base">
                                    {story.title}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
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

                <div className="pr-10 sm:pr-12">
                  {expandedStory.logo ? (
                    <img
                      src={expandedStory.logo}
                      alt=""
                      decoding="async"
                      className="h-8 w-auto max-w-[140px] object-contain sm:h-10 sm:max-w-[180px] lg:h-12 lg:max-w-[220px]"
                    />
                  ) : null}
                </div>

                <StoryQuote
                  text={expandedStory.fullQuote ?? expandedStory.quote}
                  className="mt-6 text-[15px] leading-7 text-[#5A5A5A] sm:mt-8 sm:text-base sm:leading-7 lg:text-lg lg:leading-8"
                />

                <div className="relative mt-8 flex items-center gap-3 border-t border-[#272935]/10 pt-6 sm:gap-4">
                  <img
                    src={expandedStory.profile}
                    alt={expandedStory.name}
                    decoding="async"
                    className="size-14 shrink-0 rounded-full object-cover object-top sm:size-16 lg:size-[72px]"
                  />
                  <div>
                    <p className="text-base font-bold text-[#272935] sm:text-lg">{expandedStory.name}</p>
                    <p className="mt-1 text-sm text-[#272935]/60 sm:text-base">{expandedStory.title}</p>
                  </div>
                </div>
              </article>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
