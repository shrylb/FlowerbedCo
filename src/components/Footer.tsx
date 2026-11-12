import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#b89595] text-[#231f1d] py-12 border-t border-[#231f1d]/15">
      <div className="max-w-[1360px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Note */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="font-serif italic font-bold text-xl md:text-2xl text-[#231f1d]">
            Flowerbed Co.
          </span>
          <span className="hidden sm:inline text-[#231f1d]/40">·</span>
          <p className="font-serif text-xs md:text-sm text-[#3b322f]">
            Handcrafted flower arrangements bringing elegance, color, and joy to every moment.
          </p>
        </div>

        {/* Links & Back to Top */}
        <div className="flex items-center gap-6 text-xs font-serif text-[#3b322f]">
          <span>© {new Date().getFullYear()} Flowerbed Co. All rights reserved.</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 rounded-full hover:bg-black/5 text-[#231f1d] transition-colors cursor-pointer"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <span className="text-[11px] uppercase tracking-wider hidden sm:inline">Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
