import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import DemoPlayCover from "../components/DemoPlayCover";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import { type IndustryTag } from "../data/adminDefaults";
import { normalizeIndustryTags } from "../data/industries";
import { useDemoTags, usePublicDemos } from "../hooks/useAdminData";
import type { AdminDemo } from "../data/adminDefaults";

type IndustryFilter = "All" | IndustryTag;

function resolveIndustryFromQuery(
  value: string | null,
  tags: string[],
): IndustryFilter {
  if (!value) return "All";
  const decoded = decodeURIComponent(value).trim();
  if (decoded.toLowerCase() === "all") return "All";
  const match = tags.find((tag) => tag.toLowerCase() === decoded.toLowerCase());
  return match ?? "All";
}
const DEMO_CASE_STUDY_HREF: Record<string, string> = {
  "demo-sdlc": "/case-studies/genai-enabled-sdlc",
};

const DEMO_BLURBS: Record<string, string> = {
  "demo-company-overview":
    "A quick walkthrough of ElevateTrust.AI capabilities across agents, analytics, and responsible AI delivery. See how we partner with teams to move from idea to production.",
  "demo-competitor-analysis":
    "Watch an agent gather competitor signals, summarize market context, and surface actionable insights. Built for retail and fintech teams that need faster competitive intelligence.",
  "demo-pii":
    "Detect and anonymize personally identifiable information in documents and datasets. Designed for healthcare, finance, and public-sector privacy workflows.",
  "demo-redaction":
    "Automatically redact sensitive fields before content is shared or archived. Helps compliance teams reduce manual review while protecting confidential data.",
  "demo-weapon":
    "Real-time weapon detection from camera feeds with clear alerts for security teams. Useful for public venues and high-risk environments.",
  "demo-fencing":
    "Virtual fencing that flags unauthorized entry into restricted zones. Supports manufacturing floors, logistics yards, and secured public sites.",
  "demo-deepfake":
    "Identify manipulated media with multimodal deepfake detection. Helps platforms and institutions respond faster to synthetic fraud and misuse.",
  "demo-face":
    "Match faces across camera streams for verification and access workflows. Suited to campus, education, and controlled-facility use cases.",
  "demo-llmops":
    "See how we operate LLM pipelines with monitoring, evaluation, and controlled rollout. Built for teams deploying generative AI in production.",
  "demo-fire":
    "Detect fire and smoke early from existing camera infrastructure. Enables faster response across industrial and logistics sites.",
  "demo-crowd":
    "Monitor crowd density and movement patterns in real time. Supports safety planning for public spaces, events, and campuses.",
  "demo-fall":
    "Detect falls and unusual posture events from video streams. Helps healthcare and public facilities respond quickly to incidents.",
  "demo-attendance":
    "Turn standard cameras into an automated attendance system. Reduces manual roll-call effort for education and workplace settings.",
  "demo-automation":
    "An agent that drafts and routes email and social responses with human review. Speeds content operations for marketing and support teams.",
  "demo-crop":
    "Predict crop price movements using historical and market signals. Supports planning for agribusiness and supply-chain teams.",
  "demo-sdlc":
    "Explore GenAI across the software lifecycle with role-based tools, governance, and measurable delivery gains. Pair this demo with our SDLC enablement case study.",
  "demo-depth":
    "Estimate depth and spatial structure from visual inputs for inspection and measurement workflows. Useful in industrial and logistics environments.",
  "demo-medical":
    "Assist medical coding with AI that suggests codes from clinical documentation. Built for healthcare revenue-cycle and compliance teams.",
  "demo-unauthorized":
    "Flag unauthorized access events from camera and access-control signals. Strengthens security operations in finance and public facilities.",
  "demo-healthcare-analytics":
    "Surface operational and clinical analytics insights for healthcare teams. Helps leaders prioritize interventions with clearer, faster reporting.",
};

function getDemoBlurb(demo: AdminDemo) {
  return (
    DEMO_BLURBS[demo.id] ??
    `Live walkthrough of ${demo.title}. Explore how ElevateTrust.AI applies this capability in real business workflows.`
  );
}

function getCaseStudyHref(demo: AdminDemo) {
  return DEMO_CASE_STUDY_HREF[demo.id] ?? null;
}

