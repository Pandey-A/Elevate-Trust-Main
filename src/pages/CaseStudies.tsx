import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import storiesVector from "../assets/homepage-icons/stories-vector.png";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import csRfp from "../assets/case-studies/cs-rfp.png";
import csTalent from "../assets/case-studies/cs-talent.png";
import csPredictive1 from "../assets/case-studies/cs-predictive-1.png";
import csSupportBpo from "../assets/case-studies/cs-support-bpo.png";
import csPredictive2 from "../assets/case-studies/cs-predictive-2.png";
import csSupportShipment from "../assets/case-studies/cs-support-shipment.png";
import csPredictive3 from "../assets/case-studies/cs-predictive-3.png";
import csVendorFraud from "../assets/case-studies/cs-vendor-fraud.png";
import csSolar from "../assets/case-studies/cs-solar.png";
import c7EffortSavings from "../assets/case-studies/c7-1.png";
import "./CaseStudies.css";

type CaseStudy = {
  title: string;
  description: string;
  image: string;
  href?: string;
  imageClassName?: string;
  titleClassName?: string;
};

const caseStudies: CaseStudy[] = [
  {
    title:
      "RFP Query and Compliance Check automation in the Government & procurement industry",
    description:
      "AI-driven system that automates document analysis by cross-referencing RFPs, SBDs, and historical query-response records. It leverages institutional knowledge to provide consistent, high-quality responses and performs automated compliance checks to identify missing or ambiguous clauses before documents are released",
    image: csRfp,
    href: "/case-studies/rfp-query-compliance",
    titleClassName: "cs-card__title--lg",
  },
  {
    title: "Talent Matching automation using Agentic AI in HR Tech Industry",
    description:
      "The engagement followed a four-phase execution strategy, starting with foundational AI/NLP matching and progressing to an intelligent scoring engine with real-time recalculation. The tech stack leveraged Generative AI and agentic orchestration to enable internal talent rediscovery and human-readable AI explanations within the existing ATS and applied to candidates. This solution enables hiring managers to change the criteria in real time and get the updated matching candidate.",
    image: csTalent,
    href: "/case-studies/talent-matching",
    titleClassName: "cs-card__title--lg",
  },
  {
    title:
      "Predictive maintenance using IoT devices and sensors for the oil industry",
    description:
      "Leverages a specialized AI and IoT framework for real-time anomaly detection, using high-precision sensor integrations to capture early signs of leakages and machine malfunctions.",
    image: csPredictive1,
    href: "/case-studies/predictive-maintenance",
    titleClassName: "cs-card__title--lg",
  },
  {
    title: "Customer Support Automation using Agentic AI BPO Industry",
    description:
      "An agentic-based generative AI solution was built to reduce manual content searching and integrate past successful solutions for agent recommendations. The system offers deep customization for organization-specific workflows and utilizes a Kubernetes-based deployment to ensure the solution scales effectively with demand",
    image: csSupportBpo,
    href: "/case-studies/support-automation-bpo",
    titleClassName: "cs-card__title--lg",
  },
  {
    title:
      "Predictive maintenance using IoT devices and sensors for the oil industry",
    description:
      "Leverages a specialized AI and IoT framework for real-time anomaly detection, using high-precision sensor integrations to capture early signs of leakages and machine malfunctions.",
    image: csPredictive2,
    href: "/case-studies/predictive-maintenance",
    titleClassName: "cs-card__title--lg",
  },
  {
    title:
      "Customer Support Automation using Agentic AI in the Shipment Industry",
    description:
      "An agentic AI framework that orchestrates shipment tracking across carrier platforms, surfaces transit risks early, and keeps stakeholders informed through automated notifications and exception-focused dashboards.",
    image: csSupportShipment,
    href: "/case-studies/support-automation-shipment",
    titleClassName: "cs-card__title--lg",
  },
  {
    title:
      "Illicit behaviour detection using Video analytics in the transport industry",
    description:
      "The solution involves a real-time illicit behaviour detection system powered by CNN models and integrated via the Samsara API to analyse video feeds for meter-bypass events. It features a comprehensive dashboard where management can track high-flagging incidents by driver, trip location, and frequency. This human-in-the-loop framework allows for streamlined auditing, while an AI matching engine continuously refines its detection accuracy based on feedback from verified cases",
    image: csPredictive3,
    href: "/case-studies/illicit-behaviour-detection",
    imageClassName: "cs-card__media--cover",
    titleClassName: "cs-card__title--lg",
  },
  {
    title:
      "Vendor Material Fraud Detection using AI Video Analytics in the Construction Industry",
    description:
      "ElevateTrust developed an AI video analytics system using CCTV cameras at delivery points to automatically measure material volume in real time. CNN-based models combined with 3D point cloud depth analysis estimate the actual quantity in each truck load. The system compares AI-measured quantities against vendor-declared amounts, flags discrepancies instantly, captures timestamped video",
    image: csVendorFraud,
    href: "/case-studies/vendor-fraud-detection",
    imageClassName: "cs-card__media--cover",
    titleClassName: "cs-card__title--lg",
  },
  {
    title:
      "Solar Rooftop Detection using Satellite Imagery & Deep Learning Segmentation",
    description:
      "ElevateTrust built a deep learning semantic segmentation pipeline using a CNN-based U-Net architecture trained on labelled satellite imagery. The model produces binarised roof masks, applies post-processing morphological operations to remove noise and small artefacts, and then overlays detected rooftops onto the source image. The inference engine integrates with Google Maps imagery APIs and outputs GIS-compatible data for downstream solar feasibility scoring, fully automated end-to-end.",
    image: csSolar,
    href: "/case-studies/solar-rooftop-detection",
    imageClassName: "cs-card__media--cover",
    titleClassName: "cs-card__title--lg",
  },
  {
    title: "GenAI-Enabled SDLC: Concise Client Enablement Plan",
    description:
      "Phase-wise AI adoption across the software lifecycle with tool guidance, a 12-week rollout, ROI modelling, governance, and role-based training. The plan standardises Cursor and Claude Code by phase to reduce repetitive SDLC work while improving delivery speed and engineering quality.",
    image: c7EffortSavings,
    href: "/case-studies/genai-enabled-sdlc",
    imageClassName: "cs-card__media--cover",
    titleClassName: "cs-card__title--lg",
  },
];

