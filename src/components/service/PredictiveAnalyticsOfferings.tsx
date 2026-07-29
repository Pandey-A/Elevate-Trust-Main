import { Link } from "react-router-dom";
import frame1 from "../../assets/service/core/frame1.svg";
import frame2 from "../../assets/service/core/frame2.svg";
import frame3 from "../../assets/service/core/frame3.svg";
import frame4 from "../../assets/service/core/frame4.svg";

const offerings = [
  {
    title: "Smart City analytics",
    subtitle: "(Video surveillance, KYC Processes)",
    description:
      "We create custom AI solutions for Predictive Analytics, such as predicting customer churn, building recommendation systems, maintaining equipment,",
    icon: frame1,
  },
  {
    title: "Forecasting",
    subtitle: "(Sales, inventory, patient survival, Dynamic pricing)",
    description:
      "We create custom AI solutions for Predictive Analytics, such as predicting customer churn, building recommendation systems,",
    icon: frame2,
  },
  {
    title: "Churn prediction and Recommendation systems",
    subtitle: "",
    description:
      "We create custom AI solutions for Predictive Analytics, such as predicting customer churn, building recommendation systems, maintaining equipment, forecasting in manufacturing.",
    icon: frame4,
  },
  {
    title: "Predictive Maintenance for Manufacturing",
    subtitle: "",
    description:
      "We create custom AI solutions for Predictive Analytics, such as predicting customer churn, building recommendation systems, maintaining",
    icon: frame3,
  },
];

export default function PredictiveAnalyticsOfferings() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] pt-3 sm:px-8 lg:px-10 xl:px-12">
        <nav
          className="mb-[clamp(28px,3vw,48px)] flex flex-wrap items-center gap-2.5 pt-[clamp(20px,2.5vw,36px)] text-[clamp(13px,1.2vw,18px)] font-normal leading-[1.2] text-[#272935] 2xl:text-[18px]"
          aria-label="Breadcrumb"
        >
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
          <span>AI/ML Solution</span>
        </nav>

        <header className="mx-auto mb-[clamp(32px,4vw,56px)] max-w-[52rem] text-center">
          <h2 className="m-0 text-[clamp(28px,4vw,56px)] font-bold leading-[1.15] text-[#1F2432]">
            Core Offerings
            <br />
            Predictive Analytics
          </h2>
          <p className="mx-auto mt-5 max-w-[48rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] sm:mt-6 2xl:text-[18px] 2xl:leading-8">
            We create custom AI solutions for Predictive Analytics, such as
            predicting customer churn, building recommendation systems,
            maintaining equipment, forecasting in manufacturing, and analyzing
            smart city data and surveillance.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-6 xl:gap-8">
          {offerings.map((item) => (
            <article key={item.title} className="flex min-w-0 flex-col">
              <div className="mb-5 flex w-full items-center justify-center rounded-[20px] bg-[#EFF7FC] px-4 py-8 sm:mb-6 sm:py-10">
                <img
                  src={item.icon}
                  alt=""
                  className="h-[120px] w-auto max-w-full object-contain sm:h-[140px] lg:h-[150px]"
                  aria-hidden
                />
              </div>

              <h3 className="m-0 text-[clamp(16px,1.4vw,20px)] font-bold leading-snug text-[#1F2432]">
                {item.title}
              </h3>

              {item.subtitle ? (
                <p className="mt-1 text-[clamp(13px,1.2vw,16px)] font-medium leading-snug text-[#1F2432]">
                  {item.subtitle}
                </p>
              ) : null}

              <p className="mt-3 text-[clamp(12px,1.1vw,14px)] leading-6 text-[#9CA3AF] sm:mt-4">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
