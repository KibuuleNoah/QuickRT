import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggleBtn from "@/components/ThemeToggleBtn";
import AppConfig from "@/lib/appConfig";
import AuthOTP from "@/components/Auth/AuthOTP";
import AuthEntry from "@/components/Auth/AuthEntry";
import AuthProfileSetup from "@/components/Auth/AuthProfileSetup";
import AuthSuccess from "@/components/Auth/AuthSuccess";
import type { AuthStep, AuthWith } from "@/components/Auth/shared/shared";
import { useNavTree } from "@/hooks/DashboardLayoutI/useNavTree";
import { AuthProvider } from "@/contexts/AuthCtx";

const STEPS: AuthStep[] = ["entry", "otp", "profile"];
const stepMeta = [
  { label: "Get Started", hint: "Enter your email or phone to begin" },
  { label: "Verify", hint: "We sent you a 6-digit code" },
  { label: "Your Profile", hint: "Almost there — just a few details" },
];

/* ── Auth Step Indicator ──────────────────────────────────── */
const AuthStepIndicator = ({ current }: { current: number }) => (
  <div className="flex items-center">
    {STEPS.map((_, i) => (
      <div key={i} className="flex items-center flex-1 last:flex-none">
        <motion.div
          className={[
            "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 relative",
            i === current
              ? "border-brand-900 ring-4 ring-brand-500 after:absolute after:inset-0 after:rounded-full after:ring-4 after:ring-brand-500 after:animate-ripple"
              : i < current
                ? "border-brand-700"
                : "border-slate-500 bg-surface",
          ].join(" ")}
          animate={{ scale: i === current ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {i < current && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              width="10"
              height="10"
              viewBox="0 0 10 10"
            >
              <polyline
                points="1.5,5 4,7.5 8.5,2.5"
                stroke="var(--color-brand-700)"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </motion.div>
        {i < STEPS.length - 1 && (
          <motion.div
            className="flex-1 h-px mx-1 bg-brand-700 origin-left"
            animate={{ scaleX: i < current ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        )}
      </div>
    ))}
  </div>
);

/* ── ROOT ────────────────────────────────────────────── */
const AuthFlow = () => {
  const { navTreeCurrent, navTreeAppend, navTreePop } = useNavTree(
    "0",
    "moxie-nav-tree",
  );
  const step = parseInt(navTreeCurrent);
  const [identifier, setIdentifier] = useState("");

  // const [authUserID, setAuthUserID] = useState<string>("");
  const [otpExpiryDate, setOtpExpiryDate] = useState<string>("");

  const [authWith, setAuthWith] = useState<AuthWith>("email");

  // const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   localStorage.setItem("kty_auth_step", authStep);
  // }, [authStep]);
  //
  // useEffect(() => {
  //   localStorage.setItem("kty_auth_otp_id", authOTPID);
  // }, [authOTPID]);

  useEffect(() => {
    localStorage.setItem("kty_otp_expiry_date", otpExpiryDate);
  }, [otpExpiryDate]);

  const next = () => navTreeAppend(`${parseInt(navTreeCurrent) + 1}`);
  const back = () => navTreePop();

  console.log(step, navTreeCurrent);
  const renderAuthStep = () => {
    switch (step) {
      case 0:
        return <AuthEntry onNext={next} />;
      case 1:
        return <AuthOTP onNext={next} onBack={back} />;
      case 2:
        return <AuthProfileSetup onNext={next} onBack={back} />;
      default:
        return <AuthSuccess />;
    }
  };

  return (
    <AuthProvider
      data={{
        identifier,
        setIdentifier,
        otpExpiryDate,
        setOtpExpiryDate,
        authWith,
        setAuthWith,
      }}
    >
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden
        bg-brand-50 transition-colors duration-300"
      >
        {/* Brand-tinted atmosphere — faint, not colourful */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-brand-50 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-brand-50 blur-[110px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-50 blur-[180px]" />

        {/* Card */}
        <div
          className="relative z-10 w-full max-w-[420px] mx-4
          bg-brand-50 border border-brand-400 rounded-2xl
          px-8 pt-8 pb-10
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          shadow-brand-300
        "
        >
          <ThemeToggleBtn />
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-[20px] text-brand-700 leading-none">◈</span>
            <span
              className="font-bold text-[19px] text-text-primary tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {AppConfig.appName}
            </span>
            <span
              className="ml-auto text-[10px] font-semibold tracking-widest uppercase
              text-primary border border-primary/25 bg-primary/5 px-2 py-0.5 rounded-full"
            >
              Beta
            </span>
          </div>

          {/* Hairline divider with brand glow centre */}
          <div className="relative h-px mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-px bg-primary/40" />
          </div>

          {/* Step indicator */}
          {step < 3 && (
            <div className="mb-7">
              <AuthStepIndicator current={step} />
              <motion.p
                key={step}
                className="text-[11px] text-slate-700 tracking-wide mt-2.5"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Step {step + 1} of 3 —{" "}
                <span className="">{stepMeta[step].label}</span>
              </motion.p>
            </div>
          )}

          {/* Step content */}
          <AnimatePresence mode="wait">
            <div key={step}>{renderAuthStep()}</div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="absolute bottom-5 text-[11px] text-text-secondary/30 tracking-wide">
          © {new Date().getFullYear()} {AppConfig.appName} · All rights reserved
        </p>
      </div>
    </AuthProvider>
  );
};

export default AuthFlow;
