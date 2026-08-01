import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import dataAgentIcon from "../assets/OurServices/GenAI-Data.png";
import softwareAgentIcon from "../assets/OurServices/GenAI-Software.png";
import optimizeAgentIcon from "../assets/OurServices/GenAI-Optimize.png";
import customerServiceIcon from "../assets/OurServices/GenAI-customService.png";
import healthcareAgentIcon from "../assets/OurServices/GenAI-healthcare.png";
import hrAgentIcon from "../assets/OurServices/GenAI-HR.png";
import knowledgeAgentIcon from "../assets/OurServices/GenAI-knowledge.png";
import financeAgentIcon from "../assets/OurServices/GenAI-Finance.png";
import roadmapImage from "../assets/OurServices/roadmap-light.png";
import llmAgentsImage from "../assets/OurServices/llm-agents-light.png";
import techStackImage from "../assets/OurServices/techstack-light.png";
import elevateIcon from "../assets/service/AI-process/elevateIcon.svg";
import checkIcon from "../assets/technology-trends/check-icon.svg";
import virtualAgentImage from "../assets/OurServices/virtual-assistant.png";
import genAiSdlcCaseImage from "../assets/case-studies/c7-1.png";

const coreOfferings = [
  {
    title: "Autonomous data analytics agent",
    description:
      "Deploy goal-driven agents that plan, query, and synthesize insights from raw datasets reducing analysis cycles from days to minutes.",
    icon: dataAgentIcon,
  },
  {
    title: "Agentic software development co-pilot",
    description:
      "Multi-step coding agents that plan features, write code, run tests, and open pull requests with minimal human intervention.",
    icon: softwareAgentIcon,
  },
  {
    title: "Proactive maintenance agent",
    description:
      "Agents that reason over sensor and operational data, autonomously prioritize work orders, and trigger preventive actions before failures occur.",
    icon: optimizeAgentIcon,
  },
  {
    title: "Agentic customer service",
    description:
      "Orchestrated agents that retrieve knowledge, draft responses, escalate intelligently, and close tickets end-to-end across channels.",
    icon: customerServiceIcon,
  },
  {
    title: "Healthcare agentic co-pilots",
    description:
      "Clinical documentation and audit agents with human-in-the-loop controls, reducing manual review effort while maintaining compliance.",
    icon: healthcareAgentIcon,
  },
  {
    title: "HR & training agents",
    description:
      "Onboarding and policy agents that reason over internal knowledge bases, personalize learning paths, and answer role-specific questions.",
    icon: hrAgentIcon,
  },
  {
    title: "Knowledge orchestration agents",
    description:
      "Retrieval-augmented agents that route queries, synthesize multi-source answers, and keep knowledge current with automatic refresh cycles.",
    icon: knowledgeAgentIcon,
  },
  {
    title: "Financial services agents",
    description:
      "Compliant agentic assistants for research, regulatory reporting, and customer-facing workflows that require multi-step reasoning and audit trails.",
    icon: financeAgentIcon,
  },
];

const valueAdded = [
  "Delivered an autonomous data analytics agent for a data backup & storage company, compressing product analytics cycles that previously took days into minutes.",
  "Built a custom agentic framework for customer support orchestration, enabling rapid deployment of new domain agents without rebuilding from scratch.",
  "Deployed an on-premise agentic knowledge retrieval system for a gaming company, reducing repeated support tickets from 40% to 10%.",
  "Delivered an agentic sales training voice bot for an EdTech company, enabling reps to practice complex scenarios and ramp up 80% faster.",
];

const consultingPoints = [
  "Agentic use case identification and feasibility evaluation",
  "Agent architecture design single-agent, multi-agent, and hierarchical",
  "Tool integration, memory, and human-in-the-loop planning",
  "Governance, observability, and production deployment strategy",
];

