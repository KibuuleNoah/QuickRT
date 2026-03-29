import React, { useState, ChangeEvent, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggleBtn from "@/components/ThemeToggleBtn";
import { IconDeviceMobile, IconMail } from "@tabler/icons-react";

type Step = "entry" | "otp" | "profile";
type Mode = "email" | "phone";

const STEPS: Step[] = ["entry", "otp", "profile"];

const stepMeta = [
  { label: "Get Started", hint: "Enter your email or phone to begin" },
  { label: "Verify", hint: "We sent you a 6-digit code" },
  { label: "Your Profile", hint: "Almost there — just a few details" },
];

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  className = "",
  ...props
}: InputProps) => {
  const id = useId(); // Generates a unique ID for accessibility

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          h-[3rem] w-full px-3 py-2 rounded-sm rounded-tl-xl rounded-br-xl border bg-white outline-brand-600 
          text-slate-900 placeholder:text-slate-400
          transition-all duration-200 outline-hidden
          ${
            error
              ? "border-red-500 ring-1 ring-red-500"
              : "border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20"
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
/* ── Step Indicator ──────────────────────────────────── */
const StepIndicator = ({ current }: { current: number }) => (
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

/* ── Step 1: Auth Entry ──────────────────────────────── */
function StepEntry({ onNext }: { onNext: () => void }) {
  const [mode, setMode] = useState<Mode>("email");
  const [value, setValue] = useState("");

  return (
    <StepCard>
      <Heading>Welcome to WinHub</Heading>
      <Sub>Sign in or create an account — it takes seconds.</Sub>

      {/* Mode toggle */}

      <div className="flex bg-surface rounded-xl p-1 mb-5 gap-1 relative overflow-hidden">
        {/* The Sliding Pill */}
        {(["email", "phone"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setValue("");
            }}
            className={[
              "relative flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-[13px] font-medium cursor-pointer transition-colors duration-300 z-10",
              mode === m
                ? "text-brand-500"
                : "text-text-secondary hover:text-text-primary",
            ].join(" ")}
          >
            {/* Background Pill Animation */}
            {mode === m && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white shadow-sm rounded-lg z-0"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {m === "email" ? (
                <IconMail size={16} stroke={1.5} />
              ) : (
                <IconDeviceMobile size={16} stroke={1.5} />
              )}
              <span className="capitalize">{m}</span>
            </span>
          </button>
        ))}
      </div>

      <FieldLabel>
        {mode === "email" ? "Email address" : "Phone number"}
      </FieldLabel>
      {/*<motion.input
        key={mode}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        placeholder={mode === "email" ? "you@example.com" : "+256 700 000 000"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="auth-input"
      />*/}
      <Input />
      <p className="text-xs text-slate-700 mt-2 mb-6 leading-relaxed">
        {mode === "email"
          ? "We'll send a one-time code to this email."
          : "We'll send a one-time code via SMS."}
      </p>

      <PrimaryBtn onClick={onNext} disabled={!value.trim()}>
        Continue →
      </PrimaryBtn>
    </StepCard>
  );
}

