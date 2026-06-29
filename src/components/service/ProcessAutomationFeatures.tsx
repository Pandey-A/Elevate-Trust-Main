import frame1 from "../../assets/service/AI-process/frame1.svg";
import frame2 from "../../assets/service/AI-process/frame2.svg";
import frame3 from "../../assets/service/AI-process/frame3.svg";
import frame4 from "../../assets/service/AI-process/frame4.svg";
import frame5 from "../../assets/service/AI-process/frame5.svg";
import frame6 from "../../assets/service/AI-process/frame6.svg";
import frame7 from "../../assets/service/AI-process/frame7.svg";
import elevateIcon from "../../assets/service/AI-process/elevateIcon.svg";

const featureCards = [
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
    title: "Content Generation",
    features: [
      "Summary Creator",
      "Keyword Extractor",
      "Content Curation",
      "Quiz and Assessment",
    ],
    icon: frame2,
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

export default function ProcessAutomationFeatures() {
  return (
    <section className="w-full bg-[#F0F5FB]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 md:px-10 lg:px-20 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[minmax(0,700px)_1fr] lg:items-stretch lg:gap-4">
          {/* Left — 3×2 cards; on phone/tablet show below intro */}
          <div className="order-2 mx-auto grid w-full min-w-0 max-w-md grid-cols-1 gap-3 sm:max-w-none sm:grid-cols-2 md:gap-4 lg:order-1 lg:mx-0 lg:max-w-[1000px] lg:grid-cols-3 lg:grid-rows-2 lg:items-stretch lg:gap-3">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="flex min-h-[400px] h-auto w-full flex-col overflow-hidden rounded-2xl bg-white p-5 sm:min-h-[420px] md:min-h-[436px] lg:h-[486px] lg:min-h-0 lg:p-6"
              >
                <h2 className="text-[17px] font-extrabold leading-[22px] text-[#1F2432] sm:text-[18px] sm:leading-6 md:text-[19px] md:leading-[26px] lg:text-[18px] lg:font-bold lg:leading-[22px] xl:text-[22px] xl:leading-[30px] 2xl:text-[30px] 2xl:leading-[32px]">
                  {card.title}
                </h2>
                <ul className="mt-4 min-h-0 flex-1 space-y-2.5 sm:mt-6 sm:space-y-2.5 lg:mt-8 lg:space-y-2">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-xs leading-[1.45] text-[#6B7280] sm:text-[13px] sm:leading-5 lg:gap-2 lg:text-xs lg:leading-5 lg:text-[#9CA3AF]"
                    >
                      <img
                        src={elevateIcon}
                        alt=""
                        className="mt-[4px] h-[8px] w-[8px] shrink-0 object-contain lg:mt-[5px] lg:h-[7px] lg:w-[7px]"
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex shrink-0 justify-end pt-2 pb-0 sm:pt-3 lg:pt-1">
                  <img
                    src={card.icon}
                    alt=""
                    className="h-[88px] w-auto max-w-[165px] translate-x-1 translate-y-1 object-contain sm:h-[96px] sm:max-w-[175px] md:h-[100px] md:max-w-[185px] lg:h-[72px] lg:max-w-[130px] lg:translate-x-3 lg:translate-y-3"
                    aria-hidden
                  />
                </div>
              </article>
            ))}
          </div>

          {/* Right — intro first on phone/tablet; lg layout unchanged */}
          <div className="relative order-1 flex min-h-0 flex-col lg:order-2 lg:ml-20 lg:min-h-0">
            <div className="relative z-[2] w-full shrink-0 text-center lg:text-left">
              <h2 className="text-[1.75rem] 2xl:text-[3.75rem] 2xl:leading-[3.5rem] xl:text-[3.25rem] xl:leading-[3.25rem] font-bold leading-[1.15] text-[#1F2432] sm:text-[2rem] lg:text-[40px] lg:leading-[1.1]">
                AI-Based
                <br />
                Process
                <br />
                Automation
              </h2>
              <p className="mx-auto mt-3 max-w-[34rem] text-xs leading-[1.45] text-[#9CA3AF] sm:mt-4 sm:text-sm sm:leading-[1.4] 2xl:leading-[1.85] xl:leading-[1.89] lg:mx-0 lg:mt-5 lg:max-w-none lg:leading-[1.45]">
                We develop custom solutions for text and image/video analytics,
                which include document parsing, understanding meaning in texts,
                analyzing warranties and claims, inspecting visuals for defects in
                manufacturing, detecting car damage, smart KYC processes, and
                identifying signatures.
              </p>
            </div>

            <div className="relative z-[1] mt-6 flex h-full w-full items-center justify-center sm:mt-8 lg:absolute lg:inset-x-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2">
              <img
                src={frame7}
                alt=""
                className="mx-auto mt-0 h-auto w-[70%] max-w-[220px] object-contain sm:w-[256px] sm:max-w-[280px] md:max-w-[300px] lg:mx-0 lg:mt-10 lg:mr-20 lg:w-full lg:max-w-[352px] xl:w-[50%] 2xl:w-[40%]"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
