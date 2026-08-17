import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import checkIcon from "../assets/technology-trends/check-icon.svg";
import elevateIcon from "../assets/service/AI-process/elevateIcon.svg";
import about1 from "../assets/homepage-icons/about-1.png";
import about2 from "../assets/homepage-icons/about-2.png";
import futureImage from "../assets/homepage-icons/future.png";
import editmodeImage from "../assets/homepage-icons/editmode.png";
import careersImage from "../assets/homepage-icons/carrers.png";
import fly1 from "../assets/homepage-icons/fly-1.png";
import fly2 from "../assets/homepage-icons/fly-2.png";
import fly3 from "../assets/homepage-icons/fly-3.png";
import fly4 from "../assets/homepage-icons/fly-4.png";
import flowchartImage from "../assets/OurServices/flowchart-9.png";
import uiUxImage from "../assets/OurServices/UI_UX.svg";
import websiteImage from "../assets/OurServices/website-dev.svg";
import appDevImage from "../assets/OurServices/app-dev.png";
import customSoftwareImage from "../assets/OurServices/custom-software.svg";
import ecommerceImage from "../assets/OurServices/ecom-dev.svg";
import digitalMarketingImage from "../assets/OurServices/digital-service.svg";
import erpImage from "../assets/OurServices/erp.svg";
import webDesignDevImage from "../assets/OurServices/webdesignanddev.svg";
import mobileAppDevImage from "../assets/OurServices/mobile-app-development-img.svg";
import ecommerceCompanyImage from "../assets/OurServices/E-commerce-company.svg";
import digitalMarketingAgencyImage from "../assets/OurServices/digital-marketing-agency-popular-services.svg";
import erpSoftwareImage from "../assets/OurServices/ERP-SOFTWARE-COMPANY-IN-NASHIK.png";
import happyFeetImage from "../assets/OurServices/happyfeet.png";
import genData from "../assets/OurServices/seo.svg";
import genSoftware from "../assets/OurServices/corporate.svg";
import genOptimize from "../assets/OurServices/modernization.png";
import genCustomer from "../assets/OurServices/GenAI-customService.svg";
import genHealthcare from "../assets/OurServices/GenAI-healthcare.svg";
import genHr from "../assets/OurServices/GenAI-HR.svg";
import genFinance from "../assets/OurServices/GenAI-Finance.svg";
import audioAccuracy from "../assets/OurServices/Audio-accuracy.png";
import audioCamera from "../assets/OurServices/Audio-camera.png";
import audioDeploy from "../assets/OurServices/Audio-deployment.png";
import audioInsights from "../assets/OurServices/ongoing.svg";
import audioIntegration from "../assets/OurServices/Api-first.png";
import audioSimple from "../assets/OurServices/Audio-simple.png";
import audioBg1 from "../assets/OurServices/Audiobg-1.svg";
import audioBg2 from "../assets/OurServices/Audiobg-2.svg";
import agileImage from "../assets/OurServices/agile-light.svg";
import llmAgentsImage from "../assets/OurServices/llm-agents-light.svg";
import roadmapImage from "../assets/OurServices/roadmap-light.svg";
import techStackImage from "../assets/OurServices/techstack-light.png";
import virtualAssistant from "../assets/OurServices/virtual-assistant.svg";
import trendsAi from "../assets/technology-trends/Trends-AI.png";
import trendsCloud from "../assets/technology-trends/Trends-cloud.png";
import trendsData from "../assets/technology-trends/Trends-data.png";
import trendsDigital from "../assets/technology-trends/Trends-digital.png";
import trendsDevops from "../assets/technology-trends/Trends-devops.png";
import trendsSdlc from "../assets/technology-trends/Trends-sdlc.png";
import processFrame1 from "../assets/service/AI-process/frame1.svg";
import processFrame2 from "../assets/service/AI-process/frame2.svg";
import processFrame3 from "../assets/service/AI-process/frame3.svg";
import processFrame4 from "../assets/service/AI-process/frame4.svg";
import processFrame5 from "../assets/service/AI-process/frame5.svg";
import processFrame6 from "../assets/service/AI-process/frame6.svg";
import processFrame7 from "../assets/service/AI-process/frame7.svg";
import coreFrame1 from "../assets/service/core/frame1.svg";
import coreFrame2 from "../assets/service/core/frame2.svg";
import coreFrame3 from "../assets/service/core/frame3.svg";
import coreFrame4 from "../assets/service/core/frame4.svg";