/* ── Step 2: OTP Entry ───────────────────────────────── */
function StepOTP({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const handleKey = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const val = e.target.value.replace(/\D/, "");
    if (
      !val &&
      (e.nativeEvent as InputEvent).inputType === "deleteContentBackward"
    ) {
      const next = [...otp];
      next[i] = "";
      setOtp(next);
      if (i > 0) document.getElementById(`otp-${i - 1}`)?.focus();
      return;
    }
    if (!val) return;
    const next = [...otp];
    next[i] = val[val.length - 1];
    setOtp(next);
    if (i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const filled = otp.every((d) => d !== "");

  return (
    <StepCard>
      <Heading>Check your inbox</Heading>
      <Sub>Enter the 6-digit code we just sent you.</Sub>

      <FieldLabel>Verification code</FieldLabel>
      <div className="flex gap-2 mb-1">
        {otp.map((digit, i) => (
          <motion.input
            key={i}
            id={`otp-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            maxLength={1}
            value={digit}
            onChange={(e) => handleKey(e, i)}
            onFocus={(e) => e.target.select()}
            className={["otp-cell", digit ? "otp-filled" : ""].join(" ")}
          />
        ))}
      </div>
      <p className="text-xs text-slate-700 font-bold mt-2 mb-6 leading-relaxed">
        Didn't get it?{" "}
        <button className="text-blue-500 text-xs underline underline-offset-2 bg-transparent border-none cursor-pointer p-0">
          Resend code
        </button>
      </p>

      <BtnRow>
        <GhostBtn onClick={onBack}>← Back</GhostBtn>
        <PrimaryBtn onClick={onNext} disabled={!filled}>
          Verify →
        </PrimaryBtn>
      </BtnRow>
    </StepCard>
  );
}

/* ── Step 3: Profile ─────────────────────────────────── */
function StepProfile({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  return (
    <StepCard>
      <Heading>Set up your profile</Heading>
      <Sub>Choose a username and tell us your name.</Sub>

      <FieldLabel>Full name</FieldLabel>
      <input
        className="auth-input mb-4"
        placeholder="e.g. Noah Kiggundu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <FieldLabel>Username</FieldLabel>
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-primary text-[15px] font-semibold pointer-events-none select-none z-10">
          @
        </span>
        <input
          className="auth-input pl-8"
          placeholder="your_handle"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value.toLowerCase().replace(/\s/g, "_"))
          }
        />
      </div>
      <p className="text-xs text-text-secondary/60 mt-2 mb-6 leading-relaxed">
        This is how other users will see you on WinHub.
      </p>

      <BtnRow>
        <GhostBtn onClick={onBack}>← Back</GhostBtn>
        <PrimaryBtn
          onClick={onNext}
          disabled={!username.trim() || !name.trim()}
        >
          Let's go 🎉
        </PrimaryBtn>
      </BtnRow>
    </StepCard>
  );
}

/* ── Success ─────────────────────────────────────────── */
function StepSuccess() {
  return (
    <StepCard center>
      <motion.div
        className="text-5xl mb-2"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        🏆
      </motion.div>
      <Heading>You're in!</Heading>
      <Sub>Welcome to WinHub. Start scratching and winning.</Sub>
      <PrimaryBtn onClick={() => {}}>Go to Dashboard →</PrimaryBtn>
    </StepCard>
  );
}

/* ── Primitives ──────────────────────────────────────── */
function StepCard({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <motion.div
      className={[
        "w-full",
        center ? "flex flex-col items-center text-center gap-2" : "",
      ].join(" ")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[22px] font-bold tracking-tight text-text-primary mb-1.5">
      {children}
    </h2>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-slate-700 leading-relaxed mb-6">{children}</p>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-semibold tracking-widest uppercase text-text-secondary mb-2">
      {children}
    </label>
  );
}

function PrimaryBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      className="flex-1 w-full mt-1 py-3.5 px-5 rounded-xl border-none bg-gradient-to-br from-primary to-primary-dark text-text-dark font-bold text-[14px] tracking-wide cursor-pointer transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {children}
    </motion.button>
  );
}

function GhostBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="py-3.5 px-5 rounded-xl border border-border bg-transparent text-text-secondary text-sm font-medium cursor-pointer transition-all duration-200 hover:border-text-secondary/40 hover:text-text-primary shrink-0"
    >
      {children}
    </button>
  );
}

function BtnRow({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2.5 mt-1">{children}</div>;
}

/* ── Root ────────────────────────────────────────────── */
export default function AuthFlow() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const screens = [
    <StepEntry onNext={next} />,
    <StepOTP onNext={next} onBack={back} />,
    <StepProfile onNext={next} onBack={back} />,
    <StepSuccess />,
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        /* Only scoped styles that Tailwind can't handle cleanly inline */
        .auth-input {
          width: 100%;
          border-radius: 0.75rem;
          padding: 13px 16px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          /* dark (default) */
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
        }
        .auth-input::placeholder { color: #4b5563; }
        .auth-input:focus {
          border-color: var(--color-focus);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-focus) 13%, transparent);
        }
        @media (prefers-color-scheme: light) {
          .auth-input {
            background: #f9fafb;
            border-color: #e5e7eb;
            color: var(--color-text-dark);
          }
          .auth-input::placeholder { color: #9ca3af; }
        }

        .otp-cell {
          flex: 1;
          aspect-ratio: 1;
          max-width: 52px;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          color: var(--color-text-primary);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: 'Syne', sans-serif;
        }
        .otp-cell:focus {
          border-color: var(--color-focus);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-focus) 13%, transparent);
        }
        .otp-filled {
          border-color: var(--color-primary);
          color: var(--color-primary);
          background: color-mix(in srgb, var(--color-primary) 6%, transparent);
        }
        @media (prefers-color-scheme: light) {
          .otp-cell {
            background: #f9fafb;
            border-color: #e5e7eb;
            color: var(--color-text-dark);
          }
        }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden
        bg-brand-100 transition-colors duration-300"
      >
        {/* Brand-tinted atmosphere — faint, not colourful */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-brand-100 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-brand-100 blur-[110px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-100 blur-[180px]" />

        {/* Card */}
        <div
          className="relative z-10 w-full max-w-[420px] mx-4
          bg-brand-100 border border-brand-400 rounded-2xl
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
              WinHub
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
              <StepIndicator current={step} />
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
            <div key={step}>{screens[step]}</div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="absolute bottom-5 text-[11px] text-text-secondary/30 tracking-wide">
          © {new Date().getFullYear()} WinHub · All rights reserved
        </p>
      </div>
    </>
  );
}