const industryCopy: Record<
  IndustryFilter,
  { title: string; description: string }
> = {
  All: {
    title: "Explore demos across every industry we serve",
    description:
      "Browse live walkthroughs of ElevateTrust.AI agents, video analytics, and responsible AI workflows, then filter by industry to find what matters most.",
  },
  "Healthcare and Life Sciences": {
    title: "AI demos for Healthcare and Life Sciences",
    description:
      "See how we support clinical and operational teams with privacy-aware AI, medical coding, analytics, and safer automation in healthcare settings.",
  },
  "Financial Services & FinTech": {
    title: "AI demos for Financial Services & FinTech",
    description:
      "Explore agents and analytics that strengthen risk management, compliance, customer operations, and decision intelligence in financial workflows.",
  },
  "E-commerce & Retail": {
    title: "AI demos for E-commerce & Retail",
    description:
      "Watch how AI agents and automation improve competitive insight, customer engagement, and retail operations.",
  },
  "Education & E-Learning": {
    title: "AI demos for Education & E-Learning",
    description:
      "See practical AI that improves attendance, campus safety, learning operations, and day-to-day institutional efficiency.",
  },
  "Logistics & Supply Chain": {
    title: "AI demos for Logistics & Supply Chain",
    description:
      "Discover vision and prediction demos that help monitor assets, improve movement visibility, and support supply-chain decisions.",
  },
  "Manufacturing & Industry 4.0": {
    title: "AI demos for Manufacturing & Industry 4.0",
    description:
      "Explore industrial AI for safety monitoring, depth sensing, process intelligence, and smarter production environments.",
  },
  "Social Media & Entertainment": {
    title: "AI demos for Social Media & Entertainment",
    description:
      "Learn how deepfake detection, automation agents, and audience analytics support safer and smarter digital experiences.",
  },
  "Public Sector & Government": {
    title: "AI demos for Public Sector & Government",
    description:
      "See how computer vision and responsible AI support public safety, access control, crowd monitoring, and secure operations.",
  },
};

