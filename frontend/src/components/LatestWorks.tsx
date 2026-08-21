import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import smartArrow from "../assets/homepage-icons/smart-arrow.png";
import { useState } from "react";

import landscape2 from "../assets/homepage-icons/landscape-2.png";
import landscape3 from "../assets/homepage-icons/landscape-3.svg";
import landscape4 from "../assets/homepage-icons/landscape-4.svg";
import latestWorksIllust001 from "../assets/homepage-icons/latest-works-illust-001.svg";
import latestWorksFrame from "../assets/homepage-icons/latest-works-frame.png";
import latestWorksSectionBg from "../assets/homepage-icons/latest-works-section-bg.png";
import GlobeDecor from "../assets/homepage-icons/Globe.png";
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
      "Tender Query & Compliance Automation for Indian Government",
    businessChallenge:
      "Manual RFP analysis is labour-intensive and prone to conflicting departmental interpretations, leaving vendors to  struggle with ambiguous clauses in massive documents. This lack of automated conformance checks creates  compliance risks and leads to repetitive, redundant pre-bid queries that stall the procurement timeline.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    solutionOverview:
      "The solution is an AI-driven system that automates document analysis by cross-referencing RFPs, SBDs, and  historical query-response records. It leverages institutional knowledge to provide consistent, high-quality responses  and performs automated compliance checks to identify missing or ambiguous clauses before documents are  released.",
    businessOutcome:
      "By replacing manual cross-referencing with AI-powered intelligence, the system eliminates significant delays and  reduces interpretive ambiguity. This transformation ensures higher response quality, strengthens institutional  memory, and mitigates compliance risks through proactive, automated document validation.",
    image: latestWorksIllust001,
  },
  {
    num: "/002",
    title: "Talent Matching automation using Agentic AI in HR Tech Industry",
    businessChallenge:
      "The client faced significant operational bottlenecks due to manual CV screening and slow hiring cycles, resulting in  inconsistent candidate evaluations. There was a critical need for a scalable, multi-tenant solution that prioritized  transparency, exploitability, and data privacy to maintain trust in the hiring process.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    solutionOverview:
      "The engagement followed a four-phase execution strategy, starting with foundational AI/NLP matching and  progressing to an intelligent scoring engine with real-time recalculation. The tech stack leveraged Generative AI and  agentic orchestration to enable internal talent rediscovery and human-readable AI explanations within the existing  ATS and applied to candidates. This solution enables hiring managers to change the criteria in real time and get the  updated matching candidate.",
    businessOutcome:
      "The implementation resulted in faster hiring decisions, improved evaluation consistency, and enhanced trust  through explainable AI and ethical design. The customer was able to sell the solution to 20 new customers in the  quarter.",
    image: landscape2,
  },
  {
    num: "/003",
    title: "Predictive maintenance using IoT devices and sensors for the oil industry",
    businessChallenge:
      "In oil industry undetected leaks and equipment malfunctions cause a shift from proactive to reactive maintenance,  resulting in massive revenue losses from unplanned downtime and escalating repair costs. Beyond the financial  impact, these silent failures lead to severe environmental liabilities, safety hazards, and the erosion of investor  confidence due to poor ESG performance.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    solutionOverview:
      "The solution leverages a specialized AI and IoT framework for real-time anomaly detection, using high-precision sensor integrations to capture early signs of leakages and machine malfunctions.",
    solutionBullets: [
      "Predictive monitoring with automated alerting ensures that subtle deviations in pressure or vibration are flagged before they escalate into critical failures.",
      "A centralized command dashboard provides a unified view for technical teams to track asset health and coordinate preventative maintenance.",
      "Field engineers use the mobile-enabled interface to receive instant notifications and update the status of equipment repairs in real-time.",
      "Automated diagnostic reports enable post-incident analysis to continuously refine detection accuracy and optimize operational safety.",
    ],
    businessOutcome:
      "By implementing real-time AI anomaly detection, the system eliminates unplanned downtime and prevents costly  secondary equipment damage. This proactive approach significantly reduces environmental liability and  operational risk, ensuring high-performance asset longevity and regulatory compliance.",
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
    title: "Solar Rooftop Detection using Satellite Imagery & Deep Learning Segmentation",
    businessChallenge:
      "Manual identification of solar-suitable rooftops from aerial imagery was an unscalable surveyors could assess only  hundreds of properties per week. Inconsistent evaluations and high labour costs made city-scale mapping  commercially unviable. There was an urgent need for an automated, high-accuracy pipeline capable of processing  thousands of satellite images rapidly and reliably.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    solutionOverview:
      "ElevateTrust built a deep learning semantic segmentation pipeline using a CNN-based U-Net architecture trained  on labelled satellite imagery. The model produces binarised roof masks, applies post-processing morphological  operations to remove noise and small artefacts, and then overlays detected rooftops onto the source image. The  inference engine integrates with Google Maps imagery APIs and outputs GIS-compatible data for downstream solar  feasibility scoring, fully automated end-to-end",
    businessOutcome:
      "Achieved 91%+ IoU accuracy across diverse residential geographies. Reduced rooftop survey effort by over 85%,  enabling the client to map solar potential for 50,000+ properties in under 48 hours. The solution is embedded in  the client's solar lead generation platform, directly accelerating customer acquisition and accelerating clean energy  deployment at scale.",
    image: landscape3,
  },
  {
    num: "/006",
    title: "Illicit behaviour detection using Video analytics in the transport industry",
    businessChallenge:
      "A major challenge for the company was high flagging incidents, where drivers would accept direct cash payments  without engaging the taxi meter, leading to significant revenue leakage. Identifying these illicit behaviors manually  from hours of video recordings was time-consuming, inefficient, and prone to human bias, creating an urgent need  for an automated, scalable detection solution.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    solutionOverview:
      "The solution involves a real-time illicit behavior detection system powered by CNN models and integrated via the  Samsara API to analyze video feeds for meter-bypass events. It features a comprehensive dashboard where  management can track high-flagging incidents by driver, trip location, and frequency. This human-in-the-loop  framework allows for streamlined auditing, while an AI matching engine continuously refines its detection accuracy  based on feedback from verified cases.",
    businessOutcome:
      "Implementation of the AI video analytics system reduced manual auditing efforts by 90%, enabling the extraction  of critical cases from massive image and video datasets with high speed. The models are robust enough to handle  complex scenarios such as varying light and low image quality. Furthermore, the client successfully commercialised  the solution by offering this high-flagging detection technology to other taxi services.",
    image: latestWorksFrame,
  },
];

