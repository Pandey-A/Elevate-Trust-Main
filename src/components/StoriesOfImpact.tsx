import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import blueArrow from "../assets/homepage-icons/blue-arrow.png";
import arupaLogo from "../assets/client-strip/Arupa.svg";
import complyCoreLogo from "../assets/client-strip/ComplyCore.svg";
import qjumpersLogo from "../assets/client-strip/Qjumpers.svg";

import storiesVector from "../assets/homepage-icons/stories-vector.png";
import storyProfile1 from "../assets/homepage-icons/stories-1.svg";
import storyProfile2 from "../assets/homepage-icons/stories-2.svg";
import "./StoriesOfImpact.css";

const stories = [
  {
    logo: arupaLogo,
    logoClassName: "h-[28px] w-auto max-w-[120px] sm:h-[32px] sm:max-w-[140px]",
    profile: storyProfile1,
    quote:
      "Partnered with Elevate Trust for custom AI solutions and integration. The platform's adaptive learning and intelligent automation transformed our client success strategy and helped us deliver measurable ROI.",
    name: "Amet Consec",
    title: "CEO at ESI ecom",
  },
  {
    logo: complyCoreLogo,
    logoClassName: "h-[28px] w-auto max-w-[140px] sm:h-[32px] sm:max-w-[160px]",
    profile: storyProfile2,
    quote:
      "We have been incredibly impressed with the capabilities of this product. The adaptive learning algorithms and advanced automation significantly improved our operational efficiency and customer engagement.",
    name: "Amet Consec",
    title: "CEO at INFOTRACK",
  },
  {
    logo: arupaLogo,
    logoClassName: "h-[28px] w-auto max-w-[120px] sm:h-[32px] sm:max-w-[140px]",
    profile: storyProfile2,
    quote:
      "Elevate Trust helped us scale AI-driven workflows with confidence. Their team understood our domain quickly and delivered solutions that exceeded our expectations on timeline and quality.",
    name: "Amet Consec",
    title: "CEO at ESI ecom",
  },
  {
    logo: complyCoreLogo,
    logoClassName: "h-[28px] w-auto max-w-[140px] sm:h-[32px] sm:max-w-[160px]",
    profile: storyProfile1,
    quote:
      "The collaboration with Elevate Trust brought clarity to our AI roadmap. From proof of concept to production, every milestone was delivered with precision and deep technical expertise.",
    name: "Amet Consec",
    title: "CTO at ComplyCore",
  },
  {
    logo: qjumpersLogo,
    logoClassName: "h-[28px] w-auto max-w-[130px] sm:h-[32px] sm:max-w-[150px]",
    profile: storyProfile2,
    quote:
      "Their agentic AI framework accelerated our product development cycle. We now ship intelligent features faster while maintaining the security standards our enterprise clients require.",
    name: "Amet Consec",
    title: "CEO at Qjumpers",
  },
];

export default function StoriesOfImpact() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [visibleCards, setVisibleCards] = useState(1);

  const maxIndex = Math.max(0, stories.length - visibleCards);

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

      const gap = parseFloat(getComputedStyle(track).gap) || 24;
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
    const delta = dragRef.current.startX - event.clientX;
    setDragOffset(delta);
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    const delta = dragRef.current.startX - event.clientX;
    const track = trackRef.current;
    const card = track?.querySelector("article");
    const gap = track ? parseFloat(getComputedStyle(track).gap) || 24 : 24;
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

  return (
    <section
      className="stories-section relative overflow-hidden bg-[#113D77] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 2xl:px-16"
      aria-label="Client testimonials"
    >
      <img
        src={storiesVector}
        alt=""
        aria-hidden
        className="stories-vector pointer-events-none absolute right-0 top-0 h-[360px] w-auto sm:h-[440px] lg:h-[560px]"
      />

      <div className="relative mx-auto max-w-site w-full">
        <div className="text-center">
          <p className="section-eyebrow font-semibold uppercase tracking-[0.16em]">
            <span className="text-white">Client </span>
            <span className="text-[#2365AA]">Testimonials</span>
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-[44px] xl:text-[50px] 2xl:text-[56px] min-[1920px]:text-[62px] min-[2560px]:text-[68px]">
            Stories of Impact
          </h2>

          <a
            href="#"
            className="btn-cta mt-5 bg-white text-[#113D77] hover:bg-white/90"
          >
            View all
            <img
              src={blueArrow}
              alt=""
              aria-hidden
              className="h-7 w-7 object-contain"
            />
          </a>
        </div>

        <div className="relative mt-10 lg:mt-12">
          <div className="stories-slider-shell relative overflow-hidden rounded-[32px] border border-white/10 bg-[#1a4d8c]/45 backdrop-blur-[2px] sm:rounded-[40px] lg:rounded-[48px]">
            <div className="relative px-4 pb-7 pt-5 sm:px-6 sm:pb-8 sm:pt-6 lg:px-8 lg:pb-10 lg:pt-7">
              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous testimonial"
                  className="stories-nav-btn"
                >
                  <ArrowLeft className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={activeIndex >= maxIndex}
                  aria-label="Next testimonial"
                  className="stories-nav-btn"
                >
                  <ArrowRight className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              <div ref={viewportRef} className="overflow-hidden">
                <div
                  ref={trackRef}
                  className={`stories-track flex gap-4 sm:gap-5 lg:gap-6 ${isDragging ? "is-dragging" : ""}`}
                  style={{ transform: `translate3d(-${currentTransform}px, 0, 0)` }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={finishDrag}
                  onPointerCancel={finishDrag}
                >
                  {stories.map((story, index) => (
                    <article key={`story-${index}`} className="stories-card">
                      <div className="flex min-h-[360px] flex-col p-5 sm:min-h-[380px] sm:p-6">
                        <div className="flex items-start justify-between gap-3">
                          <img
                            src={story.logo}
                            alt=""
                            className={`object-contain ${story.logoClassName}`}
                          />
                          <img
                            src={story.profile}
                            alt=""
                            className="h-[60px] w-[60px] shrink-0 rounded-[14px] object-cover sm:h-[64px] sm:w-[64px]"
                          />
                        </div>

                        <p className="section-body mt-5 flex-1 leading-[1.65] text-[#272935]/90 sm:mt-6">
                          {story.quote}
                        </p>

                        <div className="relative mt-5 flex items-end justify-between gap-3 sm:mt-6">
                          {/* <div>
                            <p className="section-body-lg font-bold text-[#272935]">{story.name}</p>
                            <p className="section-body-sm mt-0.5 text-[#272935]/65">{story.title}</p>
                          </div> */}
                          <span className="stories-quote-mark" aria-hidden>
                            &rdquo;
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
