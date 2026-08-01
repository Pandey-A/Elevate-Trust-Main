import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import effortSavingsImg from "../assets/case-studies/c7-1.png";
import roadmapImg from "../assets/case-studies/c7-2.png";
import roiImg from "../assets/case-studies/c7-3.png";

const techStack = [
  "Cursor",
  "Claude Code",
  "Generative AI",
  "Prompt Engineering",
  "DevOps",
  "Governance",
];

const overviewCards = [
  {
    title: "Executive Summary",
    text: "GenAI can be used across the SDLC to reduce manual effort, improve delivery speed, and raise engineering quality. The recommended approach is a controlled 12-week adoption program: deploy tools by role, measure usage and outcomes weekly, and scale only the practices that show clear value.",
    variant: "light" as const,
  },
  {
    title: "Target Outcomes",
    text: "Productivity gains of 20 to 40 percent on repetitive SDLC work, faster requirements-to-release cycles, stronger test coverage and review quality, and controlled AI spend through token tracking, prompt standards, and model right-sizing.",
    variant: "blue" as const,
  },
  {
    title: "Solution Approach",
    text: "Each SDLC phase is assigned a single primary tool to keep licensing, training, and prompt libraries simple. Cursor owns hands-on coding work across design, development, and testing. Claude Code owns analysis and automation across discovery, requirements, DevOps, release, and support.",
    variant: "blue" as const,
  },
  {
    title: "Business Outcome",
    text: "For a 10-person team, annualized net benefit is estimated at about $230K after tool costs, with ROI around 45 to 1 and payback in under two weeks when adoption stabilises under clear governance.",
    variant: "light" as const,
  },
];

const phaseRows = [
  ["Discovery", "Summarise stakeholder notes; identify assumptions, risks, and open questions", "Claude Code", "30 to 40% less documentation effort"],
  ["Requirements", "Convert raw inputs into stories, acceptance criteria, RTM, and BDD scenarios", "Claude Code", "25 to 35% less BA effort"],
  ["Design", "Draft ADRs, compare options, generate API skeletons and sequence flows", "Cursor", "20 to 30% less design documentation effort"],
  ["Development", "Generate code, refactor, explain code, scaffold unit tests, assist reviews", "Cursor", "25 to 40% less repetitive coding effort"],
  ["Testing", "Generate test cases, BDD scenarios, synthetic data, and automation scaffolds", "Cursor", "30 to 45% less test authoring effort"],
  ["DevOps", "Generate CI/CD YAML, IaC modules, scripts, monitoring queries, and checklists", "Claude Code", "25 to 35% less pipeline and IaC effort"],
  ["Release", "Summarise PRs, draft release notes, rollback plans, and go/no-go checklists", "Claude Code", "20 to 30% less release documentation effort"],
  ["Support", "Analyse logs, draft incident summaries, create runbooks, update knowledge articles", "Claude Code", "25 to 35% less incident and runbook effort"],
];

const roadmapRows = [
  ["Weeks 1 to 2", "Foundation", "Tool selection, governance, security rules, baseline KPIs, pilot setup", "AI policy, tool access, baseline KPI report"],
  ["Weeks 3 to 6", "Pilot", "Deploy to pilot team, run role training, collect prompts, track benefits", "Pilot KPI report, prompt library v1"],
  ["Weeks 7 to 10", "Scaled Rollout", "Expand users, integrate into sprint ceremonies, launch monitoring dashboard", "Usage dashboard, CoE champions, advanced prompt library"],
  ["Weeks 11 to 12", "Optimise", "Review ROI signals, right-size licences, fix gaps, publish next-quarter plan", "Quarter review, cost plan, backlog"],
];

const kpiRows = [
  ["Velocity", "15 to 25% improvement", "Engineering"],
  ["PR Cycle Time", "20 to 30% reduction", "Engineering"],
  ["Defect Escape Rate", "15 to 20% reduction", "QA"],
  ["Test Coverage", "10 to 20% improvement", "QA"],
  ["Requirements Rework", "20 to 30% reduction", "BA"],
  ["Automation Coverage", "15 to 25% improvement", "QA/SDET"],
  ["Documentation Coverage", "25 to 35% improvement", "Engineering"],
  ["AI Usage Cost", "Within approved monthly budget", "Delivery / Finance"],
];

