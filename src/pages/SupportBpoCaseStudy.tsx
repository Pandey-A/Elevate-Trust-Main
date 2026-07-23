import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import architectureImg from "../assets/case-studies/cs-support-bpo.png";
import clientBgImg from "../assets/case-studies/rfp/rfp-client-bg.png";
import challengeImg from "../assets/case-studies/rfp/rfp-challenge.png";
import solutionImg from "../assets/case-studies/rfp/rfp-solution.png";
import outcomeImg from "../assets/case-studies/rfp/rfp-outcome.png";
import "./CaseStudyDetail.css";

const techStack = [
  "Agentic AI",
  "Generative AI",
  "Kubernetes",
  "Live Chat",
  "Python",
  "Open AI",
];

const detailCards = [
  {
    title: "Client Background",
    text: "The client is a customer support company currently providing dialog-flow based bot solutions paired with human agents. They are focused on fast-tracking day-to-day activities for large-scale customer support teams and require a solution to drastically reduce response and ticket closing times.",
    image: clientBgImg,
    variant: "light" as const,
  },
  {
    title: "Business Challenge",
    text: "Support agents were struggling with high response times due to the difficulty of locating information across numerous tools and sources. This reliance on manual human effort made it increasingly hard to handle large volumes of customer support traffic efficiently.",
    image: challengeImg,
    variant: "blue" as const,
  },
  {
    title: "Solution Overview",
    text: "An agentic-based generative AI solution was built to reduce manual content searching and integrate past successful solutions for agent recommendations. The system offers deep customization for organization-specific workflows and utilizes a Kubernetes-based deployment to ensure the solution scales effectively with demand.",
    image: solutionImg,
    variant: "blue" as const,
  },
  {
    title: "Business Outcome",
    text: "The implementation achieved a 90% reduction in first response time and a 50% reduction in final response time while providing 24/7 assistance. By putting product and policy knowledge at their fingertips, the L1 team is empowered to quickly review and send ready-made responses, significantly optimizing the support workflow.",
    image: outcomeImg,
    variant: "light" as const,
  },
];

export default function SupportBpoCaseStudy() {
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
            Customer Support Automation for BPO
          </h1>
          <p className="csd-hero__subtitle">
            How ElevateTrust.AI helped a BPO support provider cut first response
            time by 90%, empower L1 agents with ready-made answers, and scale
            agentic AI across high-volume conversations.
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
        <span>BPO Support Automation</span>
      </nav>

      <section className="csd-main">
        <div className="csd-main__decor" aria-hidden="true">
          <img src={partnerGlobe} alt="" className="csd-main__decor-globe" />
        </div>

        <div className="csd-main__inner">
          <div className="csd-intro">
            <div className="csd-intro__left">
              <h2 className="csd-intro__title">
                Customer Support Automation using Agentic AI in the BPO Industry
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
                alt="BPO agentic AI support architecture with live analytics, AI agents, and human escalation"
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
