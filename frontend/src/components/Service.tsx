import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import frame1 from "../assets/ServiceIcon/frame1.svg";
import frame2 from "../assets/ServiceIcon/frame2.svg";
import frame3 from "../assets/ServiceIcon/frame3.svg";
import frame4 from "../assets/ServiceIcon/frame4.svg";
import frame5 from "../assets/ServiceIcon/frame5.svg";
import frame6 from "../assets/ServiceIcon/frame6.svg";
import frame7 from "../assets/ServiceIcon/frame7.svg";
import storiesVector from "../assets/homepage-icons/stories-vector.png";
import "./Service.css";

const services = [
  {
    title: "Product Engineering",
    subTitle: [
      {
        "Application Development":
          "Tailored application development services to address unique business needs, delivering scalable, high-performance applications with a focus on innovation, security, and user experience.",
      },
      {
        "Website Development":
          "Crafting high-performance, responsive, and SEO-optimized websites that serve as robust digital storefronts. Focused on modern tech stacks, seamless navigation, and secure architectures to drive business engagement.",
      },
      {
        "Hybrid Mobile Development":
          "Building cross-platform mobile applications that combine the best of native and web technologies, ensuring consistent performance across devices while optimizing development time and cost.",
      },
      {
        "Desktop App Development":
          "Creating robust and secure desktop applications for Windows, macOS, and Linux, crafted to deliver seamless offline performance, data processing, and specialized functionality for diverse business requirements.",
      },
    ],
    description:
      "Product Engineering enables the transformation of concepts into market-ready applications, ensuring efficiency, adaptability, and cutting-edge technology integration.",
    image: frame1,
  },
  {
    title: "Artificial Intelligence (AI)",
    subTitle: [
      {
        "Agentic AI":
          "Designing and deploying autonomous AI agents capable of reasoning, planning, and executing multi-step workflows. These self-correcting systems integrate seamlessly with enterprise tools to handle complex tasks with minimal human intervention.",
      },
      {
        "Video Analytics":
          "Leveraging computer vision models to transform raw video data into actionable intelligence. Applications include real-time object detection, crowd management, behavioral analysis, and automated security monitoring.",
      },
    ],
    description:
      "Artificial Intelligence empowers enterprises to automate complex workflows, unlock predictive capabilities, and deliver hyper-personalized user experiences through intelligent systems.",
    image: frame2,
  },
  {
    title: "Internet of Things (IoT)",
    subTitle: [
      {
        "Smart Device Integration":
          "Connecting and managing diverse sensor networks and edge devices, ensuring secure data ingestion, low-latency communication, and centralized hardware fleet management.",
      },
      {
        "Edge Computing & Analytics":
          "Connecting and managing diverse sensor networks and edge devices, ensuring secure data ingestion, low-latency communication, and centralized hardware fleet management.",
      },
    ],
    description:
      "Internet of Things bridges the gap between the physical and digital worlds, creating interconnected ecosystems that optimize operations and capture real-time environmental data.",
    image: frame3,
  },
  {
    title: "CloudOps",
    subTitle: [
      {
        "Cloud Infrastructure Management":
          "Designing and maintaining scalable cloud architectures with automated provisioning, proactive monitoring, and rigorous resource optimization to maximize ROI.",
      },
      {
        "Disaster Recovery & Business Continuity":
          "Implementing robust backup strategies and failover mechanisms to guarantee minimal downtime and bulletproof data resiliency against unexpected system disruptions.",
      },
    ],
    description:
      "CloudOps ensures continuous operational excellence, cost optimization, and high availability across public, private, and hybrid cloud environments.",
    image: frame4,
  },
  {
    title: "Data Insights",
    subTitle: [
      {
        "Data Engineering & Pipelines":
          "Building secure, scalable data lakes and ETL/ELT pipelines that consolidate disparate data sources into a single, clean source of truth.",
      },
      {
        "Predictive Analytics & Reporting":
          "Utilizing statistical models and intuitive BI dashboards to forecast market trends, track key performance indicators, and uncover hidden operational efficiencies.",
      },
    ],
    description:
      "Data Insights turns raw organizational data into a strategic asset, enabling data-driven decision-making through advanced analytics and business intelligence.",
    image: frame5,
  },
  {
    title: "Quality Assurance",
    subTitle: [
      {
        "Automated & Manual Testing":
          "Deploying robust test automation frameworks alongside meticulous exploratory manual testing to identify vulnerabilities, eliminate bugs, and accelerate release cycles.",
      },
      {
        "Performance & Security Testing":
          "Subjecting applications to stringent load, stress, and penetration testing to ensure they can handle peak traffic and resist evolving cybersecurity threats.",
      },
    ],
    description:
      "Quality Assurance guarantees software reliability, security, and performance through rigorous testing methodologies across the entire development lifecycle.",
    image: frame6,
  },
  {
    title: "24x7 Storage Support",
    subTitle: [
      {
        "Proactive Infrastructure Monitoring":
          "Continuous, real-time oversight of storage arrays, SAN/NAS networks, and cloud storage repositories to identify and resolve performance bottlenecks before they impact business.",
      },
      {
        "Incident Response & Zero-Downtime Patching":
          "Immediate intervention by dedicated storage specialists for hardware failures or capacity constraints, paired with seamless, non-disruptive system upgrades.",
      },
    ],
    description:
      "24x7 Storage Support delivers round-the-clock maintenance and monitoring for enterprise data centers, ensuring absolute data integrity and zero operational downtime.",
    image: frame7,
  },
];

