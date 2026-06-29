// pages/home.tsx
import HeroSection from "../components/heroSection";
import ClientStrip from "../components/ClientStrip";
import StoriesOfImpact from "../components/StoriesOfImpact";
import AILandscape from "../components/AILandscape";
import WorkImpact from "../components/WorkImpact";
import WhyPartner from "../components/WhyPartner";
import LatestWorks from "../components/LatestWorks";
import Testimonials from "../components/testimonials";
import FlyCTA from "../components/FlyCTA";
import FooterSection from "../components/footerSection";
import Service from "../components/Service";
export default function Home() {
  return (
    <main className="min-h-[calc(200vh-4rem)] bg-[#113D77]">
      <HeroSection />
      <ClientStrip />
      <Service />
      <StoriesOfImpact />
      <AILandscape />
      <WorkImpact />
      <WhyPartner />
      <LatestWorks />
      <Testimonials />
      <FlyCTA />
    </main>
  );
}
