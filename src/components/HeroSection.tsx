import React, { useRef, useEffect } from 'react';
import { Palette, Heart, ShieldCheck, HandHeart } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onExploreShop: () => void;
  onOpenAtelier: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreShop, onOpenAtelier }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee seamless background video autoplay across all browsers and devices
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry muted playback if browser temporarily restricted autoplay
          if (video) {
            video.muted = true;
            video.play().catch(() => {});
          }
        });
      }
    }
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-[820px] lg:min-h-[900px] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden flex items-center justify-center"
    >
      {/* Background Video Fitting Section */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/assets/aistudio/hero_video_web.mp4"
          poster="/assets/aistudio/hero_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center select-none pointer-events-none"
        >
          <source src="/assets/aistudio/hero_video_web.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay with Low Opacity */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] pointer-events-none" />
      </div>

      {/* Main Hero Content Over Video Background */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-16 w-full relative z-10 py-12">
        <div className="max-w-3xl flex flex-col items-start text-left">

          {/* Shop Name Wordmark — Enlarged for Maximum Focus */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif italic font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[88px] tracking-tight text-[#c9acac] mb-6 md:mb-8 drop-shadow-lg leading-none"
          >
            Flowerbed Co.
          </motion.h1>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.25] text-white mb-5 max-w-2xl drop-shadow-md"
          >
            Bringing beauty to every moment.
          </motion.h2>

          {/* Subtitle / Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif text-base sm:text-lg md:text-xl lg:text-[21px] leading-[1.65] text-stone-100/95 mb-10 max-w-2xl drop-shadow-sm"
          >
            Our handcrafted flower arrangements are designed to brighten your day, celebrate your
            milestones, and share your heartfelt messages.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onExploreShop}
              className="px-8 py-3.5 text-base md:text-lg font-serif cursor-pointer tracking-wide rounded-none bg-white text-[#231f1d] hover:bg-[#faf4f2] shadow-xl border border-white transition-all font-semibold hover:-translate-y-0.5"
            >
              Explore Shop
            </button>

            <button
              onClick={onOpenAtelier}
              className="px-6 py-3.5 text-sm md:text-base font-serif cursor-pointer flex items-center gap-2 rounded-none bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/40 shadow-xl transition-all hover:-translate-y-0.5"
            >
              <Palette className="w-4 h-4 text-rose-300" />
              <span>Custom Bouquet Atelier</span>
            </button>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-white/20 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-serif text-white/90 drop-shadow-xs"
          >
            <div className="flex items-center gap-2">
              <HandHeart className="w-4 h-4 text-rose-200" />
              <span>100% Hand-Tied</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-200" />
              <span>Local Bloom Farms</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-200" />
              <span>Same-Day Delivery</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
