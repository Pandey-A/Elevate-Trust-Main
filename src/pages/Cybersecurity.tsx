import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import architectureDiagram from "../assets/technology-trends/Technology-cyber.png";
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
      <section
        className="relative w-full flex items-center justify-center overflow-hidden bg-[#113d77]"
        style={{ minHeight: "clamp(280px, 32vw, 492px)" }}
        aria-label="Cybersecurity"
      >
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[min(94%,1600px)] pointer-events-none opacity-55"
        />
        <div className="relative z-10 flex flex-col items-center text-center max-w-[min(820px,92%)] px-5 pt-[clamp(72px,8vw,120px)] pb-[clamp(48px,6vw,80px)]">
          <h1 className="m-0 text-white font-bold leading-[1.29] tracking-tight text-[clamp(32px,4vw,48px)] lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            Cybersecurity
          </h1>
          <p className="mt-[clamp(16px,2vw,24px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[#a1b1cb] font-normal leading-6 text-[clamp(14px,1.4vw,18px)] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            Cybersecurity is evolving at an unprecedented pace as organizations
            face increasingly sophisticated threats — from AI-powered attacks and
            ransomware to nation-state campaigns and supply chain compromises.
            Building resilient defenses now requires proactive intelligence,
            zero-trust architectures, and autonomous security operations.
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
        aria-label="Key trends across cybersecurity subdomains"
      >
        <div className="w-full max-w-[1692px] mx-auto px-6">
          <h2 className="m-0 mb-[clamp(28px,3.5vw,48px)] lg:mb-[clamp(20px,2.5vw,32px)] 2xl:mb-[clamp(28px,3.5vw,48px)] max-w-[20ch] font-bold leading-[1.12] text-[#272935] text-[clamp(28px,3.5vw,48px)] lg:text-[clamp(24px,2.8vw,34px)] 2xl:text-[clamp(28px,3.5vw,48px)]">
            Key trends across cybersecurity subdomains
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(220px,420px)_minmax(0,1fr)] gap-[clamp(24px,3vw,40px)] lg:gap-[clamp(24px,2.5vw,40px)] items-start">
            {/* Tabs */}
            <div className="flex flex-col gap-2.5" role="tablist" aria-label="Cybersecurity subdomains">
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
