import { useState } from "react";
import type React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDots,
} from "@tabler/icons-react";
import { useDashboarLayoutI } from "@/hooks/DashboardLayoutI/useDashboarLayoutI";
import type { CustomLink } from "@/lib/types";

export const RetractableSidebarItem: React.FC<{
  link: any;
  badge?: boolean;
  sidebarExpanded: boolean;
}> = ({ link, badge, sidebarExpanded }) => {
  const { activeView, setActiveView } = useDashboarLayoutI();

  return (
    <li
      onClick={() => setActiveView(link.label)}
      className={`relative flex items-center py-3 rounded-xl transition-all duration-300 font-bold text-sm tracking-tight cursor-pointer group
        ${sidebarExpanded ? "px-4" : "px-0 justify-center"} 
        ${
          activeView === link.label
            ? "bg-brand-100 text-brand-500 border border-brand-200"
            : "text-slate-500 hover:bg-white/5 hover:text-white"
        }`}
    >
      {/* Icon Container: Fixed size ensures it never disappears */}
      <div className="flex items-center justify-center min-w-[24px]">
        {link.icon}
      </div>

      {/* Label: Transition width and opacity for a smoother "fade" out */}
      <span
        className={`overflow-hidden transition-all duration-300 whitespace-nowrap
        ${sidebarExpanded ? "w-40 ml-4 opacity-100" : "w-0 opacity-0"}`}
      >
        {link.label}
      </span>

      {badge && (
        <div
          className={`absolute w-2 h-2 rounded bg-teal-400 
          ${sidebarExpanded ? "right-4" : "top-2 right-2"}`}
        />
      )}

      {/* Tooltip: Shows only when retracted */}
      {!sidebarExpanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-teal-500 text-black text-xs font-bold invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-[300]">
          {link.label}
        </div>
      )}
    </li>
  );
};

const RetractableSidebar: React.FC<{
  links: CustomLink[];
}> = ({ links }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    // Controlled width: w-64 when open, w-20 when closed
    <aside
      className={`block fixed left-0 top-0 h-screen z-[200] transition-all duration-300 shadow-xl 
            ${expanded ? "w-64" : "w-20"}`}
    >
      <nav className="h-full flex flex-col bg-brand-100 border-r border-white/10">
        <div className="p-4 mb-4 flex justify-between items-center">
          <div
            className={`overflow-hidden transition-all duration-300 ${expanded ? "w-32" : "w-0"}`}
          >
            LOGO
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg hover:bg-brand-300 text-brand-900 transition-colors"
          >
            {expanded ? <IconChevronLeft /> : <IconChevronRight />}
          </button>
        </div>

        <ul className="flex-1 px-4 space-y-1">
          {links.map((link, idx) => (
            <RetractableSidebarItem
              key={idx}
              link={link}
              sidebarExpanded={expanded}
              badge={link.label === "Creators"}
            />
          ))}
        </ul>

        <div className="border-t border-white/10 flex p-3 items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex-shrink-0" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${expanded ? "w-40 ml-3" : "w-0"}`}
          >
            <div className="leading-4 text-white">
              <h4 className="font-semibold truncate">Noah Tristar</h4>
              <span className="text-xs text-gray-400 truncate">
                noahtristar3@gmail.com
              </span>
            </div>
            <IconDots size={20} className="text-gray-400" />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default RetractableSidebar;
