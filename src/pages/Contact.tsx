import ContactHero from "../components/contact/ContactHero";
import ContactMainSection from "../components/contact/ContactMainSection";
import ContactIllustration from "../components/contact/ContactIllustration";
import FlyCTA from "../components/FlyCTA";

export default function Contact() {
  return (
    <main className="flex flex-col">
      <ContactHero />
      <ContactMainSection />
      <ContactIllustration />
      <FlyCTA />
    </main>
  );
}