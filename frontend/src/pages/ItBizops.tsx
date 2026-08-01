import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import architectureDiagram from "../assets/technology-trends/Trends-it.png";
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
    titleLines: ["Autonomous IT,", "self-running operations"],
    descriptionLines: ["Intelligent BizOps,", "zero-touch service"],
    patterns: [
      "AIOps-driven incident prevention",
      "Autonomous service request fulfillment",
      "Self-optimizing IT cost and capacity",
      "Intent-based service management",
      "Predictive vendor and contract intelligence",
      "Digital twin models of IT estates",
      "Closed-loop business process automation",
      "Experience-driven operations metrics",
      "Cognitive knowledge management",
    ],
  },
  {
    tag: "H2",
    titleLines: ["Integrated BizOps,", "value-aligned IT"],
    descriptionLines: ["Next-gen operating models,", "platform services"],
    patterns: [
      "ITSM and DevOps convergence",
      "Service catalogs as products",
      "FinOps for enterprise IT spend",
      "Enterprise architecture as a service",
      "Automated change and release boards",
      "Employee experience platforms",
      "Process mining for IT workflows",
      "Cross-functional value stream management",
      "Observability for business services",
    ],
  },
  {
    tag: "H1",
    titleLines: ["IT operations", "and service foundations"],
    descriptionLines: ["Core capabilities,", "stable delivery"],
    patterns: [
      "ITIL-aligned service management",
      "Ticket and incident workflows",
      "CMDB and asset management baselines",
      "Change advisory processes",
      "SLA and uptime reporting",
      "Vendor and license management",
      "Helpdesk and knowledge bases",
      "Capacity and availability planning",
      "Operational runbook maturity",
    ],
  },
];

const trendTabs = [
  "IT service management",
  "AIOps & automation",
  "Business alignment",
  "Cost & FinOps",
  "Experience operations",
] as const;

const trendsByTab: Record<(typeof trendTabs)[number], TrendCard[]> = {
  "IT service management": [
    {
      label: "Trend 1",
      text: "Service management platforms evolve into intelligent orchestration hubs",
    },
    {
      label: "Trend 2",
      text: "Self-service portals resolve routine requests without human intervention",
    },
    {
      label: "Trend 3",
      text: "CMDB accuracy improves through continuous discovery and reconciliation",
    },
    {
      label: "Trend 4",
      text: "Change risk scoring reduces failed releases and emergency changes",
    },
    {
      label: "Trend 5",
      text: "Knowledge articles are generated and refreshed automatically from incidents",
    },
  ],
  "AIOps & automation": [
    {
      label: "Trend 1",
      text: "AIOps correlates alerts across tools to surface true business impact",
    },
    {
      label: "Trend 2",
      text: "Runbook automation remediates known issues before users feel pain",
    },
    {
      label: "Trend 3",
      text: "Predictive capacity models prevent performance and cost surprises",
    },
    {
      label: "Trend 4",
      text: "ChatOps and virtual agents become primary employee IT interfaces",
    },
    {
      label: "Trend 5",
      text: "Closed-loop automation links detection, diagnosis, and resolution",
    },
  ],
  "Business alignment": [
    {
      label: "Trend 1",
      text: "Value stream metrics connect IT work to revenue and customer outcomes",
    },
    {
      label: "Trend 2",
      text: "Product operating models replace project-centric IT delivery",
    },
    {
      label: "Trend 3",
      text: "Enterprise architecture guides technology choices with business context",
    },
    {
      label: "Trend 4",
      text: "Shared OKRs align technology, operations, and business stakeholders",
    },
    {
      label: "Trend 5",
      text: "Process mining reveals friction between IT processes and business goals",
    },
  ],
  "Cost & FinOps": [
    {
      label: "Trend 1",
      text: "FinOps practices extend from cloud into full enterprise IT portfolios",
    },
    {
      label: "Trend 2",
      text: "Unit economics link technology spend to products and customer journeys",
    },
    {
      label: "Trend 3",
      text: "Automated rightsizing and license optimization become continuous",
    },
    {
      label: "Trend 4",
      text: "Showback and chargeback models improve accountability for IT demand",
    },
    {
      label: "Trend 5",
      text: "Vendor intelligence supports smarter renewals and consolidation",
    },
  ],
  "Experience operations": [
    {
      label: "Trend 1",
      text: "Digital employee experience becomes a board-level operations KPI",
    },
    {
      label: "Trend 2",
      text: "Journey analytics reveal where technology friction slows productivity",
    },
    {
      label: "Trend 3",
      text: "Proactive support prevents tickets by fixing issues before they escalate",
    },
    {
      label: "Trend 4",
      text: "Unified workplaces blend IT, HR, and facilities service channels",
    },
    {
      label: "Trend 5",
      text: "Sentiment and telemetry together guide continuous experience improvement",
    },
  ],
};

export default function ItBizops() {
  const [activeTab, setActiveTab] =
    useState<(typeof trendTabs)[number]>("IT service management");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-['Lay_Grotesk_Trial',sans-serif] bg-white text-[#272935]">
      <section className="service-page-hero" aria-label="IT BizOps">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content max-w-[min(820px,92%)]">
          <h1 className="m-0 text-white font-bold leading-[1.29] tracking-tight text-[clamp(32px,4vw,48px)] lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            IT BizOps
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[#a1b1cb] font-normal leading-6 text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            IT BizOps is reshaping how technology operations create business value,
            from intelligent service management and AIOps automation to FinOps
            accountability and employee experience. What began as ticket-driven
            support has evolved into a strategic operating model for the enterprise.
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

      <div className="page-breadcrumb-wrap">
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
          <span className="text-[#272935]">IT BizOps</span>
        </nav>

        <section
          className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(32px,4vw,56px)] lg:gap-[clamp(40px,5vw,80px)] items-center pb-[clamp(48px,6vw,80px)]"
          aria-label="IT BizOps architecture"
        >
          <h2 className="m-0 font-bold leading-[1.12] text-[#272935] max-w-[16ch] text-[clamp(28px,4.2vw,64px)] lg:text-[clamp(26px,3.2vw,40px)] 2xl:text-[clamp(28px,4.2vw,64px)]">
            IT BizOps architecture and operating model: Aligning technology with outcomes
          </h2>
          <div className="relative w-full max-w-[875px] mx-auto">
            <img
              src={architectureDiagram}
              alt="Explore our expertise across IT BizOps and related technology domains"
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

      <section
        className="rounded-[20px] bg-[#f4f7f9] py-[clamp(40px,5vw,72px)] pb-[clamp(48px,6vw,88px)] max-sm:rounded-none"
        aria-label="Key trends across IT BizOps subdomains"
      >
        <div className="mx-auto w-full max-w-[1692px] px-6">
          <h2 className="m-0 mb-[clamp(24px,3vw,40px)] font-bold leading-[1.12] tracking-normal text-[#272935] text-[clamp(22px,2.5vw,40px)]">
            Key trends across IT BizOps subdomains
          </h2>

          <div className="grid grid-cols-1 items-start gap-[clamp(20px,2.5vw,32px)] lg:grid-cols-[minmax(240px,32%)_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[minmax(280px,380px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
            <div
              className="flex w-full max-w-[420px] flex-col gap-2.5 lg:h-full lg:max-w-none"
              role="tablist"
              aria-label="IT BizOps subdomains"
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
