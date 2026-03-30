export interface AlertType {
  message: string;
  type?: "success" | "error" | "info";
}

export interface CustomLink {
  path: string;
  label: string;
  icon: React.ReactNode;
  handleOnClick?: () => void;
}
