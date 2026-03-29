import { FormatUGXCurrency } from "../lib/helpers";
import DashFooter from "@/components/DashboardLayoutI/DashFooter";
import type { CustomLink } from "@/lib/types";
import MobileNav from "@/components/DashboardLayoutI/MobileNav";
import TopNavLink from "@/components/DashboardLayoutI/TopNavLink";
import { IconUserCircle, IconWallet } from "@tabler/icons-react";
import RetractableSidebar from "@/components/DashboardLayoutI/RetractableSidebar";
import ThemeToggleBtn from "@/components/ThemeToggleBtn";

const DashboardLayoutI: React.FC<{
  children: React.ReactNode;
  navLinks: CustomLink[];
}> = ({ children, navLinks }) => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-100 selection:bg-brand-200 text-brand-900">
      <RetractableSidebar links={navLinks} />
      <MobileNav links={navLinks} />

      <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 bg-brand-100 backdrop-blur-3xl border-b border-brand-200 flex items-center">
        <div className="max-w-[1600px] mx-auto w-full flex items-center">
          {/* Left: Logo - Flex-1 pushes center column */}
          <div className="flex-1 flex items-center justify-start">
            <a className="flex items-center gap-3 group">
              Logo
              <span className="hidden lg:block font-display text-3xl tracking-tight text-white uppercase pt-1 group-hover:text-brand-400 transition-colors duration-300">
                Kreaterly
              </span>
            </a>
          </div>

          {/* Center: Balanced Navigation Pill */}
          <div className="hidden md:flex flex-none items-center justify-center">
            <nav className="flex items-center gap-1 p-1 bg-brand-200 backdrop-blur-md rounded-2xl border border-brand-100 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] shadow-brand-100">
              {navLinks.map((link, idx) => {
                return <TopNavLink key={idx} link={link} />;
              })}
            </nav>
          </div>

          {/* Right: Actions - Flex-1 balances Left column */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <a className="flex items-center gap-3 bg-brand-100 border border-white/5 px-4 py-2.5 rounded-xl hover:border-brand-200 transition-all group/wallet shadow-lg">
              <div className="text-teal-400 opacity-80 group-hover/wallet:opacity-100 transition-opacity">
                <ThemeToggleBtn />
              </div>
            </a>
            <div className="hidden md:flex items-center bg-[#1C2128] border border-white/5 p-1 rounded-xl gap-1">
              <a className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-all rounded-lg hover:bg-white/5">
                <span>
                  <IconUserCircle />
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mt-24 lg:mt-28">
        <div className="px-4 md:px-10 lg:px-12 max-w-7xl mx-auto h-full pb-32 md:pb-10">
          {children}
        </div>
      </main>

      <DashFooter />
    </div>
  );
};

export default DashboardLayoutI;
