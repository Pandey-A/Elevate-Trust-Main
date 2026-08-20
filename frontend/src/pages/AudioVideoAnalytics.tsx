import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import simpleSetupIcon from "../assets/OurServices/AudioVideoSimpleSetup.svg";
import accuracyIcon from "../assets/OurServices/AudioVideoSuperiorAccuracy.svg";
import insightsIcon from "../assets/OurServices/AudioVideoLiveInsights.svg";
import integrationIcon from "../assets/OurServices/AudioVideoSeamlessIntegration.svg";
import deploymentIcon from "../assets/OurServices/AudioVideoFlexibleDeployment.svg";
import cameraHealthIcon from "../assets/OurServices/AudioVideoCameraHealthMonitoring.svg";
import audioBg1 from "../assets/OurServices/Audiobg-1.svg";
import audioBg2 from "../assets/OurServices/Audiobg-2.svg";
import elevateIcon from "../assets/service/AI-process/elevateIcon.svg";
import deepfakeImg from "../assets/OurServices/deepfake-detection.png";

const coreOfferings = [
  {
    title: "Simple Setup",
    description:
      "Quick installation with minimal changes to existing infrastructure, so teams can go live faster without ripping out cameras, networks, or current security workflows.",
    icon: simpleSetupIcon,
  },
  {
    title: "Superior Accuracy",
    description:
      "Our proprietary AI technology delivers highly precise and dependable results across people, vehicles, and event detection, reducing false alerts and improving operational trust.",
    icon: accuracyIcon,
  },
  {
    title: "Live Insights",
    description:
      "Real-time data analysis, alerts, and insights for faster and more reliable decision-making, helping operators act instantly on incidents, footfall, and process exceptions.",
    icon: insightsIcon,
  },
  {
    title: "Seamless Integration",
    description:
      "Utilizes existing CCTVs, networks, and enterprise systems for better resource efficiency, so you extend camera value without buying a full new hardware stack.",
    icon: integrationIcon,
  },
  {
    title: "Flexible Deployment Options",
    description:
      "Choose between cloud-based or on-premises solutions based on data residency, latency, and scale needs, with the same analytics experience across both models.",
    icon: deploymentIcon,
  },
  {
    title: "Camera Health Monitoring",
    description:
      "An intelligent system for real-time monitoring of CCTV health to prevent tampering or misuse, keeping every camera online, focused, and ready when security matters most.",
    icon: cameraHealthIcon,
  },
];

const industrySolutions = [
  {
    title: "Intelligent Logistics & Warehouse Management",
    applications: [
      "Truck In/Out Monitoring with ANPR (Automatic Number Plate Recognition)",
      "Shipment Mishandling Detection",
      "Supervisor Presence and Absence Detection",
      "SOP (Standard Operating Procedure) Adherence Monitoring",
      "Fire and Hazard Detection",
      "Inventory Tracking and Theft Prevention",
      "Worker Safety Monitoring (e.g., PPE compliance)",
    ],
  },
  {
    title: "Smart Campus Solutions for Colleges & Universities",
    applications: [
      "Teacher Attendance Monitoring",
      "Student Phone Usage Detection in Classrooms",
      "Crowd and Violence Detection in Campus Areas",
      "Student Without ID Card Detection at Entry Points",
      "Intrusion Detection in Restricted Zones",
      "Classroom Occupancy Analytics",
      "Exam Malpractice Prevention (e.g., cheating detection)",
    ],
  },
  {
    title: "AI-Powered Retail Analytics",
    applications: [
      "Heatmaps for Customer Movement Analysis",
      "Queue Management to Reduce Wait Times",
      "Customer Dwell Time Analysis in Specific Zones",
      "Store Layout Optimization Based on Traffic Patterns",
      "People Counting for Footfall Analytics",
      "Theft Prevention via Suspicious Behavior Detection",
      "Personalized In-store Promotions via Real-Time Analytics",
    ],
  },
  {
    title: "Smart Manufacturing Solutions",
    applications: [
      "Inventory Management and Stock Monitoring",
      "Staff Activity and Productivity Monitoring",
      "Loading and Unloading Turnaround Time (TAT) Analysis",
      "Fire and Smoke Detection in Hazardous Areas",
      "Phone Usage Detection for Safety Compliance",
      "Equipment Malfunction Detection",
    ],
  },
  {
    title: "Secure Banking & Financial Institution Monitoring",
    applications: [
      "Bank Vault Intrusion Detection with Real-Time Alerts",
      "ATM Tampering Detection and Prevention",
      "Cash Counter Queue Management for Customer Experience Optimization",
      "Security Guard Activity Monitoring for Enhanced Safety",
      "Fire and Smoke Detection in High-Risk Zones",
      "Suspicious Behavior Analysis in Banking Halls",
    ],
  },
  {
    title: "Smart Co-Living Solutions",
    applications: [
      "Crowd & Violence Detection",
      "Hygiene Monitoring & Compliance",
      "Security Guard Activity Monitoring",
      "Fire and Smoke Detection",
      "Intrusion Detection and Alerts",
      "Energy Usage Monitoring (lights, HVAC systems)",
      "Resident Safety Monitoring (fall detection)",
    ],
  },
];

