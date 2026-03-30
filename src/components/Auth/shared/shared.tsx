import React, { useId, type FC } from "react";
import { motion } from "motion/react";

export type AuthWith = "mobile" | "email";
export type AuthStep = "entry" | "otp" | "profile";
export type AuthMode = "email" | "phone";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const AuthInput: FC<AuthInputProps> = ({
  label,
  error,
  onChange,
  value,
  placeholder,
  className = "",
  ...props
}) => {
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
        onChange={onChange}
        value={value}
        placeholder={placeholder}
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

export const AuthStepCard: FC<{
  children: React.ReactNode;
  center?: boolean;
}> = ({ children, center }) => {
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
};

export const AuthHeading: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h2 className="text-[22px] font-bold tracking-tight text-text-primary mb-1.5">
      {children}
    </h2>
  );
};

export const AuthSub: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p className="text-sm text-slate-700 leading-relaxed mb-6">{children}</p>
  );
};

export const AuthFieldLabel: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <label className="block text-[11px] font-semibold tracking-widest uppercase text-text-secondary mb-2">
      {children}
    </label>
  );
};

export const AuthPrimaryBtn: FC<{
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}> = ({ children, onClick, disabled }) => {
  return (
    <motion.button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      whileHover={!disabled ? { scale: 1.01 } : {}}
      className={`
        flex-1 w-full mt-1 py-3.5 px-5 rounded-xl text-[14px] font-bold tracking-wide
        
        bg-brand-500 text-white shadow-sm
        
        hover:bg-brand-700 active:bg-brand-800
        transition-all duration-200 cursor-pointer border-none
        
        disabled:bg-slate-400 disabled:text-slate-600 
        disabled:shadow-none disabled:cursor-not-allowed
      `}
    >
      {children}
    </motion.button>
  );
};

export const AuthGhostBtn: FC<{
  children: React.ReactNode;
  onClick: () => void;
}> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-3.5 px-5 rounded-xl border border-border bg-transparent text-text-secondary text-sm font-medium cursor-pointer transition-all duration-200 hover:border-text-secondary/40 hover:text-text-primary shrink-0"
    >
      {children}
    </button>
  );
};

export const AuthBtnRow: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex gap-2.5 mt-1">{children}</div>;
};
