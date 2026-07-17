import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import architectureDiagram from "../assets/technology-trends/ai-architecture-diagram.png";
import checkIcon from "../assets/technology-trends/check-icon.svg";
import downloadIcon from "../assets/technology-trends/download-device-icon.svg";
import "./TechnologyTrends.css";

type Horizon = {
  tag: string;
  titleLines: [string, string];
  descriptionLines: [string, string];
  patterns: string[];
};

type TrendCard = {
  label: string;
  text: string;
};

const horizons: Horizon[] = [
  {
    tag: "H3",
    titleLines: ["Multimodal,", "multitasking learning"],
    descriptionLines: ["Intelligent systems, Self-", "supervised"],
    patterns: [
      "AgentOps, multiagent orchestration",
      "Personalized over learning",
      "Embodied AI",
      "Human-robot collaboration",
      "Simulation-trained agents",
      "Digital-twin/physics simulation",
      "Comprehensive AI assurance",
      "Contextual, empathetic, multimodal collaborators",
      "Immersive (XR) interfaces",
    ],
  },
  {
    tag: "H2",
    titleLines: ["Transfer learning,", "responsible AI"],
    descriptionLines: ["Next-wave evolution, Less", "data, explainable systems"],
    patterns: [
      "LLMOps, agentic orchestration",
      "Multimodal understanding/generation",
      "Efficient transformer variants (MoE)",
      "Agentic LLM systems",
      "Scalable SLM systems",
      "Multiagent workflows",
      "Programmable guardrails",
      "Proactive AI assurance",
      "Copilot-style assistants",
      "Prompt/RAG workflows",
    ],
  },
  {
    tag: "H3",
    titleLines: ["Conventional AI and", "data science"],
    descriptionLines: ["Core foundations,", "Augmenting intelligence"],
    patterns: [
      "MLOps platforms",
      "GPU/accelerator clusters",
      "Transformer-based architectures",
      "Classical computer vision/natural language processing",
      "Goal-directed automation",
      "Scripted agents",
      "Responsible AI governance",
      "Model monitoring",
      "Productivity automations",
    ],
  },
];

const trendTabs = [
  "AI cloud",
  "AI models and engineering",
  "Agentic AI",
  "AI assurance",
  "AI applications",
] as const;

const trendsByTab: Record<(typeof trendTabs)[number], TrendCard[]> = {
  "AI cloud": [
    {
      label: "Trend 1",
      text: "AI platforms become smarter, specialized, and multimodal",
    },
    {
      label: "Trend 2",
      text: "Autonomous, agentic AI platforms reshape enterprise operations",
    },
    {
      label: "Trend 3",
      text: "GPU-as-service emerges as the new infrastructure model",
    },
    {
      label: "Trend 4",
      text: "Alternate hardware drives cost-efficient AI inference",
    },
    {
      label: "Trend 5",
      text: "Smaller language models gain relevance",
    },
  ],
  "AI models and engineering": [
    {
      label: "Trend 1",
      text: "Foundation models evolve toward domain-specialized architectures",
    },
    {
      label: "Trend 2",
      text: "Efficient fine-tuning and evaluation become core engineering practices",
    },
    {
      label: "Trend 3",
      text: "Retrieval-augmented pipelines standardize enterprise AI delivery",
    },
    {
      label: "Trend 4",
      text: "Model ops expands into continuous assurance and observability",
    },
    {
      label: "Trend 5",
      text: "Open and proprietary model ecosystems coexist in hybrid stacks",
    },
  ],
  "Agentic AI": [
    {
      label: "Trend 1",
      text: "Multiagent orchestration moves from pilots to production",
    },
    {
      label: "Trend 2",
      text: "Tool-using agents automate complex cross-system workflows",
    },
    {
      label: "Trend 3",
      text: "Memory and planning layers improve long-horizon reliability",
    },
    {
      label: "Trend 4",
      text: "Human-in-the-loop controls remain essential for high-stakes tasks",
    },
    {
      label: "Trend 5",
      text: "Agent marketplaces emerge for reusable enterprise capabilities",
    },
  ],
  "AI assurance": [
    {
      label: "Trend 1",
      text: "Responsible AI shifts from policy to measurable controls",
    },
    {
      label: "Trend 2",
      text: "Programmable guardrails become standard deployment layers",
    },
    {
      label: "Trend 3",
      text: "Continuous model monitoring detects drift and misuse early",
    },
    {
      label: "Trend 4",
      text: "Explainability requirements expand across regulated industries",
    },
    {
      label: "Trend 5",
      text: "Assurance tooling integrates directly into MLOps pipelines",
    },
  ],
  "AI applications": [
    {
      label: "Trend 1",
      text: "Copilot experiences become embedded across business software",
    },
    {
      label: "Trend 2",
      text: "Industry solutions prioritize measurable workflow outcomes",
    },
    {
      label: "Trend 3",
      text: "Multimodal interfaces reshape customer and employee journeys",
    },
    {
      label: "Trend 4",
      text: "AI-native products replace bolt-on feature strategies",
    },
    {
      label: "Trend 5",
      text: "Domain copilots accelerate specialist productivity at scale",
    },
  ],
};

