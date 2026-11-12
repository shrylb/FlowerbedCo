import React, { useState } from 'react';
import { GALLERY_ITEMS, PRODUCTS } from '../data/florals';
import { GalleryItem } from '../types';
import { Eye, Plus, Pause, Play, Flower2 } from 'lucide-react';
import { motion } from 'motion/react';

interface GallerySectionProps {
  onSelectItem: (item: GalleryItem) => void;
  onQuickOrder: (productId: string) => void;
  onOpenAtelier: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onSelectItem,
  onQuickOrder,
  onOpenAtelier,
}) => {
  const [filter, setFilter] = useState<'All' | 'Vases' | 'Tabletop'>('All');
  const [isPaused, setIsPaused] = useState(false);

  const displayItems =
    filter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category.toLowerCase() === filter.toLowerCase());

  // Duplicate items to create infinite seamless left marquee
  const marqueeItems = [...displayItems, ...displayItems];

  return (
    <section id="gallery" className="w-full bg-[#f2f2f2] py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 md:px-16 mb-12">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-serif text-[#423a37] text-base md:text-lg max-w-xl">
              Fresh bespoke compositions crafted in our studio each morning. Hover over any arrangement
              to expand and inspect the delicate stem varieties, petal architecture, and custom styling.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-[42px] text-[#231f1d] tracking-tight">
              Gallery
            </h2>

            {/* Filter Tabs & Pause/Play toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 p-1 bg-[#e7e7e7] rounded-full border border-black/5">
                {(['All', 'Vases', 'Tabletop'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3.5 py-1 text-xs font-serif rounded-full transition-all cursor-pointer ${
                      filter === cat
                        ? 'bg-white text-[#231f1d] shadow-sm font-semibold'
                        : 'text-[#635753] hover:text-[#231f1d]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-full bg-white text-[#231f1d] border border-black/5 shadow-xs hover:bg-[#eae4e1] transition-colors cursor-pointer"
                title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
                aria-label={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-[#231f1d]" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed Infinite Horizontal Track Scrolling to the Left */}
      <div className="w-full overflow-hidden py-10 relative">
        {/* Soft edge blur gradient masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-28 bg-gradient-to-r from-[#f2f2f2] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-28 bg-gradient-to-l from-[#f2f2f2] to-transparent z-20 pointer-events-none" />

        <div
          className={`animate-scroll-left flex gap-6 md:gap-8 px-4 ${
            isPaused ? '[animation-play-state:paused]' : ''
          }`}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => onSelectItem(item)}
              className="group relative cursor-pointer w-[280px] sm:w-[320px] md:w-[340px] shrink-0 bg-white rounded-none p-3 pb-5 border border-black/8 shadow-md hover:shadow-2xl transition-all duration-400 ease-out hover:scale-110 md:hover:scale-115 hover:z-30 select-none"
            >
              {/* Photo Container with Sharp 0 Corners */}
              <div className="overflow-hidden rounded-none bg-[#eee5e2] aspect-[3/4] mb-3 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Category Pill */}
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-none text-[10px] font-serif uppercase tracking-widest text-[#231f1d] shadow-xs">
                  {item.category}
                </div>

                {/* Inspect Overlay badge */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-none shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-3.5 h-3.5 text-[#231f1d]" />
                    <span className="font-serif text-xs font-semibold text-[#231f1d]">
                      Inspect Stems
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="px-1 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-base text-[#231f1d] group-hover:text-[#8a5d5d] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-serif text-xs text-[#6e5d59] mt-1 line-clamp-1 italic">
                    {item.blooms.slice(0, 3).join(' · ')}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const matched = PRODUCTS.find((p) => p.image === item.image) || PRODUCTS[0];
                    onQuickOrder(matched.id);
                  }}
                  className="p-2 rounded-full bg-[#f2ede9] group-hover:bg-[#c9acac] group-hover:text-white text-[#231f1d] shadow-2xs transition-colors shrink-0 cursor-pointer"
                  title="Order this floral style"
                  aria-label="Order this floral style"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
