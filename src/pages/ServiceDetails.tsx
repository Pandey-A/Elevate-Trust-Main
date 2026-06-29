import ServiceHero from "../components/service/ServiceHero";
import PredictiveAnalyticsOfferings from "../components/service/PredictiveAnalyticsOfferings";
import ProcessAutomationFeatures from "../components/service/ProcessAutomationFeatures";
import DetailedCoreOfferings from "../components/service/DetailedCoreOfferings";
import ServiceCTA from "../components/FlyCTA";

export default function ServiceDetails() {
  return (
    <main className="flex flex-col">
      <ServiceHero />
      <PredictiveAnalyticsOfferings />
      <ProcessAutomationFeatures />
      <DetailedCoreOfferings />
      <ServiceCTA />
    </main>
  );
}