export type DeliveredWorkProject = {
  title: string;
  client: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  href: string;
  linkLabel?: string;
  hideRightButton?: boolean;
};

export type DigitalServicePageProps = {
  breadcrumb: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  sectionTitle: string;
  sectionSubtitle: string;
  introTitle: string;
  introBody: string;
  offerings: { title: string; description: string; icon: string }[];
  processTitle: string;
  processSubtitle: string;
  processSteps: { title: string; text: string; icon: string }[];
  valueTitle: string;
  valueSubtitle: string;
  valuePoints: string[];
  capabilitiesTitle: string;
  capabilities: string[];
  capabilitiesImage?: string;
  showTechStacks?: boolean;
  deliveredWork?: DeliveredWorkProject[];
  plainOfferings?: boolean;
  roundedHeroImage?: boolean;
};

const techStacks = [
  {
    name: "LAMP",
    summary:
      "A classic, battle-tested stack for content platforms, portals, and PHP-driven products that need reliability and wide hosting support.",
    bestFor: "CMS sites, business portals, rapid PHP delivery",
    items: [
      { name: "Linux", role: "Operating system" },
      { name: "Apache", role: "Web server" },
      { name: "MySQL", role: "Database" },
      { name: "PHP", role: "Application layer" },
    ],
  },
  {
    name: "MEAN",
    summary:
      "A JavaScript-everywhere stack for dynamic single-page apps with Angular on the front and Node services on the back.",
    bestFor: "Enterprise SPAs, dashboards, Angular teams",
    items: [
      { name: "MongoDB", role: "Document database" },
      { name: "Express.js", role: "API framework" },
      { name: "Angular", role: "Frontend framework" },
      { name: "Node.js", role: "Runtime" },
    ],
  },
  {
    name: "MERN",
    summary:
      "Our go-to stack for modern product UIs, React for interfaces, Node/Express for APIs, and MongoDB for flexible data models.",
    bestFor: "Product apps, admin tools, SaaS frontends",
    items: [
      { name: "MongoDB", role: "Document database" },
      { name: "Express.js", role: "API framework" },
      { name: "React.js", role: "UI library" },
      { name: "Node.js", role: "Runtime" },
    ],
  },
  {
    name: "MEVN",
    summary:
      "A Vue-centered full-stack option when teams want approachable frontend DX with the same Node and Mongo foundations.",
    bestFor: "Vue apps, progressive web products",
    items: [
      { name: "MongoDB", role: "Document database" },
      { name: "Express.js", role: "API framework" },
      { name: "Vue.js", role: "Frontend framework" },
      { name: "Node.js", role: "Runtime" },
    ],
  },
  {
    name: "LEMP",
    summary:
      "A high-performance Linux stack with Nginx for concurrency-heavy sites and APIs that need efficient request handling.",
    bestFor: "High-traffic sites, API gateways, PHP at scale",
    items: [
      { name: "Linux", role: "Operating system" },
      { name: "Nginx", role: "Web server / proxy" },
      { name: "MySQL", role: "Database" },
      { name: "PHP", role: "Application layer" },
    ],
  },
];

