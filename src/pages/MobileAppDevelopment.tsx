import DigitalServicePage, {
  digitalServiceImages,
} from "./DigitalServicePage";

const {
  appDev,
  genCustomer,
  genOptimize,
  genSoftware,
  genHealthcare,
  audioCamera,
  audioSimple,
  processFrame2,
  processFrame3,
  processFrame6,
  processFrame7,
  mobileAppDev,
} = digitalServiceImages;

export default function MobileAppDevelopment() {
  return (
    <DigitalServicePage
      breadcrumb="Mobile App Development"
      heroTitle="Mobile App Development That Drives Engagement"
      heroSubtitle="Custom iOS and Android experiences built for performance, retention, and growth, from first idea to App Store launch."
      heroImage={appDev}
      introTitle="Mobile App Development"
      introBody="Identify ways to develop your business through our custom mobile app development services. We develop apps with user performance in mind for a specific platform like iOS or Android apps. We help you maximize customer engagement and generate growth in your business, from your initial idea until someone is downloading the app. Partner with us to make your dream app a reality, with ease."
      sectionTitle="App Delivery Offerings"
      sectionSubtitle="Native and cross-platform builds with product thinking, polished UX, and reliable release pipelines."
      offerings={[
        {
          title: "iOS & Android apps",
          description:
            "Platform-aware experiences that feel native, fast, and aligned with store guidelines.",
          icon: genCustomer,
        },
        {
          title: "Cross-platform product apps",
          description:
            "Shared codebases that accelerate delivery while preserving quality UX on both platforms.",
          icon: genSoftware,
        },
        {
          title: "MVP to scale roadmap",
          description:
            "Start with a focused MVP, then expand features as adoption and feedback grow.",
          icon: genOptimize,
        },
        {
          title: "API & backend integration",
          description:
            "Secure connections to your services, auth flows, notifications, and data sync.",
          icon: audioSimple,
        },
        {
          title: "Push, analytics & retention",
          description:
            "Engagement tooling that helps you understand usage and improve retention loops.",
          icon: audioCamera,
        },
        {
          title: "Store launch support",
          description:
            "Release readiness, listing assets, and post-launch monitoring for smooth go-lives.",
          icon: genHealthcare,
        },
      ]}
      processTitle="App Development Journey"
      processSubtitle="A structured path from concept validation to a production-ready mobile product."
      processSteps={[
        {
          title: "Ideate",
          text: "Clarify users, core jobs-to-be-done, and MVP scope.",
          icon: processFrame2,
        },
        {
          title: "Design",
          text: "Prototype mobile flows optimized for thumb-friendly use.",
          icon: processFrame3,
        },
        {
          title: "Build",
          text: "Develop robust apps with quality gates and continuous integration.",
          icon: processFrame6,
        },
        {
          title: "Release",
          text: "Ship to stores, gather feedback, and iterate with confidence.",
          icon: processFrame7,
        },
      ]}
      capabilitiesTitle="Built for Real-World Mobile Use"
      capabilities={[
        "Consumer and enterprise mobile applications",
        "Offline-friendly patterns and resilient sync strategies",
        "Secure authentication and role-based access",
        "Performance tuning for low-latency interactions",
        "Integration with AI/ML services where they add product value",
        "Maintenance and version upgrade support after launch",
      ]}
      capabilitiesImage={mobileAppDev}
      valueTitle="Value Added"
      valueSubtitle="Mobile products that convert downloads into lasting engagement and business impact."
      valuePoints={[
        "Clear MVP scoping that reduces wasted build cycles.",
        "UX crafted for mobile context, speed, clarity, and retention.",
        "Engineering practices that keep releases predictable.",
        "Backend integrations that unlock your existing systems.",
        "Analytics that inform the next feature investments.",
        "A partnership model from idea through post-launch growth.",
      ]}
      showTechStacks
    />
  );
}