export default function TechnologyTrends() {
  const [activeTab, setActiveTab] =
    useState<(typeof trendTabs)[number]>("AI cloud");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tt-page">
      <section className="tt-hero" aria-label="Artificial Intelligence">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="tt-hero__map"
        />
        <div className="tt-hero__content">
          <h1 className="tt-hero__title">Artificial Intelligence</h1>
          <p className="tt-hero__subtitle">
            Artificial intelligence (AI) is accelerating through transformative
            breakthroughs in agentic systems, multimodal processing, and frontier
            cognitive architectures — innovations that are reshaping the
            enterprise landscape as we know it. What began as a promising
            experiment has now matured into demonstrable business impact.
          </p>
          <Link to="/contact" className="tt-hero__btn">
            Contact Us
            <span className="tt-hero__btn-icon" aria-hidden>
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      <div className="tt-container">
        <nav className="tt-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="tt-breadcrumbs__sep" aria-hidden>
            »
          </span>
          <Link to="/technologies">Technology Trends</Link>
          <span className="tt-breadcrumbs__sep" aria-hidden>
            »
          </span>
          <span className="tt-breadcrumbs__current">Artificial Intelligence</span>
        </nav>

        <section className="tt-intro" aria-label="Enterprise AI architecture">
          <h2 className="tt-intro__title">
            Enterprise AI architecture and technology: Designing the autonomous
            future
          </h2>
          <div className="tt-intro__visual">
            <img
              src={architectureDiagram}
              alt="Explore our expertise across AI and related technology domains"
            />
            <span className="tt-intro__label">On Premise</span>
          </div>
        </section>

        <section className="tt-horizons" aria-label="Market dynamics">
          <h2 className="tt-horizons__heading">
            Market dynamics across the three horizons
          </h2>
          <div className="tt-horizons__grid">
            {horizons.map((horizon) => (
              <article key={horizon.tag + horizon.titleLines[0]} className="tt-horizon-card">
                <div className="tt-horizon-card__banner">
                  <div className="tt-horizon-card__banner-top">
                    <p className="tt-horizon-card__tag">{horizon.tag}</p>
                    <h3 className="tt-horizon-card__title">
                      {horizon.titleLines[0]}
                      <br />
                      {horizon.titleLines[1]}
                    </h3>
                  </div>
                  <p className="tt-horizon-card__desc">
                    {horizon.descriptionLines[0]}
                    <br />
                    {horizon.descriptionLines[1]}
                  </p>
                </div>
                <div>
                  <h4 className="tt-horizon-card__patterns-title">Key Patterns</h4>
                  <ul className="tt-horizon-card__list">
                    {horizon.patterns.map((pattern) => (
                      <li key={pattern}>
                        <img src={checkIcon} alt="" aria-hidden />
                        <span>{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="tt-trends" aria-label="Key trends across AI subdomains">
        <div className="tt-container">
          <h2 className="tt-trends__title">Key trends across AI subdomains</h2>
          <div className="tt-trends__layout">
            <div className="tt-trends__tabs" role="tablist" aria-label="AI subdomains">
              {trendTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`tt-trends__tab${activeTab === tab ? " is-active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tt-trends__panel" role="tabpanel">
              <div className="tt-trends__cards">
                {trendsByTab[activeTab].map((card) => (
                  <article key={card.label} className="tt-trend-card">
                    <div className="tt-trend-card__header">{card.label}</div>
                    <p className="tt-trend-card__body">{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <a href="#" className="tt-trends__download">
            Download Insights
            <span className="tt-trends__download-icon" aria-hidden>
              <img src={downloadIcon} alt="" />
            </span>
          </a>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
