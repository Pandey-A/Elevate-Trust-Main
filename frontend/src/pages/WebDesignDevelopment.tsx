import DigitalServicePage, {
  digitalServiceImages,
} from "./DigitalServicePage";

import corporateImg from "../assets/OurServices/corporate.svg";
import responsiveImg from "../assets/OurServices/responsive.svg";
import cmsImg from "../assets/OurServices/cms.svg";
import seoImg from "../assets/OurServices/seo.svg";
import integrationForumsImg from "../assets/OurServices/integration-forums.svg";
import ongoingImg from "../assets/OurServices/ongoing.svg";

const {
  website,
  processFrame1,
  processFrame3,
  processFrame5,
  processFrame7,
  webDesignDev,
  happyFeet,
} = digitalServiceImages;

export default function WebDesignDevelopment() {
  return (
    <DigitalServicePage
      breadcrumb="Web Design & Development"
      plainOfferings
      heroTitle="Web Design & Development for Business Growth"
      heroSubtitle="Friendly, responsive, and high-performing websites that look great, load fast, and help you achieve measurable business goals."
      heroImage={website}
      introTitle="Web Design & Development"
      introBody="Enhance your online presence with our web development and design services. We create friendly, responsive, and intuitive websites that will help you achieve your business goals. Our team focuses on both design and user experience, ensuring that your website looks great and performs exceptionally well. We're here to bring your digital vision to life."
      sectionTitle="Website Capabilities"
      sectionSubtitle="From marketing sites to content platforms, built for speed, SEO foundations, and long-term maintainability."
      offerings={[
        {
          title: "Corporate & marketing websites",
          description:
            "Brand-forward sites that communicate your value clearly and convert visitors into conversations.",
          icon: corporateImg,
        },
        {
          title: "Responsive front-end builds",
          description:
            "Modern UI implementation with clean components, accessibility, and cross-browser reliability.",
          icon: responsiveImg,
        },
        {
          title: "CMS & content platforms",
          description:
            "Editable content structures so marketing teams can publish without engineering bottlenecks.",
          icon: cmsImg,
        },
        {
          title: "Performance & SEO foundations",
          description:
            "Fast load times, structured content, and technical SEO basics that support discoverability.",
          icon: seoImg,
        },
        {
          title: "Integrations & forms",
          description:
            "CRM, analytics, chat, and lead-capture workflows wired into your existing stack.",
          icon: integrationForumsImg,
        },
        {
          title: "Ongoing enhancement",
          description:
            "Iterative improvements based on analytics, A/B insights, and evolving business needs.",
          icon: ongoingImg,
        },
      ]}
      deliveredWork={[
        {
          client: "Happy Feet Travellers",
          title: "Experience-first travel platform",
          tagline:
            "Curated group tours & personalized journeys across India and beyond",
          description:
            "We designed and developed a modern travel website for Happy Feet Travellers that helps travellers explore personalized tours, upcoming group departures, and mood-based experiences. The site highlights intimate groups, transparent pricing, and comfort-first planning, with clear paths to enquire, browse destinations, and join their travel community.",
          highlights: [
            "Immersive homepage with trip enquiry and mood-based exploration",
            "Upcoming departures and seasonal journeys such as Rann of Kutch",
            "Personalized tour categories for honeymoon, adventure, family, and more",
            "Social proof through reviews and a mobile-friendly booking journey",
          ],
          image: happyFeet,
          href: "https://www.happyfeettravellers.com/",
          linkLabel: "Visit Happy Feet Travellers",
          hideRightButton: true,
        },
      ]}
      processTitle="How We Build Web Experiences"
      processSubtitle="A delivery model that balances design quality with engineering discipline."
      processSteps={[
        {
          title: "Plan",
          text: "Define sitemap, goals, and success metrics with stakeholders.",
          icon: processFrame1,
        },
        {
          title: "Design",
          text: "Craft responsive layouts and interaction patterns for key journeys.",
          icon: processFrame3,
        },
        {
          title: "Develop",
          text: "Implement scalable front-end and backend foundations with clean code.",
          icon: processFrame5,
        },
        {
          title: "Launch & optimize",
          text: "Ship confidently, then refine using performance and conversion data.",
          icon: processFrame7,
        },
      ]}
      capabilitiesTitle="What You Get With ElevateTrust"
      capabilities={[
        "Custom responsive websites tailored to your brand and audience",
        "Strong UX focus for navigation, readability, and conversion",
        "Secure, maintainable codebases ready for future features",
        "Analytics-ready instrumentation for continuous improvement",
        "Flexible CMS options for content ownership",
        "Support for redesigns, migrations, and modernization",
      ]}
      capabilitiesImage={webDesignDev}
      valueTitle="Value Added"
      valueSubtitle="Web outcomes that strengthen credibility and create a reliable digital front door for your business."
      valuePoints={[
        "Faster time-to-launch with reusable patterns and clear scope control.",
        "Mobile-first experiences that protect engagement on every device.",
        "Technical foundations that keep future feature work affordable.",
        "Design and engineering collaboration that avoids handoff gaps.",
        "Lead-capture and CRM integrations that connect marketing to sales.",
        "Performance-minded builds that improve perceived quality and SEO readiness.",
      ]}
      showTechStacks
    />
  );
}
