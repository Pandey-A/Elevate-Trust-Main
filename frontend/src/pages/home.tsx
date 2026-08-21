// pages/home.tsx
import { useEffect } from "react";
import HeroSection from "../components/heroSection";
import ClientStrip from "../components/ClientStrip";
import StoriesOfImpact from "../components/StoriesOfImpact";
import AILandscape from "../components/AILandscape";
import WorkImpact from "../components/WorkImpact";
import WhyPartner from "../components/WhyPartner";
import LatestWorks from "../components/LatestWorks";
import Testimonials from "../components/testimonials";
import FlyCTA from "../components/FlyCTA";
import Service from "../components/Service";
import { prefetchPublicTestimonials } from "../hooks/useAdminData";

export default function Home() {
  useEffect(() => {
    // Defer testimonials prefetch so hero/LCP images get bandwidth first.
    const timer = window.setTimeout(() => {
      void prefetchPublicTestimonials();
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-[calc(200vh-4rem)] bg-[#113D77]">
      <HeroSection />
      <ClientStrip />
      <Service />
      <StoriesOfImpact />
      <LatestWorks />
      <WorkImpact />
      <WhyPartner />
      <AILandscape />
      <Testimonials />
      <FlyCTA />
    </main>
  );
}