const valueAdded = [
  "Our Video analytics solution enables customers to drive 6% revenue gain by detecting illicit behaviour (e.g. high flagging, false attendance) of their employees.",
  "Converted normal Camera into Edge AI-based attendance system to reduce attendance system maintenance cost to a major extent and scale faster.",
  "Deepfake video detection using a multimodal approach elevates customers to reduce the cybercrime investigation time in the Generative Era.",
  "Reduced overall insurance claim processing time by 20% with AI-based smart inspection for car damage detection.",
];

export default function AudioVideoAnalytics() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth > 768 ? 400 : 340;
      
      let newScrollLeft = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      const maxScrollLeft = scrollWidth - clientWidth;
      
      if (direction === "right" && scrollLeft >= maxScrollLeft - 5) {
        newScrollLeft = 0;
      } else if (direction === "left" && scrollLeft <= 5) {
        newScrollLeft = maxScrollLeft;
      }

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      {/* Hero */}
      <section className="service-page-hero" aria-label="Audio and Video Analytics">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#8eb4df] 2xl:text-base">
            Our Services
          </p>
          <h1 className="m-0 text-[clamp(28px,3.8vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            Advanced Audio &amp; Video Analytics for Business Innovation
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            We develop custom solutions for text and image/video analytics, which
            include document parsing, understanding meaning in texts, analyzing
            warranties and claims, inspecting visuals for defects in manufacturing,
            detecting car damage, smart KYC processes, and detecting cyber crime
            &amp; deep fake videos.
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

      {/* Breadcrumbs + Core Offerings */}
      <section className="w-full bg-white">
        <div className="page-breadcrumb-wrap">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link
              to="/"
              className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
            >
              Home
            </Link>
            <span className="text-[#848b9b]">»</span>
            <Link
              to="/Services/ai-ml"
              className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
            >
              Our Services
            </Link>
            <span className="text-[#848b9b]">»</span>
            <span>Audio/Video Analytics</span>
          </nav>
        </div>

        <div className="mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] pt-0 sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(32px,4vw,56px)] max-w-[52rem] text-center">
            <h2 className="m-0 text-[clamp(28px,4vw,56px)] font-bold leading-[1.15] text-[#1F2432]">
              Core Offerings
              <br />
              Video &amp; Audio Analytics
            </h2>
            <p className="mx-auto mt-5 max-w-[48rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] sm:mt-6 2xl:text-[18px] 2xl:leading-8">
              Production-ready capabilities that turn existing cameras into
              intelligent edge systems, with precision, real-time insights, and
              flexible deployment.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 xl:gap-x-10">
            {coreOfferings.map((item) => (
              <article key={item.title} className="mx-auto flex w-full min-w-0 max-w-[360px] flex-col sm:max-w-none">
                <div className="mb-5 overflow-hidden rounded-[20px] sm:mb-6">
                  <img
                    src={item.icon}
                    alt=""
                    className="block h-auto w-full object-cover object-center"
                    aria-hidden
                  />
                </div>
                <h3 className="text-[clamp(16px,1.3vw,20px)] font-bold leading-snug text-[#1F2432] 2xl:text-[22px]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[clamp(12px,1.1vw,14px)] leading-6 text-[#9CA3AF] sm:mt-4 2xl:text-[18px] 2xl:leading-8">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Elevate Camera Potential + Industry Solutions */}
      <section className="w-full bg-[#EFF7FC]">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="mb-[clamp(28px,3.5vw,48px)] grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#2365aa] 2xl:text-base">
                Audio &amp; Video
              </p>
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                Elevate your Camera&apos;s Potential
              </h2>
              <p className="mt-5 max-w-[46rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#848b9b] sm:mt-6 2xl:text-[18px] 2xl:leading-8">
                for your business today with 100+ custom AI use cases tailored to
                various industries.
              </p>
            </div>
            <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-white p-3 shadow-[0_18px_50px_-24px_rgba(17,61,119,0.35)] sm:rounded-[24px] sm:p-5">
              <div className="overflow-hidden rounded-[15px] sm:rounded-[18px]">
                <img
                  src={audioBg1}
                  alt="Audio and video analytics camera intelligence"
                  className="block h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="relative w-full py-4">
            <div 
              ref={scrollRef}
              className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
            >
              {industrySolutions.map((solution, index) => (
                <article
                  key={`${solution.title}-${index}`}
                  className="flex w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border border-[#e0e9f1] bg-white shadow-[0_14px_40px_-28px_rgba(17,61,119,0.4)] sm:w-[380px] xl:w-[420px]"
                >
                  <header className="relative flex min-h-[168px] shrink-0 flex-col overflow-hidden bg-[#113d77] px-5 py-5 text-white sm:min-h-[180px] sm:px-6 sm:py-6">
                    <span className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full border-[20px] border-white/[0.06]" />
                    <span className="relative mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-[#113d77]">
                      {String((index % industrySolutions.length) + 1).padStart(2, "0")}
                    </span>
                    <h3 className="relative m-0 min-h-[2.6em] text-[clamp(16px,1.3vw,20px)] font-bold leading-snug 2xl:text-[22px]">
                      {solution.title}
                    </h3>
                    <p className="relative mt-auto pt-2 text-xs font-medium uppercase tracking-[0.08em] text-white/60 2xl:text-sm">
                      Applications
                    </p>
                  </header>
                  <ul className="m-0 flex flex-1 list-none flex-col gap-3 p-5 sm:p-6">
                    {solution.applications.map((app) => (
                      <li
                        key={app}
                        className="flex items-start gap-2.5 text-[clamp(12px,1.05vw,14px)] leading-[1.5] text-[#687181] 2xl:text-[17px] 2xl:leading-7"
                      >
                        <img
                          src={elevateIcon}
                          alt=""
                          aria-hidden
                          className="mt-[6px] h-2 w-2 shrink-0 object-contain"
                        />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => scroll("left")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e0e9f1] bg-white text-[#113d77] shadow-[0_4px_14px_rgba(17,61,119,0.12)] transition-all duration-300 hover:scale-110 hover:bg-[#113d77] hover:text-white hover:shadow-[0_8px_20px_rgba(17,61,119,0.2)] active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e0e9f1] bg-white text-[#113d77] shadow-[0_4px_14px_rgba(17,61,119,0.12)] transition-all duration-300 hover:scale-110 hover:bg-[#113d77] hover:text-white hover:shadow-[0_8px_20px_rgba(17,61,119,0.2)] active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Added */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mb-[clamp(28px,3.5vw,40px)] max-w-[48rem]">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Value Added
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] 2xl:text-[18px] 2xl:leading-8">
              Proven outcomes from video analytics deployments across attendance,
              security, deepfake detection, and insurance inspection.
            </p>
          </header>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
            <div className="flex h-full items-center justify-center overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-[#EFF7FC] p-4 sm:p-5 lg:p-6">
              <div className="w-full overflow-hidden rounded-[15px]">
                <img
                  src={audioBg2}
                  alt="Audio and video analytics value delivery"
                  className="block h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {valueAdded.map((item, index) => (
                <article
                  key={item}
                  className="flex h-full min-h-[150px] flex-col overflow-hidden rounded-[20px] border border-[#e8eef3] bg-[#EFF7FC] p-5 sm:min-h-0 sm:p-6"
                >
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2365aa] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="m-0 flex-1 text-[clamp(13px,1.15vw,15px)] leading-6 text-[#5a5a5a] 2xl:text-[18px] 2xl:leading-8">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deepfake Detection Product Section */}
      <section className="w-full bg-white pb-[clamp(40px,5vw,72px)]">
        <div className="mx-auto w-full max-w-[1692px] px-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="relative overflow-hidden rounded-[28px] border border-[#e2ebf3] bg-gradient-to-br from-[#113d77] via-[#1a4a8a] to-[#0f3466] p-6 text-white shadow-xl sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6 xl:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-200 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-blue-300" /> Our AI Product
                </span>
                <h2 className="mt-4 text-[clamp(28px,3.5vw,46px)] font-extrabold leading-[1.15] text-white">
                  Upload to Uncover <span className="font-serif italic font-normal text-blue-200">Deepfakes</span> with AI Precision
                </h2>
                <p className="mt-4 text-[clamp(14px,1.2vw,17px)] leading-relaxed text-blue-100/90 2xl:text-[18px]">
                  Discover an advanced AI-assisted verifier that detects facial inconsistencies, lip-sync drift, and audio manipulation with high confidence.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium text-blue-100 sm:text-sm">
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-2 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> Facial Inconsistencies
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-2 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> Lip-Sync Drift
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-2 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> Audio Manipulation Detection
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://elevatetrust.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#113d77] shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span>Try Deepfake Detector</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-6 xl:col-span-5">
                <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-2 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/40">
                  <img
                    src={deepfakeImg}
                    alt="Deepfake Detection AI Verifier Platform"
                    className="h-auto w-full rounded-xl object-cover shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
