import detailIllustration from "../../assets/service/Group (15).svg";

const outcomeParagraphs = [
  "Our Video analytics solution enables customers to drive 6% revenue gain by detecting illicit behaviour (e.g high flagging, false attendance) of their employee.",
  "Attrition model reduced customer churn by predicting the list of financial bank risk score &using this sales rep was able to reduce the 80% $ value of the attrition.",
  "Reduced overall contract management time by 40% with AI-based key information extraction automation.",
  "Reduced overall insurance claim processing time by 20% with AI-based smart inspection for car damage detection.",
];

export default function DetailedCoreOfferings() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-site px-5 py-10 sm:px-8 md:px-10 lg:px-20 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          {/* Left — heading + outcome paragraphs */}
          <div className="text-center lg:text-left">
            <h2 className="text-[1.75rem] font-bold leading-[1.2]   text-[#1F2432] sm:text-[2rem] md:text-[2.25rem] lg:text-[60px] lg:leading-[62px]">
              Core Offerings
              
              Predictive Analytics
            </h2>
            <div className="mx-auto mt-6 max-w-[34rem] space-y-5 text-left sm:mt-8 sm:space-y-6 lg:mx-0 lg:mt-10 lg:max-w-[28rem]">
              {outcomeParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-xs leading-6 text-[#9CA3AF] sm:text-sm sm:leading-7"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right — illustration */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={detailIllustration}
              alt=""
              className="h-auto w-full max-w-[300px] object-contain sm:max-w-[380px] md:max-w-[460px] lg:max-w-[560px] xl:max-w-[694px]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
