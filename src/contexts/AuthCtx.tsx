import type { AuthWith } from "@/components/Auth/shared/shared";
import React, {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface AuthCtxType {
  identifier: string;
  setIdentifier: Dispatch<SetStateAction<string>>;
  otpExpiryDate: string;
  setOtpExpiryDate: Dispatch<SetStateAction<string>>;
  authWith: AuthWith;
  setAuthWith: Dispatch<SetStateAction<AuthWith>>;
}

export const AuthCtx = React.createContext<AuthCtxType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: ReactNode;
  data: AuthCtxType;
}> = ({ children, data }) => {
  return <AuthCtx.Provider value={data}>{children}</AuthCtx.Provider>;
};
