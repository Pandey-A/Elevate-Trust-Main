import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import architectureDiagram from "../assets/technology-trends/Trends-AI.png";
import checkIcon from "../assets/technology-trends/check-icon.svg";
import downloadIcon from "../assets/technology-trends/download-device-icon.svg";

type Horizon = {
  tag: string;
  titleLines: [string, string];
  descriptionLines: [string, string];
  patterns: string[];
};

type TrendCard = {
  label: string;
  text: string;
};

const horizons: Horizon[] = [
  {
    tag: "H3",
    titleLines: ["Multimodal,", "multitasking learning"],
    descriptionLines: ["Intelligent systems, Self-", "supervised"],
    patterns: [
      "AgentOps, multiagent orchestration",
      "Personalized over learning",
      "Embodied AI",
      "Human-robot collaboration",
      "Simulation-trained agents",
      "Digital-twin/physics simulation",
      "Comprehensive AI assurance",
      "Contextual, empathetic, multimodal collaborators",
      "Immersive (XR) interfaces",
    ],
  },
  {
    tag: "H2",
    titleLines: ["Transfer learning,", "responsible AI"],
    descriptionLines: ["Next-wave evolution, Less", "data, explainable systems"],
    patterns: [
      "LLMOps, agentic orchestration",
      "Multimodal understanding/generation",
      "Efficient transformer variants (MoE)",
      "Agentic LLM systems",
      "Scalable SLM systems",
      "Multiagent workflows",
      "Programmable guardrails",
      "Proactive AI assurance",
      "Copilot-style assistants",
      "Prompt/RAG workflows",
    ],
  },
  {
    tag: "H3",
    titleLines: ["Conventional AI and", "data science"],
    descriptionLines: ["Core foundations,", "Augmenting intelligence"],
    patterns: [
      "MLOps platforms",
      "GPU/accelerator clusters",
      "Transformer-based architectures",
      "Classical computer vision/natural language processing",
      "Goal-directed automation",
      "Scripted agents",
      "Responsible AI governance",
      "Model monitoring",
      "Productivity automations",
    ],
  },
];

const trendTabs = [
  "AI cloud",
  "AI models and engineering",
  "Agentic AI",
  "AI assurance",
  "AI applications",
] as const;

const trendsByTab: Record<(typeof trendTabs)[number], TrendCard[]> = {
  "AI cloud": [
    {
      label: "Trend 1",
      text: "AI platforms become smarter, specialized, and multimodal",
    },
    {
      label: "Trend 2",
      text: "Autonomous, agentic AI platforms reshape enterprise operations",
    },
    {
      label: "Trend 3",
      text: "GPU-as-service emerges as the new infrastructure model",
    },
    {
      label: "Trend 4",
      text: "Alternate hardware drives cost-efficient AI inference",
    },
    {
      label: "Trend 5",
      text: "Smaller language models gain relevance",
    },
  ],
  "AI models and engineering": [
    {
      label: "Trend 1",
      text: "Foundation models evolve toward domain-specialized architectures",
    },
    {
      label: "Trend 2",
      text: "Efficient fine-tuning and evaluation become core engineering practices",
    },
    {
      label: "Trend 3",
      text: "Retrieval-augmented pipelines standardize enterprise AI delivery",
    },
    {
      label: "Trend 4",
      text: "Model ops expands into continuous assurance and observability",
    },
    {
      label: "Trend 5",
      text: "Open and proprietary model ecosystems coexist in hybrid stacks",
    },
  ],
  "Agentic AI": [
    {
      label: "Trend 1",
      text: "Multiagent orchestration moves from pilots to production",
    },
    {
      label: "Trend 2",
      text: "Tool-using agents automate complex cross-system workflows",
    },
    {
      label: "Trend 3",
      text: "Memory and planning layers improve long-horizon reliability",
    },
    {
      label: "Trend 4",
      text: "Human-in-the-loop controls remain essential for high-stakes tasks",
    },
    {
      label: "Trend 5",
      text: "Agent marketplaces emerge for reusable enterprise capabilities",
    },
  ],
  "AI assurance": [
    {
      label: "Trend 1",
      text: "Responsible AI shifts from policy to measurable controls",
    },
    {
      label: "Trend 2",
      text: "Programmable guardrails become standard deployment layers",
    },
    {
      label: "Trend 3",
      text: "Continuous model monitoring detects drift and misuse early",
    },
    {
      label: "Trend 4",
      text: "Explainability requirements expand across regulated industries",
    },
    {
      label: "Trend 5",
      text: "Assurance tooling integrates directly into MLOps pipelines",
    },
  ],
  "AI applications": [
    {
      label: "Trend 1",
      text: "Copilot experiences become embedded across business software",
    },
    {
      label: "Trend 2",
      text: "Industry solutions prioritize measurable workflow outcomes",
    },
    {
      label: "Trend 3",
      text: "Multimodal interfaces reshape customer and employee journeys",
    },
    {
      label: "Trend 4",
      text: "AI-native products replace bolt-on feature strategies",
    },
    {
      label: "Trend 5",
      text: "Domain copilots accelerate specialist productivity at scale",
    },
  ],
};

