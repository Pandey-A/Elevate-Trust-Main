import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import benefitIcon1 from "../assets/homepage-icons/partners-1.svg";
import benefitIcon2 from "../assets/homepage-icons/partners-2.svg";
import benefitIcon3 from "../assets/homepage-icons/Frame.png";
import benefitIcon4 from "../assets/homepage-icons/landscape-1.svg";
import healthcareIndImage from "../assets/homepage-icons/healthcare-ind.png";

type IndustryId =
  | "healthcare-and-life-sciences"
  | "financial-services-&-fintech"
  | "e-commerce-&-retail"
  | "education-&-e-learning"
  | "logistics-&-supply-chain"
  | "manufacturing-&-industry-4.0"
  | "social-media-&-entertainment"
  | "public-sector-&-government";

type ContentCard = {
  title: string;
  text: string;
};

type IndustryContent = {
  id: IndustryId;
  label: string;
  heroTitle: string;
  heroSubtitle: string;
  sectionTitle: string;
  paragraphs: [string, string];
  benefitsTitle: string;
  benefits: { title: string; icon: string }[];
  enhanceTitle: string;
  enhanceSubtitle: string;
  enhanceCards: ContentCard[];
  specializeTitle: string;
  specializeItems: string[];
};

const healthcareEnhanceCards: ContentCard[] = [
  {
    title: "Why is Patient Engagement Vital in Digital Health?",
    text: "Engaging patients through digital tools and personalized communication improves health outcomes, increases satisfaction, and supports proactive care management.",
  },
  {
    title: "How Does Compliance Impact Healthcare IT?",
    text: "Ensuring compliance with regulations like HIPAA and GDPR safeguards patient privacy, minimizes legal risks, and builds trust in digital health services.",
  },
  {
    title: "What Role Does Workflow Automation Play in Healthcare?",
    text: "Automation optimizes healthcare workflows by reducing manual tasks, minimizing errors, and freeing up time for patient-focused activities, enhancing overall care quality.",
  },
  {
    title: "How Do Real-Time Analytics Benefit Healthcare Providers?",
    text: "Real-time health analytics empower providers with actionable insights, allowing for early intervention, personalized care, and improved patient outcomes.",
  },
  {
    title: "How Can Digital Health Solutions Support Telemedicine?",
    text: "Digital health solutions enable secure, high-quality telemedicine, connecting patients and providers for convenient care access and continuity across locations.",
  },
  {
    title: "Why Choose ElevateTrust for Healthcare Technology Solutions",
    text: "ElevateTrust’s expertise in digital health enables healthcare and life sciences organizations to transform patient care, optimize operations, and drive innovation in compliance with healthcare standards.",
  },
];

const healthcareSpecializeItems = [
  "Our data management solutions ensure compliance, secure data storage, and reliable patient information management, aligned with industry standards.",
  "We build automated healthcare workflows that enhance productivity, reduce administrative burden, and streamline patient care delivery.",
  "Our expertise in real-time analytics allows healthcare providers to make informed decisions, leading to faster, data-backed treatment plans and better patient care.",
  "We create secure telehealth platforms that allow for seamless patient-provider interactions, providing safe and accessible care options from anywhere.",
  "With experience in implementing EHR systems, we enable a holistic, patient-centered approach, allowing for cohesive data sharing and continuity in care.",
];

