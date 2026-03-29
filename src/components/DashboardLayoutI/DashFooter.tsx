import React from "react";
import {
  IconBrandTiktok,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";

const DashFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#0B0E14] border-t border-white/5 py-4 px-6">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 opacity-80 scale-90 origin-left">
            Logo
            <span className="font-black tracking-tighter text-sm italic uppercase text-white">
              Kreaterly
            </span>
          </div>
          <span className="hidden md:block h-4 w-[1px] bg-white/10" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
            © {new Date().getFullYear()} @NOTRIX
          </p>
        </div>

        {/* Right: Actions & Socials */}
        <div className="flex items-center gap-8">
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-teal-500 transition-colors">
              Support
            </a>
            <a href="#" className="hover:text-teal-500 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-teal-500 transition-colors">
              Privacy
            </a>
          </div>

          <div className="flex gap-3 border-l border-white/10 pl-8">
            <SocialIcon icon={<IconBrandTiktok size={14} />} />
            <SocialIcon icon={<IconBrandInstagram size={14} />} />
            <SocialIcon icon={<IconBrandTwitter size={14} />} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="text-gray-600 hover:text-teal-500 transition-colors">
    {icon}
  </a>
);

export default DashFooter;
