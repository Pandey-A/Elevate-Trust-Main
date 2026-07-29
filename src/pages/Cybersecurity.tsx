import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import architectureDiagram from "../assets/technology-trends/Trends-cyber.png";
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
    titleLines: ["Autonomous defense,", "predictive security"],
    descriptionLines: ["Self-healing systems,", "threat anticipation"],
    patterns: [
      "Autonomous security operations centers",
      "Predictive threat intelligence",
      "Quantum-resistant cryptography",
      "AI-driven attack surface management",
      "Self-healing network architectures",
      "Cognitive security orchestration",
      "Digital immune systems",
      "Adaptive zero-trust fabrics",
      "Security-by-design ecosystems",
    ],
  },
  {
    tag: "H2",
    titleLines: ["Extended detection,", "proactive resilience"],
    descriptionLines: ["Next-gen defense layers,", "unified security platforms"],
    patterns: [
      "XDR (Extended Detection & Response)",
      "Cloud-native application protection",
      "Security mesh architectures",
      "DevSecOps pipeline integration",
      "Threat hunting automation",
      "Supply chain security frameworks",
      "Privacy-enhancing technologies",
      "Continuous compliance validation",
      "Breach and attack simulation",
      "Identity threat detection and response",
    ],
  },
  {
    tag: "H1",
    titleLines: ["Foundational security", "and risk management"],
    descriptionLines: ["Core defenses,", "baseline protections"],
    patterns: [
      "Endpoint detection and response (EDR)",
      "SIEM/SOAR platforms",
      "Vulnerability management programs",
      "Multi-factor authentication",
      "Network segmentation strategies",
      "Security awareness training",
      "Incident response playbooks",
      "Data loss prevention (DLP)",
      "Firewall and IDS/IPS management",
    ],
  },
];

const trendTabs = [
  "Threat landscape",
  "Security operations",
  "Identity & access",
  "Data protection",
  "Compliance & governance",
] as const;

const trendsByTab: Record<(typeof trendTabs)[number], TrendCard[]> = {
  "Threat landscape": [
    {
      label: "Trend 1",
      text: "AI-powered attacks increase sophistication and speed of threat campaigns",
    },
    {
      label: "Trend 2",
      text: "Ransomware evolves with double-extortion and supply chain vectors",
    },
    {
      label: "Trend 3",
      text: "Nation-state actors expand targets to critical infrastructure",
    },
    {
      label: "Trend 4",
      text: "Social engineering attacks leverage deepfakes and generative AI",
    },
    {
      label: "Trend 5",
      text: "IoT and OT environments become primary attack surfaces",
    },
  ],
  "Security operations": [
    {
      label: "Trend 1",
      text: "AI-augmented SOCs reduce mean time to detect and respond",
    },
    {
      label: "Trend 2",
      text: "Security orchestration automates repetitive incident workflows",
    },
    {
      label: "Trend 3",
      text: "Threat intelligence platforms enable proactive defense postures",
    },
    {
      label: "Trend 4",
      text: "Purple teaming bridges offensive and defensive security practices",
    },
    {
      label: "Trend 5",
      text: "Managed detection and response services scale expert capabilities",
    },
  ],
  "Identity & access": [
    {
      label: "Trend 1",
      text: "Zero-trust architectures become the standard security framework",
    },
    {
      label: "Trend 2",
      text: "Passwordless authentication eliminates credential-based attacks",
    },
    {
      label: "Trend 3",
      text: "Decentralized identity empowers user-controlled digital credentials",
    },
    {
      label: "Trend 4",
      text: "Privileged access management extends to cloud and machine identities",
    },
    {
      label: "Trend 5",
      text: "Continuous adaptive trust replaces static access policies",
    },
  ],
  "Data protection": [
    {
      label: "Trend 1",
      text: "Encryption-in-use technologies protect data during processing",
    },
    {
      label: "Trend 2",
      text: "Data security posture management provides visibility across environments",
    },
    {
      label: "Trend 3",
      text: "Privacy-preserving computation enables secure cross-organization analytics",
    },
    {
      label: "Trend 4",
      text: "Quantum-safe algorithms prepare organizations for cryptographic transitions",
    },
    {
      label: "Trend 5",
      text: "Automated data classification drives contextual protection policies",
    },
  ],
  "Compliance & governance": [
    {
      label: "Trend 1",
      text: "Continuous compliance monitoring replaces point-in-time audits",
    },
    {
      label: "Trend 2",
      text: "Security frameworks converge across global regulatory standards",
    },
    {
      label: "Trend 3",
      text: "Third-party risk management incorporates real-time cyber ratings",
    },
    {
      label: "Trend 4",
      text: "Board-level cyber governance becomes a fiduciary obligation",
    },
    {
      label: "Trend 5",
      text: "AI governance frameworks address emerging algorithmic risks",
    },
  ],
};