export default function CaseStudies() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cs-page">
      <section className="cs-hero">
        <img
          src={worldMapBackground}
          alt=""
          className="cs-hero__bg"
          aria-hidden="true"
        />
        <div className="cs-hero__content">
          <p className="cs-hero__eyebrow">Resources</p>
          <h1 className="cs-hero__title">
            Case Studies That Show Real AI Impact
          </h1>
          <p className="cs-hero__subtitle">
            Explore how ElevateTrust.AI partners with enterprises to solve complex
            problems, from agentic automation and predictive maintenance to video
            analytics and document intelligence, with measurable business outcomes.
          </p>
          <Link to="/contact" className="cs-hero__btn">
            <span>Contact Us</span>
            <span className="cs-hero__btn-circle">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      <nav className="cs-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="cs-breadcrumbs__sep" aria-hidden="true">
          »
        </span>
        <span>Resources</span>
        <span className="cs-breadcrumbs__sep" aria-hidden="true">
          »
        </span>
        <span>Case Studies</span>
      </nav>

      <section className="cs-section">
        <div className="cs-section__decor" aria-hidden="true">
          <img
            src={storiesVector}
            alt=""
            className="cs-section__decor-vector"
          />
          <img
            src={partnerGlobe}
            alt=""
            className="cs-section__decor-globe"
          />
        </div>

        <div className="cs-section__inner">
          <div className="cs-section__header">
            <h2 className="cs-section__title">Our Success Stories</h2>
            <p className="cs-section__subtitle">
              Real client engagements across government, healthcare, logistics,
              energy, HR tech, and more, showcasing how our AI solutions deliver
              efficiency, accuracy, and scale in production.
            </p>
          </div>

          <div className="cs-grid">
            {caseStudies.map((study, index) => (
              <article key={index} className="cs-card">
                <div className={`cs-card__media ${study.imageClassName ?? ""}`}>
                  <img src={study.image} alt="" />
                </div>
                <div className="cs-card__body">
                  <h3
                    className={`cs-card__title ${study.titleClassName ?? ""}`}
                  >
                    {study.title}
                  </h3>
                  <p className="cs-card__desc">{study.description}</p>
                  {study.href ? (
                    <Link to={study.href} className="cs-card__link">
                      <span>Read the case study</span>
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </Link>
                  ) : (
                    <a href="#" className="cs-card__link">
                      <span>Read the case study</span>
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
