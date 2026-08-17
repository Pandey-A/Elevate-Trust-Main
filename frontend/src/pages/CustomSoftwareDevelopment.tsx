import DigitalServicePage, {
  digitalServiceImages,
} from "./DigitalServicePage";
import businessProcess from "../assets/OurServices/BusinessProcess.svg";
import seoImg from "../assets/OurServices/seo.svg";
import apiArchitecture from "../assets/OurServices/api-architecture.png";
import SecureEnterpriseApplications from "../assets/OurServices/SecureEnterpriseApplications.svg";
import Cloud from "../assets/OurServices/Cloud.svg";
import ModernizationRebuilds from "../assets/OurServices/Mordenization.svg";
const {
  customSoftware,
  processFrame1,
  processFrame4,
  processFrame5,
  processFrame6,
  techStack,
} = digitalServiceImages;

export default function CustomSoftwareDevelopment() {
  return (
    <DigitalServicePage
      breadcrumb="Custom Software Development"
      plainOfferings
      heroTitle="Custom Software Development for High-Impact Systems"
      heroSubtitle="Scalable, secure, and efficient software tailored to your operations, from startups to enterprise platforms ready for tomorrow."
      heroImage={customSoftware}
      introTitle="Custom Software Development"
      introBody="Your organization will benefit from our exclusive software development solution for your business. Our team develops scalable, secure, and efficient software for your organization and builds software that fulfills your specific needs. Our qualified staff develops innovative software products for every type of organization from startups to enterprises that are efficient and effective in enhancing their operations and productivity and ultimately, corporate growth. Let us take your concepts and turn them into software systems that attain high-impact, scalability, and readiness for tomorrow."
      sectionTitle="Custom Build Capabilities"
      sectionSubtitle="Purpose-built systems that fit your workflows, not the other way around."
      offerings={[
        {
          title: "Business process platforms",
          description:
            "Digitize and automate core workflows with software shaped around your operations.",
          icon: businessProcess,
        },
        {
          title: "Internal tools & portals",
          description:
            "Employee and partner portals that reduce manual work and improve visibility.",
          icon: seoImg,
        },
        {
          title: "API-first architectures",
          description:
            "Composable services that integrate cleanly with existing systems and future apps.",
          icon: apiArchitecture,
        },
        {
          title: "Secure enterprise applications",
          description:
            "Role-based access, auditability, and security practices suited to regulated environments.",
          icon: SecureEnterpriseApplications,
        },
        {
          title: "Cloud & on-premise deployment",
          description:
            "Flexible hosting models aligned to your IT, compliance, and cost constraints.",
          icon: Cloud,
        },
        {
          title: "Modernization & rebuilds",
          description:
            "Upgrade legacy systems into maintainable platforms without disrupting operations.",
          icon: ModernizationRebuilds,
        },
      ]}
      processTitle="Engineering Approach"
      processSubtitle="Reliable delivery with architecture decisions that protect long-term agility."
      processSteps={[
        {
          title: "Assess",
          text: "Understand processes, systems, and success criteria in detail.",
          icon: processFrame1,
        },
        {
          title: "Architect",
          text: "Design scalable modules, data models, and integration boundaries.",
          icon: processFrame4,
        },
        {
          title: "Implement",
          text: "Build iteratively with testing, documentation, and stakeholder demos.",
          icon: processFrame5,
        },
        {
          title: "Evolve",
          text: "Support growth with enhancements, monitoring, and knowledge transfer.",
          icon: processFrame6,
        },
      ]}
      capabilitiesTitle="Software Built Around Your Business"
      capabilities={[
        "Domain-specific applications for operations, finance, HR, and more",
        "Scalable backends designed for growth and peak load",
        "Clean code practices that keep maintenance costs predictable",
        "Integration with ERP, CRM, analytics, and AI services",
        "Quality assurance and release governance",
        "Documentation and enablement for your internal teams",
      ]}
      capabilitiesImage={techStack}
      valueTitle="Value Added"
      valueSubtitle="Custom systems that improve productivity, reduce operational drag, and create durable competitive advantage."
      valuePoints={[
        "Software that matches your process instead of forcing workarounds.",
        "Architecture choices that support scale and future product lines.",
        "Faster decision-making through better data visibility.",
        "Lower operational risk with secure, maintainable platforms.",
        "Clear ownership through documentation and knowledge transfer.",
        "A partner team that can extend into AI and analytics when ready.",
      ]}
      showTechStacks
    />
  );
}
