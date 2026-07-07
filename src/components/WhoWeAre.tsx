import storiesVector from "../assets/homepage-icons/stories-vector.png";
import "./WhoWeAre.css";

interface StatItem {
  number: string;
  label: string;
}

const stats: StatItem[] = [
  {
    number: "10+",
    label: "Average Years of AI Experience",
  },
  {
    number: "5+",
    label: "Global Regions Served (US, UK, Canada, NZ, Dubai)",
  },
  {
    number: "24/7",
    label: "Automated Operational Monitoring",
  },
  {
    number: "20+",
    label: "Startup Solutions Delighted",
  },
];

export default function WhoWeAre() {
  return (
    <section className="who-we-are" aria-label="Who We Are">
      {/* ── Background Vector Graphic ── */}
      <img
        src={storiesVector}
        alt=""
        aria-hidden
        className="who-we-are__decor-vector"
      />

      <div className="who-we-are__container">
        {/* ── Heading ── */}
        <h2 className="who-we-are__title">Who We Are</h2>

        {/* ── Descriptions ── */}
        <div className="who-we-are__description">
          <p className="who-we-are__paragraph">
            We are experts in delivering AI Native, holistic solutions to complex business problems using cutting-edge technologies. Our capabilities extend across the entire stack including robust frontend/backend architectures, cloud deployment, and advanced DevOps transformations. Backed by an elite research team where most members hold Master's or PhD degrees in AI, we excel in high-performance AI-native business automation, designing autonomous agentic AI workflows that optimize operations and eliminate enterprise friction.
          </p>
          <p className="who-we-are__paragraph">
            We excel in IoT-based monitoring, predictive analytics, and end-to-end digital transformation for mid-size technology companies and fast-growing startups. Holding valuable patents and research papers in Generative AI, we help cross-domain clients across HRTech, Healthcare, manufacturing, Renewal energy, Customer support and Cyber Security realize a true IT strategy. From strategic workflow consulting to scalable product delivery, our comprehensive approach brings impactful, automated digital solutions to global customers.
          </p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="who-we-are__stats-grid">
          {stats.map((stat, index) => (
            <div key={`stat-${index}`} className="who-we-are__stat-card">
              <span className="who-we-are__stat-num">{stat.number}</span>
              <p className="who-we-are__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
