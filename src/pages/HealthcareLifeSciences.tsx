import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bot,
  Brain,
  ClipboardList,
  FileText,
  HeartPulse,
  Hospital,
  Image as ImageIcon,
  Lock,
  Mic,
  MonitorSmartphone,
  Network,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Workflow,
} from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import healthcareAgentIcon from "../assets/OurServices/GenAI-healthcare.png";
import virtualAssistant from "../assets/OurServices/virtual-assistant.png";
import healthcareChallengesImage from "../assets/industries/healthcare.jpeg";
import techStackImage from "../assets/OurServices/techstack-light.png";
import knowledgeIcon from "../assets/OurServices/GenAI-knowledge.png";
import dataIcon from "../assets/OurServices/GenAI-Data.png";
import optimizeIcon from "../assets/OurServices/GenAI-Optimize.png";
import checkIcon from "../assets/technology-trends/check-icon.svg";

const challengeCards = [
  {
    title: "Patient Data Management",
    text: "Unify fragmented clinical records and make trusted patient information available when care teams need it.",
    icon: ClipboardList,
  },
  {
    title: "Clinical Documentation",
    text: "Reduce time spent on notes, forms, and charts so clinicians can focus on patients instead of paperwork.",
    icon: FileText,
  },
  {
    title: "Medical Imaging",
    text: "Support radiologists and specialists with AI-assisted review of X-rays, MRI, CT, and diagnostic scans.",
    icon: ImageIcon,
  },
  {
    title: "Hospital Operations",
    text: "Automate scheduling, triage support, and administrative workflows across departments and facilities.",
    icon: Hospital,
  },
  {
    title: "Patient Engagement",
    text: "Deliver 24/7 guidance for appointments, FAQs, follow-ups, and care navigation through intelligent assistants.",
    icon: HeartPulse,
  },
  {
    title: "Healthcare Security",
    text: "Protect sensitive health data with privacy-aware AI systems designed for regulated healthcare environments.",
    icon: Lock,
  },
];

const howWeHelp = [
  {
    title: "AI Patient Assistant",
    text: "24×7 virtual assistants for patient support, appointment scheduling, and healthcare guidance.",
    icon: Bot,
  },
  {
    title: "Medical Document Intelligence",
    text: "Extract structured information from prescriptions, reports, and medical forms using OCR and NLP.",
    icon: FileText,
  },
  {
    title: "Clinical Decision Support",
    text: "AI-powered insights assist healthcare professionals with faster and more informed decisions.",
    icon: Brain,
  },
  {
    title: "Medical Image Analytics",
    text: "Analyze X-rays, MRI scans, CT scans, and diagnostic images using Computer Vision.",
    icon: Stethoscope,
  },
  {
    title: "Speech Intelligence",
    text: "Convert doctor-patient conversations into structured medical notes.",
    icon: Mic,
  },
  {
    title: "Healthcare Automation",
    text: "Reduce manual administrative work across hospitals and healthcare organizations.",
    icon: Workflow,
  },
];

const aiSolutions = [
  {
    title: "Medical AI Assistants",
    text: "Conversational copilots that support patients and staff with grounded, policy-aware responses.",
    icon: healthcareAgentIcon,
  },
  {
    title: "Predictive Healthcare Analytics",
    text: "Identify risk patterns, improve planning, and surface actionable insights from clinical and operational data.",
    icon: dataIcon,
  },
  {
    title: "Medical OCR",
    text: "Digitize prescriptions, lab reports, and forms into searchable, structured healthcare records.",
    icon: knowledgeIcon,
  },
  {
    title: "Speech-to-Text",
    text: "Capture consultations accurately and turn spoken encounters into usable clinical documentation.",
    icon: optimizeIcon,
  },
  {
    title: "Medical Imaging AI",
    text: "Assist diagnostic review with computer vision models trained for medical image analysis workflows.",
    icon: healthcareAgentIcon,
  },
  {
    title: "Healthcare Data Security",
    text: "Build privacy-first AI solutions with access controls, auditability, and secure deployment options.",
    icon: knowledgeIcon,
  },
];

