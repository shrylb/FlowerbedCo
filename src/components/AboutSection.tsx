import React, { useRef } from 'react';
import { Leaf, Clock, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

const CAROUSEL_PHOTOS = [
  {
    id: 'car-1',
    src: '/assets/optimized/image_2cfa2372.webp',
    title: 'Blush Lily & Ribbed Urn',
    caption: 'Double lilies, pink anthurium & bells of Ireland',
  },
  {
    id: 'car-2',
    src: '/assets/optimized/image_ae0b3296.webp',
    title: 'Chartreuse Anthurium',
    caption: 'Lime anthuriums, curly tendrils & green trick dianthus',
  },
  {
    id: 'car-3',
    src: '/assets/optimized/image_d9278080.webp',
    title: 'Dancing Spring Meadow',
    caption: 'Sunny tulips, peach ranunculus & lavender asters',
  },
  {
    id: 'car-4',
    src: '/assets/optimized/image_6ed03a00.webp',
    title: 'Mirrored Silver Urn',
    caption: 'Pink hydrangeas, cymbidium orchids & amaranthus',
  },
  {
    id: 'car-5',
    src: '/assets/optimized/arrangement_green_urn.webp',
    title: 'Grand Botanical Urn',
    caption: 'Cascading phalaenopsis orchids & giant anthuriums',
  },
  {
    id: 'car-6',
    src: '/assets/optimized/arrangement_sculptural_bells.webp',
    title: 'Bells of Ireland Cascade',
    caption: 'Emerald vertical spires & peach garden peonies',
  },
  {
    id: 'car-7',
    src: '/assets/optimized/arrangement_dahlia_terracotta.webp',
    title: 'Sunset Dahlia Hemisphere',
    caption: 'Tiered pompom dahlias & lime chartreuse hydrangeas',
  },
  {
    id: 'car-8',
    src: '/assets/optimized/arrangement_magenta_hydrangea.webp',
    title: 'Autumn Velvet Centerpiece',
    caption: 'Claret hydrangeas, French cosmos & two-tone dahlias',
  },
];

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hook scroll progress to section so carousel automatically scrolls right on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Translates to the right as user scrolls down the page
  const xTransform = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const scrollManual = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-[#c9acac] py-20 md:py-28 relative overflow-hidden paper-stack-top"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-16 w-full">
        {/* Top Content: About Us headline + Exact Figma description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-14 md:mb-16">
          {/* Left Column: Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-[44px] text-[#231f1d] mb-4 tracking-tight">
              About Us
            </h2>
            <p className="font-serif text-[#3b312e] text-base md:text-lg leading-relaxed">
              Every stem at Flowerbed Co. is rooted in a passion for authentic botanical form,
              celebrating the natural movement of nature.
            </p>
          </motion.div>

          {/* Right Column: 3 Yellow Chamomiles + What we do at Flowerbed Co */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            {/* 3 Yellow Chamomile Flowers matching Figma */}
            <div className="mb-4">
              <img
                src="/assets/optimized/about_yellow_flowers.webp"
                alt="Three pressed golden chamomile flowers"
                className="h-10 sm:h-12 w-auto object-contain select-none filter drop-shadow-xs"
                referrerPolicy="no-referrer"
              />
            </div>

            <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#231f1d] mb-4 leading-snug">
              What we do at Flowerbed Co
            </h3>

            <p className="font-serif text-base md:text-lg lg:text-[18px] leading-[1.7] text-[#2c2422] mb-6">
              At <em className="font-medium italic">Flowerbed Co</em>, we craft unique and
              breathtaking floral arrangements for every occasion — from weddings and birthdays to
              corporate events and everyday moments. Each bouquet is thoughtfully designed using
              fresh, handpicked blooms, bringing elegance, color, and joy to your life.
            </p>

            {/* Studio Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#231f1d]/15">
              <div className="flex items-center gap-2.5 text-xs font-serif text-[#332a27]">
                <div className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center shrink-0 text-[#231f1d]">
                  <Leaf className="w-3.5 h-3.5" />
                </div>
                <span>100% Foam-Free</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-serif text-[#332a27]">
                <div className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center shrink-0 text-[#231f1d]">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>Dawn Market Stems</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-serif text-[#332a27]">
                <div className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center shrink-0 text-[#231f1d]">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <span>Hand-Tied in Studio</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carousel Manual Navigation Controls */}
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollManual('left')}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-[#231f1d] shadow-xs transition-colors cursor-pointer"
              title="Previous photo"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollManual('right')}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-[#231f1d] shadow-xs transition-colors cursor-pointer"
              title="Next photo"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* On-Scroll Photo Carousel (Scrolls to the right on page scroll) */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto scrollbar-none py-4 px-6 md:px-16"
      >
        <motion.div
          style={{ x: xTransform }}
          className="flex items-stretch gap-6 w-max cursor-grab active:cursor-grabbing"
        >
          {CAROUSEL_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="w-[260px] sm:w-[300px] shrink-0 bg-white rounded-none p-3 pb-4 shadow-md hover:shadow-xl transition-all duration-300 border border-black/5 group flex flex-col justify-between"
            >
              <div className="overflow-hidden rounded-none bg-[#eee5e2] aspect-[3/4] mb-3 relative">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-1">
                <h4 className="font-serif font-bold text-sm text-[#231f1d] group-hover:text-[#8a5d5d] transition-colors">
                  {photo.title}
                </h4>
                <p className="font-serif text-xs text-[#6e5d59] italic mt-0.5 line-clamp-1">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
