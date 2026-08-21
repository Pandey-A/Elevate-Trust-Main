import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import landscape1 from "../assets/homepage-icons/landscape-1.svg";
import landscape2 from "../assets/homepage-icons/landscape-2.png";
import landscape3 from "../assets/homepage-icons/landscape-3.svg";
import landscape4 from "../assets/homepage-icons/landscape-4.svg";

interface AICard {
  title: string;
  items: string[];
  image: string;
}

const cards: AICard[] = [
  {
    title: "Survival Analysis\n& Prediction Model",
    items: ["Heart patient Survival Analysis", "Customer attrition model"],
    image: landscape1,
  },
  {
    title: "Gen AI Matching\nEngine",
    items: [
      "Content Recommendation",
      "Course Recommendation",
      "Job title vs Resume Matching",
    ],
    image: landscape2,
  },
  {
    title: "Agentic Bot",
    items: [
      "Multi-Agent Healthcare",
      "Multi-Agent Ed Tech bot",
      "Virtual agent for Game industry",
    ],
    image: landscape3,
  },
  {
    title: "Digitization of\nContent",
    items: [
      "Text & Image Extraction (OCR)",
      "Text to Speech",
      "Speech to Text",
      "Translation",
    ],
    image: landscape4,
  },
  {
    title: "Audio & Video\nAnalytics",
    items: [
      "Deepfake Detection",
      "Driver behaviour Detection",
      "Converting camera into AI Edge",
      "Live Polls over Video E-proctoring",
    ],
    image: landscape1,
  },
  {
    title: "Content\nGeneration",
    items: [
      "Summary Creator",
      "Keyword Extractor",
      "Content Curation",
      "Quiz and Assessment",
    ],
    image: landscape3,
  },
];

const AUTO_ADVANCE_MS = 4500;