const useCases = [
  {
    title: "Hospital Workflow Automation",
    text: "Automatically digitize patient records and eliminate repetitive administrative work.",
    icon: Workflow,
  },
  {
    title: "Patient Chatbots",
    text: "Provide 24/7 support for appointment booking, FAQs, and follow-up care.",
    icon: Bot,
  },
  {
    title: "Medical Imaging",
    text: "Assist radiologists by detecting anomalies in diagnostic images.",
    icon: ImageIcon,
  },
  {
    title: "Remote Patient Monitoring",
    text: "Monitor patient health using AI and IoT devices for proactive intervention.",
    icon: MonitorSmartphone,
  },
  {
    title: "Healthcare Knowledge Search",
    text: "Enable doctors to instantly retrieve clinical information from medical documents.",
    icon: Brain,
  },
  {
    title: "Clinical Voice Documentation",
    text: "Automatically generate consultation summaries from conversations.",
    icon: Mic,
  },
];

const technologies = [
  { name: "Computer Vision", icon: ImageIcon },
  { name: "OCR", icon: FileText },
  { name: "LLMs", icon: Brain },
  { name: "Agentic AI", icon: Bot },
  { name: "Speech Recognition", icon: Mic },
  { name: "Edge AI", icon: Network },
  { name: "IoT", icon: MonitorSmartphone },
  { name: "Cloud AI", icon: Sparkles },
];

const outcomes = [
  {
    title: "Reduce Administrative Costs",
    text: "Cut repetitive paperwork and free teams to focus on higher-value clinical and operational work.",
  },
  {
    title: "Improve Patient Experience",
    text: "Offer faster responses, clearer guidance, and more connected care journeys.",
  },
  {
    title: "Accelerate Clinical Decisions",
    text: "Surface relevant insights, documents, and imaging support when clinicians need them.",
  },
  {
    title: "Increase Operational Efficiency",
    text: "Streamline hospital workflows from intake and documentation to follow-up and monitoring.",
  },
];

const whyElevate = [
  {
    title: "10+ Years AI Experience",
    text: "Deep delivery experience across applied AI, automation, and enterprise transformation.",
    icon: Sparkles,
  },
  {
    title: "Research-driven AI Team",
    text: "A team that blends research thinking with practical healthcare implementation.",
    icon: Brain,
  },
  {
    title: "PhD & MTech AI Engineers",
    text: "Specialists who design models, pipelines, and systems built for real clinical environments.",
    icon: Users,
  },
  {
    title: "End-to-End AI Delivery",
    text: "From discovery and architecture to deployment, monitoring, and continuous improvement.",
    icon: Workflow,
  },
  {
    title: "Trusted Globally",
    text: "Trusted by organizations that need secure, scalable, and production-ready AI solutions.",
    icon: ShieldCheck,
  },
  {
    title: "Patent-backed AI Innovation",
    text: "Innovation grounded in research, patents, and proven applied AI delivery.",
    icon: Lock,
  },
];

