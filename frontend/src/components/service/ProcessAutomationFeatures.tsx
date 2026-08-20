import frame1 from "../../assets/service/AI-process/frame1.svg";
import frame2 from "../../assets/service/AI-process/frame2.svg";
import frame3 from "../../assets/service/AI-process/frame3.svg";
import frame4 from "../../assets/service/AI-process/frame4.svg";
import frame5 from "../../assets/service/AI-process/frame5.svg";
import frame6 from "../../assets/service/AI-process/frame6.svg";
import frame7 from "../../assets/service/AI-process/frame7.svg";
import elevateIcon from "../../assets/service/AI-process/elevateIcon.svg";

interface FeatureCard {
  title: string;
  features: string[];
  icon: string;
}

const leftColumnCards: FeatureCard[] = [
  {
    title: "AI-Based Process Automation",
    features: [
      "Content Recommendation",
      "Course Recommendation",
      "Job title vs Resume Matching",
    ],
    icon: frame1,
  },
  {
    title: "Agentic Bot",
    features: [
      "Multi-Agent Healthcare",
      "Multi-Agent Ed Tech bot",
      "Virtual agent for Game industry",
    ],
    icon: frame3,
  },
  {
    title: "Content Generation",
    features: [
      "Summary Creator",
      "Keyword Extractor",
      "Content Curation",
      "Quiz and Assessment",
    ],
    icon: frame2,
  },
];

const rightColumnCards: FeatureCard[] = [
  {
    title: "Pattern Recognition",
    features: [
      "Heart patient Survival Analysis",
      "Customer attrition model",
    ],
    icon: frame4,
  },
  {
    title: "Digitization of Content",
    features: [
      "Text & Image Extraction (OCR)",
      "Text to Speech",
      "Speech to Text",
    ],
    icon: frame5,
  },
  {
    title: "Audio & Video Analytics",
    features: [
      "Deepfake Detection",
      "Driver behaviour Detection",
      "Converting camera into AI Edge Device",
      "Live Polls over Video E-proctoring",
    ],
    icon: frame6,
  },
];

function FeatureCardItem({ card }: { card: FeatureCard }) {
  return (
    <article className="relative flex min-h-[220px] w-full flex-col overflow-hidden rounded-[20px] bg-white p-5 sm:min-h-[240px] sm:p-6 lg:min-h-[260px]">
      <h3 className="pr-24 text-[clamp(16px,1.3vw,20px)] font-bold leading-snug text-[#1F2432] 2xl:text-[22px]">
        {card.title}
      </h3>

      <ul className="mt-4 flex-1 space-y-2.5 sm:mt-5 sm:space-y-3">
        {card.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[clamp(12px,1.1vw,14px)] leading-[1.45] text-[#9CA3AF] sm:leading-5 2xl:text-[18px] 2xl:leading-8"
          >
            <img
              src={elevateIcon}
              alt=""
              className="mt-[5px] h-[8px] w-[8px] shrink-0 object-contain 2xl:mt-[9px] 2xl:h-[10px] 2xl:w-[10px]"
              aria-hidden
            />
            {feature}
          </li>
        ))}
      </ul>

      <img
        src={card.icon}
        alt=""
        className="pointer-events-none absolute bottom-3 right-2 h-[72px] w-auto max-w-[120px] object-contain sm:bottom-4 sm:right-3 sm:h-[84px] sm:max-w-[140px] lg:h-[96px] lg:max-w-[155px]"
        aria-hidden
      />
    </article>
  );
}

export default function ProcessAutomationFeatures() {
  return (
    <section className="w-full bg-[#EFF7FC]">
      <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
        <header className="mx-auto mb-[clamp(32px,4vw,56px)] max-w-[52rem] text-center">
          <h2 className="m-0 text-[clamp(28px,4vw,56px)] font-bold leading-[1.15] text-[#1F2432]">
            AI-Based
            <br />
            Process Automation
          </h2>
          <p className="mx-auto mt-5 max-w-[48rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] sm:mt-6 2xl:text-[18px] 2xl:leading-8">
            We develop custom solutions for text and image/video analytics,
            which include document parsing, understanding meaning in texts,
            analyzing warranties and claims, inspecting visuals for defects in
            manufacturing, detecting car damage, smart KYC processes, and
            identifying signatures.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-5 xl:gap-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            {leftColumnCards.map((card) => (
              <FeatureCardItem key={card.title} card={card} />
            ))}
          </div>

          <div className="order-first flex items-center justify-center px-2 py-4 lg:order-none lg:px-4 lg:py-0">
            <img
              src={frame7}
              alt=""
              className="h-auto w-full max-w-[220px] object-contain sm:max-w-[260px] lg:max-w-[300px] xl:max-w-[352px]"
              aria-hidden
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {rightColumnCards.map((card) => (
              <FeatureCardItem key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