function youtubeEmbed(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    playsinline: "1",
    fs: "1",
    disablekb: "0",
    cc_load_policy: "0",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export default function Demo() {
  const { demos, loading: demosLoading, error: demosError } = usePublicDemos();
  const { tags: demoTags } = useDemoTags();
  const industryFilters = useMemo<IndustryFilter[]>(
    () => ["All", ...demoTags],
    [demoTags],
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDemo, setActiveDemo] = useState<AdminDemo | null>(null);
  const [activeIndustry, setActiveIndustry] = useState<IndustryFilter>("All");
  const filterRailRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const filteredDemos = useMemo(() => {
    if (activeIndustry === "All") return demos;
    return demos.filter((demo) =>
      normalizeIndustryTags(demo.industries).includes(activeIndustry),
    );
  }, [activeIndustry, demos]);

  useEffect(() => {
    setActiveIndustry(resolveIndustryFromQuery(searchParams.get("industry"), demoTags));
  }, [searchParams, demoTags]);

  const activeIndustryCopy =
    industryCopy[activeIndustry] ??
    (activeIndustry === "All"
      ? industryCopy.All
      : {
          title: `AI demos for ${activeIndustry}`,
          description: `Browse ElevateTrust.AI walkthroughs tagged with ${activeIndustry}.`,
        });

  const selectIndustry = (industry: IndustryFilter) => {
    setActiveIndustry(industry);
    if (industry === "All") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ industry }, { replace: true });
    }
  };

  const updateFilterScrollState = () => {
    const rail = filterRailRef.current;
    if (!rail) return;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    setCanScrollLeft(rail.scrollLeft > 4);
    setCanScrollRight(maxScroll > 4 && rail.scrollLeft < maxScroll - 4);
  };

  const scrollFilters = (direction: "left" | "right") => {
    const rail = filterRailRef.current;
    if (!rail) return;
    const amount = Math.min(280, Math.max(160, rail.clientWidth * 0.55));
    rail.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    updateFilterScrollState();
    const rail = filterRailRef.current;
    if (!rail) return;

    const onScroll = () => updateFilterScrollState();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateFilterScrollState);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateFilterScrollState())
        : null;
    observer?.observe(rail);

    const frame = window.requestAnimationFrame(updateFilterScrollState);

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateFilterScrollState);
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!activeDemo) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveDemo(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeDemo]);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      <section className="service-page-hero" aria-label="Demo">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#8eb4df] 2xl:text-base">
            Resources
          </p>
          <h1 className="m-0 text-[clamp(32px,4vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            Demo
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            Advancing Your Business with Smart Tech, explore live walkthroughs
            of our AI agents, video analytics, and responsible AI capabilities.
          </p>
          <Link
            to="/contact"
            className="mt-[clamp(16px,2vw,28px)] inline-flex items-center gap-1.5 rounded-full bg-[#2365aa] py-3 pl-[26px] pr-3.5 text-base font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490] lg:py-2.5 lg:pl-[22px] lg:pr-2.5 lg:text-sm 2xl:py-3 2xl:pl-[26px] 2xl:pr-3.5 2xl:text-base"
          >
            Contact Us
            <span className="inline-flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white text-[#2365aa]">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-40 h-[280px] w-[280px] rounded-full bg-[#EFF7FC] blur-3xl sm:h-[360px] sm:w-[360px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-24 h-[240px] w-[240px] rounded-full bg-[#EFF7FC] blur-3xl sm:h-[320px] sm:w-[320px]"
        />

        <div className="page-breadcrumb-wrap">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link
              to="/"
              className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
            >
              Home
            </Link>
            <span className="text-[#848b9b]">»</span>
            <span>Resources</span>
            <span className="text-[#848b9b]">»</span>
            <span>Demo</span>
          </nav>
        </div>

        <div className="relative mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] pt-0 sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(28px,3.5vw,44px)] max-w-[52rem] text-center">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Empowering Industries with AI Demos
            </h2>
            <p className="mx-auto mt-4 max-w-[42rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px] 2xl:leading-8">
              Enhance your decision-making with live walkthroughs of our AI
              agents, video analytics, and responsible AI capabilities.
            </p>
          </header>

          <div className="mx-auto mb-[clamp(28px,3.5vw,48px)] max-w-[1100px]">
            <div className="relative rounded-[18px] border border-[#e2ebf3] bg-[#F5F9FC] sm:rounded-[22px]">
              <button
                type="button"
                onClick={() => scrollFilters("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll filters left"
                className={`absolute left-1 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#d7e6f3] bg-white text-[#2365aa] shadow-[0_8px_18px_-12px_rgba(17,61,119,0.55)] transition-all sm:left-1.5 sm:h-9 sm:w-9 ${
                  canScrollLeft
                    ? "opacity-100 hover:bg-[#EFF7FC]"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <ChevronLeft size={18} strokeWidth={2.4} />
              </button>

              <button
                type="button"
                onClick={() => scrollFilters("right")}
                disabled={!canScrollRight}
                aria-label="Scroll filters right"
                className={`absolute right-1 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#d7e6f3] bg-white text-[#2365aa] shadow-[0_8px_18px_-12px_rgba(17,61,119,0.55)] transition-all sm:right-1.5 sm:h-9 sm:w-9 ${
                  canScrollRight
                    ? "opacity-100 hover:bg-[#EFF7FC]"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <ChevronRight size={18} strokeWidth={2.4} />
              </button>

              <div
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 left-0 w-12 rounded-l-[18px] bg-gradient-to-r from-[#F5F9FC] to-transparent transition-opacity sm:w-14 sm:rounded-l-[22px] ${
                  canScrollLeft ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 right-0 w-12 rounded-r-[18px] bg-gradient-to-l from-[#F5F9FC] to-transparent transition-opacity sm:w-14 sm:rounded-r-[22px] ${
                  canScrollRight ? "opacity-100" : "opacity-0"
                }`}
              />

              <div
                ref={filterRailRef}
                className="flex gap-1 overflow-x-auto px-10 py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-12 sm:py-1.5 [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Filter demos by industry"
              >
                {industryFilters.map((industry) => {
                  const isActive = activeIndustry === industry;
                  return (
                    <button
                      key={industry}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => selectIndustry(industry)}
                      className={`relative shrink-0 cursor-pointer border-0 bg-transparent px-2.5 py-3 text-[10px] font-semibold tracking-wide transition-colors duration-300 sm:px-2 sm:text-[11px] md:px-2.5 md:text-xs lg:px-3 lg:text-[13px] xl:text-sm ${
                        isActive
                          ? "text-[#113d77]"
                          : "text-[#687181] hover:text-[#2365aa]"
                      }`}
                    >
                      <span className="whitespace-nowrap">{industry}</span>
                      <span
                        className={`absolute inset-x-2 bottom-1 h-[2.5px] rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-[#2365aa] opacity-100"
                            : "bg-transparent opacity-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              key={activeIndustry}
              className="mt-8 text-center sm:mt-10"
              role="tabpanel"
            >
              <h3 className="m-0 text-[clamp(20px,2.4vw,32px)] font-bold leading-snug text-[#1F2432]">
                {activeIndustryCopy.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[40rem] text-[clamp(13px,1.15vw,16px)] leading-7 text-[#687181]">
                {activeIndustryCopy.description}
              </p>
            </div>
          </div>

          {demosError ? (
            <div className="rounded-[20px] border border-[#d7e6f3] bg-[#EEF3FB] px-6 py-10 text-center">
              <p className="m-0 text-[clamp(14px,1.2vw,16px)] text-[#2365aa]">
                {demosError}
              </p>
            </div>
          ) : demosLoading ? (
            <div className="rounded-[20px] border border-[#d7e6f3] bg-[#EFF7FC] px-6 py-16 text-center">
              <p className="m-0 text-[clamp(14px,1.2vw,16px)] text-[#687181]">
                Loading demos...
              </p>
            </div>
          ) : filteredDemos.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:gap-8">
              {filteredDemos.map((demo) => {
                const caseStudyHref = getCaseStudyHref(demo);
                const industries = normalizeIndustryTags(demo.industries);

                return (
                  <article
                    key={demo.id}
                    className="flex flex-col overflow-hidden rounded-[20px] border border-[#d7e6f3] bg-white shadow-[0_14px_40px_-28px_rgba(17,61,119,0.35)] transition-shadow duration-300 hover:shadow-[0_18px_44px_-24px_rgba(17,61,119,0.5)]"
                  >
                    <DemoPlayCover
                      demo={demo}
                      aspectClassName="aspect-[16/10]"
                      showTitle
                      onPlay={() => setActiveDemo(demo)}
                    />

                    <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
                      <h3 className="m-0 text-[clamp(16px,1.3vw,20px)] font-bold leading-snug text-[#1F2432] 2xl:text-[22px]">
                        {demo.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-[clamp(13px,1.1vw,15px)] leading-6 text-[#687181]">
                        {getDemoBlurb(demo)}
                      </p>

                      {industries.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {industries.slice(0, 3).map((industry) => (
                            <span
                              key={industry}
                              className="rounded-full bg-[#EFF7FC] px-2.5 py-1 text-[11px] font-semibold text-[#2365aa]"
                            >
                              {industry}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-auto flex flex-col gap-2.5 pt-5 sm:flex-row sm:flex-wrap">
                        <button
                          type="button"
                          onClick={() => setActiveDemo(demo)}
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-[#2365aa] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1a5490]"
                        >
                          <Play size={15} fill="currentColor" />
                          See demo
                        </button>

                        {caseStudyHref ? (
                          <Link
                            to={caseStudyHref}
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#2365aa] bg-white px-4 py-2.5 text-sm font-medium text-[#2365aa] no-underline transition-colors hover:bg-[#EFF7FC]"
                          >
                            View case study
                            <ArrowUpRight size={15} strokeWidth={2.4} />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[20px] border border-[#d7e6f3] bg-[#EFF7FC] px-6 py-16 text-center">
              <p className="m-0 text-[clamp(14px,1.2vw,16px)] text-[#687181]">
                No demos found for this industry yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <FlyCTA />

      {activeDemo ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1220]/72 p-4 backdrop-blur-[2px] sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeDemo.title}
          onClick={() => setActiveDemo(null)}
        >
          <div
            className="relative w-full max-w-[960px] overflow-hidden rounded-[20px] bg-[#0b1220] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <h3 className="m-0 truncate text-sm font-semibold text-white sm:text-base">
                {activeDemo.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveDemo(null)}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                key={activeDemo.videoId}
                src={youtubeEmbed(activeDemo.videoId)}
                title={activeDemo.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
