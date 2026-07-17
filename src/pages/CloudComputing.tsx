import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import architectureDiagram from "../assets/technology-trends/Technology-cloud.png";
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
    titleLines: ["Autonomous cloud,", "self-healing systems"],
    descriptionLines: ["Intelligent orchestration,", "zero-touch operations"],
    patterns: [
      "Self-optimizing cloud fabrics",
      "Intent-driven infrastructure",
      "Autonomous scaling and remediation",
      "AI-powered capacity planning",
      "Quantum-ready cloud architectures",
      "Decentralized cloud meshes",
      "Predictive incident prevention",
      "Sustainable, carbon-aware workloads",
      "Immersive cloud-native experiences",
    ],
  },
  {
    tag: "H2",
    titleLines: ["Multi-cloud,", "cloud-native platforms"],
    descriptionLines: ["Next-gen infrastructure,", "platform engineering"],
    patterns: [
      "Kubernetes-native operations",
      "Multi-cloud governance frameworks",
      "Platform-as-a-Product delivery",
      "FinOps and cost intelligence",
      "Serverless-first architectures",
      "Edge-cloud convergence",
      "GitOps-driven deployments",
      "Policy-as-code guardrails",
      "Cloud-native security posture",
      "Internal developer portals",
    ],
  },
  {
    tag: "H1",
    titleLines: ["Infrastructure and", "migration foundations"],
    descriptionLines: ["Core capabilities,", "modernizing workloads"],
    patterns: [
      "Cloud migration factories",
      "IaC (Terraform/Pulumi) adoption",
      "Containerization strategies",
      "Hybrid cloud connectivity",
      "Disaster recovery automation",
      "Compliance-ready landing zones",
      "CI/CD pipeline modernization",
      "Monitoring and observability stacks",
      "Cost optimization frameworks",
    ],
  },
];

const trendTabs = [
  "Cloud infrastructure",
  "Cloud-native development",
  "Multi-cloud & hybrid",
  "Cloud security",
  "Cloud economics",
] as const;

const trendsByTab: Record<(typeof trendTabs)[number], TrendCard[]> = {
  "Cloud infrastructure": [
    {
      label: "Trend 1",
      text: "Infrastructure as Code becomes the default deployment paradigm",
    },
    {
      label: "Trend 2",
      text: "Edge computing extends cloud capabilities to distributed endpoints",
    },
    {
      label: "Trend 3",
      text: "Serverless architectures reduce operational overhead at scale",
    },
    {
      label: "Trend 4",
      text: "GPU cloud services accelerate AI/ML workload processing",
    },
    {
      label: "Trend 5",
      text: "Green cloud initiatives drive sustainable infrastructure design",
    },
  ],
  "Cloud-native development": [
    {
      label: "Trend 1",
      text: "Microservices architectures enable independent scaling and deployment",
    },
    {
      label: "Trend 2",
      text: "Platform engineering teams provide golden paths for developers",
    },
    {
      label: "Trend 3",
      text: "Service meshes standardize inter-service communication patterns",
    },
    {
      label: "Trend 4",
      text: "Container orchestration matures with advanced scheduling capabilities",
    },
    {
      label: "Trend 5",
      text: "Developer experience platforms reduce cognitive load on engineering teams",
    },
  ],
  "Multi-cloud & hybrid": [
    {
      label: "Trend 1",
      text: "Multi-cloud strategies become standard for enterprise resilience",
    },
    {
      label: "Trend 2",
      text: "Unified control planes manage workloads across cloud boundaries",
    },
    {
      label: "Trend 3",
      text: "Data sovereignty requirements drive regional cloud deployments",
    },
    {
      label: "Trend 4",
      text: "Hybrid architectures bridge legacy systems with cloud-native services",
    },
    {
      label: "Trend 5",
      text: "Cloud-agnostic tooling reduces vendor lock-in risks",
    },
  ],
  "Cloud security": [
    {
      label: "Trend 1",
      text: "Zero-trust network architectures become cloud security baseline",
    },
    {
      label: "Trend 2",
      text: "Cloud security posture management automates compliance validation",
    },
    {
      label: "Trend 3",
      text: "Shift-left security integrates protection into CI/CD pipelines",
    },
    {
      label: "Trend 4",
      text: "Identity-first security replaces perimeter-based approaches",
    },
    {
      label: "Trend 5",
      text: "Confidential computing protects data during processing in cloud",
    },
  ],
  "Cloud economics": [
    {
      label: "Trend 1",
      text: "FinOps practices mature into enterprise-wide cost governance",
    },
    {
      label: "Trend 2",
      text: "AI-driven optimization automatically right-sizes cloud resources",
    },
    {
      label: "Trend 3",
      text: "Spot and preemptible instances reduce compute costs significantly",
    },
    {
      label: "Trend 4",
      text: "Commitment-based pricing models evolve for dynamic workloads",
    },
    {
      label: "Trend 5",
      text: "Unit economics tracking aligns cloud spend with business outcomes",
    },
  ],
};

