import DigitalServicePage, {
  digitalServiceImages,
} from "./DigitalServicePage";

const {
  uiUx,
  genData,
  genSoftware,
  genOptimize,
  genCustomer,
  genKnowledge,
  genHr,
  processFrame1,
  processFrame2,
  processFrame3,
  processFrame4,
  agile,
} = digitalServiceImages;

export default function UiUxDesign() {
  return (
    <DigitalServicePage
      breadcrumb="UI/UX Design Content"
      heroTitle="UI/UX Design That Elevates Product Experience"
      heroSubtitle="User-centered wireframes, interfaces, and interaction design that make products feel clear, responsive, and built for conversion."
      heroImage={uiUx}
      introTitle="UI/UX Design Content"
      introBody="Improve your online presence with professional UI/UX services. We create designs that are easy to use and create experiences that delight and draw users in. We design everything from the wireframe to the final design; everything we create has a purpose for the user. Let your product shine through in a user-centered, responsive, sleek design that is customized for your brand."
      sectionTitle="What We Design"
      sectionSubtitle="End-to-end experience design for web, mobile, and product teams, from discovery to high-fidelity delivery."
      offerings={[
        {
          title: "Product discovery & research",
          description:
            "Map user journeys, pain points, and opportunities so every screen decision is grounded in real behavior.",
          icon: genData,
        },
        {
          title: "Wireframes & information architecture",
          description:
            "Structure content and flows early to reduce rework and keep engineering aligned with product intent.",
          icon: genSoftware,
        },
        {
          title: "High-fidelity UI systems",
          description:
            "Polished interfaces with reusable components, brand consistency, and accessibility built in.",
          icon: genOptimize,
        },
        {
          title: "Interactive prototypes",
          description:
            "Clickable prototypes that validate flows before build, ideal for stakeholder demos and usability tests.",
          icon: genCustomer,
        },
        {
          title: "Responsive & multi-device design",
          description:
            "Layouts that stay elegant and usable across desktop, tablet, and mobile breakpoints.",
          icon: genKnowledge,
        },
        {
          title: "Design handoff for engineering",
          description:
            "Specs, assets, and component guidance that help developers ship pixel-accurate experiences faster.",
          icon: genHr,
        },
      ]}
      processTitle="Our Design Process"
      processSubtitle="A practical workflow that connects research, design, and delivery without slowing your roadmap."
      processSteps={[
        {
          title: "Discover",
          text: "Align on goals, users, and constraints through workshops and competitive review.",
          icon: processFrame1,
        },
        {
          title: "Define",
          text: "Translate insights into flows, personas, and prioritized experience principles.",
          icon: processFrame2,
        },
        {
          title: "Design",
          text: "Iterate from wireframes to polished UI with feedback loops at every stage.",
          icon: processFrame3,
        },
        {
          title: "Deliver",
          text: "Hand off production-ready designs and support implementation quality.",
          icon: processFrame4,
        },
      ]}
      capabilitiesTitle="Capabilities That Drive Adoption"
      capabilities={[
        "User research, journey mapping, and usability testing",
        "Design systems and component libraries for scale",
        "Conversion-focused landing and product experiences",
        "Accessibility-minded UI patterns and visual hierarchy",
        "Brand-aligned visual language across channels",
        "Collaboration with product, engineering, and marketing teams",
      ]}
      capabilitiesImage={agile}
      valueTitle="Value Added"
      valueSubtitle="Design outcomes that reduce friction, improve engagement, and accelerate product decisions."
      valuePoints={[
        "Faster stakeholder alignment with interactive prototypes before development starts.",
        "Cleaner handoffs that cut UI rework during sprint execution.",
        "Interfaces tailored to your brand while staying usable and conversion-ready.",
        "Responsive designs that protect experience quality across devices.",
        "Reusable UI patterns that keep future releases consistent and faster to ship.",
        "Research-backed decisions that lower the risk of building the wrong flow.",
      ]}
    />
  );
}
