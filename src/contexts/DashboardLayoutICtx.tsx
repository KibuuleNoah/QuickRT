import React, {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface DashboardLayoutICtxType {
  ctxType?: string;
  activeView: string;
  setActiveView: Dispatch<SetStateAction<string>>;
  viewNavTree: string[];
  setViewNavTree: Dispatch<SetStateAction<string[]>>;
}

export const DashboardLayoutICtx = React.createContext<
  DashboardLayoutICtxType | undefined
>(undefined);

export const DashboardLayoutProvider: React.FC<{
  children: ReactNode;
  data: DashboardLayoutICtxType;
}> = ({ children, data }) => {
  return (
    <DashboardLayoutICtx.Provider value={data}>
      {children}
    </DashboardLayoutICtx.Provider>
  );
};
