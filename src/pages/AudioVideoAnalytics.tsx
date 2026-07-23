import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import simpleSetupIcon from "../assets/OurServices/Audio-simple.png";
import accuracyIcon from "../assets/OurServices/Audio-accuracy.png";
import insightsIcon from "../assets/OurServices/Audio-Insights.png";
import integrationIcon from "../assets/OurServices/Audio-integration.png";
import deploymentIcon from "../assets/OurServices/Audio-deployment.png";
import cameraHealthIcon from "../assets/OurServices/Audio-camera.png";
import audioBg1 from "../assets/OurServices/Audiobg-1.png";
import audioBg2 from "../assets/OurServices/Audiobg-2.png";
import elevateIcon from "../assets/service/AI-process/elevateIcon.svg";

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      {/* Hero */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden bg-[#113d77]"
        style={{ minHeight: "clamp(280px, 32vw, 492px)" }}
        aria-label="Audio and Video Analytics"
      >
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[58%] w-[min(94%,1600px)] -translate-x-1/2 -translate-y-1/2 opacity-55"
        />
        <div className="relative z-10 flex max-w-[min(860px,92%)] flex-col items-center px-5 pb-[clamp(48px,6vw,80px)] pt-[clamp(72px,8vw,120px)] text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#8eb4df] 2xl:text-base">
            Audio &amp; Video
          </p>
          <h1 className="m-0 text-[clamp(28px,3.8vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            Advanced Audio &amp; Video Analytics for Business Innovation
          </h1>
          <p className="mt-[clamp(16px,2vw,24px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            We develop custom solutions for text and image/video analytics, which
            include document parsing, understanding meaning in texts, analyzing
            warranties and claims, inspecting visuals for defects in manufacturing,
            detecting car damage, smart KYC processes, and detecting cyber crime
            &amp; deep fake videos.
          </p>
          <Link
            to="/contact"
            className="mt-[clamp(24px,3vw,40px)] inline-flex items-center gap-1.5 rounded-full bg-[#2365aa] py-3 pl-[26px] pr-3.5 text-base font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490] lg:py-2.5 lg:pl-[22px] lg:pr-2.5 lg:text-sm 2xl:py-3 2xl:pl-[26px] 2xl:pr-3.5 2xl:text-base"
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
        <div className="mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] pt-3 sm:px-8 lg:px-10 xl:px-12">
          <nav
            className="mb-[clamp(28px,3vw,48px)] flex flex-wrap items-center gap-2.5 pt-[clamp(20px,2.5vw,36px)] text-[clamp(13px,1.2vw,18px)] font-normal leading-[1.2] text-[#272935] 2xl:text-[18px]"
            aria-label="Breadcrumb"
          >
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

          <header className="mx-auto mb-[clamp(32px,4vw,56px)] max-w-[52rem] text-center">
            <h2 className="m-0 text-[clamp(28px,4vw,56px)] font-bold leading-[1.15] text-[#1F2432]">
              Video &amp; Audio Analytics
              <br />
              Core Offering
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
                <img
                  src={item.icon}
                  alt=""
                  className="mb-5 h-auto w-full max-h-[210px] rounded-[20px] object-cover object-center sm:mb-6 sm:max-h-[220px] lg:max-h-[230px]"
                  aria-hidden
                />
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
              <img
                src={audioBg1}
                alt="Audio and video analytics camera intelligence"
                className="mx-auto block h-auto w-full max-w-[560px] object-contain"
              />
            </div>
          </div>

          <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {industrySolutions.map((solution, index) => (
              <article
                key={solution.title}
                className="flex h-full min-h-0 flex-col overflow-hidden rounded-[20px] border border-[#e0e9f1] bg-white shadow-[0_14px_40px_-28px_rgba(17,61,119,0.4)]"
              >
                <header className="relative flex min-h-[168px] shrink-0 flex-col overflow-hidden bg-[#113d77] px-5 py-5 text-white sm:min-h-[180px] sm:px-6 sm:py-6">
                  <span className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full border-[20px] border-white/[0.06]" />
                  <span className="relative mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-[#113d77]">
                    {String(index + 1).padStart(2, "0")}
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
            <div className="flex h-full items-center justify-center overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-[#EFF7FC] p-5 sm:p-6 lg:p-8">
              <img
                src={audioBg2}
                alt="Audio and video analytics value delivery"
                className="mx-auto block h-auto w-full max-w-[420px] object-contain"
              />
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

      <FlyCTA />
    </div>
  );
}
