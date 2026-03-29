import { DashboardLayoutProvider } from "@/contexts/DashboardLayoutICtx";
import DashboardLayoutI from "@/layouts/DashboardLayoutI";
import { useEffect, useState } from "react";
import {
  IconLayoutDashboard,
  IconRocket,
  IconWallet,
  IconCloudUpload,
} from "@tabler/icons-react";
import type { CustomLink } from "@/lib/types";

const BASE_VIEWS = ["Home", "Settings", "Analytics", "Review Content"];
const NAV_LINKS: CustomLink[] = [
  {
    path: "/",
    label: "Home",
    icon: <IconLayoutDashboard size={25} stroke={1.5} />,
  },
  {
    path: "/home",
    label: "Settings",
    icon: <IconRocket size={25} stroke={1.5} />,
  },
  {
    path: "/submissions", // Standard path for your new page
    label: "Submissions",
    icon: <IconCloudUpload size={25} stroke={1.5} />,
  },
  {
    path: "/wallet",
    label: "Wallet",
    icon: <IconWallet size={25} stroke={1.5} />,
  },
];

const UserDashboard = () => {
  const [activeView, setActiveView] = useState("Home");
  // Used by the back btn to travese views
  const [viewNavTree, setViewNavTree] = useState<string[]>(["Home"]);

  useEffect(() => {
    (() => {
      if (BASE_VIEWS.includes(activeView) && viewNavTree.length != 1) {
        setViewNavTree([activeView]);
      } else if (!viewNavTree.includes(activeView)) {
        setViewNavTree((prev) => [...prev, activeView]);
      }

      console.log(viewNavTree);
    })();
  }, [activeView, viewNavTree]);

  const renderContent = () => {
    switch (activeView) {
      case "Settings":
        return <>Settings </>;
      case "Invite Creators":
        return <>InviteCreators </>;
      case "Analytics":
        return <>Analytics </>;
      case "Review Content":
        return <>ReviewContent </>;
      case "Create Campaign":
        return <>CreateCampaign </>;
      case "Campaign Details":
        return <>CampaignDetail </>;
      default:
        return <>Home </>;
    }
  };

  return (
    <DashboardLayoutProvider
      data={{
        activeView,
        setActiveView,
        viewNavTree,
        setViewNavTree,
      }}
    >
      <DashboardLayoutI navLinks={NAV_LINKS}>
        UserDashboard
        <div className="grid grid-cols-3 gap-3 w-full max-w-sm p-4 bg-white rounded-2xl shadow-2xl border border-slate-100">
          <div className="h-24 bg-brand-100 rounded-lg flex items-end p-2 border border-brand-200/50">
            <span className="text-[10px] font-bold text-brand-900">100</span>
          </div>
          <div className="h-24 bg-brand-200 rounded-lg flex items-end p-2">
            <span className="text-[10px] font-bold text-brand-900">200</span>
          </div>
          <div className="h-24 bg-brand-300 rounded-lg flex items-end p-2">
            <span className="text-[10px] font-bold text-brand-900">300</span>
          </div>

          <div className="h-24 bg-brand-400 rounded-lg flex items-end p-2">
            <span className="text-[10px] font-bold text-white">400</span>
          </div>
          <div className="h-24 bg-brand-500 rounded-lg flex items-end p-2 ring-2 ring-brand-600 ring-offset-2">
            <span className="text-[10px] font-bold text-white">500</span>
          </div>
          <div className="h-24 bg-brand-600 rounded-lg flex items-end p-2">
            <span className="text-[10px] font-bold text-white">600</span>
          </div>

          <div className="h-24 bg-brand-700 rounded-lg flex items-end p-2">
            <span className="text-[10px] font-bold text-white">700</span>
          </div>
          <div className="h-24 bg-brand-800 rounded-lg flex items-end p-2">
            <span className="text-[10px] font-bold text-white">800</span>
          </div>
          <div className="h-24 bg-brand-900 rounded-lg flex items-end p-2">
            <span className="text-[10px] font-bold text-white">900</span>
          </div>
        </div>
      </DashboardLayoutI>
    </DashboardLayoutProvider>
  );
};

export default UserDashboard;
