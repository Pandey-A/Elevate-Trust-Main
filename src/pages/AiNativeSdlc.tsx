import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import architectureDiagram from "../assets/technology-trends/Trends-sdlc.png";
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
    titleLines: ["Autonomous SDLC,", "self-writing systems"],
    descriptionLines: ["Agentic engineering,", "zero-touch delivery"],
    patterns: [
      "AI agents owning end-to-end feature delivery",
      "Self-healing CI/CD and test generation",
      "Intent-to-code platforms for product teams",
      "Autonomous architecture refactoring",
      "Continuous compliance-as-code agents",
      "Simulation-driven release validation",
      "Human-in-the-loop governance frameworks",
      "Multi-agent code review ecosystems",
      "Outcome-based engineering metrics",
    ],
  },
  {
    tag: "H2",
    titleLines: ["AI-assisted,", "augmented engineering"],
    descriptionLines: ["Copilots at scale,", "platform-led velocity"],
    patterns: [
      "Enterprise coding copilots with private context",
      "AI-augmented design-to-code pipelines",
      "Automated test and documentation synthesis",
      "Intelligent backlog grooming and estimation",
      "Secure AI coding guardrails and SAST",
      "PromptOps and engineering prompt libraries",
      "Developer experience platforms with AI",
      "Pair-programming agents in IDEs",
      "Knowledge graphs for codebase memory",
    ],
  },
  {
    tag: "H1",
    titleLines: ["Foundations of", "modern SDLC"],
    descriptionLines: ["Core practices,", "delivery discipline"],
    patterns: [
      "Agile and DevOps baseline maturity",
      "CI/CD pipeline standardization",
      "Code quality and review culture",
      "Test automation foundations",
      "Version control and branching strategies",
      "Requirements and traceability tooling",
      "Security and compliance checkpoints",
      "Observability for release health",
      "Team skill enablement for AI tools",
    ],
  },
];

const trendTabs = [
  "AI-assisted development",
  "Intelligent testing",
  "Autonomous delivery",
  "Engineering platforms",
  "Governance & quality",
] as const;

const trendsByTab: Record<(typeof trendTabs)[number], TrendCard[]> = {
  "AI-assisted development": [
    {
      label: "Trend 1",
      text: "Context-aware coding agents become standard across enterprise engineering teams",
    },
    {
      label: "Trend 2",
      text: "Natural language becomes a primary interface for generating and modifying code",
    },
    {
      label: "Trend 3",
      text: "Private model fine-tuning aligns copilots with organization-specific codebases",
    },
    {
      label: "Trend 4",
      text: "Design specs and tickets flow directly into scaffolded pull requests",
    },
    {
      label: "Trend 5",
      text: "AI pair programmers reduce onboarding time for complex legacy systems",
    },
  ],
  "Intelligent testing": [
    {
      label: "Trend 1",
      text: "AI generates, prioritizes, and maintains test suites from changing requirements",
    },
    {
      label: "Trend 2",
      text: "Risk-based testing focuses automation on high-impact user journeys",
    },
    {
      label: "Trend 3",
      text: "Self-healing tests adapt selectors and assertions as UIs evolve",
    },
    {
      label: "Trend 4",
      text: "Synthetic data generation accelerates secure, realistic QA environments",
    },
    {
      label: "Trend 5",
      text: "Defect prediction models guide where human QA effort is most valuable",
    },
  ],
  "Autonomous delivery": [
    {
      label: "Trend 1",
      text: "Release agents orchestrate build, validate, and progressive rollout decisions",
    },
    {
      label: "Trend 2",
      text: "Change failure prediction gates deployments before production impact",
    },
    {
      label: "Trend 3",
      text: "Infrastructure and app changes ship through unified GitOps workflows",
    },
    {
      label: "Trend 4",
      text: "Rollback and remediation become automated responses to SLO breaches",
    },
    {
      label: "Trend 5",
      text: "Feature flags and experimentation integrate deeply into AI delivery loops",
    },
  ],
  "Engineering platforms": [
    {
      label: "Trend 1",
      text: "Internal developer platforms embed AI golden paths for common workloads",
    },
    {
      label: "Trend 2",
      text: "Reusable service templates encode security and reliability by default",
    },
    {
      label: "Trend 3",
      text: "Unified catalogs connect APIs, docs, owners, and runtime telemetry",
    },
    {
      label: "Trend 4",
      text: "Platform teams measure success by developer lead time and cognitive load",
    },
    {
      label: "Trend 5",
      text: "Self-service environments provision in minutes with policy guardrails",
    },
  ],
  "Governance & quality": [
    {
      label: "Trend 1",
      text: "AI-generated code requires provenance, review, and license compliance checks",
    },
    {
      label: "Trend 2",
      text: "Policy-as-code enforces architecture and security standards in every PR",
    },
    {
      label: "Trend 3",
      text: "Quality scorecards blend DORA metrics with AI productivity indicators",
    },
    {
      label: "Trend 4",
      text: "Human oversight models define when agents can ship without approval",
    },
    {
      label: "Trend 5",
      text: "Audit trails capture prompts, models, and decisions across the SDLC",
    },
  ],
};