export default function TechnologyTrends() {
  const [activeTab, setActiveTab] =
    useState<(typeof trendTabs)[number]>("AI cloud");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-['Lay_Grotesk_Trial',sans-serif] bg-white text-[#272935]">
      {/* Hero Section */}
      <section className="service-page-hero" aria-label="Artificial Intelligence">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content max-w-[min(820px,92%)]">
          <h1 className="m-0 text-white font-bold leading-[1.29] tracking-tight text-[clamp(32px,4vw,48px)] lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            Artificial Intelligence
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[#a1b1cb] font-normal leading-6 text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            Artificial intelligence (AI) is accelerating through transformative
            breakthroughs in agentic systems, multimodal processing, and frontier
            cognitive architectures, innovations that are reshaping the
            enterprise landscape as we know it. What began as a promising
            experiment has now matured into demonstrable business impact.
          </p>
          <Link
            to="/contact"
            className="mt-[clamp(16px,2vw,28px)] inline-flex items-center gap-1.5 py-3 pl-[26px] pr-3.5 bg-[#2365aa] rounded-full text-white font-normal text-base leading-[1.2] uppercase no-underline hover:bg-[#1a5490] transition-colors lg:text-sm lg:py-2.5 lg:pl-[22px] lg:pr-2.5 2xl:text-base 2xl:py-3 2xl:pl-[26px] 2xl:pr-3.5"
          >
            Contact Us
            <span className="inline-flex items-center justify-center w-[37px] h-[37px] rounded-full bg-white text-[#2365aa]">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      {/* Breadcrumbs + Content Container */}
      <div className="page-breadcrumb-wrap">
        {/* Breadcrumbs */}
        <nav
          className="page-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="text-inherit no-underline hover:text-[#2365aa] transition-colors">
            Home
          </Link>
          <span className="text-[#848b9b]">»</span>
          <Link to="/technologies" className="text-inherit no-underline hover:text-[#2365aa] transition-colors">
            Technology Trends
          </Link>
          <span className="text-[#848b9b]">»</span>
          <span className="text-[#272935]">Artificial Intelligence</span>
        </nav>

        {/* Intro / Architecture Section */}
        <section
          className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(32px,4vw,56px)] lg:gap-[clamp(40px,5vw,80px)] items-center pb-[clamp(48px,6vw,80px)]"
          aria-label="Enterprise AI architecture"
        >
          <h2 className="m-0 font-bold leading-[1.12] text-[#272935] max-w-[16ch] text-[clamp(28px,4.2vw,64px)] lg:text-[clamp(26px,3.2vw,40px)] 2xl:text-[clamp(28px,4.2vw,64px)]">
            Enterprise AI architecture and technology: Designing the autonomous
            future
          </h2>
          <div className="relative w-full max-w-[875px] mx-auto">
            <img
              src={architectureDiagram}
              alt="Explore our expertise across AI and related technology domains"
              className="block w-full h-auto"
            />
            <span className="absolute left-[17%] top-[28%] px-1.5 py-0.5 bg-[#fdfdfe] text-[#1d212b] text-sm font-semibold leading-[1.2] whitespace-nowrap pointer-events-none hidden sm:block">
              On Premise
            </span>
          </div>
        </section>

        {/* Horizons Section */}
        <section className="pb-[clamp(56px,7vw,100px)]" aria-label="Market dynamics">
          <h2 className="m-0 mb-[clamp(28px,3.5vw,48px)] max-w-[826px] font-medium leading-[1.57] text-[#848b9b] text-[clamp(20px,2.2vw,28px)] lg:text-[clamp(16px,1.6vw,22px)] 2xl:text-[clamp(20px,2.2vw,28px)]">
            Market dynamics across the three horizons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(28px,3.5vw,48px)] md:gap-[clamp(24px,2.5vw,40px)] items-start">
            {horizons.map((horizon) => (
              <article key={horizon.tag + horizon.titleLines[0]} className="flex flex-col gap-6 min-w-0">
                <div className="flex flex-col h-[300px] sm:h-[260px] md:h-[clamp(220px,18vw,280px)] lg:h-[clamp(220px,18vw,280px)] 2xl:h-[300px] p-[29px_31px_32px] sm:p-6 md:p-[22px_24px_24px] 2xl:p-[29px_31px_32px] bg-[#2365aa] rounded-[30px] sm:rounded-[20px] md:rounded-[22px] 2xl:rounded-[30px] text-white box-border">
                  <p className="m-0 shrink-0 font-bold leading-[1.4] text-[clamp(32px,2.1vw,40px)] sm:text-[36px] md:text-[clamp(24px,2vw,30px)] 2xl:text-[clamp(32px,2.1vw,40px)]">
                    {horizon.tag}
                  </p>
                  <h3 className="mt-2 shrink-0 font-normal leading-[1.13] text-[clamp(22px,1.7vw,32px)] sm:text-[28px] md:text-[clamp(18px,1.5vw,24px)] 2xl:text-[clamp(22px,1.7vw,32px)]">
                    {horizon.titleLines[0]}
                    <br />
                    {horizon.titleLines[1]}
                  </h3>
                  <p className="mt-auto shrink-0 font-medium leading-[1.33] text-[clamp(16px,1.3vw,24px)] sm:text-[20px] md:text-[clamp(14px,1.2vw,18px)] 2xl:text-[clamp(16px,1.3vw,24px)]">
                    {horizon.descriptionLines[0]}
                    <br />
                    {horizon.descriptionLines[1]}
                  </p>
                </div>
                <div>
                  <h4 className="m-0 mb-4 font-semibold text-[#272935] leading-[42px] text-[clamp(22px,2vw,32px)] lg:text-[clamp(18px,1.6vw,24px)] lg:leading-[1.4] 2xl:text-[clamp(22px,2vw,32px)] 2xl:leading-[42px]">
                    Key Patterns
                  </h4>
                  <ul className="m-0 p-0 list-none flex flex-col gap-3.5">
                    {horizon.patterns.map((pattern) => (
                      <li
                        key={pattern}
                        className="flex items-start gap-3.5 font-medium leading-[1.5] text-[#848b9b] text-[clamp(16px,1.5vw,24px)] lg:text-[clamp(13px,1.2vw,16px)] 2xl:text-[clamp(16px,1.5vw,24px)]"
                      >
                        <img src={checkIcon} alt="" aria-hidden className="w-[18px] h-[18px] mt-[0.35em] shrink-0" />
                        <span>{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Key Trends Section */}
      <section
        className="rounded-[20px] bg-[#f4f7f9] py-[clamp(40px,5vw,72px)] pb-[clamp(48px,6vw,88px)] max-sm:rounded-none"
        aria-label="Key trends across AI subdomains"
      >
        <div className="mx-auto w-full max-w-[1692px] px-6">
          <h2 className="m-0 mb-[clamp(24px,3vw,40px)] font-bold leading-[1.12] tracking-normal text-[#272935] text-[clamp(22px,2.5vw,40px)]">
            Key trends across AI subdomains
          </h2>

          <div className="grid grid-cols-1 items-start gap-[clamp(20px,2.5vw,32px)] lg:grid-cols-[minmax(240px,32%)_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[minmax(280px,380px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
            <div
              className="flex w-full max-w-[420px] flex-col gap-2.5 lg:h-full lg:max-w-none"
              role="tablist"
              aria-label="AI subdomains"
            >
              {trendTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`box-border flex w-full min-h-[52px] cursor-pointer items-center rounded-[16px] border-none px-5 py-3 text-left font-semibold leading-snug tracking-normal transition-colors sm:min-h-[56px] sm:px-6 xl:rounded-[20px] xl:px-7 text-[clamp(15px,1.3vw,20px)] xl:text-[clamp(17px,1.4vw,22px)] lg:min-h-0 lg:flex-1 ${
                    activeTab === tab
                      ? "bg-[#2365aa] text-white"
                      : "bg-white text-[#272935] hover:bg-[#EEF3FB]"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div
              className="box-border flex h-full w-full flex-col rounded-[20px] border border-[#d9d9d9] bg-white p-[clamp(16px,1.8vw,32px)]"
              role="tabpanel"
            >
              <div className="grid flex-1 auto-rows-fr grid-cols-1 gap-[clamp(12px,1.5vw,20px)] sm:grid-cols-2 xl:grid-cols-3">
                {trendsByTab[activeTab].map((card) => (
                  <article
                    key={card.label}
                    className="box-border flex h-full min-h-[140px] w-full flex-col overflow-hidden rounded-[10px] border border-[#e6e6e6] bg-white sm:min-h-[150px]"
                  >
                    <div className="box-border shrink-0 bg-[#2365aa] px-4 py-2.5 font-medium leading-[1.4] tracking-normal text-white sm:px-[18px] sm:py-3 xl:px-[22px] text-[clamp(15px,1.2vw,20px)]">
                      {card.label}
                    </div>
                    <p className="m-0 flex-1 px-4 pb-4 pt-3 font-normal leading-[1.45] tracking-normal text-[#5a5a5a] sm:px-[18px] xl:px-[22px] text-[clamp(13px,1.1vw,18px)]">
                      {card.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}