/** Rich line-art / scene illustrations for service cards */
export const digitalServiceImages = {
  uiUx: uiUxImage,
  website: websiteImage,
  appDev: appDevImage,
  customSoftware: customSoftwareImage,
  ecommerce: ecommerceImage,
  digitalMarketing: digitalMarketingImage,
  erp: erpImage,
  webDesignDev: webDesignDevImage,
  mobileAppDev: mobileAppDevImage,
  ecommerceCompany: ecommerceCompanyImage,
  digitalMarketingAgency: digitalMarketingAgencyImage,
  erpSoftware: erpSoftwareImage,
  happyFeet: happyFeetImage,
  flowchart: flowchartImage,
  genData,
  genSoftware,
  genOptimize,
  genCustomer,
  genHealthcare,
  genHr,
  genFinance,
  audioAccuracy,
  audioCamera,
  audioDeploy,
  audioInsights,
  audioIntegration,
  audioSimple,
  audioBg1,
  audioBg2,
  agile: agileImage,
  llmAgents: llmAgentsImage,
  roadmap: roadmapImage,
  techStack: techStackImage,
  virtualAssistant,
  about1,
  about2,
  future: futureImage,
  editmode: editmodeImage,
  careers: careersImage,
  fly1,
  fly2,
  fly3,
  fly4,
  trendsAi,
  trendsCloud,
  trendsData,
  trendsDigital,
  trendsDevops,
  trendsSdlc,
  processFrame1,
  processFrame2,
  processFrame3,
  processFrame4,
  processFrame5,
  processFrame6,
  processFrame7,
  coreFrame1,
  coreFrame2,
  coreFrame3,
  coreFrame4,
};