export default function AILandscape() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });
  const wasInViewRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [visibleCards, setVisibleCards] = useState(1);
  const [cardHovered, setCardHovered] = useState(false);
  const [inView, setInView] = useState(false);

  const maxIndex = Math.max(0, cards.length - visibleCards);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.2);
        if (visible && !wasInViewRef.current) {
          setActiveIndex(0);
        }
        if (!visible && wasInViewRef.current) {
          setActiveIndex(0);
        }
        wasInViewRef.current = visible;
        setInView(visible);
      },
      { threshold: [0, 0.2, 0.35] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || isDragging || cardHovered || maxIndex <= 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [activeIndex, cardHovered, inView, isDragging, maxIndex]);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const updateLayout = () => {
      const card = track.querySelector("article");
      if (!card) return;

      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 20;
      const cardWidth = card.getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      const nextVisible = Math.max(1, Math.floor((viewportWidth + gap) / (cardWidth + gap)));
      setVisibleCards(nextVisible);
      setSlideOffset(activeIndex * (cardWidth + gap));
    };

    updateLayout();

    const observer = new ResizeObserver(updateLayout);
    observer.observe(viewport);
    observer.observe(track);

    return () => observer.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startOffset: slideOffset,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    setDragOffset(dragRef.current.startX - event.clientX);
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    const delta = dragRef.current.startX - event.clientX;
    const track = trackRef.current;
    const card = track?.querySelector("article");
    const gap = track
      ? parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 20
      : 20;
    const step = card ? card.getBoundingClientRect().width + gap : 300;
    const threshold = step * 0.2;

    if (delta > threshold) setActiveIndex((i) => Math.min(maxIndex, i + 1));
    else if (delta < -threshold) setActiveIndex((i) => Math.max(0, i - 1));

    dragRef.current.active = false;
    setDragOffset(0);
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const currentTransform = slideOffset + dragOffset;
  const progressPercent =
    maxIndex > 0 ? ((activeIndex + visibleCards) / cards.length) * 100 : 100;

  return (
    <section
      ref={sectionRef}
      className="bg-[#113D77] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 xl:py-24 min-[1920px]:py-[100px]"
      aria-label="Our AI Landscape"
    >
      <div className="mx-auto w-full max-w-site">
        <div className="text-center">
          <p className="section-eyebrow font-semibold uppercase tracking-[0.16em]">
            <span className="text-white">Smart Solutions for a </span>
            <span className="text-[#7DD3FC]">Smarter Tomorrow</span>
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-[0.97] text-white sm:text-4xl lg:text-[44px] xl:text-[50px] 2xl:text-[56px] min-[1920px]:text-[75px]">
            Our AI Landscape
          </h2>
        </div>

        <div className="relative mt-10 sm:mt-12 lg:mt-14">
          <div ref={viewportRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className={[
                "flex items-start gap-4 pb-8 sm:gap-5 lg:gap-6 xl:gap-7",
                "cursor-grab touch-pan-y will-change-transform",
                isDragging
                  ? "cursor-grabbing transition-none"
                  : "transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              ].join(" ")}
              style={{ transform: `translate3d(-${currentTransform}px, 0, 0)` }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={finishDrag}
              onPointerCancel={finishDrag}
            >
              {cards.map((card, index) => {
                const isBlue = index % 2 === 0;
                // Figma wave: cards at index 1 & 4 sit lower
                const isStaggered = index % 3 === 1;

                return (
                  <article
                    key={`ai-card-${index}`}
                    onMouseEnter={() => setCardHovered(true)}
                    onMouseLeave={() => setCardHovered(false)}
                    className={[
                      "relative flex shrink-0 flex-col justify-between overflow-hidden select-none",
                      "w-[260px] min-h-[340px] rounded-[22px] px-5 pt-6 sm:w-[300px] sm:min-h-[380px] sm:rounded-[26px] sm:px-6 sm:pt-7",
                      "lg:w-[320px] lg:min-h-[400px] lg:rounded-[28px] lg:px-7 lg:pt-8",
                      "xl:w-[340px] xl:min-h-[430px] xl:rounded-[30px]",
                      "2xl:w-[360px] 2xl:min-h-[450px]",
                      "min-[1920px]:w-[378px] min-[1920px]:min-h-[470px] min-[1920px]:rounded-[30px] min-[1920px]:px-8 min-[1920px]:pt-9",
                      isBlue ? "bg-[#2365AA] text-white" : "bg-[#F4F7F9] text-[#272935]",
                      isStaggered
                        ? "translate-y-6 sm:translate-y-7 lg:translate-y-8 xl:translate-y-10 min-[1920px]:translate-y-[88px]"
                        : "translate-y-0",
                    ].join(" ")}
                  >
                    <div>
                      <h3
                        className={[
                          "m-0 whitespace-pre-line font-semibold leading-[1.06]",
                          "text-[20px] sm:text-[22px] lg:text-[24px] xl:text-[28px] min-[1920px]:text-[32px]",
                          isBlue ? "text-white" : "text-[#272935]",
                        ].join(" ")}
                      >
                        {card.title}
                      </h3>

                      <ul className="mt-4 m-0 flex list-none flex-col gap-2.5 p-0 sm:mt-5 sm:gap-3 min-[1920px]:mt-6 min-[1920px]:gap-3.5">
                        {card.items.map((item) => (
                          <li
                            key={item}
                            className={[
                              "flex items-start gap-2.5 text-[13px] leading-[1.45] sm:text-sm lg:text-[15px] xl:text-base min-[1920px]:text-[20px] min-[1920px]:leading-[1.5]",
                              isBlue ? "text-white/95" : "text-[#272935]",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "mt-0.5 flex size-[16px] shrink-0 items-center justify-center rounded-full sm:size-[18px] min-[1920px]:size-5",
                                isBlue
                                  ? "bg-white/20 text-white"
                                  : "bg-[#C5D9EC] text-[#2365AA]",
                              ].join(" ")}
                            >
                              <Check className="size-2.5 sm:size-3 min-[1920px]:size-3.5" strokeWidth={3} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto flex justify-end pt-5">
                      <img
                        src={card.image}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="pointer-events-none h-auto w-[120px] object-contain sm:w-[140px] lg:w-[150px] xl:w-[160px] min-[1920px]:w-[172px]"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[280px] items-center justify-center gap-3.5 sm:mt-10 sm:max-w-[360px] sm:gap-4 lg:max-w-[480px] lg:gap-[18px] xl:max-w-[580px] 2xl:max-w-[640px] min-[1920px]:mt-12 min-[1920px]:max-w-[720px] min-[1920px]:gap-[22px]">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous card"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white bg-transparent text-white transition hover:scale-105 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 sm:size-10 lg:size-[44px] lg:border-2 min-[1920px]:size-[57px]"
            >
              <ArrowLeft className="size-4 sm:size-5 min-[1920px]:size-8" strokeWidth={2.25} />
            </button>

            <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-[#A1B1CB]/75 sm:h-[5px] xl:h-1.5">
              <div
                className="h-full rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.35)] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: `${Math.min(100, progressPercent)}%` }}
              />
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex >= maxIndex}
              aria-label="Next card"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white bg-transparent text-white transition hover:scale-105 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 sm:size-10 lg:size-[44px] lg:border-2 min-[1920px]:size-[57px]"
            >
              <ArrowRight className="size-4 sm:size-5 min-[1920px]:size-8" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