const roiRows = [
  ["Developers", "6", "$479,981", "28%", "$134,395"],
  ["QA", "2", "$159,994", "35%", "$55,998"],
  ["Business Analyst", "1", "$79,997", "28%", "$22,399"],
  ["DevOps", "1", "$79,997", "28%", "$22,399"],
  ["Total", "10", "$799,969", "29%", "$235,191"],
];

const trainingRows = [
  ["Weeks 1 to 2", "AI Foundations", "All roles", "Shared understanding of AI use, security, and governance"],
  ["Weeks 3 to 4", "Role-Based Workshops", "BA, Dev, QA, DevOps", "Hands-on use cases and reusable prompt patterns"],
  ["Weeks 5 to 6", "Prompt Engineering", "All engineers", "CTCO prompts, context scoping, output control"],
  ["Week 7", "Cost and Governance", "Leads and managers", "Usage review, token budgets, licence control"],
  ["Weeks 8 to 10", "Advanced Workflows", "Senior engineers", "Cursor Composer, Claude Code, CI/CD use cases"],
  ["Week 11 onwards", "CoE Sharing", "All teams", "Reusable prompts, lessons learned, and adoption improvements"],
];

const guardrails = [
  { title: "Prompt Standard", text: "Use CTCO: Context, Task, Constraints, Output to reduce rework and token waste." },
  { title: "Data Security", text: "Do not include PII, PHI, credentials, proprietary algorithms, or confidential business rules in prompts." },
  { title: "Human Review", text: "Engineers remain accountable for code, tests, security, and design decisions." },
  { title: "Token Hygiene", text: "Use inline completion for small tasks; limit chat sessions to five exchanges per topic." },
  { title: "Model Right-Sizing", text: "Use lower-cost models for routine tasks; reserve premium models for complex reasoning." },
  { title: "Usage Monitoring", text: "Track active users, acceptance rate, token consumption, cost per user, and security exceptions." },
];