export default function CloudComputing() {
  const [activeTab, setActiveTab] =
    useState<(typeof trendTabs)[number]>("Cloud infrastructure");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-['Lay_Grotesk_Trial',sans-serif] bg-white text-[#272935]">
      {/* Hero Section */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden bg-[#113d77]"
        style={{ minHeight: "clamp(280px, 32vw, 492px)" }}
        aria-label="Cloud Computing"
      >
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[min(94%,1600px)] pointer-events-none opacity-55"
        />
        <div className="relative z-10 flex flex-col items-center text-center max-w-[min(820px,92%)] px-5 pt-[clamp(72px,8vw,120px)] pb-[clamp(48px,6vw,80px)]">
          <h1 className="m-0 text-white font-bold leading-[1.29] tracking-tight text-[clamp(32px,4vw,48px)] lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            Cloud Computing
          </h1>
          <p className="mt-[clamp(16px,2vw,24px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[#a1b1cb] font-normal leading-6 text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            Cloud computing is revolutionizing how enterprises build, deploy, and
            scale their digital infrastructure — from multi-cloud strategies and
            serverless architectures to edge computing and platform engineering.
            What started as simple virtualization has evolved into a comprehensive
            ecosystem powering autonomous, intelligent operations.
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

      {/* Breadcrumbs + Content Container */}
      <div className="w-full max-w-[1692px] mx-auto px-6">
        {/* Breadcrumbs */}
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
          <span className="text-[#272935]">Cloud Computing</span>
        </nav>

        {/* Intro / Architecture Section */}
        <section
          className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(32px,4vw,56px)] lg:gap-[clamp(40px,5vw,80px)] items-center pb-[clamp(48px,6vw,80px)]"
          aria-label="Cloud architecture"
        >
          <h2 className="m-0 font-bold leading-[1.12] text-[#272935] max-w-[16ch] text-[clamp(28px,4.2vw,64px)] lg:text-[clamp(26px,3.2vw,40px)] 2xl:text-[clamp(28px,4.2vw,64px)]">
            Enterprise cloud architecture and technology: Building the scalable future
          </h2>
          <div className="relative w-full max-w-[875px] mx-auto">
            <img
              src={architectureDiagram}
              alt="Explore our expertise across cloud computing and related technology domains"
              className="block w-full h-auto"
            />
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

      {/* Key Trends Section */}
      <section
        className="bg-[#f4f7f9] rounded-[20px] max-sm:rounded-none py-[clamp(40px,5vw,72px)] pb-[clamp(48px,6vw,88px)]"
        aria-label="Key trends across cloud subdomains"
      >
        <div className="w-full max-w-[1692px] mx-auto px-6">
          <h2 className="m-0 mb-[clamp(28px,3.5vw,48px)] lg:mb-[clamp(20px,2.5vw,32px)] 2xl:mb-[clamp(28px,3.5vw,48px)] max-w-[18ch] font-bold leading-[1.12] text-[#272935] text-[clamp(28px,3.5vw,48px)] lg:text-[clamp(24px,2.8vw,34px)] 2xl:text-[clamp(28px,3.5vw,48px)]">
            Key trends across cloud subdomains
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(220px,420px)_minmax(0,1fr)] gap-[clamp(24px,3vw,40px)] lg:gap-[clamp(24px,2.5vw,40px)] items-start">
            {/* Tabs */}
            <div className="flex flex-col gap-2.5" role="tablist" aria-label="Cloud subdomains">
              {trendTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`flex items-center min-h-[72px] lg:min-h-[56px] 2xl:min-h-[72px] px-7 lg:px-[22px] 2xl:px-7 py-[18px] lg:py-3.5 2xl:py-[18px] border-none rounded-[20px] lg:rounded-[16px] 2xl:rounded-[20px] font-semibold text-left cursor-pointer transition-colors text-[clamp(18px,1.8vw,28px)] lg:text-[clamp(15px,1.4vw,20px)] lg:leading-[1.3] 2xl:text-[clamp(18px,1.8vw,28px)] leading-[34px] ${
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

            {/* Panel */}
            <div className="bg-white rounded-[20px] p-[clamp(20px,2.5vw,32px)] min-h-[280px]" role="tabpanel">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {trendsByTab[activeTab].map((card) => (
                  <article
                    key={card.label}
                    className="flex flex-col min-h-[171px] bg-white border border-[#e6e6e6] rounded-[10px] overflow-hidden"
                  >
                    <div className="px-[22px] lg:px-[18px] 2xl:px-[22px] py-[13px] lg:py-2.5 2xl:py-[13px] bg-[#f07c62] text-white font-medium leading-[34px] lg:leading-[1.4] 2xl:leading-[34px] text-[clamp(18px,1.6vw,24px)] lg:text-[clamp(14px,1.3vw,18px)] 2xl:text-[clamp(18px,1.6vw,24px)]">
                      {card.label}
                    </div>
                    <p className="flex-1 px-[22px] lg:px-[18px] 2xl:px-[22px] pt-4 pb-[22px] lg:pt-3.5 lg:pb-[18px] 2xl:pt-4 2xl:pb-[22px] text-[#5a5a5a] font-normal leading-[33px] lg:leading-[1.5] 2xl:leading-[33px] text-[clamp(16px,1.5vw,24px)] lg:text-[clamp(13px,1.2vw,16px)] 2xl:text-[clamp(16px,1.5vw,24px)]">
                      {card.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#"
            className="mt-[clamp(28px,3.5vw,48px)] inline-flex items-center gap-4 py-2 pl-7 pr-3 bg-[#2365aa] rounded-[36px] text-white font-normal text-lg lg:text-[15px] lg:py-[7px] lg:pl-[22px] lg:pr-2.5 2xl:text-lg 2xl:py-2 2xl:pl-7 2xl:pr-3 leading-[1.2] no-underline hover:bg-[#1a5490] transition-colors"
          >
            Download Insights
            <span className="inline-flex items-center justify-center w-[37px] h-[37px] rounded-full bg-white">
              <img src={downloadIcon} alt="" className="w-[22px] h-[22px]" />
            </span>
          </a>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
