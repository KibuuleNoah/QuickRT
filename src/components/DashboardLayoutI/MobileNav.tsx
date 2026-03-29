import React, { useState } from "react";

import type { CustomLink } from "@/lib/types";
import { IconDots } from "@tabler/icons-react";

import { useDashboarLayoutI } from "@/hooks/DashboardLayoutI/useDashboarLayoutI";
import { useScrollDirection } from "@/hooks/DashboardLayoutI/useScrollDirection";

const MobileNavLink: React.FC<{
  link: CustomLink;
}> = ({ link }) => {
  const { activeView, setActiveView } = useDashboarLayoutI();

  return (
    <a
      onClick={link.handleOnClick ?? (() => setActiveView(link.label))}
      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
        activeView == link.label
          ? "bg-brand-100 text-brand-500 shadow-[0_0_10px_rgba(0,0,0,0.2)] shadow-brand-200"
          : "text-slate-500"
      }`}
    >
      <div className="scale-110">{link.icon}</div>
    </a>
  );
};

const MobileNav: React.FC<{
  links: CustomLink[];
}> = ({ links }) => {
  const [showMore, setShowMore] = useState(false);
  const { activeView, setActiveView } = useDashboarLayoutI();

  const primaryLinks = links.length > 5 ? links.slice(0, 4) : links;
  const secondaryLinks = links.length > 5 ? links.slice(4) : [];

  const scrollDirection = useScrollDirection();
  return (
    <>
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] md:hidden w-[90%] max-w-sm transition-transform duration-500 ease-in-out ${
          scrollDirection === "down" ? "translate-y-32" : "translate-y-0"
        }`}
      >
        <nav className="flex links-center justify-between p-2 bg-brand-100 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)] shadow-brand-300">
          {primaryLinks.map((link, idx) => (
            <MobileNavLink key={idx} link={link} />
          ))}

          {links.length > 5 ? (
            <button
              onClick={() => setShowMore(!showMore)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                showMore ? "bg-white/10 text-white rotate-90" : "text-gray-500"
              }`}
            >
              <div className="scale-125">
                <IconDots />
              </div>
            </button>
          ) : null}
        </nav>
      </div>

      {showMore && (
        <div className="fixed inset-0 z-[299] md:hidden animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-[#0A0B0E]/80 backdrop-blur-sm"
            onClick={() => setShowMore(false)}
          />
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-card border border-white/10 rounded-[40px] p-8 space-y-4 shadow-3xl animate-in slide-in-from-bottom-8 duration-500">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4 text-center">
              Extended Terminal
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {secondaryLinks.map((link) => {
                return (
                  <a
                    key={link.path}
                    onClick={() => {
                      setActiveView(link.label);
                      setShowMore(false);
                    }}
                    className={`flex flex-col links-center gap-3 p-5 rounded-3xl transition-all border ${
                      link.label === activeView
                        ? "bg-teal-500/10 border-teal-500/30 text-teal-400"
                        : "bg-white/5 border-transparent text-gray-500"
                    }`}
                  >
                    <div
                      className={link.label === activeView ? "scale-110" : ""}
                    >
                      {link.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
