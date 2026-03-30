import { useState, type FC } from "react";
import {
  AuthFieldLabel,
  AuthHeading,
  AuthInput,
  AuthPrimaryBtn,
  AuthStepCard,
  AuthSub,
  type AuthMode,
} from "@/components/Auth/shared/shared";
import { motion } from "motion/react";
import { IconDeviceMobile, IconMail } from "@tabler/icons-react";

/* ── Auth Entry ─ (Step 1) ─────────────────────────────── */
const AuthEntry: FC<{ onNext: () => void }> = ({ onNext }) => {
  const [mode, setMode] = useState<AuthMode>("email");
  const [value, setValue] = useState("");

  return (
    <AuthStepCard>
      <AuthHeading>Welcome to WinHub</AuthHeading>
      <AuthSub>Sign in or create an account — it takes seconds.</AuthSub>

      {/* Mode toggle */}

      <div className="flex bg-surface rounded-xl p-1 mb-5 gap-1 relative overflow-hidden">
        {/* The Sliding Pill */}
        {(["email", "phone"] as AuthMode[]).map((m) => (
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

      <AuthFieldLabel>
        {mode === "email" ? "Email address" : "Phone number"}
      </AuthFieldLabel>
      <AuthInput
        placeholder={mode === "email" ? "you@example.com" : "+256 700 000 000"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-xs text-slate-700 mt-2 mb-6 leading-relaxed">
        {mode === "email"
          ? "We'll send a one-time code to this email."
          : "We'll send a one-time code via SMS."}
      </p>

      <AuthPrimaryBtn onClick={onNext} disabled={!value.trim()}>
        Continue →
      </AuthPrimaryBtn>
    </AuthStepCard>
  );
};

export default AuthEntry;
