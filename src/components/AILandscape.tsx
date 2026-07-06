import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import landscape1 from "../assets/homepage-icons/landscape-1.svg";
import landscape2 from "../assets/homepage-icons/landscape-2.png";
import landscape3 from "../assets/homepage-icons/landscape-3.svg";
import landscape4 from "../assets/homepage-icons/landscape-4.svg";

import "./AILandscape.css";

interface AICard {
  title: string;
  items: string[];
  image: string;
}

const cards: AICard[] = [
  {
    title: "Survival Analysis\n& Prediction Model",
    items: [
      "Risk Stratification",
      "Predictive Maintenance",
      "Customer Churn Prediction",
    ],
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
      "Summary Creation",
      "Keyword Extraction",
      "Content Curation",
      "Quiz and Assessment",
    ],
    image: landscape3,
  },
];

export default function AILandscape() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [visibleCards, setVisibleCards] = useState(1);

  const maxIndex = Math.max(0, cards.length - visibleCards);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const updateLayout = () => {
      const card = track.querySelector("article");
      if (!card) return;

      const gap = parseFloat(getComputedStyle(track).gap) || 20;
      const cardWidth = card.getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      const nextVisible = Math.max(
        1,
        Math.floor((viewportWidth + gap) / (cardWidth + gap))
      );
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
    const delta = dragRef.current.startX - event.clientX;
    setDragOffset(delta);
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    const delta = dragRef.current.startX - event.clientX;
    const track = trackRef.current;
    const card = track?.querySelector("article");
    const gap = track
      ? parseFloat(getComputedStyle(track).gap) || 20
      : 20;
    const step = card ? card.getBoundingClientRect().width + gap : 300;
    const threshold = step * 0.2;

    if (delta > threshold) {
      setActiveIndex((i) => Math.min(maxIndex, i + 1));
    } else if (delta < -threshold) {
      setActiveIndex((i) => Math.max(0, i - 1));
    }

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
      className="ai-landscape px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:px-12 2xl:px-16"
      aria-label="Our AI Landscape"
    >
      <div className="mx-auto max-w-site w-full">
        <div className="text-center">
          <p className="section-eyebrow font-semibold uppercase tracking-[0.18em]">
            <span className="text-[#FFFFFF]">Smart Solutions for a </span>
            <span className="text-[#2e7ad1]">Smarter Tomorrow</span>
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#FFFFFF] sm:text-4xl lg:text-[44px] lg:leading-[1.15] xl:text-[50px] 2xl:text-[56px] min-[1920px]:text-[62px]">
            Our AI Landscape
          </h2>
        </div>

        <div className="relative mt-12 lg:mt-14">
          <div ref={viewportRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className={`ai-landscape__track ${isDragging ? "is-dragging" : ""}`}
              style={{
                transform: `translate3d(-${currentTransform}px, 0, 0)`,
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={finishDrag}
              onPointerCancel={finishDrag}
            >
              {cards.map((card, index) => {
                const variant = index % 2 === 0 ? "blue" : "light";
                return (
                  <article
                    key={`ai-card-${index}`}
                    className={`ai-card ai-card--${variant}${index % 2 !== 0 ? " ai-card--stagger" : ""}`}
                  >
                    <div>
                      <h3 className="ai-card__title whitespace-pre-line">
                        {card.title}
                      </h3>
                      <ul className="ai-card__list">
                        {card.items.map((item, idx) => (
                          <li key={idx}>
                            <span className="ai-card__check">
                              <Check strokeWidth={3} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="ai-card__illustration">
                      <img
                        src={card.image}
                        alt=""
                        aria-hidden
                        draggable={false}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-3xl xl:max-w-4xl items-center gap-6 px-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous card"
              className="ai-landscape__nav-btn"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            </button>

            <div className="ai-landscape__progress">
              <div
                className="ai-landscape__progress-fill"
                style={{ width: `${Math.min(100, progressPercent)}%` }}
              />
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex >= maxIndex}
              aria-label="Next card"
              className="ai-landscape__nav-btn"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