export default function LatestWorks() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="latest-works"
      aria-label="Latest Works"
      style={
        { "--latest-works-bg": `url(${latestWorksSectionBg})` } as CSSProperties
      }
    >
      <div className="latest-works__section-decor" aria-hidden>
        <img
          src={partnerGlobe}
          alt=""
          loading="lazy"
          decoding="async"
          className="latest-works__decor-globe"
        />
        <img
          src={GlobeDecor}
          alt=""
          loading="lazy"
          decoding="async"
          className="latest-works__decor-globe-xl"
        />
        <img
          src={storiesVector}
          alt=""
          loading="lazy"
          decoding="async"
          className="latest-works__decor-vector"
        />
      </div>

      <div className="site-container latest-works__container">
        <div className="latest-works__header">
          <p className="latest-works__subtitle">
            <span className="latest-works__subtitle-lead">OUR CREATIVE </span>
            <span className="latest-works__subtitle-highlight">JOURNEY</span>
          </p>
          <h2 className="latest-works__title">Latest Works</h2>

          <div className="latest-works__btn-wrapper">
            <Link to="/case-studies" className="latest-works__btn">
              <span>View all case studies</span>
              <img
                src={smartArrow}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="latest-works__btn-icon"
              />
            </Link>
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
                      <div className="latest-works__col-left">
                        <div className="latest-works__card latest-works__card--white">
                          <h4 className="latest-works__card-label">
                            Business Challenge
                          </h4>
                          <p className="latest-works__card-desc">
                            {work.businessChallenge}
                          </p>
                        </div>

                        <div className="latest-works__card latest-works__card--blue-glass">
                          <h4 className="latest-works__card-label">
                            Solution Overview
                          </h4>
                          {work.solutionBullets ? (
                            <>
                              <p className="latest-works__card-desc">
                                {work.solutionOverview}
                              </p>
                              <ul className="latest-works__solution-list">
                                {work.solutionBullets.map((bullet) => (
                                  <li key={bullet} className="latest-works__card-desc">
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <p className="latest-works__card-desc">
                              {work.solutionOverview}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="latest-works__col-right">
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

                        <div className="latest-works__illustration-container">
                          {isOpen ? (
                            <img
                              src={work.image}
                              alt=""
                              aria-hidden
                              loading="lazy"
                              decoding="async"
                              className="latest-works__illustration"
                              draggable={false}
                            />
                          ) : null}
                        </div>

                        <div className="latest-works__card latest-works__card--blue-glass">
                          <h4 className="latest-works__card-label">
                            Business Outcome
                          </h4>
                          <p className="latest-works__card-desc">
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
