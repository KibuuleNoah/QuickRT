import { useState, type FC } from "react";
import {
  AuthBtnRow,
  AuthFieldLabel,
  AuthGhostBtn,
  AuthHeading,
  AuthInput,
  AuthPrimaryBtn,
  AuthStepCard,
  AuthSub,
} from "./shared/shared";

/* ── Step 3: Profile ─────────────────────────────────── */
const AuthProfileSetup: FC<{
  onNext: () => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  return (
    <AuthStepCard>
      <AuthHeading>Set up your profile</AuthHeading>
      <AuthSub>Choose a username and tell us your name.</AuthSub>

      <div className="space-2">
        <AuthFieldLabel>Full name</AuthFieldLabel>
        <AuthInput
          placeholder="e.g. Noah Kiggundu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <AuthFieldLabel>Username</AuthFieldLabel>
        <div className="relative flex items-center">
          <AuthInput
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
      </div>

      <AuthBtnRow>
        <AuthGhostBtn onClick={onBack}>← Back</AuthGhostBtn>
        <AuthPrimaryBtn
          onClick={onNext}
          disabled={!username.trim() || !name.trim()}
        >
          Let's go
        </AuthPrimaryBtn>
      </AuthBtnRow>
    </AuthStepCard>
  );
};

export default AuthProfileSetup;
