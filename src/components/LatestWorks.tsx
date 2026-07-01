import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import landscape1 from "../assets/homepage-icons/landscape-1.svg";
import landscape2 from "../assets/homepage-icons/landscape-2.png";
import landscape3 from "../assets/homepage-icons/landscape-3.svg";
import landscape4 from "../assets/homepage-icons/landscape-4.svg";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import storiesVector from "../assets/homepage-icons/stories-vector.png";

import "./LatestWorks.css";

interface DemoLink {
  label: string;
  href: string;
}

interface WorkItem {
  num: string;
  title: string;
  businessChallenge: string;
  techs: string[];
  demos?: DemoLink[];
  solutionOverview: string;
  solutionBullets?: string[];
  businessOutcome: string;
  image: string;
}

const works: WorkItem[] = [
  {
    num: "/001",
    title:
      "RFP Query and Compliance Check automation in the Government & procurement industry",
    businessChallenge:
      "The client needed a smarter way to manage RFPs and ensure every procurement decision met strict compliance rules. Manual reviews were slow, error-prone and made it hard to get real-time visibility into vendor compliance status.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    demos: [
      { label: "1. Tender Query Automation with Human in loop Demo", href: "#" },
      { label: "2. RFP Compliance check automation & audit automation", href: "#" },
    ],
    solutionOverview:
      "Delivered a centralized compliance engine that automates RFP query handling, flags non-compliant responses instantly, and provides dashboards for procurement teams to track vendor eligibility in real time.",
    businessOutcome:
      "Reduced manual RFP review time by 65%, improved compliance accuracy, and enabled faster, data-driven procurement decisions across government workflows.",
    image: landscape1,
  },
  {
    num: "/002",
    title: "Talent Matching automation using Generative AI for the Healthcare Industry",
    businessChallenge:
      "HR teams often review large numbers of resumes, making the hiring process time-consuming and prone to human errors. An efficient and unbiased recruitment system helps streamline candidate selection and improve hiring accuracy.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    solutionOverview:
      "The AI matching engine recommends candidates based on matching scores, processes multiple talent pools efficiently, and improves accuracy through customizable and feedback-driven learning.",
    businessOutcome:
      "The AI-powered recruitment system reduces manual hiring efforts, understands skills across multiple industries, minimizes biased hiring, and scales efficiently to support business growth and increased revenue.",
    image: landscape2,
  },
  {
    num: "/003",
    title: "Predictive maintenance using IoT devices and sensors for the oil industry",
    businessChallenge:
      "Oil platforms rely on thousands of sensors, but manual monitoring is slow and reactive. Unexpected equipment failures lead to costly downtime, safety risks, and inefficient maintenance scheduling across remote sites.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    solutionOverview:
      "Built an edge-AI predictive maintenance platform that ingests IoT sensor streams, detects anomalies in real time, and triggers automated alerts before critical failures occur.",
    solutionBullets: [
      "Real-time Predictive Maintenance: Using Edge AI for IoT devices, we enabled instant anomaly detection directly at the source.",
      "Edge AI Processing: Reduced latency and bandwidth by analyzing sensor data on-site instead of sending everything to the cloud.",
      "Automated Alerts & Reporting: Failure predictions triggered instant SMS/Email alerts to maintenance crews.",
      "Custom Sensor Integration via REST APIs: Seamlessly connecting legacy oil rig sensors into our unified analytics dashboard.",
    ],
    businessOutcome:
      "Enabled proactive event response with 99.2% accuracy, reduced manual oversight workloads by 80%, and cut unplanned downtime across oil field operations.",
    image: landscape3,
  },
  {
    num: "/004",
    title: "Customer Support Automation using Agentic AI BPO Industry",
    businessChallenge:
      "Support agents were struggling with high response times due to the difficulty of locating information across  numerous tools and sources. This reliance on manual human effort made it increasingly hard to handle large  volumes of customer support traffic efficiently.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    solutionOverview:
      "An agentic-based generative AI solution was built to reduce manual content searching and integrate past successful  solutions for agent recommendations. The system offers deep customization for organization-specific workflows  and utilizes a Kubernetes-based deployment to ensure the solution scales effectively with demand.",
    businessOutcome:
      "The implementation achieved a 90% reduction in first response time and a 50% reduction in final response time  while providing 24/7 assistance. By putting product and policy knowledge at their fingertips, the L1 team is  empowered to quickly review and send ready-made responses, significantly optimizing the support workflow.",
    image: landscape4,
  },
  {
    num: "/005",
    title: "Customer Support Automation using Agentic AI in the Shipment Industry",
    businessChallenge:
      "The shipping industry often struggles with fragmented visibility across multiple carriers and legacy tracking  systems, leading to delayed updates and manual overhead. There was a critical need for an automated, unified  system that could monitor thousands of shipments in real-time, detect potential delays early, and reduce the  administrative burden on logistics coordinators.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    solutionOverview:
      "The solution features an agentic AI framework designed to orchestrate and automate shipment tracking across  diverse carrier platforms. By integrating real-time data feeds with predictive modeling, the system identifies transit  risks and automatically triggers notifications for stakeholders. A centralized dashboard provides an intelligent  overview of the entire shipping pipeline, allowing teams to manage exceptions rather than manually monitoring  every movement.",
    businessOutcome:
      "The implementation has significantly reduced the time spent on manual tracking and increased the accuracy of  delivery estimates. By automating proactive status updates and risk assessments, the client has minimized transit  disruptions, improved carrier accountability, and enhanced overall customer satisfaction through superior  transparency and reliability.",
    image: landscape3,
  },
  {
    num: "/006",
    title: "Illicit behaviour detection using Video analytics in manufacturing industry",
    businessChallenge:
      "A major challenge for the company was high flagging incidents, where drivers would accept direct cash payments  without engaging the taxi meter, leading to significant revenue leakage. Identifying these illicit behaviors manually  from hours of video recordings was time-consuming, inefficient, and prone to human bias, creating an urgent need  for an automated, scalable detection solution.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    demos: [
      { label: "1. Demo: Video Analytics and monitoring demo", href: "#" }
    ],
    solutionOverview:
      "The solution involves a real-time illicit behavior detection system powered by CNN models and integrated via the  Samsara API to analyze video feeds for meter-bypass events. It features a comprehensive dashboard where  management can track high-flagging incidents by driver, trip location, and frequency. This human-in-the-loop  framework allows for streamlined auditing, while an AI matching engine continuously refines its detection accuracy  based on feedback from verified cases.",
    businessOutcome:
      "Implementation of the AI video analytics system reduced manual auditing efforts by 90%, enabling the extraction  of critical cases from massive image and video datasets with high speed. The models are robust enough to handle  complex scenarios such as varying light and low image quality. Furthermore, the client successfully commercialised  the solution by offering this high-flagging detection technology to other taxi services.",
    image: landscape1,
  },
];