export default function AiNativeSdlc() {
  const [activeTab, setActiveTab] =
    useState<(typeof trendTabs)[number]>("AI-assisted development");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-['Lay_Grotesk_Trial',sans-serif] bg-white text-[#272935]">
      <section
        className="relative w-full flex items-center justify-center overflow-hidden bg-[#113d77]"
        style={{ minHeight: "clamp(280px, 32vw, 492px)" }}
        aria-label="AI Native SDLC"
      >
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[min(94%,1600px)] pointer-events-none opacity-55"
        />
        <div className="relative z-10 flex flex-col items-center text-center max-w-[min(820px,92%)] px-5 pt-[clamp(72px,8vw,120px)] pb-[clamp(48px,6vw,80px)]">
          <h1 className="m-0 text-white font-bold leading-[1.29] tracking-tight text-[clamp(32px,4vw,48px)] lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            AI Native SDLC
          </h1>
          <p className="mt-[clamp(16px,2vw,24px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[#a1b1cb] font-normal leading-6 text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            AI Native SDLC is transforming how enterprises design, build, test, and
            ship software, from coding copilots and intelligent testing to
            autonomous delivery agents and governed engineering platforms. What
            began as developer assistance is evolving into an end-to-end,
            AI-orchestrated software lifecycle.
          </p>
          <Link
            to="/contact"
            className="mt-[clamp(24px,3vw,40px)] inline-flex items-center gap-1.5 py-3 pl-[26px] pr-3.5 bg-[#2365aa] rounded-full text-white font-normal text-base leading-[1.2] uppercase no-underline hover:bg-[#1a5490] transition-colors lg:text-sm lg:py-2.5 lg:pl-[22px] lg:pr-2.5 2xl:text-base 2xl:py-3 2xl:pl-[26px] 2xl:pr-3.5"
          >
            Contact Us
            <span className="inline-flex items-center justify-center w-[37px] h-[37px] rounded-full bg-white text-[#2365aa]">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      <div className="w-full max-w-[1692px] mx-auto px-6">
        <nav
          className="flex flex-wrap items-center gap-2.5 pt-[clamp(28px,3vw,48px)] pb-[clamp(20px,2.5vw,36px)] text-[clamp(14px,1.2vw,18px)] lg:text-[clamp(13px,1vw,15px)] 2xl:text-[clamp(14px,1.2vw,18px)] font-normal leading-[1.2] text-[#272935]"
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
          <span className="text-[#272935]">AI Native SDLC</span>
        </nav>

        <section
          className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(32px,4vw,56px)] lg:gap-[clamp(40px,5vw,80px)] items-center pb-[clamp(48px,6vw,80px)]"
          aria-label="AI Native SDLC architecture"
        >
          <h2 className="m-0 font-bold leading-[1.12] text-[#272935] max-w-[16ch] text-[clamp(28px,4.2vw,64px)] lg:text-[clamp(26px,3.2vw,40px)] 2xl:text-[clamp(28px,4.2vw,64px)]">
            AI Native SDLC architecture: Engineering software at machine speed
          </h2>
          <div className="relative w-full max-w-[875px] mx-auto">
            <img
              src={architectureDiagram}
              alt="Explore our expertise across AI Native SDLC and related technology domains"
              className="block w-full h-auto"
            />
          </div>
        </section>

        <section className="pb-[clamp(56px,7vw,100px)]" aria-label="Market dynamics">
          <h2 className="m-0 mb-[clamp(28px,3.5vw,48px)] max-w-[826px] font-medium leading-[1.57] text-[#848b9b] text-[clamp(20px,2.2vw,28px)] lg:text-[clamp(16px,1.6vw,22px)] 2xl:text-[clamp(20px,2.2vw,28px)]">
            Market dynamics across the three horizons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(28px,3.5vw,48px)] md:gap-[clamp(24px,2.5vw,40px)] items-start">
            {horizons.map((horizon) => (
              <article key={horizon.tag + horizon.titleLines[0]} className="flex flex-col gap-6 min-w-0">
                <div className="flex flex-col h-[300px] sm:h-[260px] md:h-[clamp(220px,18vw,280px)] lg:h-[clamp(220px,18vw,280px)] 2xl:h-[300px] p-[29px_31px_32px] sm:p-6 md:p-[22px_24px_24px] 2xl:p-[29px_31px_32px] bg-[#f07c62] rounded-[30px] sm:rounded-[20px] md:rounded-[22px] 2xl:rounded-[30px] text-white box-border">
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

      <section
        className="rounded-[20px] bg-[#f4f7f9] py-[clamp(40px,5vw,72px)] pb-[clamp(48px,6vw,88px)] max-sm:rounded-none"
        aria-label="Key trends across AI Native SDLC subdomains"
      >
        <div className="mx-auto w-full max-w-[1692px] px-6">
          <h2 className="m-0 mb-[clamp(24px,3vw,40px)] font-bold leading-[1.12] tracking-normal text-[#272935] text-[clamp(22px,2.5vw,40px)]">
            Key trends across AI Native SDLC subdomains
          </h2>

          <div className="grid grid-cols-1 items-start gap-[clamp(20px,2.5vw,32px)] lg:grid-cols-[minmax(240px,32%)_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[minmax(280px,380px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
            <div
              className="flex w-full max-w-[420px] flex-col gap-2.5 lg:h-full lg:max-w-none"
              role="tablist"
              aria-label="AI Native SDLC subdomains"
            >
              {trendTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`box-border flex w-full min-h-[52px] cursor-pointer items-center rounded-[16px] border-none px-5 py-3 text-left font-semibold leading-snug tracking-normal transition-colors sm:min-h-[56px] sm:px-6 xl:rounded-[20px] xl:px-7 text-[clamp(15px,1.3vw,20px)] xl:text-[clamp(17px,1.4vw,22px)] lg:min-h-0 lg:flex-1 ${
                    activeTab === tab
                      ? "bg-[#f07c62] text-white"
                      : "bg-white text-[#272935] hover:bg-[#ffe8e2]"
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
                    <div className="box-border shrink-0 bg-[#f07c62] px-4 py-2.5 font-medium leading-[1.4] tracking-normal text-white sm:px-[18px] sm:py-3 xl:px-[22px] text-[clamp(15px,1.2vw,20px)]">
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

          <a
            href="#"
            className="mt-[clamp(28px,3.5vw,48px)] inline-flex items-center gap-4 rounded-[36px] bg-[#2365aa] py-2 pl-7 pr-3 text-[clamp(15px,1.1vw,18px)] font-normal leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490]"
          >
            Download Insights
            <span className="inline-flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white">
              <img src={downloadIcon} alt="" className="h-[22px] w-[22px]" />
            </span>
          </a>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