export default function Cybersecurity() {
  const [activeTab, setActiveTab] =
    useState<(typeof trendTabs)[number]>("Threat landscape");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-['Lay_Grotesk_Trial',sans-serif] bg-white text-[#272935]">
      {/* Hero Section */}
      <section className="service-page-hero" aria-label="Cybersecurity">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content max-w-[min(820px,92%)]">
          <h1 className="m-0 text-white font-bold leading-[1.29] tracking-tight text-[clamp(32px,4vw,48px)] lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            Cybersecurity
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[#a1b1cb] font-normal leading-6 text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            Cybersecurity is evolving at an unprecedented pace as organizations
            face increasingly sophisticated threats, from AI-powered attacks and
            ransomware to nation-state campaigns and supply chain compromises.
            Building resilient defenses now requires proactive intelligence,
            zero-trust architectures, and autonomous security operations.
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
          <span className="text-[#272935]">Cybersecurity</span>
        </nav>

        {/* Intro / Architecture Section */}
        <section
          className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(32px,4vw,56px)] lg:gap-[clamp(40px,5vw,80px)] items-center pb-[clamp(48px,6vw,80px)]"
          aria-label="Cybersecurity architecture"
        >
          <h2 className="m-0 font-bold leading-[1.12] text-[#272935] max-w-[16ch] text-[clamp(28px,4.2vw,64px)] lg:text-[clamp(26px,3.2vw,40px)] 2xl:text-[clamp(28px,4.2vw,64px)]">
            Enterprise cybersecurity architecture: Defending the digital frontier
          </h2>
          <div className="relative w-full max-w-[875px] mx-auto">
            <img
              src={architectureDiagram}
              alt="Explore our expertise across cybersecurity and related technology domains"
              className="block w-full h-auto"
            />
          </div>
        </section>

        {/* Horizons Section */}
        <section className="pb-[clamp(56px,7vw,100px)]" aria-label="Market dynamics">
          <h2 className="m-0 mb-[clamp(28px,3.5vw,48px)] max-w-[826px] font-medium leading-[1.57] text-[#848b9b] text-[clamp(20px,2.2vw,28px)] lg:text-[clamp(16px,1.6vw,22px)] xl:text-[clamp(20px,2.2vw,28px)]">
            Market dynamics across the three horizons
          </h2>
          <div className="grid grid-cols-1 items-start gap-[clamp(28px,3.5vw,48px)] md:grid-cols-2 xl:grid-cols-3 xl:gap-[clamp(24px,2.5vw,31px)]">
            {horizons.map((horizon) => (
              <article
                key={horizon.tag + horizon.titleLines[0]}
                className="flex w-full max-w-[543px] min-w-0 flex-col gap-9 xl:gap-12"
              >
                <div className="box-border flex h-[240px] w-full flex-col justify-start rounded-[20px] bg-[#2365aa] p-6 text-white sm:h-[260px] sm:rounded-[24px] sm:p-7 xl:h-[300px] xl:rounded-[30px] xl:p-[30px]">
                  <div className="flex h-full max-w-[316px] flex-col justify-between sm:max-w-full xl:h-[237px] xl:max-w-[316px]">
                    <div className="flex shrink-0 flex-col gap-1.5">
                      <p className="m-0 shrink-0 text-[32px] font-bold leading-[1.56] tracking-normal text-white sm:text-[36px] xl:text-[40px]">
                        {horizon.tag}
                      </p>
                      <h3 className="m-0 flex h-auto shrink-0 flex-col text-[24px] font-normal leading-[1.13] tracking-normal text-white sm:text-[28px] xl:h-[72px] xl:max-w-[288px] xl:text-[32px]">
                        <span className="block whitespace-nowrap">{horizon.titleLines[0]}</span>
                        <span className="block whitespace-nowrap">{horizon.titleLines[1]}</span>
                      </h3>
                    </div>
                    <p className="m-0 max-w-[315px] shrink-0 text-[18px] font-medium leading-[1.33] tracking-normal text-white sm:text-[20px] xl:text-[24px]">
                      {horizon.descriptionLines[0]}
                      <br />
                      {horizon.descriptionLines[1]}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="m-0 mb-4 text-[clamp(22px,2vw,32px)] font-semibold leading-[42px] text-[#272935]">
                    Key Patterns
                  </h4>
                  <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                    {horizon.patterns.map((pattern) => (
                      <li
                        key={pattern}
                        className="flex items-start gap-3.5 text-[clamp(16px,1.5vw,24px)] font-medium leading-[1.5] text-[#848b9b]"
                      >
                        <img
                          src={checkIcon}
                          alt=""
                          aria-hidden
                          className="mt-[0.45em] h-3 w-3 shrink-0"
                        />
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
        aria-label="Key trends across cybersecurity subdomains"
      >
        <div className="mx-auto w-full max-w-[1692px] px-6">
          <h2 className="m-0 mb-[clamp(24px,3vw,40px)] font-bold leading-[1.12] tracking-normal text-[#272935] text-[clamp(22px,2.5vw,40px)]">
            Key trends across cybersecurity subdomains
          </h2>

          <div className="grid grid-cols-1 items-start gap-[clamp(20px,2.5vw,32px)] lg:grid-cols-[minmax(240px,32%)_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[minmax(280px,380px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
            <div
              className="flex w-full max-w-[420px] flex-col gap-2.5 lg:h-full lg:max-w-none"
              role="tablist"
              aria-label="Cybersecurity subdomains"
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