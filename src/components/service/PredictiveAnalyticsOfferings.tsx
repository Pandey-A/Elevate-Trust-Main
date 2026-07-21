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
      <div className="mx-auto w-full max-w-site px-5 pb-12 pt-3 sm:px-8 sm:pb-16 md:px-10 lg:px-20 lg:pb-20 lg:pt-6">
        <nav
          className="mb-8 text-[10px] text-[#9CA3AF] sm:mb-10 sm:text-xs lg:mb-12"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-[#6B7280]">
            Home
          </Link>
          <span className="mx-1.5">»</span>
          <Link to="/Services/ai-ml" className="hover:text-[#6B7280]">
            Our Services
          </Link>
          <span className="mx-1.5">»</span>
          <span className="text-[#6B7280]">Custom AI/ML Solutions</span>
        </nav>

        <header className="mx-auto mb-10 max-w-[52rem] text-center sm:mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] font-bold leading-[1.2] text-[#1F2432] sm:text-[2rem] md:text-[2.5rem] lg:text-[56px] lg:leading-[62px]">
            Core Offerings
            <br />
            Predictive Analytics
          </h2>
          <p className="mx-auto mt-5 max-w-[42rem] text-xs leading-6 text-[#9CA3AF] sm:mt-6 sm:text-sm sm:leading-7 lg:mt-8">
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

              <h3 className="text-base font-bold leading-snug text-[#1F2432] sm:text-lg lg:text-[20px] lg:leading-[28px]">
                {item.title}
              </h3>

              {item.subtitle ? (
                <p className="mt-1 text-[13px] font-medium leading-snug text-[#1F2432] sm:text-[15px] lg:text-[16px] lg:leading-[22px]">
                  {item.subtitle}
                </p>
              ) : null}

              <p className="mt-3 text-xs leading-5 text-[#9CA3AF] sm:mt-4 sm:text-sm sm:leading-6">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