const industries: IndustryContent[] = [
  {
    id: "healthcare-and-life-sciences",
    label: "Healthcare and Life Sciences",
    heroTitle: "Revolutionizing Healthcare with AI and Innovation",
    heroSubtitle:
      "Empowering better patient care through data-driven insights and scalable technologies",
    sectionTitle: "Revolutionizing Healthcare through Technology",
    paragraphs: [
      "Our Healthcare and Life Sciences solutions enable providers, researchers, and innovators to deliver patient-centric services, streamline operations, and improve outcomes through advanced technologies. We leverage data-driven insights, automation, and secure, compliant systems to transform how healthcare is delivered, managed, and researched.",
      "Through our expertise in digital health, we empower organizations to enhance patient care, optimize medical workflows, and accelerate research, ensuring technology meets the unique challenges of healthcare and life sciences.",
    ],
    benefitsTitle: "Key Benefits of Digital Health Solutions",
    benefits: [
      { title: "Enhanced Patient Engagement", icon: benefitIcon1 },
      { title: "Secure Data Management and Compliance", icon: benefitIcon2 },
      { title: "Integrated and Automated Workflows", icon: benefitIcon3 },
      {
        title: "Real-Time Health Analytics for Proactive Care",
        icon: benefitIcon4,
      },
    ],
    enhanceTitle: "Enhance Healthcare Delivery with Advanced Technology",
    enhanceSubtitle:
      "Digital health solutions create smarter, faster, and more secure ways to manage healthcare data, improve patient interactions, and streamline clinical operations.",
    enhanceCards: healthcareEnhanceCards,
    specializeTitle:
      "We specialize in patient engagement tools that foster meaningful, personalized communication, improving health literacy and patient outcomes.",
    specializeItems: healthcareSpecializeItems,
  },
  {
    id: "financial-services-&-fintech",
    label: "Financial Services & FinTech",
    heroTitle: "Transforming Finance with AI and Innovation",
    heroSubtitle:
      "Driving smarter decisions, secure transactions, and scalable digital banking experiences",
    sectionTitle: "Modernizing Financial Services through Technology",
    paragraphs: [
      "Our Financial Services & FinTech solutions help banks, insurers, and digital lenders deliver customer-centric products, reduce operational risk, and unlock growth through advanced analytics and automation.",
      "From fraud detection to personalized financial experiences, we build secure, compliant platforms that meet the pace and regulatory demands of modern finance.",
    ],
    benefitsTitle: "Key Benefits of Digital Finance Solutions",
    benefits: [
      { title: "Enhanced Customer Engagement", icon: benefitIcon1 },
      { title: "Secure Data Management and Compliance", icon: benefitIcon2 },
      { title: "Integrated and Automated Workflows", icon: benefitIcon3 },
      { title: "Real-Time Analytics for Smarter Decisions", icon: benefitIcon4 },
    ],
    enhanceTitle: "Enhance Financial Services with Advanced Technology",
    enhanceSubtitle:
      "Digital finance solutions create smarter, faster, and more secure ways to manage transactions, improve customer interactions, and streamline banking operations.",
    enhanceCards: healthcareEnhanceCards,
    specializeTitle:
      "We specialize in customer engagement platforms that foster trusted, personalized financial experiences and measurable business outcomes.",
    specializeItems: healthcareSpecializeItems,
  },
  {
    id: "e-commerce-&-retail",
    label: "E-commerce & Retail",
    heroTitle: "Reinventing Retail with AI and Innovation",
    heroSubtitle:
      "Creating personalized shopping journeys through data-driven insights and scalable commerce platforms",
    sectionTitle: "Elevating Retail through Technology",
    paragraphs: [
      "Our E-commerce & Retail solutions help brands and marketplaces deliver seamless omnichannel experiences, optimize inventory, and convert demand with intelligent personalization.",
      "We combine automation, analytics, and modern commerce architecture so retailers can move faster and serve customers with precision.",
    ],
    benefitsTitle: "Key Benefits of Digital Retail Solutions",
    benefits: [
      { title: "Enhanced Customer Engagement", icon: benefitIcon1 },
      { title: "Secure Data Management and Compliance", icon: benefitIcon2 },
      { title: "Integrated and Automated Workflows", icon: benefitIcon3 },
      { title: "Real-Time Commerce Analytics", icon: benefitIcon4 },
    ],
    enhanceTitle: "Enhance Retail Delivery with Advanced Technology",
    enhanceSubtitle:
      "Digital retail solutions create smarter, faster, and more secure ways to manage commerce data, improve shopper interactions, and streamline store operations.",
    enhanceCards: healthcareEnhanceCards,
    specializeTitle:
      "We specialize in retail engagement tools that foster meaningful, personalized shopping experiences and stronger customer loyalty.",
    specializeItems: healthcareSpecializeItems,
  },
  {
    id: "education-&-e-learning",
    label: "Education & E-Learning",
    heroTitle: "Transforming Learning with AI and Innovation",
    heroSubtitle:
      "Empowering educators and learners through adaptive platforms and data-driven insights",
    sectionTitle: "Modernizing Education through Technology",
    paragraphs: [
      "Our Education & E-Learning solutions help institutions and edtech providers deliver personalized learning, streamline administration, and improve outcomes at scale.",
      "We build secure, engaging digital learning experiences that adapt to learners and support educators with actionable insight.",
    ],
    benefitsTitle: "Key Benefits of Digital Learning Solutions",
    benefits: [
      { title: "Enhanced Learner Engagement", icon: benefitIcon1 },
      { title: "Secure Data Management and Compliance", icon: benefitIcon2 },
      { title: "Integrated and Automated Workflows", icon: benefitIcon3 },
      { title: "Real-Time Learning Analytics", icon: benefitIcon4 },
    ],
    enhanceTitle: "Enhance Learning Delivery with Advanced Technology",
    enhanceSubtitle:
      "Digital learning solutions create smarter, faster, and more secure ways to manage education data, improve learner interactions, and streamline academic operations.",
    enhanceCards: healthcareEnhanceCards,
    specializeTitle:
      "We specialize in learner engagement tools that foster meaningful, personalized education experiences and better learning outcomes.",
    specializeItems: healthcareSpecializeItems,
  },
  {
    id: "logistics-&-supply-chain",
    label: "Logistics & Supply Chain",
    heroTitle: "Optimizing Logistics with AI and Innovation",
    heroSubtitle:
      "Improving visibility, resilience, and delivery performance through intelligent operations",
    sectionTitle: "Advancing Supply Chains through Technology",
    paragraphs: [
      "Our Logistics & Supply Chain solutions help operators reduce friction across planning, fulfillment, and last-mile delivery with automation and predictive intelligence.",
      "We enable end-to-end visibility and smarter decisioning so networks stay resilient, efficient, and customer-ready.",
    ],
    benefitsTitle: "Key Benefits of Digital Logistics Solutions",
    benefits: [
      { title: "Enhanced Operational Visibility", icon: benefitIcon1 },
      { title: "Secure Data Management and Compliance", icon: benefitIcon2 },
      { title: "Integrated and Automated Workflows", icon: benefitIcon3 },
      { title: "Real-Time Supply Chain Analytics", icon: benefitIcon4 },
    ],
    enhanceTitle: "Enhance Logistics Delivery with Advanced Technology",
    enhanceSubtitle:
      "Digital logistics solutions create smarter, faster, and more secure ways to manage supply data, improve partner interactions, and streamline operations.",
    enhanceCards: healthcareEnhanceCards,
    specializeTitle:
      "We specialize in logistics visibility tools that foster resilient, personalized supply-chain operations and better delivery outcomes.",
    specializeItems: healthcareSpecializeItems,
  },
  {
    id: "manufacturing-&-industry-4.0",
    label: "Manufacturing & Industry 4.0",
    heroTitle: "Powering Industry 4.0 with AI and Innovation",
    heroSubtitle:
      "Driving smarter factories through connected systems, automation, and predictive insights",
    sectionTitle: "Modernizing Manufacturing through Technology",
    paragraphs: [
      "Our Manufacturing & Industry 4.0 solutions help plants improve quality, uptime, and throughput with IoT, AI, and intelligent process automation.",
      "We connect shop-floor data to decision systems so teams can detect issues early, optimize production, and scale digital operations.",
    ],
    benefitsTitle: "Key Benefits of Industry 4.0 Solutions",
    benefits: [
      { title: "Enhanced Production Efficiency", icon: benefitIcon1 },
      { title: "Secure Data Management and Compliance", icon: benefitIcon2 },
      { title: "Integrated and Automated Workflows", icon: benefitIcon3 },
      { title: "Real-Time Manufacturing Analytics", icon: benefitIcon4 },
    ],
    enhanceTitle: "Enhance Manufacturing with Advanced Technology",
    enhanceSubtitle:
      "Industry 4.0 solutions create smarter, faster, and more secure ways to manage plant data, improve team coordination, and streamline production operations.",
    enhanceCards: healthcareEnhanceCards,
    specializeTitle:
      "We specialize in manufacturing intelligence tools that foster connected, personalized production workflows and stronger operational outcomes.",
    specializeItems: healthcareSpecializeItems,
  },
  {
    id: "social-media-&-entertainment",
    label: "Social Media & Entertainment",
    heroTitle: "Reimagining Media with AI and Innovation",
    heroSubtitle:
      "Creating engaging digital experiences through personalization, content intelligence, and scalable platforms",
    sectionTitle: "Transforming Entertainment through Technology",
    paragraphs: [
      "Our Social Media & Entertainment solutions help platforms and content brands grow engagement, moderate at scale, and monetize experiences with AI-powered systems.",
      "We combine recommendation, analytics, and secure infrastructure to deliver immersive, high-performance digital entertainment.",
    ],
    benefitsTitle: "Key Benefits of Digital Media Solutions",
    benefits: [
      { title: "Enhanced Audience Engagement", icon: benefitIcon1 },
      { title: "Secure Data Management and Compliance", icon: benefitIcon2 },
      { title: "Integrated and Automated Workflows", icon: benefitIcon3 },
      { title: "Real-Time Audience Analytics", icon: benefitIcon4 },
    ],
    enhanceTitle: "Enhance Media Delivery with Advanced Technology",
    enhanceSubtitle:
      "Digital media solutions create smarter, faster, and more secure ways to manage content data, improve audience interactions, and streamline platform operations.",
    enhanceCards: healthcareEnhanceCards,
    specializeTitle:
      "We specialize in audience engagement tools that foster meaningful, personalized media experiences and stronger retention outcomes.",
    specializeItems: healthcareSpecializeItems,
  },
  {
    id: "public-sector-&-government",
    label: "Public Sector & Government",
    heroTitle: "Modernizing Government with AI and Innovation",
    heroSubtitle:
      "Delivering citizen-centric services through secure, scalable, and data-driven digital systems",
    sectionTitle: "Advancing Public Services through Technology",
    paragraphs: [
      "Our Public Sector & Government solutions help agencies digitize services, improve transparency, and deliver better citizen outcomes with trusted AI systems.",
      "We design secure, compliant platforms that streamline operations while keeping public trust and accessibility at the center.",
    ],
    benefitsTitle: "Key Benefits of Digital Government Solutions",
    benefits: [
      { title: "Enhanced Citizen Engagement", icon: benefitIcon1 },
      { title: "Secure Data Management and Compliance", icon: benefitIcon2 },
      { title: "Integrated and Automated Workflows", icon: benefitIcon3 },
      { title: "Real-Time Service Analytics", icon: benefitIcon4 },
    ],
    enhanceTitle: "Enhance Public Services with Advanced Technology",
    enhanceSubtitle:
      "Digital government solutions create smarter, faster, and more secure ways to manage civic data, improve citizen interactions, and streamline agency operations.",
    enhanceCards: healthcareEnhanceCards,
    specializeTitle:
      "We specialize in citizen engagement tools that foster meaningful, personalized public services and stronger community outcomes.",
    specializeItems: healthcareSpecializeItems,
  },
];

