/* ── Success ─────────────────────────────────────────── */

import { IconCircleCheck } from "@tabler/icons-react";
import {
  AuthHeading,
  AuthPrimaryBtn,
  AuthStepCard,
  AuthSub,
} from "./shared/shared";
import { motion } from "motion/react";

const AuthSuccess = () => {
  return (
    <AuthStepCard center>
      <motion.div
        className="text-5xl mb-2"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <IconCircleCheck size={60} className="text-green-500" />
      </motion.div>
      <AuthHeading>
        <span className="text-green-500">You're in!</span>
      </AuthHeading>
      <AuthSub>Welcome to WinHub. Start scratching and winning.</AuthSub>
      <AuthPrimaryBtn onClick={() => {}}>Go to Dashboard →</AuthPrimaryBtn>
    </AuthStepCard>
  );
};

export default AuthSuccess;
