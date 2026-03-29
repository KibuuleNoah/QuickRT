export type AuthStep = "AUTH_ENTRY" | "OTP_VERIFY";

export interface AlertType {
  message: string;
  type?: "success" | "error" | "info";
}

export enum AuthWith {
  MOBILE = "mobile",
  Email = "email",
}

export interface CustomLink {
  path: string;
  label: string;
  icon: React.ReactNode;
  handleOnClick?: () => void;
}
