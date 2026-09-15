import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import blueArrow from "../assets/homepage-icons/blue-arrow.png";
import storiesVector from "../assets/homepage-icons/stories-vector.png";
import { usePublicTestimonials } from "../hooks/useAdminData";
import { getOptimizedImageUrl } from "../lib/optimizeImageUrl";
import "./StoriesOfImpact.css";

// Client testimonial assets
import roshanImg from "../assets/testimonial/RoshanHireHappyFeet.png";
import happyFeetCeo from "../assets/testimonial/happyFeetCEO.png";
import reshuImg from "../assets/testimonial/reshu-complyCore.jpeg";
import simonImg from "../assets/testimonial/simon-qjumper.png";
import threeIlogo from "../assets/testimonial/3i-Infotech-Logo 1.svg";
import genaiLogo from "../assets/testimonial/genai_logo-main 1.svg";
import image10Logo from "../assets/testimonial/image 10.svg";

type Story = {
  id: string;
  logo: string;
  profile: string;
  quote: string;
  fullQuote?: string;
  name: string;
  title: string;
};

const DEFAULT_STORIES: Story[] = [
  {
    id: "story-1",
    logo: threeIlogo,
    profile: happyFeetCeo,
    quote:
      "ElevateTrust built our autonomous AI pipeline that transformed our verification process, delivering 99.4% accuracy with zero downtime.",
    fullQuote:
      "ElevateTrust built our autonomous AI pipeline that transformed our verification process, delivering 99.4% accuracy with zero downtime. Their engineers integrated fine-tuned local models that scale effortlessly with our peak customer volumes.",
    name: "Alexandre Dumas",
    title: "CEO, HappyFeet",
  },
  {
    id: "story-2",
    logo: genaiLogo,
    profile: roshanImg,
    quote:
      "Their AI-native engineering team accelerated our product release cycle by 3x while cutting infrastructure compute costs by 45%.",
    fullQuote:
      "Their AI-native engineering team accelerated our product release cycle by 3x while cutting infrastructure compute costs by 45%. The level of technical depth and responsiveness made them an indispensable strategic partner.",
    name: "Roshan K.",
    title: "VP of Product Engineering",
  },
  {
    id: "story-3",
    logo: image10Logo,
    profile: reshuImg,
    quote:
      "ElevateTrust automated our complex compliance auditing using agentic workflows, saving our analysts hundreds of manual hours every month.",
    fullQuote:
      "ElevateTrust automated our complex compliance auditing using agentic workflows, saving our analysts hundreds of manual hours every month. The custom LLM tooling they built is secure, accurate, and incredibly intuitive.",
    name: "Reshu Sharma",
    title: "Head of Operations, ComplyCore",
  },
  {
    id: "story-4",
    logo: threeIlogo,
    profile: simonImg,
    quote:
      "From intelligent search to real-time analytics, their engineering team delivered high-impact AI capabilities that directly increased user retention.",
    fullQuote:
      "From intelligent search to real-time analytics, their engineering team delivered high-impact AI capabilities that directly increased user retention. We couldn't be happier with the outcome.",
    name: "Simon Vance",
    title: "Founder & CTO, QJumper",
  },
];

const AUTO_ADVANCE_MS = 4000;

