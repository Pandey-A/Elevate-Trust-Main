import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import worldMapBackground from "../../assets/homepage-icons/Group(3).png";
import agileImage from "../../assets/OurServices/agile-light.png";
import { getErrorMessage } from "../../lib/api";
import { getAuthSession, loginUser } from "../../lib/auth";

export default function AdminAuth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (getAuthSession()) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);
      await loginUser(email.trim(), password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(getErrorMessage(err, "Something went wrong."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-dvh overflow-hidden bg-[#f4f7f9] font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      <div className="mx-auto grid h-full w-full max-w-[1920px] grid-rows-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:grid-cols-2 lg:grid-rows-none xl:grid-cols-[1.05fr_0.95fr] 2xl:grid-cols-[1.1fr_0.9fr] min-[1920px]:max-w-none min-[2560px]:grid-cols-[1.15fr_0.85fr]">
        {/* Brand panel */}
        <section className="relative flex h-full min-h-0 flex-col justify-between overflow-hidden bg-[#113d77] px-5 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-8 xl:px-14 xl:py-10 2xl:px-16 2xl:py-12 min-[1920px]:px-20 min-[1920px]:py-14 min-[2560px]:px-24 min-[2560px]:py-16">
          <img
            src={worldMapBackground}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[55%] w-[min(140%,1100px)] -translate-x-1/2 -translate-y-1/2 opacity-45 lg:top-1/2 lg:w-[130%] lg:max-w-[1400px] 2xl:w-[120%] min-[2560px]:w-[110%]"
          />

          <div className="relative z-10 min-h-0">
            <Link
              to="/"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8eb4df] no-underline sm:text-sm 2xl:text-base min-[2560px]:text-lg"
            >
              ElevateTrust.AI
            </Link>
            <h1 className="mt-3 max-w-[20ch] text-[clamp(24px,4.5vh,52px)] font-bold leading-[1.15] text-white sm:mt-4 lg:mt-6 xl:mt-8 2xl:mt-10 2xl:max-w-[18ch] min-[2560px]:mt-12 min-[2560px]:text-[clamp(40px,3.5vh,64px)]">
              Admin Console for Demos &amp; Careers
            </h1>
            <p className="mt-2 max-w-[40rem] text-[clamp(12px,1.8vh,18px)] leading-relaxed text-[#a1b1cb] sm:mt-3 lg:mt-4 lg:leading-7 2xl:mt-5 2xl:leading-8 min-[2560px]:mt-6 min-[2560px]:text-[clamp(16px,1.6vh,22px)]">
              Sign in to manage customer demos, industry tags, and job postings.
              Updates appear instantly on the public Demo and Careers pages.
            </p>
          </div>

          <div className="relative z-10 mt-4 hidden min-h-0 flex-1 overflow-hidden rounded-[20px] border border-white/10 bg-white p-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] lg:mt-6 lg:block xl:mt-8 xl:rounded-[24px] xl:p-5 2xl:mt-10 2xl:max-w-[640px] 2xl:p-6 min-[1920px]:mt-12 min-[1920px]:max-w-[720px] min-[1920px]:p-8 min-[2560px]:max-w-[800px]">
            <img
              src={agileImage}
              alt=""
              aria-hidden
              className="mx-auto block h-full max-h-full w-full max-w-[480px] object-contain 2xl:max-w-[560px] min-[1920px]:max-w-[640px] min-[2560px]:max-w-[720px]"
            />
          </div>
        </section>

        {/* Auth form panel */}
        <section className="flex h-full min-h-0 items-center justify-center overflow-hidden px-5 py-4 sm:px-8 sm:py-6 lg:px-10 lg:py-8 xl:px-14 xl:py-10 2xl:px-16 2xl:py-12 min-[1920px]:px-20 min-[2560px]:px-24">
          <div className="w-full max-w-[400px] rounded-[20px] border border-[#d7e6f3] bg-white p-5 shadow-[0_20px_60px_-34px_rgba(17,61,119,0.4)] sm:max-w-[440px] sm:p-7 xl:max-w-[480px] xl:rounded-[24px] xl:p-8 2xl:max-w-[520px] 2xl:p-10 min-[1920px]:max-w-[560px] min-[1920px]:rounded-[28px] min-[1920px]:p-12 min-[2560px]:max-w-[640px] min-[2560px]:p-14">
            <h2 className="m-0 text-[clamp(22px,3.2vh,36px)] font-bold text-[#1F2432] min-[2560px]:text-[clamp(28px,2.8vh,42px)]">
              Welcome back
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-[#848b9b] sm:mt-2 2xl:mt-3 2xl:text-base 2xl:leading-7 min-[2560px]:text-lg">
              Sign in with your admin account to manage the website.
            </p>

            <form
              className="mt-5 flex flex-col gap-3.5 sm:mt-6 sm:gap-4 2xl:mt-8 2xl:gap-5 min-[2560px]:mt-10 min-[2560px]:gap-6"
              onSubmit={onSubmit}
            >
              <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a] 2xl:text-base min-[2560px]:text-lg">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-2.5 text-[#1F2432] outline-none transition focus:border-[#2365aa] sm:py-3 2xl:rounded-[14px] 2xl:px-4 2xl:py-3.5 2xl:text-base min-[2560px]:py-4 min-[2560px]:text-lg"
                  placeholder="Enter email"
                  autoComplete="username"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a] 2xl:text-base min-[2560px]:text-lg">
                Password
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-2.5 pr-11 text-[#1F2432] outline-none transition focus:border-[#2365aa] sm:py-3 2xl:rounded-[14px] 2xl:px-4 2xl:py-3.5 2xl:pr-12 2xl:text-base min-[2560px]:py-4 min-[2560px]:text-lg"
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 text-[#848b9b] 2xl:right-4"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              {error ? (
                <p className="m-0 rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa] 2xl:text-base">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-[#2365aa] py-2.5 pl-6 pr-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#1a5490] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3 2xl:py-3.5 2xl:pl-7 2xl:text-base min-[2560px]:py-4 min-[2560px]:text-lg"
              >
                {submitting ? "Please wait..." : "Enter dashboard"}
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2365aa] 2xl:h-9 2xl:w-9 min-[2560px]:h-10 min-[2560px]:w-10">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </span>
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