export default function Service() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState<number | null>(null);
  const activeService = services[activeTab];

  useEffect(() => {
    const tabsEl = tabsRef.current;
    if (!tabsEl) return;

    const syncPanelHeight = () => {
      if (window.innerWidth >= 1920) {
        setPanelHeight(1040);
      } else if (window.innerWidth >= 1024) {
        // Match Figma: panel height = full tabs column (connected layout)
        setPanelHeight(tabsEl.offsetHeight);
      } else {
        setPanelHeight(null);
      }
    };

    syncPanelHeight();

    const observer = new ResizeObserver(syncPanelHeight);
    observer.observe(tabsEl);
    window.addEventListener("resize", syncPanelHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncPanelHeight);
    };
  }, []);

  return (
    <section className="service-section" aria-label="Our Services">
      <img
        src={storiesVector}
        alt=""
        aria-hidden="true"
        className="service-section__vector"
      />

      <div className="service-section__inner">
        <div className="service-section__header">
          <h2 className="service-section__heading-label">
            <span className="text-black">Our </span>
            <span className="text-[#2365AA]">Services</span>
          </h2>
          <p className="service-section__heading-title">
            AI Solutions for Automation, Growth, and Innovation
          </p>
        </div>

        <div className="service-section__layout">
          <div
            ref={tabsRef}
            className="service-section__tabs"
            role="tablist"
            aria-label="Service categories"
          >
            {services.map((service, index) => (
              <button
                key={service.title}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                onClick={() => setActiveTab(index)}
                className={`service-section__tab ${
                  activeTab === index
                    ? "service-section__tab--active"
                    : "service-section__tab--inactive"
                }`}
              >
                <img
                  src={service.image}
                  className="service-section__tab-icon"
                  alt=""
                  aria-hidden="true"
                />
                <span className="service-section__tab-label">{service.title}</span>
              </button>
            ))}
          </div>

          <div
            className="service-section__panel"
            role="tabpanel"
            style={panelHeight ? { height: panelHeight } : undefined}
          >
            <div className="service-section__card">
              <div className="service-section__card-body">
                <div>
                  <h3 className="service-section__card-title">{activeService.title}</h3>
                  <p className="service-section__card-desc">{activeService.description}</p>
                </div>

                <div className="service-section__features">
                  {activeService.subTitle.map((item, index) => {
                    const title = Object.keys(item)[0];
                    const description = Object.values(item)[0];

                    return (
                      <div key={index} className="service-section__feature">
                        <span className="service-section__feature-check">
                          <Check className="h-3 w-3 stroke-[3px]" />
                        </span>
                        <div>
                          <h4 className="service-section__feature-title">{title}</h4>
                          <p className="service-section__feature-text">{description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <img
                src={activeService.image}
                alt=""
                aria-hidden="true"
                className="service-section__card-illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
