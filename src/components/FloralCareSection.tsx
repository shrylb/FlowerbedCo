import React, { useState } from 'react';
import { Droplet, Sun, Scissors, ShieldCheck, Check, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { FLORAL_CARE_STEPS } from '../data/florals';

export const FloralCareSection: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    // Create and download studio care guide
    const content = `FLOWERBED CO. — FLORAL LONGEVITY MASTERCLASS GUIDE
======================================================
Thank you for bringing handcrafted blooms into your sanctuary.

1. Cut at 45° Angle Under Cool Water
   Trim 1-2 inches with floral shears to open capillary tubes.

2. Strip Lower Foliage Below Waterline
   Submerged leaves generate bacterial clouding. Keep water pristine.

3. Refresh Cool Water Every 48 Hours
   Rinse vase and mix flower nutrient packet to regulate pH.

4. The Warm Water Revival Trick
   Place nodding roses in 2 inches of lukewarm water in a dark room for 30 mins.

With love,
Flowerbed Co. Botanical Studio
flowerbed@gmail.com | 0912-345-6789
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flowerbed-care-guide.txt';
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="care" className="w-full py-24 md:py-32 relative overflow-hidden">
      {/* Background Photo fitting the section */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/optimized/image_d3152c4b.webp"
          alt="Florists arranging delicate blooms in a glass vase"
          className="w-full h-full object-cover object-center select-none"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        {/* Dark overlay at low opacity */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
      </div>

      <div className="max-w-[1360px] mx-auto px-6 md:px-16 relative z-10">
        {/* Header with High-Contrast Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16 gap-6">
          <div>
            <span className="font-serif italic text-xs md:text-sm text-stone-200 tracking-widest uppercase block mb-2 drop-shadow-xs">
              Botanical Care & Longevity Masterclass
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-[42px] text-white tracking-tight drop-shadow-sm">
              Caring for Your Handcrafted Stems
            </h2>
            <p className="font-serif text-stone-100 text-sm md:text-base max-w-xl mt-3 drop-shadow-xs leading-relaxed">
              With a few daily florist rituals, your bespoke bouquets will thrive for up to two
              weeks. Follow our studio preservation methods below.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="px-6 py-3 text-xs font-serif flex items-center gap-2 cursor-pointer whitespace-nowrap self-start md:self-auto rounded-none bg-white/95 hover:bg-white text-[#231f1d] shadow-lg border border-white/60 transition-all font-semibold uppercase tracking-wider"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-800" />
                <span>Downloaded Care Sheet!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Studio Care Guide</span>
              </>
            )}
          </button>
        </div>

        {/* 4 Care Steps Grid — Sharp Corners (rounded-none / 0) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLORAL_CARE_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white/95 backdrop-blur-md rounded-none p-6 md:p-7 border border-white/80 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:bg-white"
            >
              <div>
                <span className="font-serif font-bold text-2xl md:text-3xl text-[#8a5d5d] mb-3 block">
                  {step.number}
                </span>

                <h3 className="font-serif font-bold text-base md:text-[17px] text-[#231f1d] mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="font-serif text-xs md:text-sm text-[#574945] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-black/10 bg-[#faf6f4] -mx-6 md:-mx-7 -mb-6 md:-mb-7 p-4 rounded-none">
                <span className="text-[10px] font-serif uppercase tracking-wider text-[#8a5d5d] font-bold block mb-1">
                  Florist Pro Tip:
                </span>
                <p className="font-serif text-[11px] text-[#544440] italic leading-relaxed">
                  {step.proTip}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Guarantee Banner — Sharp Corners (rounded-none) */}
        <div className="mt-14 p-6 bg-white/90 backdrop-blur-md rounded-none border border-white/60 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-[#3d322f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-none bg-[#c9acac]/30 flex items-center justify-center text-[#8a5d5d] shrink-0 border border-[#c9acac]/50">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>
              <strong>The 7-Day Freshness Guarantee:</strong> If your blooms do not maintain their vibrant
              beauty for at least 7 days when following our care guide, we will happily hand-deliver a
              complimentary replacement posy.
            </span>
          </div>

          <a
            href="#contact"
            className="text-xs uppercase tracking-wider font-semibold text-[#231f1d] hover:underline underline-offset-4 shrink-0"
          >
            Inquire With a Florist →
          </a>
        </div>
      </div>
    </section>
  );
};
