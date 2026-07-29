import ServiceHero from "../components/service/ServiceHero";
import PredictiveAnalyticsOfferings from "../components/service/PredictiveAnalyticsOfferings";
import ProcessAutomationFeatures from "../components/service/ProcessAutomationFeatures";
import DetailedCoreOfferings from "../components/service/DetailedCoreOfferings";
import ServiceCTA from "../components/FlyCTA";
import aimlProcessImage from "../assets/OurServices/aiml-process-light.png";

export default function ServiceDetails() {
  return (
    <main className="flex flex-col font-['Lay_Grotesk_Trial',sans-serif]">
      <ServiceHero />
      <PredictiveAnalyticsOfferings />
      <ProcessAutomationFeatures />

      <section className="w-full bg-white" aria-label="AI/ML delivery process">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(24px,3vw,40px)] max-w-[48rem] text-center">
            <h2 className="m-0 text-[clamp(28px,4vw,56px)] font-bold leading-[1.15] text-[#1F2432]">
              Our AI/ML Delivery Process
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] 2xl:text-[18px] 2xl:leading-8">
              From discovery and data readiness through model development,
              deployment, optimization, and continuous improvement, we take AI
              solutions from idea to production with a clear, repeatable path.
            </p>
          </header>

          <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-white p-4 shadow-[0_20px_60px_-28px_rgba(17,61,119,0.35)] sm:rounded-[24px] sm:p-6 lg:p-8">
            <img
              src={aimlProcessImage}
              alt="AI/ML delivery process from ideation and data collection through modeling, deployment, optimization, and continuous improvement"
              className="mx-auto block h-auto w-full max-w-[1100px] object-contain"
            />
          </div>
        </div>
      </section>

      <DetailedCoreOfferings />
      <ServiceCTA />
    </main>
  );
}

