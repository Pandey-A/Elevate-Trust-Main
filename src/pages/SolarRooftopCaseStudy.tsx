import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import architectureImg from "../assets/case-studies/cs-solar.png";
import clientBgImg from "../assets/case-studies/rfp/rfp-client-bg.png";
import challengeImg from "../assets/case-studies/rfp/rfp-challenge.png";
import solutionImg from "../assets/case-studies/rfp/rfp-solution.png";
import outcomeImg from "../assets/case-studies/rfp/rfp-outcome.png";
import "./CaseStudyDetail.css";

const techStack = [
  "U-Net",
  "CNN",
  "Satellite Imagery",
  "GIS",
  "Python",
  "Deep Learning",
];

const detailCards = [
  {
    title: "Client Background",
    text: "The client is a New Zealand-based clean energy advisory firm seeking to accelerate residential solar adoption. They needed an automated geospatial intelligence system to identify rooftops suitable for solar panel installation across entire cities, without relying on expensive manual surveys or ground-level inspections.",
    image: clientBgImg,
    variant: "light" as const,
  },
  {
    title: "Business Challenge",
    text: "Manual identification of solar-suitable rooftops from aerial imagery was unscalable. Surveyors could assess only hundreds of properties per week. Inconsistent evaluations and high labour costs made city-scale mapping commercially unviable. There was an urgent need for an automated, high-accuracy pipeline capable of processing thousands of satellite images rapidly and reliably.",
    image: challengeImg,
    variant: "blue" as const,
  },
  {
    title: "Solution Overview",
    text: "ElevateTrust built a deep learning semantic segmentation pipeline using a CNN-based U-Net architecture trained on labelled satellite imagery. The model produces binarised roof masks, applies post-processing morphological operations to remove noise and small artefacts, and then overlays detected rooftops onto the source image. The inference engine integrates with Google Maps imagery APIs and outputs GIS-compatible data for downstream solar feasibility scoring, fully automated end-to-end.",
    image: solutionImg,
    variant: "blue" as const,
  },
  {
    title: "Business Outcome",
    text: "Achieved 91%+ IoU accuracy across diverse residential geographies. Reduced rooftop survey effort by over 85%, enabling the client to map solar potential for 50,000+ properties in under 48 hours. The solution is embedded in the client's solar lead generation platform, directly accelerating customer acquisition and clean energy deployment at scale.",
    image: outcomeImg,
    variant: "light" as const,
  },
];

export default function SolarRooftopCaseStudy() {
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
            Solar Rooftop Detection with Deep Learning
          </h1>
          <p className="csd-hero__subtitle">
            How ElevateTrust.AI helped a New Zealand clean energy firm map
            solar-ready rooftops city-wide with 91%+ IoU accuracy and cut survey
            effort by over 85%.
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
        <span>Solar Rooftop Detection</span>
      </nav>

      <section className="csd-main">
        <div className="csd-main__decor" aria-hidden="true">
          <img src={partnerGlobe} alt="" className="csd-main__decor-globe" />
        </div>

        <div className="csd-main__inner">
          <div className="csd-intro">
            <div className="csd-intro__left">
              <h2 className="csd-intro__title">
                Solar Rooftop Detection using Satellite Imagery &amp; Deep
                Learning Segmentation
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
                alt="Satellite rooftop segmentation with red overlays and binary mask outputs"
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
