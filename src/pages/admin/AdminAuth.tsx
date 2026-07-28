import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import worldMapBackground from "../../assets/homepage-icons/Group(3).png";
import agileImage from "../../assets/OurServices/agile-light.png";
import { getErrorMessage } from "../../lib/api";
import {
  getAuthSession,
  loginUser,
  registerUser,
} from "../../lib/auth";

type Mode = "login" | "signup";

export default function AdminAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (getAuthSession()) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);

      if (mode === "signup") {
        if (!name.trim()) {
          setError("Name is required for signup.");
          return;
        }
        const result = await registerUser({
          name: name.trim(),
          email: email.trim(),
          password,
        });
        setMessage(
          result.message ||
            "Account created. You can sign in now with your admin credentials.",
        );
        setMode("login");
        setPassword("");
        return;
      }

      await loginUser(email.trim(), password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(getErrorMessage(err, "Something went wrong."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1920px] lg:grid-cols-2 xl:grid-cols-[1.05fr_0.95fr] 2xl:grid-cols-[1.1fr_0.9fr]">
        {/* Brand panel */}
        <section className="relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-[#113d77] px-5 py-8 sm:min-h-[280px] sm:px-8 sm:py-10 lg:min-h-screen lg:px-10 lg:py-12 xl:px-14 xl:py-14 2xl:px-20 2xl:py-16">
          <img
            src={worldMapBackground}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[55%] w-[min(140%,1100px)] -translate-x-1/2 -translate-y-1/2 opacity-45 lg:top-1/2 lg:w-[130%] lg:max-w-[1400px] 2xl:w-[120%]"
          />

          <div className="relative z-10">
            <Link
              to="/"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8eb4df] no-underline sm:text-sm 2xl:text-base"
            >
              ElevateTrust.AI
            </Link>
            <h1 className="mt-5 max-w-[20ch] text-[clamp(28px,3.2vw,52px)] font-bold leading-[1.15] text-white lg:mt-8 2xl:mt-10 2xl:max-w-[18ch]">
              Admin Console for Demos &amp; Careers
            </h1>
            <p className="mt-4 max-w-[40rem] text-[clamp(13px,1.15vw,18px)] leading-7 text-[#a1b1cb] lg:mt-5 2xl:mt-6 2xl:leading-8">
              Sign in to manage customer demos, industry tags, and job postings.
              Updates appear instantly on the public Demo and Careers pages.
            </p>
          </div>

          <div className="relative z-10 mt-8 hidden overflow-hidden rounded-[24px] border border-white/10 bg-white p-4 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] sm:rounded-[28px] sm:p-5 lg:mt-10 lg:block xl:p-6 2xl:mt-12 2xl:max-w-[640px] 2xl:p-8">
            <img
              src={agileImage}
              alt=""
              aria-hidden
              className="mx-auto block h-auto w-full max-w-[480px] object-contain 2xl:max-w-[560px]"
            />
          </div>
        </section>

        {/* Auth form panel */}
        <section className="flex items-center justify-center px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-14 2xl:px-20">
          <div className="w-full max-w-[440px] rounded-[24px] border border-[#d7e6f3] bg-white p-5 shadow-[0_20px_60px_-34px_rgba(17,61,119,0.4)] sm:max-w-[480px] sm:p-8 xl:max-w-[520px] xl:rounded-[28px] xl:p-10 2xl:max-w-[560px] 2xl:p-12">
            <div className="mb-5 flex rounded-full bg-[#EFF7FC] p-1 sm:mb-6 2xl:mb-8">
              {(["login", "signup"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setMode(item);
                    setError("");
                    setMessage("");
                  }}
                  className={`flex-1 cursor-pointer rounded-full border-0 py-2.5 text-sm font-semibold capitalize transition-colors 2xl:py-3 2xl:text-base ${
                    mode === item
                      ? "bg-[#113d77] text-white"
                      : "bg-transparent text-[#2365aa]"
                  }`}
                >
                  {item === "login" ? "Login" : "Sign up"}
                </button>
              ))}
            </div>

            <h2 className="m-0 text-[clamp(24px,2.4vw,36px)] font-bold text-[#1F2432]">
              {mode === "login" ? "Welcome back" : "Create admin account"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#848b9b] 2xl:mt-3 2xl:text-base 2xl:leading-7">
              {mode === "login"
                ? "Sign in with your admin account to manage the website."
                : "The first registered account becomes admin. Later signups cannot access the dashboard."}
            </p>

            <form className="mt-6 flex flex-col gap-4 2xl:mt-8 2xl:gap-5" onSubmit={onSubmit}>
              {mode === "signup" ? (
                <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a] 2xl:text-base">
                  Full name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 text-[#1F2432] outline-none transition focus:border-[#2365aa] 2xl:rounded-[14px] 2xl:px-4 2xl:py-3.5 2xl:text-base"
                    placeholder="Admin name"
                  />
                </label>
              ) : null}

              <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a] 2xl:text-base">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 text-[#1F2432] outline-none transition focus:border-[#2365aa] 2xl:rounded-[14px] 2xl:px-4 2xl:py-3.5 2xl:text-base"
                  placeholder="admin@elevatetrust.ai"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-[#5a5a5a] 2xl:text-base">
                Password
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-[12px] border border-[#d7e6f3] bg-[#f8fbfd] px-3.5 py-3 pr-11 text-[#1F2432] outline-none transition focus:border-[#2365aa] 2xl:rounded-[14px] 2xl:px-4 2xl:py-3.5 2xl:pr-12 2xl:text-base"
                    placeholder="Enter password"
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
                <p className="m-0 rounded-[12px] bg-[#fde8e8] px-3 py-2 text-sm text-[#b42318] 2xl:text-base">
                  {error}
                </p>
              ) : null}
              {message ? (
                <p className="m-0 rounded-[12px] bg-[#e8f6ee] px-3 py-2 text-sm text-[#1d5c3a] 2xl:text-base">
                  {message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-[#2365aa] py-3 pl-6 pr-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#1a5490] disabled:cursor-not-allowed disabled:opacity-70 2xl:py-3.5 2xl:pl-7 2xl:text-base"
              >
                {submitting
                  ? "Please wait..."
                  : mode === "login"
                    ? "Enter dashboard"
                    : "Create account"}
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2365aa] 2xl:h-9 2xl:w-9">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </span>
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#848b9b] 2xl:mt-8 2xl:text-base">
              <Link to="/" className="font-semibold text-[#2365aa] no-underline hover:underline">
                Back to website
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
