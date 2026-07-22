import DigitalServicePage, {
  digitalServiceImages,
} from "./DigitalServicePage";

const {
  digitalMarketing,
  genCustomer,
  genKnowledge,
  genData,
  genSoftware,
  genFinance,
  processFrame1,
  processFrame2,
  processFrame3,
  processFrame7,
  genOptimize,
  digitalMarketingAgency,
} = digitalServiceImages;

export default function DigitalMarketing() {
  return (
    <DigitalServicePage
      breadcrumb="Digital Marketing Services"
      heroTitle="Digital Marketing Services That Build Measurable Growth"
      heroSubtitle="SEO, social, content, and paid media strategies tailored with data — so you reach the right audience and convert attention into leads."
      heroImage={digitalMarketing}
      introTitle="Digital Marketing Services"
      introBody="Lift your brand's presence online with our leading team of digital marketing professionals. Whether it's SEO, social media, content marketing, or paid media, we tailor strategies for your business using the best data available and methods that reach the right audience, spark interest in your brand, convert any content into tangible leads, and positively affect your brand's visibility. Work with us as partners to engage, develop trust, and have measurable business growth."
      sectionTitle="Growth Marketing Offerings"
      sectionSubtitle="Integrated channels and content systems that strengthen visibility, trust, and pipeline."
      offerings={[
        {
          title: "SEO & organic growth",
          description:
            "Technical and content SEO programs that improve discoverability for high-intent searches.",
          icon: genData,
        },
        {
          title: "Content marketing",
          description:
            "Thought leadership, case narratives, and educational assets that build credibility.",
          icon: genKnowledge,
        },
        {
          title: "Social media programs",
          description:
            "Consistent brand presence and engagement across channels your buyers already use.",
          icon: genCustomer,
        },
        {
          title: "Paid media & campaigns",
          description:
            "Targeted acquisition campaigns with clear KPIs, creative testing, and budget discipline.",
          icon: genSoftware,
        },
        {
          title: "Landing pages & conversion",
          description:
            "Offer-led pages and funnels designed to turn traffic into qualified conversations.",
          icon: genOptimize,
        },
        {
          title: "Analytics & attribution",
          description:
            "Measurement frameworks that show what works — and where to invest next.",
          icon: genFinance,
        },
      ]}
      processTitle="How We Drive Demand"
      processSubtitle="A practical growth loop connecting strategy, creative execution, and performance learning."
      processSteps={[
        {
          title: "Audit",
          text: "Review channels, messaging, and funnel gaps against your goals.",
          icon: processFrame1,
        },
        {
          title: "Plan",
          text: "Prioritize channel mix, content themes, and campaign experiments.",
          icon: processFrame2,
        },
        {
          title: "Execute",
          text: "Launch campaigns and content with clear tracking and creative variants.",
          icon: processFrame3,
        },
        {
          title: "Optimize",
          text: "Double down on winners and refine underperforming motions weekly.",
          icon: processFrame7,
        },
      ]}
      capabilitiesTitle="Marketing Capabilities"
      capabilities={[
        "Brand positioning and messaging frameworks",
        "Search, social, and paid acquisition programs",
        "Content calendars aligned to buyer journeys",
        "Lead nurture workflows with sales handoff clarity",
        "Performance reporting that leadership can act on",
        "Collaboration with product and design for conversion assets",
      ]}
      capabilitiesImage={digitalMarketingAgency}
      valueTitle="Value Added"
      valueSubtitle="Marketing that compounds — stronger visibility, better leads, and clearer ROI."
      valuePoints={[
        "Strategies tailored to your ICP instead of generic channel playbooks.",
        "Creative and content that build trust for complex B2B and product sales.",
        "Campaign systems that connect awareness to pipeline outcomes.",
        "Transparent reporting so spend decisions stay evidence-based.",
        "Faster learning cycles through structured experimentation.",
        "A partner approach that aligns marketing with product and sales reality.",
      ]}
    />
  );
}
