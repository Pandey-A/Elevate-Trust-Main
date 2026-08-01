import frame1 from "../assets/ServiceIcon/frame1.svg";
import frame2 from "../assets/ServiceIcon/frame2.svg";
import frame3 from "../assets/ServiceIcon/frame3.svg";
import frame4 from "../assets/ServiceIcon/frame4.svg";
import frame5 from "../assets/ServiceIcon/frame5.svg";
import frame6 from "../assets/ServiceIcon/frame6.svg";
import frame7 from "../assets/ServiceIcon/frame7.svg";

export type ServiceFeature = {
  title: string;
  description: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  features: ServiceFeature[];
  image: string;
};

export const services: ServiceItem[] = [
  {
    title: "Product Engineering",
    description:
      "Product Engineering enables the transformation of concepts into market-ready applications, ensuring efficiency, adaptability, and cutting-edge technology integration.",
    features: [
      {
        title: "Application Development",
        description:
          "Tailored application development services to address unique business needs, delivering scalable, high-performance applications with a focus on innovation, security, and user experience.",
      },
      {
        title: "Website Development",
        description:
          "Crafting high-performance, responsive, and SEO-optimized websites that serve as robust digital storefronts. Focused on modern tech stacks, seamless navigation, and secure architectures to drive business engagement.",
      },
      {
        title: "Hybrid Mobile Development",
        description:
          "Building cross-platform mobile applications that combine the best of native and web technologies, ensuring consistent performance across devices while optimizing development time and cost.",
      },
      {
        title: "Desktop App Development",
        description:
          "Creating robust and secure desktop applications for Windows, macOS, and Linux, crafted to deliver seamless offline performance, data processing, and specialized functionality for diverse business requirements.",
      },
    ],
    image: frame1,
  },
  {
    title: "Artificial Intelligence (AI)",
    description:
      "Artificial Intelligence empowers enterprises to automate complex workflows, unlock predictive capabilities, and deliver hyper-personalized user experiences through intelligent systems.",
    features: [
      {
        title: "Agentic AI",
        description:
          "Designing and deploying autonomous AI agents capable of reasoning, planning, and executing multi-step workflows. These self-correcting systems integrate seamlessly with enterprise tools to handle complex tasks with minimal human intervention.",
      },
      {
        title: "Video Analytics",
        description:
          "Leveraging computer vision models to transform raw video data into actionable intelligence. Applications include real-time object detection, crowd management, behavioral analysis, and automated security monitoring.",
      },
    ],
    image: frame2,
  },
  {
    title: "Internet of Things (IoT)",
    description:
      "Internet of Things bridges the gap between the physical and digital worlds, creating interconnected ecosystems that optimize operations and capture real-time environmental data.",
    features: [
      {
        title: "Smart Device Integration",
        description:
          "Connecting and managing diverse sensor networks and edge devices, ensuring secure data ingestion, low-latency communication, and centralized hardware fleet management.",
      },
      {
        title: "Edge Computing & Analytics",
        description:
          "Processing data at the network edge to reduce latency and bandwidth usage while enabling real-time analytics, autonomous decision-making, and intelligent automation across distributed IoT deployments.",
      },
    ],
    image: frame3,
  },
  {
    title: "CloudOps",
    description:
      "CloudOps ensures continuous operational excellence, cost optimization, and high availability across public, private, and hybrid cloud environments.",
    features: [
      {
        title: "Cloud Infrastructure Management",
        description:
          "Designing and maintaining scalable cloud architectures with automated provisioning, proactive monitoring, and rigorous resource optimization to maximize ROI.",
      },
      {
        title: "Disaster Recovery & Business Continuity",
        description:
          "Implementing robust backup strategies and failover mechanisms to guarantee minimal downtime and bulletproof data resiliency against unexpected system disruptions.",
      },
    ],
    image: frame4,
  },
  {
    title: "Data Insights",
    description:
      "Data Insights turns raw organizational data into a strategic asset, enabling data-driven decision-making through advanced analytics and business intelligence.",
    features: [
      {
        title: "Data Engineering & Pipelines",
        description:
          "Building secure, scalable data lakes and ETL/ELT pipelines that consolidate disparate data sources into a single, clean source of truth.",
      },
      {
        title: "Predictive Analytics & Reporting",
        description:
          "Utilizing statistical models and intuitive BI dashboards to forecast market trends, track key performance indicators, and uncover hidden operational efficiencies.",
      },
    ],
    image: frame5,
  },
  {
    title: "Quality Assurance",
    description:
      "Quality Assurance guarantees software reliability, security, and performance through rigorous testing methodologies across the entire development lifecycle.",
    features: [
      {
        title: "Automated & Manual Testing",
        description:
          "Deploying robust test automation frameworks alongside meticulous exploratory manual testing to identify vulnerabilities, eliminate bugs, and accelerate release cycles.",
      },
      {
        title: "Performance & Security Testing",
        description:
          "Subjecting applications to stringent load, stress, and penetration testing to ensure they can handle peak traffic and resist evolving cybersecurity threats.",
      },
    ],
    image: frame6,
  },
  {
    title: "24x7 Storage Support",
    description:
      "24x7 Storage Support delivers round-the-clock maintenance and monitoring for enterprise data centers, ensuring absolute data integrity and zero operational downtime.",
    features: [
      {
        title: "Proactive Infrastructure Monitoring",
        description:
          "Continuous, real-time oversight of storage arrays, SAN/NAS networks, and cloud storage repositories to identify and resolve performance bottlenecks before they impact business.",
      },
      {
        title: "Incident Response & Zero-Downtime Patching",
        description:
          "Immediate intervention by dedicated storage specialists for hardware failures or capacity constraints, paired with seamless, non-disruptive system upgrades.",
      },
    ],
    image: frame7,
  },
];
