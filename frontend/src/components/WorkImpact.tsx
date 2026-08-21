import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import works1 from "../assets/homepage-icons/works-1.svg";
import works2 from "../assets/homepage-icons/works-2.svg";
import works3 from "../assets/homepage-icons/works-3.svg";

interface ImpactCard {
  text: React.ReactNode;
  image: string;
}

const impactCards: ImpactCard[] = [
  {
    text: (
      <>
        Master &amp; PHD Eng in AI &amp; IOT at{" "}
        <span className="font-semibold text-[#2365AA]">Pune engineering center</span>
      </>
    ),
    image: works1,
  },
  {
    text: (
      <>
        Serving customer in{" "}
        <span className="font-semibold text-[#2365AA]">NZ, Canada, Dubai</span> and{" "}
        <span className="font-semibold text-[#2365AA]">UK</span>.
      </>
    ),
    image: works2,
  },
  {
    text: (
      <>
        Hold patent and research papers in{" "}
        <span className="font-semibold text-[#2365AA]">Generative AI</span> and{" "}
        <span className="font-semibold text-[#2365AA]">Video analytics</span>.
      </>
    ),
    image: works3,
  },
];

export default function WorkImpact() {
  return (
    <section
      className="bg-[#113D77] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 xl:py-24 min-[1920px]:py-[100px]"
      aria-label="Work that proves our impact"
    >
      <div className="mx-auto w-full max-w-site">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-10 xl:gap-14 min-[1920px]:gap-16">
          {/* Left: heading + CTA */}
          <div className="w-full shrink-0 text-center lg:w-[min(100%,280px)] lg:text-left xl:w-[min(100%,340px)] min-[1920px]:w-[493px]">
            <h2 className="m-0 text-[40px] font-bold leading-[0.92] text-white sm:text-5xl lg:text-[44px] xl:text-[56px] xl:leading-[0.89] 2xl:text-[64px] min-[1920px]:text-[96px] min-[1920px]:leading-[0.89]">
              Work that
              <br />
              proves
              <br />
              our impact
            </h2>

            <Link
              to="/case-studies"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white py-2.5 pl-4 pr-2.5 text-[13px] font-medium tracking-[0.04em] text-[#272935] transition hover:bg-white/90 sm:mt-8 sm:text-sm lg:mt-9 min-[1920px]:mt-10 min-[1920px]:h-[53px] min-[1920px]:gap-0 min-[1920px]:py-0 min-[1920px]:pl-[13px] min-[1920px]:pr-[10px] min-[1920px]:text-[14px]"
            >
              <span className="px-1 min-[1920px]:mr-[-8px] min-[1920px]:w-[120px] min-[1920px]:text-center">
                READ MORE
              </span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#272935] text-white sm:size-9 min-[1920px]:size-[37px]">
                <ArrowUpRight className="size-4 sm:size-[18px] min-[1920px]:size-[22px]" strokeWidth={2.25} />
              </span>
            </Link>
          </div>

          {/* Right: cards + progress */}
          <div className="flex w-full min-w-0 flex-1 flex-col gap-5 sm:gap-6 lg:gap-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-4 xl:gap-5 min-[1920px]:gap-6">
              {impactCards.map((card, index) => (
                <article
                  key={`impact-${index}`}
                  className={[
                    "relative flex min-h-[260px] flex-col overflow-hidden rounded-[20px] bg-white p-5 sm:min-h-[280px] sm:rounded-[22px] sm:p-6 lg:min-h-[320px] lg:rounded-[24px] lg:p-6 xl:min-h-[380px] xl:rounded-[28px] xl:p-7 min-[1920px]:min-h-[487px] min-[1920px]:rounded-[30px] min-[1920px]:p-8",
                    index === 2 ? "sm:col-span-2 sm:max-w-[calc(50%-0.5rem)] sm:justify-self-center lg:col-span-1 lg:max-w-none lg:justify-self-auto" : "",
                  ].join(" ")}
                >
                  <p className="m-0 text-[15px] font-semibold leading-6 text-[#272935] sm:text-base sm:leading-7 lg:text-[17px] lg:leading-7 xl:text-[22px] xl:leading-8 2xl:text-[26px] 2xl:leading-9 min-[1920px]:text-[37px] min-[1920px]:leading-[50px]">
                    {card.text}
                  </p>

                  <div className="mt-auto flex items-end justify-end pt-4">
                    <img
                      src={card.image}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-auto w-[110px] object-contain pointer-events-none sm:w-[120px] lg:w-[130px] xl:w-[150px] min-[1920px]:w-[167px]"
                    />
                  </div>
                </article>
              ))}
            </div>

            {/* Scroll / progress indicator under cards (Figma) */}
            <div
              className="relative mx-auto hidden h-[3px] w-full max-w-full overflow-hidden rounded-full bg-white/20 sm:block"
              aria-hidden
            >
              <div className="absolute left-0 top-1/2 h-[3px] w-[28%] -translate-y-1/2 rounded-full bg-white sm:w-[32%] lg:w-[30%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
