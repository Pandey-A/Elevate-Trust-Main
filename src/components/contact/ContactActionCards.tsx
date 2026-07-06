import { ChevronRight } from "lucide-react";

const actionCards = [
  {
    title: "Talk to AI",
    subtitle: "Instant Answers",
  },
  {
    title: "Reach Us",
    subtitle: "Get contacted by our team",
  },
];

export default function ContactActionCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
      {actionCards.map((card) => (
        <article
          key={card.title}
          className="flex min-h-[176px] w-full flex-col mt-12 overflow-hidden rounded-2xl bg-[#2365AA] sm:min-h-[192px]"
        >
          <div className="flex w-full flex-1 items-center justify-between rounded-b-2xl bg-[#272935] px-6 py-4 sm:px-7 sm:py-5">
            <h2 className="text-base font-bold text-white sm:text-lg">{card.title}</h2>
            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#9CA3AF] transition hover:text-[#272935] sm:h-10 sm:w-10"
              aria-label={`Open ${card.title}`}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          <div className="flex w-full flex-1 items-center px-6 py-3.5 sm:px-7 sm:py-4">
            <p className="text-sm text-white sm:text-[15px]">{card.subtitle}</p>
          </div>
        </article>
      ))}
    </div>
  );
}