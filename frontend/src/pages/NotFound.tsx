import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="font-['Lay_Grotesk_Trial',sans-serif] bg-white text-[#272935]">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-[1692px] flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2365aa]">
          404
        </p>
        <h1 className="mt-3 text-[clamp(28px,4vw,48px)] font-bold leading-tight text-[#1F2432]">
          Page not found
        </h1>
        <p className="mt-4 max-w-lg text-[clamp(15px,1.4vw,18px)] leading-7 text-[#848b9b]">
          The page you are looking for does not exist or may have moved.
          Check the URL, or head back to the homepage.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-[#2365aa] py-3 pl-[26px] pr-3.5 text-base font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490]"
        >
          Back to Home
          <span className="inline-flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white text-[#2365aa]">
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </span>
        </Link>
      </div>
    </main>
  );
}