const successStories = [
  {
    id: "customer-support",
    label: "Customer Support AI Agent",
    about: [
      "Customer support company building large-scale agent platforms.",
      "Needed to cut response time and reduce ticket-closing cycles.",
      "Required a solution that scales across new support domains quickly.",
    ],
    situation: [
      "Agents manually searched multiple tools and knowledge sources.",
      "High response time driven by slow, fragmented information discovery.",
      "Heavy manual effort to assemble accurate responses under load.",
    ],
    solution: [
      "Built an agentic orchestration layer for end-to-end support workflows.",
      "Agents retrieve, reason, and draft responses with minimal human touch.",
      "Customizable to org-specific processes with Kubernetes-based scale.",
    ],
    results: [
      "90% reduction in first response time",
      "50% reduction in final response time",
      "24/7 L1 assistant with ready-to-send draft responses",
    ],
  },
  {
    id: "product-assistant",
    label: "Product Assistant AI Agent",
    about: [
      "EdTech product company serving universities and enterprises.",
      "Needed to reduce onboarding friction and new-product hand-holding.",
      "Aimed to deliver self-serve product expertise at scale.",
    ],
    situation: [
      "New users required significant guidance to use the product efficiently.",
      "Manual training was expensive and delivered inconsistent experiences.",
      "Large volumes of docs and FAQs made self-serve onboarding difficult.",
    ],
    solution: [
      "Built an agentic product assistant grounded in the knowledge base.",
      "Agent reasons over multi-step queries and resolves issues in real time.",
      "Scalable Kubernetes deployment with workflow customization per role.",
    ],
    results: [
      "Real-time query resolution without raising tickets",
      "50% reduction in user onboarding time",
      "24/7 agentic assistant improving product outcomes continuously",
    ],
  },
  {
    id: "sales-rep",
    label: "Sales Rep AI Agent",
    about: [
      "AI-based LMS company working with large-scale eLearning providers.",
      "Needed to fast-track new sales rep onboarding and product fluency.",
    ],
    situation: [
      "New sales reps needed 1–2 months to understand products and services.",
      "Information discovery during live customer calls was slow and manual.",
      "Heavy dependency on Product and Tech teams for accurate answers.",
    ],
    solution: [
      "Built an agentic sales assistant with real-time retrieval and reasoning.",
      "Agents surface relevant data points autonomously during live calls.",
      "Reduced dependency on Product/Tech while scaling on Kubernetes.",
    ],
    results: [
      "80% reduction in sales rep ramp-up time",
      "98% reduction in information access time during calls",
      "50% reduction in Tech/Product hours on sales calls",
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare AI Agent",
    about: [
      "Healthtech company serving hospitals and auditor authorities.",
      "Needed agentic audit report creation to cut documentation effort by ~80%.",
    ],
    situation: [
      "Existing Gen AI + RAG prototypes had accuracy and trust limitations.",
      "Manual human reviews still added substantial effort and delay.",
      "Hard to build confidence around fully automated documentation agents.",
    ],
    solution: [
      "Built an agentic solution with human-in-the-loop review gates.",
      "Agents draft, validate, and flag anomalies; humans make final submissions.",
      "Feedback-loop learning improves agent accuracy over time at scale.",
    ],
    results: [
      "Significant reduction in manual review effort",
      "Improved platform trust through auditable agent decisions",
      "Personalized auditor support via continuous feedback learning",
    ],
  },
] as const;

export default function GenerativeAI() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      {/* Hero */}
      <section className="service-page-hero" aria-label="Agentic AI">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content">
          <h1 className="m-0 text-[clamp(28px,3.8vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            Agentic AI Solutions That Reason, Act, and Deliver Business Outcomes
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            From early retrieval-augmented prototypes to fully autonomous multi-agent
            systems, we design and deploy agentic AI that plans, reasons over tools,
            and executes multi-step workflows with the right human-in-the-loop
            controls built in from the start.
          </p>
          <Link
            to="/contact"
            className="mt-[clamp(16px,2vw,28px)] inline-flex items-center gap-1.5 rounded-full bg-[#2365aa] py-3 pl-[26px] pr-3.5 text-base font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490] lg:py-2.5 lg:pl-[22px] lg:pr-2.5 lg:text-sm 2xl:py-3 2xl:pl-[26px] 2xl:pr-3.5 2xl:text-base"
          >
            Contact Us
            <span className="inline-flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white text-[#2365aa]">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      {/* Breadcrumbs + Core Offerings */}
      <section className="w-full bg-white">
        <div className="page-breadcrumb-wrap">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link
              to="/"
              className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
            >
              Home
            </Link>
            <span className="text-[#848b9b]">»</span>
            <Link
              to="/Services/ai-ml"
              className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
            >
              Our Services
            </Link>
            <span className="text-[#848b9b]">»</span>
            <span>Agentic AI</span>
          </nav>
        </div>

        <div className="mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] pt-0 sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(32px,4vw,56px)] max-w-[52rem] text-center">
            <h2 className="m-0 text-[clamp(28px,4vw,56px)] font-bold leading-[1.15] text-[#1F2432]">
              Agentic AI
              <br />
              Core Offerings
            </h2>
            <p className="mx-auto mt-5 max-w-[48rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] sm:mt-6 2xl:text-[18px] 2xl:leading-8">
              Purpose-built agents that plan, use tools, and execute multi-step
              workflows  delivering measurable outcomes across analytics,
              engineering, support, healthcare, HR, knowledge, and finance.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {coreOfferings.map((item) => (
              <article key={item.title} className="flex min-w-0 flex-col">
                <img
                  src={item.icon}
                  alt=""
                  className="mb-5 h-auto w-full rounded-[20px] object-cover sm:mb-6"
                  aria-hidden
                />
                <h3 className="text-[clamp(16px,1.3vw,20px)] font-bold leading-snug text-[#1F2432] 2xl:text-[22px]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[clamp(12px,1.1vw,14px)] leading-6 text-[#9CA3AF] sm:mt-4 2xl:text-[18px] 2xl:leading-8">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting + Roadmap */}
      <section className="w-full bg-[#EFF7FC]">
        <div className="mx-auto grid w-full max-w-[1692px] grid-cols-1 items-center gap-[clamp(28px,4vw,56px)] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-10 xl:px-12">
          <div>
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Agentic AI Strategy &amp; Architecture Consulting
            </h2>
            <p className="mt-5 max-w-[46rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#848b9b] sm:mt-6 2xl:text-[18px] 2xl:leading-8">
              We help you move from idea to production-ready agentic systems
              identifying the right use cases, designing agent architectures,
              selecting orchestration frameworks, and building the governance
              controls needed to trust autonomous AI in your workflows.
            </p>
            <ul className="mt-6 flex list-none flex-col gap-3.5 p-0 sm:mt-8">
              {consultingPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[clamp(14px,1.2vw,18px)] font-medium leading-[1.5] text-[#5a5a5a] 2xl:text-[20px]"
                >
                  <img
                    src={checkIcon}
                    alt=""
                    aria-hidden
                    className="mt-[0.4em] h-3 w-3 shrink-0"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-white p-4 shadow-[0_18px_50px_-24px_rgba(17,61,119,0.35)] sm:rounded-[24px] sm:p-6 lg:p-7">
            <img
              src={roadmapImage}
              alt="Agentic AI roadmap from classical NLP to autonomous multi-agent systems"
              className="mx-auto block h-auto w-full max-w-[520px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Value Added */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-start gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                Value Added
              </h2>
              <p className="mt-4 max-w-[34rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] 2xl:text-[18px] 2xl:leading-8">
                Proven agentic AI deliveries across analytics, support, knowledge
                retrieval, and sales enablement.
              </p>
              <div className="mt-8 hidden justify-center lg:mt-12 lg:flex">
                <img
                  src={virtualAgentImage}
                  alt=""
                  aria-hidden
                  className="h-auto w-full max-w-[220px] object-contain"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {valueAdded.map((item, index) => (
                <article
                  key={item}
                  className="relative flex min-h-[160px] flex-col overflow-hidden rounded-[20px] border border-[#e8eef3] bg-[#EFF7FC] p-5 sm:min-h-[180px] sm:p-6"
                >
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2365aa] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="m-0 text-[clamp(13px,1.15vw,15px)] leading-6 text-[#5a5a5a] 2xl:text-[18px] 2xl:leading-8">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agent Framework + Success Stories */}
      <section
        className="rounded-[20px] bg-[#f4f7f9] py-[clamp(40px,5vw,72px)] max-sm:rounded-none"
        aria-label="Agentic AI success stories"
      >
        <div className="mx-auto w-full max-w-[1692px] px-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="mb-[clamp(28px,3.5vw,48px)] grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
            <div>
              <h2 className="m-0 text-[clamp(24px,3.2vw,40px)] font-bold leading-[1.15] text-[#1F2432]">
                A Reusable Agentic Framework to Build &amp; Launch Agents in Days
              </h2>
              <p className="mt-4 max-w-[42rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#848b9b] 2xl:text-[18px] 2xl:leading-8">
                Our battle-tested agentic framework connects LLMs, tool libraries,
                memory stores, retrieval layers, and human-in-the-loop controls
                so you can adapt agents to new domains and tasks without rebuilding
                from scratch every time.
              </p>
            </div>
            <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-white p-4 shadow-[0_18px_50px_-24px_rgba(17,61,119,0.35)] sm:p-6">
              <img
                src={llmAgentsImage}
                alt="Agentic AI framework connecting LLMs, tools, knowledge base, memory, and human-in-the-loop"
                className="mx-auto block h-auto w-full max-w-[720px] object-contain"
              />
            </div>
          </div>

          <div className="mb-[clamp(24px,3vw,40px)] max-w-[760px]">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#2365aa] 2xl:text-base">
              Success Stories
            </p>
            <h3 className="m-0 text-[clamp(24px,3vw,40px)] font-bold leading-[1.15] text-[#272935]">
              Agentic AI delivering measurable business impact
            </h3>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            {successStories.map((story, storyIndex) => (
              <article
                key={story.id}
                className="overflow-hidden rounded-[24px] border border-[#e0e9f1] bg-white shadow-[0_16px_50px_-34px_rgba(17,61,119,0.45)]"
              >
                <div className="grid lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,2fr)]">
                  <header className="relative overflow-hidden bg-[#113d77] p-6 text-white sm:p-8 lg:min-h-full lg:p-9">
                    <span className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full border-[28px] border-white/[0.06]" />
                    <span className="relative mb-8 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-[#113d77]">
                      {String(storyIndex + 1).padStart(2, "0")}
                    </span>
                    <h4 className="relative m-0 max-w-[300px] text-[clamp(21px,2vw,30px)] font-bold leading-[1.2] 2xl:text-[32px]">
                      {story.label}
                    </h4>
                    <p className="relative mt-4 text-sm leading-6 text-white/65 2xl:text-[17px] 2xl:leading-7">
                      From operational friction to a scalable, production-ready
                      agentic solution.
                    </p>
                  </header>

                  <div className="p-5 sm:p-7 lg:p-9">
                    <div className="grid gap-7 md:grid-cols-3 md:gap-6">
                      {(
                        [
                          ["Customer", story.about],
                          ["Challenge", story.situation],
                          ["Our Solution", story.solution],
                        ] as const
                      ).map(([title, items], sectionIndex) => (
                        <section
                          key={title}
                          className="relative md:border-l md:border-[#e4ebf1] md:pl-6 first:md:border-l-0 first:md:pl-0"
                        >
                          <div className="mb-4 flex items-center gap-3">
                            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eaf3fa] text-xs font-bold text-[#2365aa]">
                              {sectionIndex + 1}
                            </span>
                            <h5 className="m-0 text-sm font-bold uppercase tracking-[0.08em] text-[#272935] 2xl:text-base">
                              {title}
                            </h5>
                          </div>
                          <ul className="m-0 flex list-none flex-col gap-3 p-0">
                            {items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-[clamp(12px,1vw,14px)] leading-[1.55] text-[#687181] 2xl:text-[17px] 2xl:leading-7"
                              >
                                <img
                                  src={elevateIcon}
                                  alt=""
                                  aria-hidden
                                  className="mt-[7px] h-2 w-2 shrink-0 object-contain"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>

                    <div className="mt-7 border-t border-[#e4ebf1] pt-6">
                      <p className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-[#2365aa] 2xl:text-base">
                        Business outcomes
                      </p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {story.results.map((result) => (
                          <div
                            key={result}
                            className="flex min-h-[76px] items-center rounded-[14px] bg-[#EFF7FC] px-4 py-3 text-[clamp(12px,1vw,14px)] font-semibold leading-[1.45] text-[#27384f] 2xl:min-h-[92px] 2xl:px-5 2xl:text-[17px]"
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="w-full bg-[#f8fbfd]" aria-label="Featured case study">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mb-[clamp(24px,3vw,40px)] max-w-[48rem]">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#2365aa] 2xl:text-base">
              Case Study
            </p>
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Agentic AI–Enabled SDLC Transformation
            </h2>
          </header>

          <article className="overflow-hidden rounded-[24px] border border-[#e8eef3] bg-white shadow-[0_20px_50px_-28px_rgba(17,61,119,0.35)] lg:rounded-[28px]">
            <div className="grid grid-cols-1 items-center lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <Link
                to="/case-studies/genai-enabled-sdlc"
                className="group relative flex items-center justify-center overflow-hidden bg-[#EFF7FC] p-3 sm:p-4 lg:p-5"
                aria-label="Read Agentic AI–Enabled SDLC case study"
              >
                <img
                  src={genAiSdlcCaseImage}
                  alt="Expected effort savings across agentic AI-enabled SDLC roles"
                  className="block h-auto w-full rounded-[12px] object-contain object-center shadow-[0_12px_32px_-16px_rgba(17,61,119,0.4)] transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </Link>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
                <h3 className="m-0 text-[clamp(20px,2.2vw,28px)] font-bold leading-tight text-[#1F2432]">
                  Agentic AI Adoption Plan Across the SDLC
                </h3>
                <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#5a5a5a] 2xl:text-[17px]">
                  A phase-wise agentic AI adoption roadmap across the full software
                  delivery lifecycle with tool guidance, a 12-week rollout, ROI
                  modelling, governance controls, and role-based training. Standardises
                  autonomous coding agents by phase to cut repetitive work while
                  improving delivery speed and quality.
                </p>
                <Link
                  to="/case-studies/genai-enabled-sdlc"
                  className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#2365aa] py-2.5 pl-[22px] pr-2.5 text-sm font-normal uppercase tracking-[0.02em] text-white no-underline transition-colors hover:bg-[#1a5490] sm:text-base"
                >
                  Read the case study
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2365aa]">
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,80px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(24px,3vw,40px)] max-w-[48rem] text-center">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Agentic AI Technology Stack
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] 2xl:text-[18px] 2xl:leading-8">
              LLM orchestration frameworks, tool libraries, memory systems, and
              cloud platforms we use to design, deploy, and scale production
              agentic AI solutions.
            </p>
          </header>

          <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-white p-5 shadow-[0_20px_60px_-28px_rgba(17,61,119,0.35)] sm:rounded-[24px] sm:p-8 lg:p-10">
            <img
              src={techStackImage}
              alt="Agentic AI technology stack across orchestration frameworks and cloud providers"
              className="mx-auto block h-auto w-full max-w-[980px] object-contain"
            />
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