export default function DigitalServicePage({
  breadcrumb,
  heroTitle,
  heroSubtitle,
  heroImage,
  sectionTitle,
  sectionSubtitle,
  introTitle,
  introBody,
  offerings,
  processTitle,
  processSubtitle,
  processSteps,
  valueTitle,
  valueSubtitle,
  valuePoints,
  capabilitiesTitle,
  capabilities,
  capabilitiesImage = flowchartImage,
  showTechStacks = false,
  deliveredWork,
  plainOfferings = false,
  roundedHeroImage = false,
}: DigitalServicePageProps) {
  const [activeStack, setActiveStack] = useState(0);
  const selectedStack = techStacks[activeStack] ?? techStacks[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      <section className="service-page-hero" aria-label={breadcrumb}>
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
            {heroTitle}
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            {heroSubtitle}
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
            <span>{breadcrumb}</span>
          </nav>
        </div>

        <div className="mx-auto w-full max-w-[1692px] px-5 pb-[clamp(40px,5vw,64px)] pt-0 sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div>
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                {introTitle}
              </h2>
              <p className="mt-5 max-w-[46rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#848b9b] sm:mt-6 2xl:text-[18px] 2xl:leading-8">
                {introBody}
              </p>
              <ul className="mt-6 flex list-none flex-col gap-3 p-0 sm:mt-8">
                {capabilities.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[clamp(14px,1.2vw,17px)] font-medium leading-[1.5] text-[#5a5a5a] 2xl:text-[19px]"
                  >
                    <img
                      src={checkIcon}
                      alt=""
                      aria-hidden
                      className="mt-[0.4em] h-3 w-3 shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-full items-center justify-center self-center lg:self-stretch">
              <img
                src={heroImage}
                alt=""
                className={`mx-auto block h-auto w-full max-w-full object-contain object-center ${
                  roundedHeroImage ? "rounded-[16px]" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] pt-0 sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(32px,4vw,56px)] max-w-[52rem] text-center">
            <h2 className="m-0 text-[clamp(28px,4vw,56px)] font-bold leading-[1.15] text-[#1F2432]">
              {sectionTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-[48rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] sm:mt-6 2xl:text-[18px] 2xl:leading-8">
              {sectionSubtitle}
            </p>
          </header>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
              plainOfferings
                ? "gap-x-6 gap-y-8 sm:gap-y-12 lg:gap-x-8 lg:gap-y-14 xl:gap-x-10"
                : "gap-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:gap-x-10"
            }`}
          >
            {offerings.map((item) => (
              <article key={item.title} className="flex min-w-0 flex-col">
                {plainOfferings ? (
                  <div className="mb-4 aspect-[3/2] w-full shrink-0 overflow-hidden rounded-[20px] sm:mb-5">
                    <img
                      src={item.icon}
                      alt=""
                      className="h-full w-full object-contain object-center"
                      aria-hidden
                    />
                  </div>
                ) : (
                  <div className="mb-5 flex aspect-[1.1] w-full items-center justify-center rounded-[24px] bg-[#e5ecf3] p-8 sm:mb-6">
                    <img
                      src={item.icon}
                      alt=""
                      className="h-full w-full object-contain drop-shadow-sm"
                      aria-hidden
                    />
                  </div>
                )}
                <h3 className="m-0 text-[clamp(16px,1.3vw,20px)] font-bold leading-snug text-[#1F2432] 2xl:text-[22px]">
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

      {deliveredWork && deliveredWork.length > 0 ? (
        <section className="w-full bg-[#f8fbfd]" aria-label="Delivered Work">
          <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
            <header className="mb-[clamp(28px,3.5vw,48px)] max-w-[48rem]">
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                Delivered Work
              </h2>
              <p className="mt-4 max-w-[40rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
                Real websites we design and ship for brands that need a digital presence as thoughtful as their offering.
              </p>
            </header>

            <div className="flex flex-col gap-10 lg:gap-14">
              {deliveredWork.map((project) => (
                <article
                  key={project.href}
                  className="overflow-hidden rounded-[24px] border border-[#e8eef3] bg-[#EFF7FC] shadow-[0_20px_50px_-28px_rgba(17,61,119,0.35)] lg:rounded-[28px]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center overflow-hidden bg-[#e8eef3] p-3 sm:p-4 lg:p-5"
                      aria-label={`Open ${project.client} website`}
                    >
                      <img
                        src={project.image}
                        alt={`${project.client} website preview`}
                        className="block h-auto w-full rounded-[12px] object-contain object-center shadow-[0_12px_32px_-16px_rgba(17,61,119,0.4)] transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#2365aa] shadow-sm backdrop-blur sm:bottom-7 sm:left-7 sm:text-sm">
                        View live site
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                      </span>
                    </a>

                    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
                      <p className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-[#2365aa]">
                        {project.client}
                      </p>
                      <h3 className="mt-2 m-0 text-[clamp(22px,2.4vw,32px)] font-bold leading-tight text-[#1F2432]">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-[clamp(13px,1.15vw,15px)] font-medium text-[#2365aa]">
                        {project.tagline}
                      </p>
                      <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#5a5a5a] 2xl:text-[17px]">
                        {project.description}
                      </p>

                      <ul className="mt-6 flex list-none flex-col gap-3 p-0">
                        {project.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[clamp(13px,1.15vw,15px)] font-medium leading-[1.45] text-[#5a5a5a]"
                          >
                            <img
                              src={checkIcon}
                              alt=""
                              aria-hidden
                              className="mt-[0.35em] h-3 w-3 shrink-0"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {!project.hideRightButton && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#2365aa] py-3 pl-[22px] pr-2.5 text-sm font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490] sm:text-base sm:pl-[26px] sm:pr-3.5"
                        >
                          {project.linkLabel || "Visit Website"}
                          <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-[#2365aa] sm:h-[37px] sm:w-[37px]">
                            <ArrowUpRight size={16} strokeWidth={2.5} />
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mb-[clamp(28px,3.5vw,44px)] max-w-[48rem]">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              {processTitle}
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] 2xl:text-[18px] 2xl:leading-8">
              {processSubtitle}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {processSteps.map((step, index) => (
              <article key={step.title} className="flex h-full flex-col">
                <div className="relative mb-4">
                  <span className="absolute left-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#113d77] text-xs font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={step.icon}
                    alt=""
                    aria-hidden
                    className="mx-auto block h-auto max-h-[160px] w-full object-contain"
                  />
                </div>
                <h3 className="m-0 text-[clamp(15px,1.2vw,18px)] font-bold text-[#1F2432]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[clamp(12px,1.05vw,14px)] leading-6 text-[#687181] 2xl:text-[16px]">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#EFF7FC]">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <img
                src={capabilitiesImage}
                alt=""
                className="mx-auto block h-auto w-full max-w-[min(100%,560px)] rounded-[24px] object-contain sm:rounded-[28px] lg:max-w-[620px] lg:rounded-[32px] xl:max-w-[680px]"
              />
            </div>
            <div>
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                {capabilitiesTitle}
              </h2>
              <ul className="mt-6 flex list-none flex-col gap-3.5 p-0 sm:mt-8">
                {capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[clamp(14px,1.2vw,17px)] font-medium leading-[1.5] text-[#5a5a5a] 2xl:text-[19px]"
                  >
                    <img
                      src={elevateIcon}
                      alt=""
                      aria-hidden
                      className="mt-[0.45em] h-2.5 w-2.5 shrink-0 object-contain"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mb-[clamp(28px,3.5vw,40px)] max-w-[48rem]">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              {valueTitle}
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] 2xl:text-[18px] 2xl:leading-8">
              {valueSubtitle}
            </p>
          </header>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {valuePoints.map((point, index) => (
              <article
                key={point}
                className="flex min-h-[140px] flex-col rounded-[20px] border border-[#e8eef3] bg-[#EFF7FC] p-5 sm:p-6"
              >
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2365aa] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="m-0 flex-1 text-[clamp(13px,1.15vw,15px)] leading-6 text-[#5a5a5a] 2xl:text-[18px] 2xl:leading-8">
                  {point}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {showTechStacks ? (
        <section className="w-full bg-[#EFF7FC]">
          <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
            <header className="mx-auto mb-[clamp(28px,3.5vw,44px)] max-w-[48rem] text-center">
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                Full Stack Technology Stack
              </h2>
              <p className="mx-auto mt-4 max-w-[40rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
                Proven stacks we use to build scalable, maintainable products,
                chosen to match your team, timeline, and performance goals.
              </p>
            </header>

            <div
              className="mx-auto mb-8 flex max-w-[720px] flex-wrap items-center justify-center gap-2 sm:mb-10 sm:gap-3"
              role="tablist"
              aria-label="Technology stacks"
            >
              {techStacks.map((stack, index) => {
                const isActive = index === activeStack;
                return (
                  <button
                    key={stack.name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveStack(index)}
                    className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-bold tracking-wide transition-all duration-300 sm:px-5 sm:text-base ${
                      isActive
                        ? "border-[#113d77] bg-[#113d77] text-white shadow-[0_12px_28px_-14px_rgba(17,61,119,0.65)]"
                        : "border-[#d7e6f3] bg-white text-[#2365aa] hover:border-[#2365aa]"
                    }`}
                  >
                    {stack.name}
                  </button>
                );
              })}
            </div>

            <div
              key={selectedStack.name}
              className="mx-auto grid max-w-[1100px] grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8"
              role="tabpanel"
            >
              <div className="relative flex flex-col justify-center gap-3">
                <div
                  aria-hidden
                  className="absolute bottom-4 left-[1.85rem] top-4 w-px bg-[#c5d8eb] sm:left-[2.1rem]"
                />
                {selectedStack.items.map((item, index) => (
                  <div
                    key={`${selectedStack.name}-${item.name}`}
                    className="relative z-[1] flex items-center gap-4 rounded-[18px] border border-[#d7e6f3] bg-white p-4 shadow-[0_14px_34px_-24px_rgba(17,61,119,0.4)] sm:gap-5 sm:rounded-[22px] sm:p-5"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#113d77] text-xl font-bold text-white sm:h-14 sm:w-14 sm:text-2xl">
                      {selectedStack.name[index]}
                    </span>
                    <div className="min-w-0">
                      <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#848b9b]">
                        Layer {String(index + 1).padStart(2, "0")} · {item.role}
                      </p>
                      <h3 className="m-0 mt-1 text-[clamp(18px,1.5vw,24px)] font-bold text-[#1F2432]">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#113d77] p-6 text-white sm:rounded-[28px] sm:p-8">
                <div>
                  <p className="m-0 text-sm font-semibold uppercase tracking-[0.16em] text-[#8eb4df]">
                    Active stack
                  </p>
                  <h3 className="m-0 mt-3 text-[clamp(36px,5vw,64px)] font-bold leading-none tracking-tight">
                    {selectedStack.name}
                  </h3>
                  <p className="mt-2 text-lg font-semibold tracking-[0.28em] text-[#8eb4df]">
                    {selectedStack.name.split("").join(" · ")}
                  </p>
                  <p className="mt-6 text-[clamp(14px,1.2vw,17px)] leading-7 text-[#d7e6f3]">
                    {selectedStack.summary}
                  </p>
                </div>
                <div className="mt-8 rounded-[18px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-[#8eb4df]">
                    Best for
                  </p>
                  <p className="m-0 mt-2 text-base font-semibold leading-6 text-white">
                    {selectedStack.bestFor}
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ) : null}

      <FlyCTA />
    </div>
  );
}
