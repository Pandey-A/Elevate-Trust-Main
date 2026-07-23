import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import architectureImg from "../assets/case-studies/cs-vendor-fraud.png";
import clientBgImg from "../assets/case-studies/rfp/rfp-client-bg.png";
import challengeImg from "../assets/case-studies/rfp/rfp-challenge.png";
import solutionImg from "../assets/case-studies/rfp/rfp-solution.png";
import outcomeImg from "../assets/case-studies/rfp/rfp-outcome.png";
import "./CaseStudyDetail.css";

const techStack = [
  "CNN",
  "Video Analytics",
  "3D Depth",
  "CCTV",
  "Python",
  "AI ML",
];

const detailCards = [
  {
    title: "Client Background",
    text: "The client is a large-scale construction and infrastructure company managing multi-site projects across India. They procure high volumes of raw materials (sand, gravel, cement, and steel) from multiple vendors daily. Material deliveries were tracked manually by on-site supervisors, creating significant visibility gaps in quantity verification across hundreds of active delivery points.",
    image: clientBgImg,
    variant: "light" as const,
  },
  {
    title: "Business Challenge",
    text: "Vendors were systematically delivering less material than invoiced, sending 6-7 tonnes while billing for 10, and exploiting the absence of automated measurement systems. Manual weight slips were easily manipulated and supervisors could not physically verify every truck load. This vendor fraud was causing significant revenue leakage running into crores annually, with no audit trail or evidence to dispute fraudulent claims.",
    image: challengeImg,
    variant: "blue" as const,
  },
  {
    title: "Solution Overview",
    text: "ElevateTrust developed an AI video analytics system using CCTV cameras at delivery points to automatically measure material volume in real time. CNN-based models combined with 3D point cloud depth analysis estimate the actual quantity in each truck load. The system compares AI-measured quantities against vendor-declared amounts, flags discrepancies instantly, and captures timestamped video evidence.",
    image: solutionImg,
    variant: "blue" as const,
  },
  {
    title: "Business Outcome",
    text: "Vendor material fraud was reduced by over 90% within the first quarter of deployment. 100% of deliveries are now auto-verified without manual intervention. The client recovered significant overcharged amounts by presenting AI-generated evidence to vendors. The solution scaled across 15+ sites and was further commercialized as a SaaS offering to other construction firms facing the same challenge.",
    image: outcomeImg,
    variant: "light" as const,
  },
];

export default function VendorFraudCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="csd-page">
      <section className="csd-hero">
        <img
          src={worldMapBackground}
          alt=""
          className="csd-hero__bg"
          aria-hidden="true"
        />
        <div className="csd-hero__content">
          <p className="csd-hero__eyebrow">Case Study</p>
          <h1 className="csd-hero__title">
            Vendor Material Fraud Detection
          </h1>
          <p className="csd-hero__subtitle">
            How ElevateTrust.AI helped a multi-site construction firm auto-verify
            truck deliveries with AI volume measurement, cut material fraud by
            over 90%, and scale the solution as SaaS.
          </p>
          <Link to="/contact" className="csd-hero__btn">
            <span>Contact Us</span>
            <span className="csd-hero__btn-circle">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      <nav className="csd-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="csd-breadcrumbs__sep" aria-hidden="true">
          »
        </span>
        <Link to="/case-studies">Case Studies</Link>
        <span className="csd-breadcrumbs__sep" aria-hidden="true">
          »
        </span>
        <span>Vendor Fraud Detection</span>
      </nav>

      <section className="csd-main">
        <div className="csd-main__decor" aria-hidden="true">
          <img src={partnerGlobe} alt="" className="csd-main__decor-globe" />
        </div>

        <div className="csd-main__inner">
          <div className="csd-intro">
            <div className="csd-intro__left">
              <h2 className="csd-intro__title">
                Vendor Material Fraud Detection using AI Video Analytics in the
                Construction Industry
              </h2>

              <div className="csd-tech">
                <h3 className="csd-tech__heading">Technology/Tools Used</h3>
                <ul className="csd-tech__list">
                  {techStack.map((tool) => (
                    <li key={tool} className="csd-tech__tag">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="csd-intro__diagram">
              <img
                src={architectureImg}
                alt="AI-powered vendor fraud detection pipeline comparing claimed versus measured truck material volume"
              />
            </div>
          </div>

          <div className="csd-cards">
            {detailCards.map((card) => (
              <article
                key={card.title}
                className={`csd-card csd-card--${card.variant}`}
              >
                <div className="csd-card__content">
                  <h3 className="csd-card__title">{card.title}</h3>
                  <p className="csd-card__text">{card.text}</p>
                </div>
                <img
                  src={card.image}
                  alt=""
                  className="csd-card__illust"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
