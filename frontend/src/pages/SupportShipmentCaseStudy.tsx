import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import architectureImg from "../assets/case-studies/cs-support-shipment.png";
import clientBgImg from "../assets/case-studies/rfp/rfp-client-bg.png";
import challengeImg from "../assets/case-studies/rfp/rfp-challenge.png";
import solutionImg from "../assets/case-studies/rfp/rfp-solution.png";
import outcomeImg from "../assets/case-studies/rfp/rfp-outcome.png";
import "./CaseStudyDetail.css";

const techStack = [
  "Agentic AI",
  "Generative AI",
  "WhatsApp",
  "CRM",
  "Python",
  "Open AI",
];

const detailCards = [
  {
    title: "Client Background",
    text: "The client is a logistics and shipping enterprise that manages complex global supply chains. They provide end-to-end shipment tracking and coordination services, focusing on high-volume distribution for international commerce and industrial sectors.",
    image: clientBgImg,
    variant: "light" as const,
  },
  {
    title: "Business Challenge",
    text: "The shipping industry often struggles with fragmented visibility across multiple carriers and legacy tracking systems, leading to delayed updates and manual overhead. There was a critical need for an automated, unified system that could monitor thousands of shipments in real time, detect potential delays early, and reduce the administrative burden on logistics coordinators.",
    image: challengeImg,
    variant: "blue" as const,
  },
  {
    title: "Solution Overview",
    text: "The solution features an agentic AI framework designed to orchestrate and automate shipment tracking across diverse carrier platforms. By integrating real-time data feeds with predictive modeling, the system identifies transit risks and automatically triggers notifications for stakeholders. A centralized dashboard provides an intelligent overview of the entire shipping pipeline, allowing teams to manage exceptions rather than manually monitoring every movement.",
    image: solutionImg,
    variant: "blue" as const,
  },
  {
    title: "Business Outcome",
    text: "The implementation has significantly reduced the time spent on manual tracking and increased the accuracy of delivery estimates. By automating proactive status updates and risk assessments, the client has minimized transit disruptions, improved carrier accountability, and enhanced overall customer satisfaction through superior transparency and reliability.",
    image: outcomeImg,
    variant: "light" as const,
  },
];

export default function SupportShipmentCaseStudy() {
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
            Customer Support Automation in Shipment
          </h1>
          <p className="csd-hero__subtitle">
            How ElevateTrust.AI helped a logistics enterprise automate shipment
            tracking, surface transit risks early, and keep customers informed
            through an agentic AI support framework.
          </p>
          <Link to="/contact" className="csd-hero__btn">
            <span>Contact Us</span>
            <span className="csd-hero__btn-circle">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      <div className="page-breadcrumb-wrap">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link
            to="/"
            className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
          >
            Home
          </Link>
          <span className="text-[#848b9b]">»</span>
          <span>Resources</span>
          <span className="text-[#848b9b]">»</span>
          <Link
            to="/case-studies"
            className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
          >
            Case Studies
          </Link>
          <span className="text-[#848b9b]">»</span>
          <span>Shipment Support Automation</span>
        </nav>
      </div>

      <section className="csd-main">
        <div className="csd-main__decor" aria-hidden="true">
          <img src={partnerGlobe} alt="" className="csd-main__decor-globe" />
        </div>

        <div className="csd-main__inner">
          <div className="csd-intro">
            <div className="csd-intro__left">
              <h2 className="csd-intro__title">
                Customer Support Automation using Agentic AI in the Shipment
                Industry
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
                alt="Agentic AI shipment support architecture with WhatsApp copilot, CRM updates, and human escalation"
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
