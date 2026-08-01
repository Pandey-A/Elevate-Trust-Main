import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import architectureImg from "../assets/case-studies/cs-talent.png";
import clientBgImg from "../assets/case-studies/rfp/rfp-client-bg.png";
import challengeImg from "../assets/case-studies/rfp/rfp-challenge.png";
import solutionImg from "../assets/case-studies/rfp/rfp-solution.png";
import outcomeImg from "../assets/case-studies/rfp/rfp-outcome.png";
import "./CaseStudyDetail.css";

const techStack = [
  "Python",
  "Generative AI",
  "Agentic AI",
  "Vector DB",
  "NLP",
  "Open AI",
];

const detailCards = [
  {
    title: "Client Background",
    text: "The client is a leading global HR Tech provider specializing in Applicant Tracking Systems (ATS), talent management, and recruitment intelligence. Their vision is to establish a multi-tenant, AI-powered framework to facilitate smarter, more efficient hiring processes.",
    image: clientBgImg,
    variant: "light" as const,
  },
  {
    title: "Business Challenge",
    text: "The client faced significant operational bottlenecks due to manual CV screening and slow hiring cycles, resulting in inconsistent candidate evaluations. There was a critical need for a scalable, multi-tenant solution that prioritized transparency, explainability, and data privacy to maintain trust in the hiring process.",
    image: challengeImg,
    variant: "blue" as const,
  },
  {
    title: "Solution Overview",
    text: "The engagement followed a four-phase execution strategy, starting with foundational AI/NLP matching and progressing to an intelligent scoring engine with real-time recalculation. The tech stack leveraged Generative AI and agentic orchestration to enable internal talent rediscovery and human-readable AI explanations within the existing ATS. This solution enables hiring managers to change the criteria in real time and get the updated matching candidates.",
    image: solutionImg,
    variant: "blue" as const,
  },
  {
    title: "Business Outcome",
    text: "The implementation resulted in faster hiring decisions, improved evaluation consistency, and enhanced trust through explainable AI and ethical design. The customer was able to sell the solution to 20 new customers in the quarter.",
    image: outcomeImg,
    variant: "light" as const,
  },
];

export default function TalentMatchingCaseStudy() {
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
            Talent Matching Automation using Agentic AI
          </h1>
          <p className="csd-hero__subtitle">
            How ElevateTrust.AI helped a global HR Tech provider automate CV
            screening, deliver explainable candidate matches, and enable
            real-time criteria-driven hiring inside their existing ATS.
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
          <span>Talent Matching Automation</span>
        </nav>
      </div>

      <section className="csd-main">
        <div className="csd-main__decor" aria-hidden="true">
          <img
            src={partnerGlobe}
            alt=""
            className="csd-main__decor-globe"
          />
        </div>

        <div className="csd-main__inner">
          <div className="csd-intro">
            <div className="csd-intro__left">
              <h2 className="csd-intro__title">
                Talent Matching automation using Agentic AI in the HR Tech
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
                alt="Agentic AI talent matching workflow from resume parsing and vector search to explainable matching, reranking, and personalized outreach"
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
