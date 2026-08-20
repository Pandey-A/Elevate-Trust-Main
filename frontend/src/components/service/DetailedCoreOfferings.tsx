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
      <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 items-center gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* Left, heading + outcome paragraphs */}
          <div className="text-center lg:text-left">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Core Offerings
              <br />
              Predictive Analytics
            </h2>
            <div className="mx-auto mt-5 max-w-[34rem] space-y-5 text-left lg:mx-0 lg:mt-8 lg:max-w-[28rem]">
              {outcomeParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] 2xl:text-[18px] 2xl:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right, illustration */}
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