export default function HealthcareLifeSciences() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      {/* Hero */}
      <section className="service-page-hero" aria-label="Healthcare and Life Sciences">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#8eb4df]">
            Healthcare &amp; Life Sciences
          </p>
          <h1 className="m-0 text-[clamp(28px,3.8vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            AI Solutions for Smarter, Safer, and More Connected Healthcare
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            Accelerate patient care, improve clinical decision-making, automate healthcare
            operations, and strengthen data security with AI-powered healthcare solutions built
            for modern healthcare providers.
          </p>
          <Link
            to="/contact"
            className="mt-[clamp(16px,2vw,28px)] inline-flex items-center gap-1.5 rounded-full bg-[#2365aa] py-3 pl-[26px] pr-3.5 text-base font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490] lg:py-2.5 lg:pl-[22px] lg:pr-2.5 lg:text-sm 2xl:py-3 2xl:pl-[26px] 2xl:pr-3.5 2xl:text-base"
          >
            Talk to AI Experts
            <span className="inline-flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white text-[#2365aa]">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1692px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <nav
          className="flex flex-wrap items-center gap-2.5 pb-[clamp(20px,2.5vw,36px)] pt-[clamp(28px,3vw,48px)] text-[clamp(13px,1.2vw,18px)] font-normal leading-[1.2] text-[#272935]"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="text-inherit no-underline transition-colors hover:text-[#2365aa]">
            Home
          </Link>
          <span className="text-[#848b9b]">»</span>
          <Link
            to="/industries"
            className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
          >
            Industries
          </Link>
          <span className="text-[#848b9b]">»</span>
          <span>Healthcare and Life Sciences</span>
        </nav>
      </div>

      {/* Industry Challenges */}
      <section className="w-full bg-white" aria-label="Healthcare Challenges">
        <div className="mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div>
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                Transforming Healthcare Through Intelligent AI Solutions
              </h2>
              <p className="mt-5 max-w-[46rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#848b9b] 2xl:text-[18px] 2xl:leading-8">
                Healthcare organizations manage enormous volumes of clinical data while striving to
                improve patient outcomes, operational efficiency, and regulatory compliance. Manual
                workflows, fragmented systems, and increasing patient expectations create significant
                challenges that demand intelligent automation. ElevateTrust empowers healthcare
                providers with AI-driven solutions that streamline operations, support clinical teams,
                strengthen security, and deliver better patient experiences.
              </p>
            </div>
            <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-[#EFF7FC]">
              <img
                src={healthcareChallengesImage}
                alt="Healthcare AI transformation visual"
                className="mx-auto block aspect-[4/3] h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-[clamp(36px,4vw,56px)] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {challengeCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="rounded-[20px] border border-[#e8eef3] bg-[#EFF7FC] p-5 transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(17,61,119,0.35)] sm:p-6"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2365aa] text-white">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <h3 className="m-0 text-[clamp(16px,1.3vw,20px)] font-bold text-[#1F2432]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[clamp(13px,1.15vw,15px)] leading-6 text-[#5a5a5a]">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How ElevateTrust Helps */}
      <section className="w-full bg-[#EFF7FC]" aria-label="How ElevateTrust Helps">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="mb-[clamp(28px,3.5vw,48px)] grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
            <div className="order-2 lg:order-1">
              <img
                src={virtualAssistant}
                alt="AI assistant supporting healthcare teams"
                className="mx-auto block h-auto w-full max-w-[280px] object-contain lg:max-w-[320px]"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                How ElevateTrust Helps
              </h2>
              <p className="mt-4 max-w-[42rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
                We combine clinical workflow understanding with practical AI delivery, so healthcare
                teams get assistants, automation, and analytics that fit real hospital and life
                sciences operations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {howWeHelp.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="flex h-full flex-col rounded-[20px] border border-[#e2ebf3] bg-white p-5 sm:p-6"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#113d77] text-white">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <h3 className="m-0 text-[clamp(16px,1.3vw,20px)] font-bold text-[#1F2432]">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[clamp(13px,1.15vw,15px)] leading-6 text-[#5a5a5a]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Solutions */}
      <section className="w-full bg-white" aria-label="AI Solutions for Healthcare">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(28px,3.5vw,48px)] max-w-[52rem] text-center">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              AI Solutions for Healthcare
            </h2>
            <p className="mx-auto mt-4 max-w-[42rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
              Purpose-built AI modules that help healthcare providers improve care quality, reduce
              operational friction, and unlock value from clinical data.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {aiSolutions.map((item) => (
              <article
                key={item.title}
                className="group flex h-full min-w-0 flex-col rounded-[20px] border border-[#e8eef3] bg-[#f8fbfd] p-4 transition-all hover:-translate-y-1 hover:border-[#2365aa]/30 hover:shadow-[0_18px_40px_-24px_rgba(17,61,119,0.4)] sm:p-5"
              >
                <div className="mb-5 aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-white">
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <h3 className="m-0 text-[clamp(16px,1.3vw,20px)] font-bold leading-snug text-[#1F2432]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[clamp(12px,1.1vw,14px)] leading-6 text-[#687181] 2xl:text-[16px]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="w-full bg-[#EFF7FC]" aria-label="Industry Use Cases">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="mb-[clamp(28px,3.5vw,48px)] grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                Industry Use Cases
              </h2>
              <p className="mt-4 max-w-[40rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
                Real healthcare scenarios where AI creates measurable impact across clinical teams,
                hospital operations, and patient engagement.
              </p>
            </div>
            <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-white p-4 sm:p-6">
              <img
                src={techStackImage}
                alt="Healthcare workflow and AI technology stack"
                className="mx-auto block h-auto w-full max-w-[560px] object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[20px] border border-[#e2ebf3] bg-white p-5 sm:p-6"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2365aa] text-white">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <h3 className="m-0 text-[clamp(16px,1.3vw,20px)] font-bold text-[#1F2432]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[clamp(13px,1.15vw,15px)] leading-6 text-[#5a5a5a]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="w-full bg-white" aria-label="Technologies">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mb-[clamp(28px,3.5vw,44px)] max-w-[48rem]">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Key Capabilities &amp; Technologies
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
              AI capability blocks that power secure, scalable healthcare solutions across cloud,
              edge, and on-premise environments.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-[20px] border border-[#e8eef3] bg-[#EFF7FC] px-4 py-6 text-center"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2365aa] text-white">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <p className="m-0 text-[clamp(13px,1.2vw,16px)] font-semibold text-[#1F2432]">
                    {tech.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Outcomes */}
      <section className="w-full bg-[#EFF7FC]" aria-label="Business Outcomes">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(28px,3.5vw,44px)] max-w-[48rem] text-center">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Business Outcomes
            </h2>
            <p className="mx-auto mt-4 max-w-[40rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
              Measurable results healthcare leaders care about, from cost reduction to better patient
              experiences and faster clinical decisions.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {outcomes.map((item, index) => (
              <article
                key={item.title}
                className="flex min-h-[180px] flex-col rounded-[20px] border border-[#e2ebf3] bg-white p-5 sm:p-6"
              >
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#2365aa] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="m-0 text-[clamp(16px,1.25vw,18px)] font-bold leading-snug text-[#1F2432]">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-[clamp(13px,1.1vw,14px)] leading-6 text-[#5a5a5a]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why ElevateTrust */}
      <section className="w-full bg-white" aria-label="Why ElevateTrust">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mb-[clamp(28px,3.5vw,44px)] max-w-[48rem]">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Why ElevateTrust
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
              A research-backed AI partner focused on secure delivery, practical innovation, and
              outcomes that matter for healthcare organizations.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {whyElevate.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[20px] border border-[#e8eef3] bg-[#f8fbfd] p-5 sm:p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#113d77] text-white">
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <h3 className="m-0 text-[clamp(16px,1.3vw,20px)] font-bold text-[#1F2432]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="m-0 text-[clamp(13px,1.15vw,15px)] leading-6 text-[#5a5a5a]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>

          <ul className="mt-10 flex list-none flex-col gap-3 p-0 sm:mt-12">
            {[
              "Secure and scalable AI architectures for regulated healthcare environments",
              "Human-in-the-loop design for clinical trust and accountability",
              "Flexible deployment across cloud, hybrid, and on-premise settings",
            ].map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-[clamp(14px,1.2vw,17px)] font-medium leading-[1.5] text-[#5a5a5a]"
              >
                <img
                  src={checkIcon}
                  alt=""
                  aria-hidden
                  className="mt-[0.4em] h-3 w-3 shrink-0"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Check Our Demos */}
      <section className="w-full bg-[#EFF7FC]" aria-label="Check our demos">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-[#e2ebf3] bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-10 lg:p-10">
            <div className="max-w-[46rem]">
              <h2 className="m-0 text-[clamp(24px,3vw,40px)] font-bold leading-[1.15] text-[#1F2432]">
                Check Our Demos
              </h2>
              <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
                Explore live AI walkthroughs tailored to Healthcare and Life Sciences. See how
                our agents, analytics, and automation work in real industry scenarios.
              </p>
            </div>
            <Link
              to={`/resources/demo?industry=${encodeURIComponent("Healthcare and Life Sciences")}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#2365aa] py-3 pl-[26px] pr-3.5 text-base font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490]"
            >
              View Industry Demos
              <span className="inline-flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white text-[#2365aa]">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
