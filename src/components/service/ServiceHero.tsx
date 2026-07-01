import viewAllArrow from "../../assets/nav/lets-connect.svg";
import worldMapBackground from "../../assets/homepage-icons/Group(3).png";

export default function ServiceHero() {
  return (
    <section className="relative h-[20rem] w-full overflow-hidden bg-[#113D77] sm:h-[22rem] md:h-[23rem] lg:h-[25rem] xl:h-[28rem]">
      {/* Map — img pinned to bottom via flex items-end */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-[1] flex items-end justify-center  overflow-hidden"
      >
        <img
          src={worldMapBackground}
          alt=""
          className="block w-[94%] max-w-none sm:w-[88%] md:w-[80%] lg:w-[70%] mt-30"
        />
      </div>

      <div className="relative z-[2] mx-auto flex h-full w-full max-w-site items-center justify-center p-4 lg:p-8 xl:p-10">
        <div className="flex w-full max-w-[20rem] flex-col items-center gap-3 text-center sm:max-w-[26rem] sm:gap-3.5 md:max-w-[30rem] lg:w-[55%] lg:max-w-[42rem] xl:max-w-[48rem] lg:gap-4">
          <h1 className="text-[1.25rem] font-bold leading-[1.35] text-white sm:text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem] lg:leading-[1.45]">
            Custom AI/ML Solutions for Strategic Business Outcomes
          </h1>

          <p className="font-ubuntu text-[0.65rem] font-normal leading-relaxed text-white/50 sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.85rem] xl:text-base lg:leading-6">
            We collaborate with clients to elevate AI solutions aimed at achieving
            strategic business goals. Our knowledge covers many industries,
            tackling difficult issues using AI methods designed for both
            structured and unstructured data. We are skilled in developing
            traditional Machine Learning and Deep Learning algorithms.
          </p>

          <a
            href="#"
            className="btn-cta mt-1 shrink-0 bg-[#2365AA] text-white hover:bg-[#1d5694] pl-5 pr-3"
          >
            Contact Us
            <span className="flex h-6 w-6 items-end justify-end rounded-full bg-[#113D77] sm:h-7 sm:w-7">
              <img src={viewAllArrow} alt="" aria-hidden className="h-4 w-4 sm:h-auto sm:w-auto" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