function StoryQuote({ text, className }: { text: string; className: string }) {
  const clean = text.replace(/^["“]|["”]$/g, "");
  const paragraphs = clean.split(/\n\n+/).filter(Boolean);

  if (paragraphs.length <= 1) {
    return <p className={className}>{clean}</p>;
  }

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={index > 0 ? "mt-3" : ""}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function StoriesOfImpact() {
  const { testimonials } = usePublicTestimonials();
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Use API testimonials when available, otherwise use default stories
  const baseStories: Story[] =
    testimonials.length > 0
      ? testimonials.map((item) => ({
          id: item.id,
          logo: getOptimizedImageUrl(item.logoUrl, { width: 240, crop: "limit" }),
          profile: getOptimizedImageUrl(item.profileUrl, {
            width: 200,
            height: 200,
            crop: "fill",
          }),
          quote: item.quote,
          fullQuote: item.fullQuote || undefined,
          name: item.name,
          title: item.title,
        }))
      : DEFAULT_STORIES;

  const count = baseStories.length;
  // Repeat cards 5 times for seamless infinite loop runway
  const repeats = 5;
  const middleStart = Math.floor(repeats / 2) * count;

  const clonedStories = Array.from({ length: repeats }, () => baseStories).flat();

  const [currentIndex, setCurrentIndex] = useState(middleStart);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [inView, setInView] = useState(false);

  // Keep currentIndex in middle set when baseStories count changes
  useEffect(() => {
    setCurrentIndex(middleStart);
    setIsTransitioning(false);
  }, [count, middleStart]);

  // Observer to pause auto-advance when off-screen
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Measure pixel offset for current index
  const measureOffset = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return 0;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-story-card]"));
    if (!cards.length || index <= 0) return 0;

    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
    let x = 0;
    for (let i = 0; i < index && i < cards.length; i += 1) {
      x += cards[i].offsetWidth + gap;
    }
    return x;
  }, []);

  useLayoutEffect(() => {
    setOffset(measureOffset(currentIndex));
  }, [currentIndex, measureOffset]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onResize = () => setOffset(measureOffset(currentIndex));
    const observer = new ResizeObserver(onResize);
    observer.observe(track);
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [currentIndex, measureOffset]);

  // Turn transition back on after an instant jump
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Infinite seamless jump on transition end
  const handleTransitionEnd = () => {
    if (!isTransitioning) return;
    const middleEnd = middleStart + count;

    if (currentIndex >= middleEnd) {
      const normalized = middleStart + ((currentIndex - middleStart) % count);
      setIsTransitioning(false);
      setCurrentIndex(normalized);
    } else if (currentIndex < middleStart) {
      const diff = middleStart - currentIndex;
      const step = diff % count;
      const normalized = middleEnd - (step === 0 ? count : step);
      setIsTransitioning(false);
      setCurrentIndex(normalized);
    }
  };

  const goPrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((i) => i - 1);
  }, []);

  const goNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((i) => i + 1);
  }, []);

  // Auto-advance loop
  useEffect(() => {
    if (
      !inView ||
      dragging ||
      cardHovered ||
      expandedIndex !== null ||
      count <= 1
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      goNext();
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [cardHovered, count, dragging, expandedIndex, goNext, inView]);

  // Modal ESC key listener
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

  const expandedStory =
    expandedIndex !== null && expandedIndex < clonedStories.length
      ? clonedStories[expandedIndex]
      : null;

  // Touch / pointer drag gestures
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("button, a")) return;

    setIsTransitioning(false);
    dragRef.current = { active: true, startX: event.clientX };
    setDragging(true);
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {}
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    setDragX(dragRef.current.startX - event.clientX);
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    const delta = dragRef.current.startX - event.clientX;
    dragRef.current.active = false;
    setDragX(0);
    setDragging(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {}

    const threshold = 40;
    if (delta > threshold) {
      goNext();
    } else if (delta < -threshold) {
      goPrev();
    } else {
      setIsTransitioning(true);
    }
  };

  // Active item in base stories
  const activeBaseIndex = ((currentIndex % count) + count) % count;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#113D77] px-3 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-12"
      aria-label="Client testimonials"
    >
      <img
        src={storiesVector}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute right-0 top-0 h-[200px] w-auto object-contain object-right-top opacity-60 sm:h-[260px] lg:h-[340px]"
      />

      <div className="relative mx-auto w-full max-w-site">
        <div className="text-center">
          <p className="section-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-[#7DD3FC]">
            <span className="text-white">Client </span>
            <span className="text-[#7DD3FC]">Testimonials</span>
          </p>

          <h2 className="mt-1.5 text-2xl font-bold text-white sm:text-3xl lg:text-[36px] xl:text-[40px]">
            Stories of Impact
          </h2>

          <Link
            to="/case-studies"
            className="btn-cta mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#272935] transition hover:bg-white/90 sm:mt-4 sm:px-5 sm:py-2 sm:text-sm"
          >
            View all
            <img
              src={blueArrow}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="h-5 w-5 object-contain sm:h-6 sm:w-6"
            />
          </Link>
        </div>

        <div className="relative mt-6 sm:mt-8 lg:mt-9">
          <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#1a4d8c]/35 sm:rounded-[28px] lg:rounded-[32px]">
            <div className="px-3 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4 lg:px-6 lg:pb-6 lg:pt-5">
              <div className="mb-3 flex items-center justify-between sm:mb-4 lg:mb-5">
                <div className="flex items-center gap-1.5">
                  {baseStories.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeBaseIndex
                          ? "w-5 bg-[#7DD3FC]"
                          : "w-1.5 bg-white/30"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous testimonial"
                    className="flex size-8 items-center justify-center rounded-full border border-white/70 text-white transition hover:bg-white/15 active:scale-95 sm:size-9 lg:size-10"
                  >
                    <ArrowLeft className="size-4 sm:size-5" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next testimonial"
                    className="flex size-8 items-center justify-center rounded-full border border-white/70 text-white transition hover:bg-white/15 active:scale-95 sm:size-9 lg:size-10"
                  >
                    <ArrowRight className="size-4 sm:size-5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden">
                <div
                  ref={trackRef}
                  className={`stories-track flex items-stretch gap-3 sm:gap-4 lg:gap-5 ${dragging ? "is-dragging" : ""}`}
                  style={{
                    transform: `translate3d(-${offset + dragX}px, 0, 0)`,
                    transition:
                      isTransitioning && !dragging
                        ? "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)"
                        : "none",
                  }}
                  onTransitionEnd={handleTransitionEnd}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={finishDrag}
                  onPointerCancel={finishDrag}
                >
                  {clonedStories.map((story, index) => {
                    const isFocused = index === currentIndex;

                    return (
                      <article
                        key={`${story.id}-${index}`}
                        data-story-card
                        data-focused={isFocused}
                        onClick={() => {
                          setIsTransitioning(true);
                          setCurrentIndex(index);
                        }}
                        onMouseEnter={() => setCardHovered(true)}
                        onMouseLeave={() => setCardHovered(false)}
                        className={[
                          "relative flex shrink-0 cursor-pointer flex-col overflow-hidden rounded-[16px] sm:rounded-[20px]",
                          "w-[240px] xs:w-[250px] sm:w-[270px] md:w-[290px] lg:w-[320px] xl:w-[340px]",
                          "min-h-[200px] sm:min-h-[220px] md:min-h-[235px]",
                          "transition-all duration-300",
                          isFocused
                            ? "bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] ring-1 ring-[#2365AA]/20"
                            : "bg-[#F4F7F9] opacity-90 hover:opacity-100",
                        ].join(" ")}
                      >
                        <div className="relative flex h-full flex-col justify-between p-3.5 sm:p-4 md:p-4.5">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              {story.logo ? (
                                <img
                                  src={story.logo}
                                  alt=""
                                  loading={isFocused ? "eager" : "lazy"}
                                  decoding="async"
                                  className="h-5 sm:h-6 w-auto max-w-[100px] object-contain"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLElement).style.display = "none";
                                  }}
                                />
                              ) : (
                                <span />
                              )}
                            </div>

                            <p className="mt-2 text-xs leading-relaxed text-[#5A5A5A] line-clamp-3 sm:text-[13px] sm:line-clamp-4">
                              "{story.quote.replace(/^["“]|["”]$/g, "")}"
                            </p>

                            {story.fullQuote ? (
                              <button
                                type="button"
                                onPointerDown={(event) => event.stopPropagation()}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setExpandedIndex(index);
                                }}
                                className="relative z-10 mt-1 inline-block text-left text-[11px] font-semibold text-[#2365AA] transition hover:text-[#113D77] hover:underline sm:text-xs"
                              >
                                More
                              </button>
                            ) : null}
                          </div>

                          <div className="mt-3 flex items-center gap-2.5 border-t border-[#e2e8f0]/60 pt-2.5">
                            {story.profile ? (
                              <img
                                src={story.profile}
                                alt={story.name}
                                loading={isFocused ? "eager" : "lazy"}
                                decoding="async"
                                className="size-9 shrink-0 rounded-full object-cover object-top sm:size-10"
                                onError={(e) => {
                                  (e.currentTarget as HTMLElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2365AA]/10 text-xs font-bold text-[#2365AA] sm:size-10">
                                {story.name ? story.name.charAt(0).toUpperCase() : "U"}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-bold text-[#272935] sm:text-[13px]">
                                {story.name}
                              </p>
                              <p className="truncate text-[10px] text-[#272935]/65 sm:text-[11px]">
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
                className="story-modal relative max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-[20px] bg-white p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:rounded-[24px] sm:p-7"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(null)}
                  className="absolute right-3.5 top-3.5 inline-flex size-8 items-center justify-center rounded-full border border-[#272935]/10 bg-[#F4F7F9] text-[#272935] transition hover:bg-[#E8EEF3] sm:right-5 sm:top-5 sm:size-9"
                  aria-label="Close testimonial"
                >
                  <X className="size-4 sm:size-5" />
                </button>

                <div className="pr-10 sm:pr-12">
                  {expandedStory.logo ? (
                    <img
                      src={expandedStory.logo}
                      alt=""
                      decoding="async"
                      className="h-7 w-auto max-w-[130px] object-contain sm:h-8 sm:max-w-[160px]"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : null}
                </div>

                <StoryQuote
                  text={expandedStory.fullQuote ?? expandedStory.quote}
                  className="mt-4 text-xs leading-relaxed text-[#5A5A5A] sm:mt-6 sm:text-sm sm:leading-6"
                />

                <div className="relative mt-5 flex items-center gap-3 border-t border-[#272935]/10 pt-4 sm:mt-6 sm:gap-3.5">
                  {expandedStory.profile ? (
                    <img
                      src={expandedStory.profile}
                      alt={expandedStory.name}
                      decoding="async"
                      className="size-11 shrink-0 rounded-full object-cover object-top sm:size-12"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#2365AA]/10 text-sm font-bold text-[#2365AA] sm:size-12">
                      {expandedStory.name ? expandedStory.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-[#272935] sm:text-base">{expandedStory.name}</p>
                    <p className="mt-0.5 text-xs text-[#272935]/60 sm:text-sm">{expandedStory.title}</p>
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
