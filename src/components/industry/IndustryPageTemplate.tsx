import { useEffect, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, type LucideProps } from "lucide-react";
import FlyCTA from "../FlyCTA";
import worldMapBackground from "../../assets/homepage-icons/Group(3).png";
import virtualAssistant from "../../assets/OurServices/virtual-assistant.png";
import techStackImage from "../../assets/OurServices/techstack-light.png";
import checkIcon from "../../assets/technology-trends/check-icon.svg";

export type LucideIcon = ComponentType<LucideProps>;

export type IndustryCard = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export type IndustrySolution = {
  title: string;
  text: string;
  icon: string;
};

export type IndustryTech = {
  name: string;
  icon: LucideIcon;
};

export type IndustryPageContent = {
  slug: string;
  label: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  challengesTitle: string;
  challengesBody: string;
  /** Visual shown beside the challenges intro (industry-specific asset). */
  challengesImage: string;
  challenges: IndustryCard[];
  helpsIntro: string;
  helps: IndustryCard[];
  solutionsTitle: string;
  solutionsSubtitle: string;
  solutions: IndustrySolution[];
  useCasesIntro: string;
  useCases: IndustryCard[];
  technologiesIntro: string;
  technologies: IndustryTech[];
  outcomesIntro: string;
  outcomes: { title: string; text: string }[];
  whyTitle: string;
  whyBody: string;
  whyCards: IndustryCard[];
  whyPoints: string[];
};

type Props = {
  content: IndustryPageContent;
};

export default function IndustryPageTemplate({ content }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [content.slug]);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      <section className="service-page-hero" aria-label={content.label}>
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#8eb4df]">
            {content.eyebrow}
          </p>
          <h1 className="m-0 text-[clamp(28px,3.8vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            {content.heroTitle}
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            {content.heroSubtitle}
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
          <span>{content.label}</span>
        </nav>
      </div>

      <section className="w-full bg-white" aria-label="Industry Challenges">
        <div className="mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div>
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                {content.challengesTitle}
              </h2>
              <p className="mt-5 max-w-[46rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#848b9b] 2xl:text-[18px] 2xl:leading-8">
                {content.challengesBody}
              </p>
            </div>
            <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-[#EFF7FC]">
              <img
                src={content.challengesImage}
                alt={`${content.label} industry visual`}
                className="mx-auto block aspect-[4/3] h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-[clamp(36px,4vw,56px)] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {content.challenges.map((card) => {
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

      <section className="w-full bg-[#EFF7FC]" aria-label="How ElevateTrust Helps">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="mb-[clamp(28px,3.5vw,48px)] grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
            <div className="order-2 lg:order-1">
              <img
                src={virtualAssistant}
                alt=""
                className="mx-auto block h-auto w-full max-w-[280px] object-contain lg:max-w-[320px]"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                How ElevateTrust Helps
              </h2>
              <p className="mt-4 max-w-[42rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
                {content.helpsIntro}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {content.helps.map((item) => {
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

      <section className="w-full bg-white" aria-label={content.solutionsTitle}>
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(28px,3.5vw,48px)] max-w-[52rem] text-center">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              {content.solutionsTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-[42rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
              {content.solutionsSubtitle}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {content.solutions.map((item) => (
              <article
                key={item.title}
                className="group flex h-full min-w-0 flex-col rounded-[20px] border border-[#e8eef3] bg-[#f8fbfd] p-4 transition-all hover:-translate-y-1 hover:border-[#2365aa]/30 hover:shadow-[0_18px_40px_-24px_rgba(17,61,119,0.4)] sm:p-5"
              >
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden
                  className="mb-5 h-auto w-full rounded-[16px] object-cover"
                />
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

      <section className="w-full bg-[#EFF7FC]" aria-label="Industry Use Cases">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="mb-[clamp(28px,3.5vw,48px)] grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                Industry Use Cases
              </h2>
              <p className="mt-4 max-w-[40rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
                {content.useCasesIntro}
              </p>
            </div>
            <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-white p-4 sm:p-6">
              <img
                src={techStackImage}
                alt=""
                className="mx-auto block h-auto w-full max-w-[560px] object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {content.useCases.map((item) => {
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

      <section className="w-full bg-white" aria-label="Technologies">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mb-[clamp(28px,3.5vw,44px)] max-w-[48rem]">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Key Capabilities &amp; Technologies
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
              {content.technologiesIntro}
            </p>
          </header>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {content.technologies.map((tech) => {
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

      <section className="w-full bg-[#EFF7FC]" aria-label="Business Outcomes">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(28px,3.5vw,44px)] max-w-[48rem] text-center">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Business Outcomes
            </h2>
            <p className="mx-auto mt-4 max-w-[40rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
              {content.outcomesIntro}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {content.outcomes.map((item, index) => (
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

      <section className="w-full bg-white" aria-label="Why ElevateTrust">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mb-[clamp(28px,3.5vw,44px)] max-w-[48rem]">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              {content.whyTitle}
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px]">
              {content.whyBody}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {content.whyCards.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[20px] border border-[#e8eef3] bg-[#f8fbfd] p-5 sm:p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#113d77] text-white">
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
            {content.whyPoints.map((point) => (
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
                Explore live AI walkthroughs tailored to {content.label}. See how
                our agents, analytics, and automation work in real industry scenarios.
              </p>
            </div>
            <Link
              to={`/resources/demo?industry=${encodeURIComponent(content.label)}`}
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
