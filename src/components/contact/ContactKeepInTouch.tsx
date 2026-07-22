import { useState } from "react";
import paperPlaneIcon from "../../assets/footer/PaperPlaneTilt.svg";

export default function ContactKeepInTouch() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div id="contact-form" className="mt-12 w-full sm:mt-14">
      <h2 className="text-left text-xl font-bold text-[#1F2432] sm:text-2xl">
        Keep in touch
      </h2>

      <form
        className="mt-3 w-full"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="flex h-[52px] w-full items-center rounded-[0.6rem] border-[0.05rem] border-black bg-white pl-5 pr-2 sm:h-[58px] sm:pl-6">
          <input
            type="email"
            required
            placeholder="YOUR EMAIL"
            className="w-full bg-transparent text-xs uppercase tracking-wide text-[#1F2432] placeholder:text-[#9CA3AF] focus:outline-none sm:text-sm"
          />
          <button
            type="submit"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2365AA] transition hover:bg-[#1d5694] sm:h-9 sm:w-9"
            aria-label="Submit email"
          >
            <img
              src={paperPlaneIcon}
              alt=""
              aria-hidden
              className="h-4 w-4 brightness-0 invert"
            />
          </button>
        </div>

        <label className="mt-4 flex cursor-pointer items-center justify-start gap-2.5 text-left">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="h-4 w-4 shrink-0 rounded-[2px] border-[#272935] accent-[#272935]"
          />
          <span className="text-xs text-[#6B7280] sm:text-sm">
            I agree the terms and condition
          </span>
        </label>
      </form>
    </div>
  );
}