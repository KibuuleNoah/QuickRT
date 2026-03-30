import { AuthCtx } from "@/contexts/AuthCtx";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthCtx);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
