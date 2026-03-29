import type React from "react";
import type { CustomLink } from "@/lib/types";

import { useDashboarLayoutI } from "@/hooks/DashboardLayoutI/useDashboarLayoutI";

const TopNavLink: React.FC<{
  link: CustomLink;
}> = ({ link }) => {
  const { activeView, setActiveView } = useDashboarLayoutI();

  return (
    <a
      onClick={link.handleOnClick ?? (() => setActiveView(link.label))}
      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-500 ease-out group/nav ${
        activeView == link.label
          ? "bg-teal-500 text-black shadow-[0_4px_15px_rgba(20,184,166,0.3)]"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <div
        className={`${
          activeView == link.label
            ? "scale-110"
            : "scale-100 opacity-60 group-hover/nav:opacity-100"
        } transition-transform duration-500`}
      >
        {link.icon}
      </div>
      <span
        className={`text-[10px] font-black tracking-[0.2em] whitespace-nowrap overflow-hidden transition-all duration-700 ease-in-out ${
          activeView == link.label
            ? "max-w-[120px] opacity-100"
            : "max-w-0 opacity-0"
        }`}
      >
        {link.label}
      </span>
    </a>
  );
};

export default TopNavLink;