function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto rounded-[16px] border border-[#e6ebf0] bg-white shadow-[0_8px_28px_rgba(39,41,53,0.05)]">
      {children}
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6 max-w-[52rem] sm:mb-8">
      <h2 className="m-0 text-[clamp(24px,3vw,36px)] font-bold leading-[1.15] text-[#1F2432]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-[clamp(14px,1.2vw,16px)] leading-7 text-[#687181]">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export default function GenAiSdlcCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      {/* Hero */}
      <section className="service-page-hero" aria-label="GenAI-Enabled SDLC Enablement Plan">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content max-w-[min(880px,92%)]">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#8eb4df]">
            Case Study
          </p>
          <h1 className="m-0 mb-5 text-[clamp(28px,3.4vw,48px)] font-bold leading-[1.29] tracking-tight text-white">
            GenAI-Enabled SDLC Enablement Plan
          </h1>
          <p className="mb-9 max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.35vw,18px)] font-normal leading-[1.35] text-[#a1b1cb]">
            Phase-wise AI adoption, tool guidance, a 12-week rollout, ROI modelling,
            governance, and training to help engineering teams reduce repetitive SDLC
            work while improving delivery speed and quality.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#2365aa] py-2.5 pl-[26px] pr-3 text-base font-normal uppercase tracking-[0.02em] text-white no-underline transition-colors hover:bg-[#1a5490]"
          >
            Contact Us
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2365aa]">
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
          <span>GenAI-Enabled SDLC</span>
        </nav>
      </div>

      <section className="relative mx-auto w-full max-w-[1692px] px-6 pb-[clamp(48px,6vw,88px)] pt-[clamp(24px,3vw,40px)]">
        <img
          src={partnerGlobe}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-4 top-8 hidden w-[180px] opacity-40 lg:block"
        />

        {/* Intro */}
        <div className="mb-[clamp(40px,5vw,72px)] grid grid-cols-1 items-start gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div>
            <h2 className="m-0 text-[clamp(24px,3vw,40px)] font-bold leading-[1.15] text-[#1F2432]">
              GenAI-Enabled SDLC: Concise Client Enablement Plan
            </h2>
            <div className="mt-8">
              <h3 className="mb-4 text-[clamp(16px,1.4vw,20px)] font-semibold text-[#1F2432]">
                Technology/Tools Used
              </h3>
              <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
                {techStack.map((tool) => (
                  <li
                    key={tool}
                    className="flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-[#e6ebf0] bg-white px-4 py-3 text-center text-[clamp(13px,1.1vw,16px)] text-[#272935]"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_8px_32px_rgba(39,41,53,0.06)]">
            <img
              src={effortSavingsImg}
              alt="Expected effort savings by role across the GenAI-enabled SDLC"
              className="block h-auto w-full object-contain"
            />
          </div>
        </div>

        {/* Overview cards */}
        <div className="mb-[clamp(40px,5vw,72px)] grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {overviewCards.map((card) => (
            <article
              key={card.title}
              className={`flex min-h-[280px] flex-col rounded-[30px] p-[clamp(28px,2.8vw,42px)] ${
                card.variant === "blue"
                  ? "bg-[#2365aa] text-white"
                  : "bg-[#f4f7f9] text-[#272935]"
              }`}
            >
              <h3 className="m-0 mb-6 max-w-[18ch] text-[clamp(24px,2.8vw,40px)] font-normal leading-[1.15]">
                {card.title}
              </h3>
              <p
                className={`m-0 text-[clamp(15px,1.35vw,18px)] font-medium leading-[1.46] ${
                  card.variant === "blue" ? "text-white" : "text-[#272935]"
                }`}
              >
                {card.text}
              </p>
            </article>
          ))}
        </div>

        {/* Phase-wise enablement */}
        <div className="mb-[clamp(40px,5vw,72px)]">
          <SectionHeading
            title="Phase-Wise AI Enablement"
            subtitle="Each phase is assigned a single primary tool to keep licensing, training, and prompt libraries simple."
          />
          <TableWrap>
            <table className="min-w-[720px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#113d77] text-white">
                  {["Phase", "High-Value AI Use Cases", "Primary Tool", "Expected Benefit"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3.5 text-[clamp(12px,1.05vw,14px)] font-semibold uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {phaseRows.map((row, idx) => (
                  <tr
                    key={row[0]}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#f8fbfd]"}
                  >
                    {row.map((cell) => (
                      <td
                        key={`${row[0]}-${cell}`}
                        className="border-t border-[#e6ebf0] px-4 py-3.5 text-[clamp(13px,1.1vw,15px)] leading-6 text-[#5a5a5a]"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </div>

        {/* Tools */}
        <div className="mb-[clamp(40px,5vw,72px)]">
          <SectionHeading
            title="Tool Recommendation"
            subtitle="The plan standardises on two tools, each owning a distinct set of use cases so teams are never choosing between overlapping options for the same task."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <article className="rounded-[24px] border border-[#e6ebf0] bg-[#EFF7FC] p-6 sm:p-8">
              <p className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-[#2365aa]">
                Cursor
              </p>
              <h3 className="mt-2 text-[clamp(20px,2vw,28px)] font-bold text-[#1F2432]">
                Design, Development &amp; Testing
              </h3>
              <p className="mt-3 text-[clamp(14px,1.2vw,16px)] leading-7 text-[#5a5a5a]">
                Best for developers and tech leads needing codebase-aware, multi-file editing.
                Indicative cost: $20 Pro or $40 Business per user/month.
              </p>
            </article>
            <article className="rounded-[24px] border border-[#e6ebf0] bg-[#113d77] p-6 text-white sm:p-8">
              <p className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-[#8eb4df]">
                Claude Code
              </p>
              <h3 className="mt-2 text-[clamp(20px,2vw,28px)] font-bold">
                Discovery through Support
              </h3>
              <p className="mt-3 text-[clamp(14px,1.2vw,16px)] leading-7 text-[#c5d4e8]">
                Best for complex analysis, large documents, repo-level automation, and
                cross-cutting reasoning across Discovery, Requirements, DevOps, Release, and Support.
              </p>
            </article>
          </div>
        </div>

        {/* Roadmap + image */}
        <div className="mb-[clamp(40px,5vw,72px)]">
          <SectionHeading
            title="12-Week Implementation Roadmap"
            subtitle="Start controlled, measure weekly, then scale only what proves value."
          />
          <div className="mb-6 overflow-hidden rounded-[20px] border border-[#e6ebf0] bg-white p-3 shadow-[0_8px_28px_rgba(39,41,53,0.05)] sm:p-5">
            <img
              src={roadmapImg}
              alt="12-week implementation roadmap chart"
              className="mx-auto block h-auto w-full max-w-[900px] object-contain"
            />
          </div>
          <TableWrap>
            <table className="min-w-[760px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#113d77] text-white">
                  {["Timeline", "Focus", "Key Activities", "Deliverables"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3.5 text-[clamp(12px,1.05vw,14px)] font-semibold uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roadmapRows.map((row, idx) => (
                  <tr key={row[0]} className={idx % 2 === 0 ? "bg-white" : "bg-[#f8fbfd]"}>
                    {row.map((cell) => (
                      <td
                        key={`${row[0]}-${cell}`}
                        className="border-t border-[#e6ebf0] px-4 py-3.5 text-[clamp(13px,1.1vw,15px)] leading-6 text-[#5a5a5a]"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </div>

        {/* Governance */}
        <div className="mb-[clamp(40px,5vw,72px)]">
          <SectionHeading
            title="Governance and Cost Control"
            subtitle="Treat AI as an engineering accelerator, not an unchecked automation layer. Human review remains mandatory for all AI-generated code, tests, designs, pipelines, and release material."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guardrails.map((item) => (
              <article
                key={item.title}
                className="rounded-[20px] border border-[#e6ebf0] bg-[#f4f7f9] p-5 sm:p-6"
              >
                <h3 className="m-0 text-[clamp(16px,1.3vw,18px)] font-bold text-[#1F2432]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[clamp(13px,1.15vw,15px)] leading-6 text-[#5a5a5a]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="mb-[clamp(40px,5vw,72px)]">
          <SectionHeading title="KPIs and Monitoring" />
          <TableWrap>
            <table className="min-w-[640px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#113d77] text-white">
                  {["KPI", "Target by Month 3", "Owner"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3.5 text-[clamp(12px,1.05vw,14px)] font-semibold uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kpiRows.map((row, idx) => (
                  <tr key={row[0]} className={idx % 2 === 0 ? "bg-white" : "bg-[#f8fbfd]"}>
                    {row.map((cell) => (
                      <td
                        key={`${row[0]}-${cell}`}
                        className="border-t border-[#e6ebf0] px-4 py-3.5 text-[clamp(13px,1.1vw,15px)] leading-6 text-[#5a5a5a]"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </div>

        {/* ROI */}
        <div className="mb-[clamp(40px,5vw,72px)]">
          <SectionHeading
            title="ROI Estimate for a 10-Person Team"
            subtitle="Assumption: 6 developers, 2 QA engineers, 1 business analyst, and 1 DevOps engineer. Average fully loaded cost is assumed at $80,000 per person per year."
          />
          <div className="mb-6 overflow-hidden rounded-[20px] border border-[#e6ebf0] bg-white p-3 shadow-[0_8px_28px_rgba(39,41,53,0.05)] sm:p-5">
            <img
              src={roiImg}
              alt="ROI comparison for a 10-person team"
              className="mx-auto block h-auto w-full max-w-[900px] object-contain"
            />
          </div>
          <TableWrap>
            <table className="min-w-[720px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#113d77] text-white">
                  {["Role", "Headcount", "Base Cost", "Savings %", "Annual Savings"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3.5 text-[clamp(12px,1.05vw,14px)] font-semibold uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roiRows.map((row, idx) => (
                  <tr
                    key={row[0]}
                    className={`${idx === roiRows.length - 1 ? "bg-[#EFF7FC] font-semibold text-[#1F2432]" : idx % 2 === 0 ? "bg-white" : "bg-[#f8fbfd]"}`}
                  >
                    {row.map((cell) => (
                      <td
                        key={`${row[0]}-${cell}`}
                        className="border-t border-[#e6ebf0] px-4 py-3.5 text-[clamp(13px,1.1vw,15px)] leading-6 text-[#5a5a5a]"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </div>

        {/* Training */}
        <div>
          <SectionHeading
            title="Training and Enablement"
            subtitle="Role-based workshops, prompt standards, and CoE sharing keep adoption consistent as the program scales."
          />
          <TableWrap>
            <table className="min-w-[760px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#113d77] text-white">
                  {["Timing", "Training Module", "Audience", "Outcome"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3.5 text-[clamp(12px,1.05vw,14px)] font-semibold uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trainingRows.map((row, idx) => (
                  <tr key={row[0]} className={idx % 2 === 0 ? "bg-white" : "bg-[#f8fbfd]"}>
                    {row.map((cell) => (
                      <td
                        key={`${row[0]}-${cell}`}
                        className="border-t border-[#e6ebf0] px-4 py-3.5 text-[clamp(13px,1.1vw,15px)] leading-6 text-[#5a5a5a]"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
