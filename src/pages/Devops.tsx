import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import architectureDiagram from "../assets/technology-trends/Trends-devops.png";
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
    titleLines: ["Autonomous DevOps,", "self-healing delivery"],
    descriptionLines: ["Intelligent pipelines,", "zero-touch releases"],
    patterns: [
      "AI-orchestrated CI/CD pipelines",
      "Self-healing production environments",
      "Autonomous rollback and remediation",
      "Predictive change failure prevention",
      "Intent-driven deployment policies",
      "Continuous verification agents",
      "Chaos engineering at machine scale",
      "Sustainable delivery and green CI",
      "Outcome-based platform automation",
    ],
  },
  {
    tag: "H2",
    titleLines: ["Platform engineering,", "DevSecOps at scale"],
    descriptionLines: ["Next-gen delivery,", "secure by default"],
    patterns: [
      "Internal developer platforms",
      "GitOps as the deployment standard",
      "Shift-left security and compliance",
      "Observability-driven operations",
      "Progressive delivery and canaries",
      "Infrastructure as Code maturity",
      "Policy-as-code guardrails",
      "SRE and error budget culture",
      "Value stream management tooling",
    ],
  },
  {
    tag: "H1",
    titleLines: ["CI/CD and", "automation foundations"],
    descriptionLines: ["Core capabilities,", "reliable releases"],
    patterns: [
      "Continuous integration pipelines",
      "Automated build and test stages",
      "Containerization of applications",
      "Basic infrastructure automation",
      "Release management processes",
      "Monitoring and alerting baselines",
      "Configuration management",
      "Environment parity practices",
      "Collaboration between Dev and Ops",
    ],
  },
];

const trendTabs = [
  "CI/CD & delivery",
  "Platform engineering",
  "DevSecOps",
  "SRE & reliability",
  "Observability",
] as const;

const trendsByTab: Record<(typeof trendTabs)[number], TrendCard[]> = {
  "CI/CD & delivery": [
    {
      label: "Trend 1",
      text: "Pipeline-as-code becomes the default for reproducible delivery workflows",
    },
    {
      label: "Trend 2",
      text: "Progressive delivery reduces risk through canaries and automated rollback",
    },
    {
      label: "Trend 3",
      text: "AI assists with flaky test detection and pipeline optimization",
    },
    {
      label: "Trend 4",
      text: "Trunk-based development accelerates feedback and release frequency",
    },
    {
      label: "Trend 5",
      text: "Supply chain security scanning embeds into every build stage",
    },
  ],
  "Platform engineering": [
    {
      label: "Trend 1",
      text: "Golden paths give teams secure, opinionated routes to production",
    },
    {
      label: "Trend 2",
      text: "Self-service environments cut provisioning time from days to minutes",
    },
    {
      label: "Trend 3",
      text: "Developer portals unify docs, services, templates, and ownership",
    },
    {
      label: "Trend 4",
      text: "Platform teams measure success with DORA and developer satisfaction",
    },
    {
      label: "Trend 5",
      text: "Reusable deployment modules encode reliability and compliance defaults",
    },
  ],
  DevSecOps: [
    {
      label: "Trend 1",
      text: "Security controls shift left into IDE, PR, and pipeline workflows",
    },
    {
      label: "Trend 2",
      text: "Policy-as-code blocks non-compliant infrastructure before deployment",
    },
    {
      label: "Trend 3",
      text: "SBOM generation and vulnerability management become continuous",
    },
    {
      label: "Trend 4",
      text: "Secrets management and least-privilege IAM are platform defaults",
    },
    {
      label: "Trend 5",
      text: "Threat modeling integrates into agile planning and design reviews",
    },
  ],
  "SRE & reliability": [
    {
      label: "Trend 1",
      text: "SLOs and error budgets guide release decisions across product teams",
    },
    {
      label: "Trend 2",
      text: "Toil reduction programs free engineers for higher-value reliability work",
    },
    {
      label: "Trend 3",
      text: "Chaos and resilience testing validate failure modes before incidents",
    },
    {
      label: "Trend 4",
      text: "Incident response becomes a rehearsed, data-driven practice",
    },
    {
      label: "Trend 5",
      text: "Reliability scorecards connect uptime to customer experience outcomes",
    },
  ],
  Observability: [
    {
      label: "Trend 1",
      text: "OpenTelemetry standards unify traces, metrics, and logs across stacks",
    },
    {
      label: "Trend 2",
      text: "AIOps correlates signals to reduce alert noise and mean time to detect",
    },
    {
      label: "Trend 3",
      text: "Continuous profiling identifies performance bottlenecks in production",
    },
    {
      label: "Trend 4",
      text: "Business KPIs join technical telemetry for full-stack visibility",
    },
    {
      label: "Trend 5",
      text: "Observability data powers autonomous remediation and capacity planning",
    },
  ],
};

export default function Devops() {
  const [activeTab, setActiveTab] =
    useState<(typeof trendTabs)[number]>("CI/CD & delivery");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-['Lay_Grotesk_Trial',sans-serif] bg-white text-[#272935]">
      <section
        className="relative w-full flex items-center justify-center overflow-hidden bg-[#113d77]"
        style={{ minHeight: "clamp(280px, 32vw, 492px)" }}
        aria-label="DevOps"
      >
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[min(94%,1600px)] pointer-events-none opacity-55"
        />
        <div className="relative z-10 flex flex-col items-center text-center max-w-[min(820px,92%)] px-5 pt-[clamp(72px,8vw,120px)] pb-[clamp(48px,6vw,80px)]">
          <h1 className="m-0 text-white font-bold leading-[1.29] tracking-tight text-[clamp(32px,4vw,48px)] lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            DevOps
          </h1>
          <p className="mt-[clamp(16px,2vw,24px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[#a1b1cb] font-normal leading-6 text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            DevOps is accelerating how enterprises deliver software with speed and
            reliability — from CI/CD and platform engineering to DevSecOps, SRE,
            and observability. What started as cultural collaboration has matured
            into an intelligent delivery ecosystem for continuous value.
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
          <span className="text-[#272935]">DevOps</span>
        </nav>

        <section
          className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(32px,4vw,56px)] lg:gap-[clamp(40px,5vw,80px)] items-center pb-[clamp(48px,6vw,80px)]"
          aria-label="DevOps architecture"
        >
          <h2 className="m-0 font-bold leading-[1.12] text-[#272935] max-w-[16ch] text-[clamp(28px,4.2vw,64px)] lg:text-[clamp(26px,3.2vw,40px)] 2xl:text-[clamp(28px,4.2vw,64px)]">
            Enterprise DevOps architecture and practice: Delivering software continuously
          </h2>
          <div className="relative w-full max-w-[875px] mx-auto">
            <img
              src={architectureDiagram}
              alt="Explore our expertise across DevOps and related technology domains"
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
        aria-label="Key trends across DevOps subdomains"
      >
        <div className="mx-auto w-full max-w-[1692px] px-6">
          <h2 className="m-0 mb-[clamp(24px,3vw,40px)] font-bold leading-[1.12] tracking-normal text-[#272935] text-[clamp(22px,2.5vw,40px)]">
            Key trends across DevOps subdomains
          </h2>

          <div className="grid grid-cols-1 items-start gap-[clamp(20px,2.5vw,32px)] lg:grid-cols-[minmax(240px,32%)_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[minmax(280px,380px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
            <div
              className="flex w-full max-w-[420px] flex-col gap-2.5 lg:h-full lg:max-w-none"
              role="tablist"
              aria-label="DevOps subdomains"
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
