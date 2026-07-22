import DigitalServicePage, {
  digitalServiceImages,
} from "./DigitalServicePage";

const {
  erp,
  genFinance,
  genHr,
  genData,
  genOptimize,
  audioIntegration,
  processFrame1,
  processFrame4,
  processFrame5,
  processFrame6,
  genSoftware,
  erpSoftware,
} = digitalServiceImages;

export default function ErpSolutions() {
  return (
    <DigitalServicePage
      breadcrumb="ERP Solutions"
      heroTitle="ERP Solutions That Unify Business Operations"
      heroSubtitle="Customized, scalable, and integrated ERP systems that improve productivity, data management, and decision-making across your organization."
      heroImage={erp}
      introTitle="ERP Solutions"
      introBody="Improve your operational efficiency with our all-in-one ERP solutions. We provide customized, scalable and integrated systems designed to increase productivity, enhance data management and enable better decision-making. Our ERP services help you complete all business functions — education, finance, human resources, inventory and sales — using one consolidated and integrated platform."
      sectionTitle="ERP Modules & Services"
      sectionSubtitle="Connected systems for the functions that keep your business running every day."
      offerings={[
        {
          title: "Finance & accounting",
          description:
            "Unified ledgers, reporting, and controls that improve financial visibility.",
          icon: genFinance,
        },
        {
          title: "HR & people operations",
          description:
            "Employee records, payroll workflows, and people processes in one place.",
          icon: genHr,
        },
        {
          title: "Inventory & supply chain",
          description:
            "Stock, procurement, and logistics visibility that reduces waste and delays.",
          icon: genOptimize,
        },
        {
          title: "Sales & customer operations",
          description:
            "Order-to-cash flows that connect sales activity with fulfillment and finance.",
          icon: genData,
        },
        {
          title: "Education & institutional ERP",
          description:
            "Specialized workflows for academic and institutional operations where needed.",
          icon: genSoftware,
        },
        {
          title: "Analytics & decision support",
          description:
            "Dashboards and operational KPIs that help leaders act with confidence.",
          icon: audioIntegration,
        },
      ]}
      processTitle="ERP Delivery Approach"
      processSubtitle="Implementation that respects your current processes while unlocking a cleaner operating model."
      processSteps={[
        {
          title: "Diagnose",
          text: "Map current systems, pain points, and integration requirements.",
          icon: processFrame1,
        },
        {
          title: "Configure",
          text: "Design modules, roles, and workflows around your operating model.",
          icon: processFrame4,
        },
        {
          title: "Implement",
          text: "Roll out in phases with training, data migration, and cutover plans.",
          icon: processFrame5,
        },
        {
          title: "Optimize",
          text: "Refine processes and reporting as adoption matures.",
          icon: processFrame6,
        },
      ]}
      capabilitiesTitle="Integrated Operations, Better Decisions"
      capabilities={[
        "Centralized data for finance, HR, inventory, and sales",
        "Role-based access and process controls",
        "Custom workflows tailored to your industry",
        "Integration with existing tools and reporting layers",
        "Scalable architecture for multi-location growth",
        "Enablement and change management for user adoption",
      ]}
      capabilitiesImage={erpSoftware}
      valueTitle="Value Added"
      valueSubtitle="ERP outcomes that reduce fragmentation, improve control, and give leadership a single source of truth."
      valuePoints={[
        "One platform for core business functions instead of scattered tools.",
        "Faster reporting cycles with cleaner operational data.",
        "Lower manual effort through workflow automation.",
        "Better inventory and finance visibility for day-to-day decisions.",
        "Implementations staged to reduce disruption risk.",
        "A foundation ready for AI-assisted insights as your data matures.",
      ]}
    />
  );
}
