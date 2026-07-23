import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import architectureImg from "../assets/case-studies/cs-predictive-1.png";
import clientBgImg from "../assets/case-studies/rfp/rfp-client-bg.png";
import challengeImg from "../assets/case-studies/rfp/rfp-challenge.png";
import solutionImg from "../assets/case-studies/rfp/rfp-solution.png";
import outcomeImg from "../assets/case-studies/rfp/rfp-outcome.png";
import "./CaseStudyDetail.css";

const techStack = [
  "IoT",
  "Edge AI",
  "STM32",
  "Sensors",
  "Python",
  "AI ML",
];

const detailCards = [
  {
    title: "Client Background",
    text: "The client is a well-established UK-based company which aims to provide a modular, sensor-based, edge AI solution for remote asset monitoring in offshore and harsh environments. They are building the IoT-based solution for oil industry customers.",
    image: clientBgImg,
    variant: "light" as const,
  },
  {
    title: "Business Challenge",
    text: "In the oil industry, undetected leaks and equipment malfunctions cause a shift from proactive to reactive maintenance, resulting in massive revenue losses from unplanned downtime and escalating repair costs. Beyond the financial impact, these silent failures lead to severe environmental liabilities, safety hazards, and the erosion of investor confidence due to poor ESG performance.",
    image: challengeImg,
    variant: "blue" as const,
  },
  {
    title: "Solution Overview",
    text: "The solution leverages a specialized AI and IoT framework for real-time anomaly detection, using high-precision sensor integrations to capture early signs of leakages and machine malfunctions. Predictive monitoring with automated alerting flags subtle deviations before they escalate, a centralized command dashboard unifies asset health for technical teams, field engineers receive mobile notifications to update repair status in real time, and automated diagnostic reports refine detection accuracy after each incident.",
    image: solutionImg,
    variant: "blue" as const,
  },
  {
    title: "Business Outcome",
    text: "By implementing real-time AI anomaly detection, the system eliminates unplanned downtime and prevents costly secondary equipment damage. This proactive approach significantly reduces environmental liability and operational risk, ensuring high-performance asset longevity and regulatory compliance.",
    image: outcomeImg,
    variant: "light" as const,
  },
];

export default function PredictiveMaintenanceCaseStudy() {
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
            Predictive Maintenance with IoT &amp; Edge AI
          </h1>
          <p className="csd-hero__subtitle">
            How ElevateTrust.AI helped a UK oil-industry IoT provider detect
            leaks and equipment anomalies early, cut unplanned downtime, and
            strengthen safety and ESG performance.
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
        <span>Predictive Maintenance</span>
      </nav>

      <section className="csd-main">
        <div className="csd-main__decor" aria-hidden="true">
          <img src={partnerGlobe} alt="" className="csd-main__decor-globe" />
        </div>

        <div className="csd-main__inner">
          <div className="csd-intro">
            <div className="csd-intro__left">
              <h2 className="csd-intro__title">
                Predictive maintenance using IoT devices and sensors for the oil
                industry
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
                alt="IoT anomaly detection flow from oil industry sensors and STM32 edge AI to mobile alerts"
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
