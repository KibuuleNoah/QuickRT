import { DashboardLayoutICtx } from "@/contexts/DashboardLayoutICtx";
import { useContext } from "react";

export const useDashboarLayoutI = () => {
  const context = useContext(DashboardLayoutICtx);

  if (context === undefined) {
    throw new Error(
      "useBrandDashboard must be used within a BrandDashboardProvider",
    );
  }

  return context;
};
