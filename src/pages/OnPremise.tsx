import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import architectureDiagram from "../assets/technology-trends/Trends-onPrem.png";
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
    titleLines: ["Autonomous on-prem,", "self-managing estates"],
    descriptionLines: ["Intelligent datacenters,", "zero-touch ops"],
    patterns: [
      "Software-defined autonomous datacenters",
      "AI-driven capacity and cooling optimization",
      "Self-healing bare-metal and virtual fleets",
      "Intent-based private cloud orchestration",
      "Sovereign AI infrastructure on premises",
      "Digital twin models of facility operations",
      "Predictive hardware lifecycle management",
      "Carbon-aware workload placement",
      "Lights-out operations centers",
    ],
  },
  {
    tag: "H2",
    titleLines: ["Hybrid-ready,", "modernized on-prem"],
    descriptionLines: ["Next-gen private cloud,", "edge convergence"],
    patterns: [
      "Private cloud and HCI platforms",
      "Kubernetes on bare metal and VMs",
      "Hybrid connectivity and control planes",
      "Infrastructure as Code for datacenters",
      "Disaggregated compute and storage",
      "Edge and colo expansion strategies",
      "Zero-trust on-prem security fabrics",
      "Automated patch and compliance pipelines",
      "Workload portability frameworks",
    ],
  },
  {
    tag: "H1",
    titleLines: ["Datacenter and", "infrastructure foundations"],
    descriptionLines: ["Core capabilities,", "stable operations"],
    patterns: [
      "Server, storage, and network refresh",
      "Virtualization platform standardization",
      "Backup and disaster recovery baselines",
      "Facilities power and cooling hygiene",
      "Asset and inventory management",
      "Manual change and maintenance windows",
      "Monitoring and NOC processes",
      "Hardware vendor support models",
      "Compliance-ready physical controls",
    ],
  },
];

const trendTabs = [
  "Private cloud",
  "Hybrid integration",
  "Infrastructure ops",
  "Edge & colo",
  "Security & sovereignty",
] as const;

const trendsByTab: Record<(typeof trendTabs)[number], TrendCard[]> = {
  "Private cloud": [
    {
      label: "Trend 1",
      text: "Hyperconverged platforms simplify private cloud consumption models",
    },
    {
      label: "Trend 2",
      text: "Kubernetes becomes the default runtime for modern on-prem workloads",
    },
    {
      label: "Trend 3",
      text: "Self-service catalogs bring cloud-like agility inside the datacenter",
    },
    {
      label: "Trend 4",
      text: "Software-defined networking and storage replace rigid hardware silos",
    },
    {
      label: "Trend 5",
      text: "GPU and AI clusters expand on-prem capacity for sensitive models",
    },
  ],
  "Hybrid integration": [
    {
      label: "Trend 1",
      text: "Unified control planes manage workloads across on-prem and public cloud",
    },
    {
      label: "Trend 2",
      text: "Consistent identity and policy reduce friction in hybrid estates",
    },
    {
      label: "Trend 3",
      text: "Data gravity keeps critical systems on premises while bursting compute",
    },
    {
      label: "Trend 4",
      text: "Cloud-adjacent colo becomes a bridge for low-latency hybrid designs",
    },
    {
      label: "Trend 5",
      text: "Portable packaging enables reversible cloud and on-prem placements",
    },
  ],
  "Infrastructure ops": [
    {
      label: "Trend 1",
      text: "Infrastructure as Code extends full lifecycle control to on-prem assets",
    },
    {
      label: "Trend 2",
      text: "Predictive maintenance reduces unplanned downtime for critical hardware",
    },
    {
      label: "Trend 3",
      text: "Automated patching closes vulnerability windows without long freezes",
    },
    {
      label: "Trend 4",
      text: "Observability stacks bring cloud-grade telemetry to datacenter fleets",
    },
    {
      label: "Trend 5",
      text: "Runbook automation shrinks mean time to recover for known failures",
    },
  ],
  "Edge & colo": [
    {
      label: "Trend 1",
      text: "Edge nodes process latency-sensitive workloads closer to users and devices",
    },
    {
      label: "Trend 2",
      text: "Colocation densifies as enterprises exit aging owned facilities",
    },
    {
      label: "Trend 3",
      text: "Distributed micro-datacenters support manufacturing and retail use cases",
    },
    {
      label: "Trend 4",
      text: "Remote lights-out management becomes essential for distributed sites",
    },
    {
      label: "Trend 5",
      text: "Edge AI inference appliances extend on-prem intelligence to the field",
    },
  ],
  "Security & sovereignty": [
    {
      label: "Trend 1",
      text: "Data residency and sovereignty requirements keep workloads on premises",
    },
    {
      label: "Trend 2",
      text: "Zero-trust architectures harden east-west traffic inside datacenters",
    },
    {
      label: "Trend 3",
      text: "Confidential computing protects sensitive processing in private clouds",
    },
    {
      label: "Trend 4",
      text: "Air-gapped and isolated environments support regulated industries",
    },
    {
      label: "Trend 5",
      text: "Hardware root of trust and secure boot become procurement baselines",
    },
  ],
};

export default function OnPremise() {
  const [activeTab, setActiveTab] =
    useState<(typeof trendTabs)[number]>("Private cloud");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-['Lay_Grotesk_Trial',sans-serif] bg-white text-[#272935]">
      <section className="service-page-hero" aria-label="On Premise">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content max-w-[min(820px,92%)]">
          <h1 className="m-0 text-white font-bold leading-[1.29] tracking-tight text-[clamp(32px,4vw,48px)] lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            On Premise
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[#a1b1cb] font-normal leading-6 text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            On-premise infrastructure is reinventing itself for hybrid and sovereign
            realities, from private cloud and Kubernetes on bare metal to edge
            colo, zero-trust fabrics, and autonomous datacenter operations. What
            started as traditional hardware estates is evolving into a modern,
            software-defined foundation.
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
          <span className="text-[#272935]">On Premise</span>
        </nav>

        <section
          className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(32px,4vw,56px)] lg:gap-[clamp(40px,5vw,80px)] items-center pb-[clamp(48px,6vw,80px)]"
          aria-label="On Premise architecture"
        >
          <h2 className="m-0 font-bold leading-[1.12] text-[#272935] max-w-[16ch] text-[clamp(28px,4.2vw,64px)] lg:text-[clamp(26px,3.2vw,40px)] 2xl:text-[clamp(28px,4.2vw,64px)]">
            On-premise architecture and modernization: Building sovereign, hybrid-ready estates
          </h2>
          <div className="relative w-full max-w-[875px] mx-auto">
            <img
              src={architectureDiagram}
              alt="Explore our expertise across on-premise and related technology domains"
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
        aria-label="Key trends across on-premise subdomains"
      >
        <div className="mx-auto w-full max-w-[1692px] px-6">
          <h2 className="m-0 mb-[clamp(24px,3vw,40px)] font-bold leading-[1.12] tracking-normal text-[#272935] text-[clamp(22px,2.5vw,40px)]">
            Key trends across on-premise subdomains
          </h2>

          <div className="grid grid-cols-1 items-start gap-[clamp(20px,2.5vw,32px)] lg:grid-cols-[minmax(240px,32%)_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[minmax(280px,380px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
            <div
              className="flex w-full max-w-[420px] flex-col gap-2.5 lg:h-full lg:max-w-none"
              role="tablist"
              aria-label="On-premise subdomains"
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
