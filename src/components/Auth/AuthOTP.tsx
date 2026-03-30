import { useEffect, useState, type ChangeEvent, type FC } from "react";
import {
  AuthBtnRow,
  AuthFieldLabel,
  AuthGhostBtn,
  AuthHeading,
  AuthPrimaryBtn,
  AuthStepCard,
  AuthSub,
} from "@/components/Auth/shared/shared";
import { motion } from "motion/react";
import { useAuth } from "@/hooks/DashboardLayoutI/useAuth";
import { GetRemainingCooldown } from "@/lib/helpers";

/* ── Step 2: OTP Entry ───────────────────────────────── */
const AuthOTP: FC<{
  onNext: () => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const { otpExpiryDate, setOtpExpiryDate } = useAuth();

  useEffect(() => {
    setOtpExpiryDate(new Date(Date.now() + 12000).toISOString());
  }, []);

  const [timeLeft, setTimeLeft] = useState(GetRemainingCooldown(otpExpiryDate));

  useEffect(() => {
    // Initial check
    const initial = GetRemainingCooldown(otpExpiryDate);
    setTimeLeft(initial);

    // If already expired, don't start timer
    if (initial.isExpired) return;

    // Update every second
    const timer = setInterval(() => {
      const remaining = GetRemainingCooldown(otpExpiryDate);
      setTimeLeft(remaining);

      if (remaining.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [otpExpiryDate]);

  // Restart if lastRequestDate changes
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

  const handleResend = async () => {};

  return (
    <AuthStepCard>
      <AuthHeading>Check your inbox</AuthHeading>
      <AuthSub>Enter the 6-digit code we just sent you.</AuthSub>

      <AuthFieldLabel>Verification code</AuthFieldLabel>
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
            className={`

    w-8 h-10 flex items-center justify-center leading-none box-border
    
    flex-1 aspect-square max-w-[52px] rounded-xl border text-center text-[20px] font-bold outline-hidden transition-all duration-200 font-['Syne']
    border-slate-300 bg-surface text-brand-500
    focus:border-brand-500 focus:ring-3 focus:ring-brand-200
    ${digit ? "border-brand-500 text-brand-500 bg-brand-500/6" : ""}
              `}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <p className="text-xs text-slate-700 font-bold mt-2 mb-6 leading-relaxed">
          Didn't get it?{" "}
          <button
            disabled={!timeLeft.isExpired}
            className="text-blue-500 text-xs underline underline-offset-2 bg-transparent border-none cursor-pointer p-0 disabled:text-slate-400"
          >
            Resend code
          </button>
        </p>
        <p>
          <span className="font-bold text-orange-400">
            <span className="text-xs">New Code In</span> {timeLeft.formatted}
          </span>
        </p>
      </div>

      <AuthBtnRow>
        <AuthGhostBtn onClick={onBack}>← Back</AuthGhostBtn>
        <AuthPrimaryBtn onClick={onNext} disabled={!filled}>
          Verify →
        </AuthPrimaryBtn>
      </AuthBtnRow>
    </AuthStepCard>
  );
};
// <div className="flex flex-col items-center gap-3">
//             <button
//               type="button"
//               onClick={handleResend}
//               disabled={timeLeft.isExpired}
//               className="text-[10px] font-black uppercase tracking-widest transition-colors"
//               style={{
//                 color: !timeLeft.isExpired
//                   ? "var(--color-resend-disabled)"
//                   : "var(--color-text-primary)",
//                 cursor: !timeLeft.isExpired ? "not-allowed" : "pointer",
//               }}
//             >
//               Didn't receive the code?{" "}
//               {!timeLeft.isExpired ? (
//                 <span style={{ color: "var(--color-resend-disabled)" }}>
//                   Request again in {timeLeft.formatted}
//                 </span>
//               ) : (
//                 <span style={{ color: "var(--color-resend-active)" }}>
//                   Resend.
//                 </span>
//               )}
//             </button>
//
//             {!timeLeft.isExpired && (
//               <p
//                 className="text-[11px] text-center max-w-xs"
//                 style={{ color: "var(--color-resend-hint)" }}
//               >
//                 For security reasons, you can request a new code once the timer
//                 finishes. Please also check your spam folder.
//               </p>
//             )}
//           </div>

export default AuthOTP;