function normalizeSlug(value: string | undefined) {
  if (!value) return "";
  return decodeURIComponent(value).toLowerCase();
}

export default function Industries() {
  const { slug } = useParams<{ slug?: string }>();

  const active = useMemo(() => {
    const normalized = normalizeSlug(slug);
    return (
      industries.find((item) => item.id === normalized) ?? industries[0]
    );
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active.id]);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      {/* Hero */}
      <section className="service-page-hero" aria-label={active.label}>
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content">
          <h1 className="m-0 text-[clamp(28px,3.8vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            {active.heroTitle}
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            {active.heroSubtitle}
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

      {/* Breadcrumbs + Intro */}
      <div className="mx-auto w-full max-w-[1692px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <nav
          className="flex flex-wrap items-center gap-2.5 pb-[clamp(20px,2.5vw,36px)] pt-[clamp(28px,3vw,48px)] text-[clamp(13px,1.2vw,18px)] font-normal leading-[1.2] text-[#272935] lg:text-[clamp(13px,1vw,15px)] 2xl:text-[clamp(14px,1.2vw,18px)]"
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
            to="/industries"
            className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
          >
            Industries
          </Link>
          <span className="text-[#848b9b]">»</span>
          <span>{active.label}</span>
        </nav>

        <section
          className="pb-[clamp(48px,6vw,80px)] text-center"
          aria-label={active.sectionTitle}
        >
          <h2 className="mx-auto mb-[clamp(24px,3vw,48px)] max-w-[18ch] text-[clamp(28px,3.5vw,48px)] font-bold leading-[1.12] text-[#272935] lg:text-[clamp(24px,2.8vw,34px)] 2xl:text-[clamp(28px,3.5vw,48px)]">
            {active.sectionTitle}
          </h2>
          <div className="mx-auto flex max-w-[1100px] flex-col gap-4 sm:gap-[18px]">
            {active.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="m-0 font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-[1.7] text-[#848b9b] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </div>

      {/* Key Benefits */}
      <section
        className="rounded-[20px] bg-[#f4f7f9] py-[clamp(40px,5vw,72px)] pb-[clamp(48px,6vw,88px)] max-sm:rounded-none"
        aria-label={active.benefitsTitle}
      >
        <div className="mx-auto w-full max-w-[1692px] px-5 sm:px-8 lg:px-10 xl:px-12">
          <h2 className="m-0 mb-[clamp(24px,3vw,48px)] text-center text-[clamp(28px,3.5vw,48px)] font-bold leading-[1.12] text-[#272935] lg:text-[clamp(24px,2.8vw,34px)] 2xl:text-[clamp(28px,3.5vw,48px)]">
            {active.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[clamp(20px,2vw,28px)]">
            {active.benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="box-border flex min-h-0 items-center gap-[clamp(16px,1.5vw,28px)] rounded-[20px] border border-[#e6e6e6] bg-white px-[clamp(22px,2.2vw,36px)] py-[clamp(20px,2vw,32px)] sm:min-h-[160px]"
              >
                <div className="flex h-[clamp(72px,8vw,120px)] w-[clamp(72px,8vw,120px)] shrink-0 items-center justify-center lg:h-[clamp(64px,6vw,88px)] lg:w-[clamp(64px,6vw,88px)] 2xl:h-[clamp(88px,8vw,120px)] 2xl:w-[clamp(88px,8vw,120px)]">
                  <img
                    src={benefit.icon}
                    alt=""
                    aria-hidden
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="m-0 text-[clamp(18px,1.6vw,28px)] font-bold leading-[1.3] text-[#272935] lg:text-[clamp(16px,1.4vw,20px)] 2xl:text-[clamp(18px,1.6vw,28px)]">
                  {benefit.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Enhance */}
      <section
        className="bg-white py-[clamp(48px,6vw,88px)] pb-[clamp(32px,4vw,56px)]"
        aria-label={active.enhanceTitle}
      >
        <div className="mx-auto w-full max-w-[1692px] px-5 sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(32px,4vw,64px)] max-w-[920px] text-center">
            <h2 className="m-0 mb-[clamp(16px,2vw,24px)] text-[clamp(28px,3.5vw,48px)] font-bold leading-[1.2] text-[#272935] lg:text-[clamp(24px,2.8vw,34px)] 2xl:text-[clamp(28px,3.5vw,48px)]">
              {active.enhanceTitle}
            </h2>
            <p className="m-0 font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-[1.7] text-[#848b9b] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
              {active.enhanceSubtitle}
            </p>
          </header>

          <div className="grid grid-cols-1 items-start gap-x-[clamp(20px,2.5vw,40px)] gap-y-[clamp(28px,3vw,48px)] sm:grid-cols-2 xl:grid-cols-4">
            {active.enhanceCards.map((card) => (
              <article key={card.title} className="min-w-0">
                <h3 className="m-0 mb-3 text-[clamp(16px,1.35vw,22px)] font-bold leading-[1.35] text-[#272935] lg:text-[clamp(15px,1.2vw,18px)] 2xl:text-[clamp(16px,1.35vw,22px)]">
                  {card.title}
                </h3>
                <p className="m-0 font-['Ubuntu',sans-serif] text-[clamp(13px,1.15vw,16px)] font-normal leading-[1.65] text-[#848b9b] lg:text-[clamp(12px,1vw,14px)] 2xl:text-[clamp(13px,1.15vw,16px)]">
                  {card.text}
                </p>
              </article>
            ))}

            <div className="flex min-h-[180px] items-center justify-center sm:col-span-2 xl:col-span-2 xl:row-start-2 xl:col-start-3">
              <img
                src={healthcareIndImage}
                alt={`${active.label} technology illustration`}
                className="mx-auto block h-auto w-full max-w-[520px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specialize */}
      <section
        className="bg-white pb-[clamp(48px,6vw,88px)] pt-[clamp(24px,3vw,40px)]"
        aria-label="Industry specialization"
      >
        <div className="mx-auto w-full max-w-[1692px] px-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-start gap-[clamp(28px,3vw,48px)] rounded-[24px] bg-[#f4f7f9] px-[clamp(24px,3vw,48px)] py-[clamp(28px,3.5vw,56px)] max-sm:rounded-none md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-[clamp(32px,4vw,64px)]">
            <h2 className="m-0 text-[clamp(22px,2.4vw,36px)] font-bold leading-[1.35] text-[#272935] lg:text-[clamp(20px,2vw,28px)] 2xl:text-[clamp(22px,2.4vw,36px)]">
              {active.specializeTitle}
            </h2>
            <ul className="m-0 flex list-none flex-col gap-[clamp(16px,1.8vw,24px)] p-0">
              {active.specializeItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 font-['Ubuntu',sans-serif] text-[clamp(13px,1.15vw,16px)] font-normal leading-[1.65] text-[#272935] lg:text-[clamp(12px,1vw,14px)] 2xl:text-[clamp(13px,1.15vw,16px)]"
                >
                  <span
                    className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2365aa] text-white"
                    aria-hidden
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