export default function LatestWorks() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="latest-works" aria-label="Latest Works">
      <img
        src={partnerGlobe}
        alt=""
        aria-hidden
        className="latest-works__decor-globe"
      />
      <img
        src={storiesVector}
        alt=""
        aria-hidden
        className="latest-works__decor-vector"
      />

      <div className="site-container latest-works__container">
        <div className="latest-works__header">
          <p className="latest-works__subtitle">
            OUR CREATIVE{" "}
            <span className="latest-works__subtitle-highlight">JOURNEY</span>
          </p>
          <h2 className="latest-works__title">Latest Works</h2>

          <div className="latest-works__btn-wrapper">
            <a href="#" className="latest-works__btn">
              <span>View all case studies</span>
              <span className="latest-works__btn-icon">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </div>

        <div className="latest-works__accordion">
          {works.map((work, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={work.num}
                className={`latest-works__item ${isOpen ? "latest-works__item--open" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="latest-works__trigger"
                  aria-expanded={isOpen}
                >
                  <span className="latest-works__trigger-num">{work.num}</span>
                  <span className="latest-works__trigger-line" aria-hidden />
                  <span className="latest-works__trigger-title">{work.title}</span>
                  <span className="latest-works__trigger-chevron">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div className="latest-works__body-wrapper">
                  <div className="latest-works__body">
                    <div className="latest-works__grid">
                      <div className="latest-works__col-left-top">
                        <div className="latest-works__card latest-works__card--white">
                          <h4 className="latest-works__card-label text-[#272935]">
                            Business Challenge
                          </h4>
                          <p className="latest-works__card-desc text-[#272935]/85">
                            {work.businessChallenge}
                          </p>
                        </div>
                      </div>

                      <div className="latest-works__col-right-top">
                        <div className="latest-works__tech-section">
                          <h4 className="latest-works__tech-heading">
                            Technology/Tools Used
                          </h4>
                          <div className="latest-works__tech-tags">
                            {work.techs.map((tech) => (
                              <span key={tech} className="latest-works__tech-pill">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {work.demos && work.demos.length > 0 && (
                          <div className="latest-works__demo-section">
                            <h4 className="latest-works__tech-heading">Demo</h4>
                            <ul className="latest-works__demo-list">
                              {work.demos.map((demo) => (
                                <li key={demo.label}>
                                  <a href={demo.href} className="latest-works__demo-link">
                                    {demo.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="latest-works__col-left-bottom">
                        <div className="latest-works__illustration-container">
                          <img
                            src={work.image}
                            alt=""
                            aria-hidden
                            className="latest-works__illustration"
                            draggable={false}
                          />
                        </div>
                      </div>

                      <div className="latest-works__col-solution">
                        <div className="latest-works__card latest-works__card--blue-glass">
                          <h4 className="latest-works__card-label text-white">
                            Solution Overview
                          </h4>
                          {work.solutionBullets ? (
                            <>
                              <p className="latest-works__card-desc text-white/80">
                                {work.solutionOverview}
                              </p>
                              <ul className="latest-works__solution-list">
                                {work.solutionBullets.map((bullet) => (
                                  <li key={bullet} className="latest-works__card-desc text-white/80">
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <p className="latest-works__card-desc text-white/80">
                              {work.solutionOverview}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="latest-works__col-results">
                        <div className="latest-works__card latest-works__card--blue-glass">
                          <h4 className="latest-works__card-label text-white">
                            Business Outcome
                          </h4>
                          <p className="latest-works__card-desc text-white/80">
                            {work.businessOutcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
