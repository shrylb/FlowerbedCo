import React from 'react';
import { X, Flower2, Plus, Clock, Droplets, SunMedium } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onOrderStyle: (item: GalleryItem) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose, onOrderStyle }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f6] rounded-none shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#c9acac]/60 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-none bg-white/80 hover:bg-white text-[#231f1d] border border-black/10 shadow-2xs transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Arrangement Image Showcase */}
        <div className="bg-[#f0ebe8] p-6 flex justify-center items-center overflow-hidden rounded-none border-b border-black/10">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[360px] w-auto object-contain drop-shadow-md select-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Title Section with Navbar Pink Background (#c9acac) */}
        <div className="bg-[#c9acac] px-6 py-4 md:px-8 md:py-5 border-b border-black/10 text-[#231f1d]">
          <span className="text-[11px] font-serif uppercase tracking-widest block text-[#231f1d]/75 font-medium mb-1">
            {item.category} Floral Architecture
          </span>
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#231f1d] tracking-tight">
            {item.title}
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <p className="font-serif text-sm md:text-base leading-relaxed text-[#544642]">
            {item.description}
          </p>

          {/* Botanical Variety Stems with White Tags and Sharp Edges */}
          <div>
            <h4 className="font-serif font-semibold text-xs uppercase tracking-wider text-[#3d322f] mb-2.5 flex items-center gap-1.5">
              <Flower2 className="w-3.5 h-3.5 text-[#a87474]" />
              <span>Bloom Varieties Included</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.blooms.map((bloom, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white text-[#231f1d] rounded-none text-xs font-serif border border-black/15 shadow-2xs"
                >
                  {bloom}
                </span>
              ))}
            </div>
          </div>

          {/* Care Guidelines / Details Card with Cosmos Background & Pink Shade Overlay */}
          <div className="relative overflow-hidden p-5 rounded-none border border-[#c9acac]/50 shadow-2xs group">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/assets/aistudio/image_ee46261a.png"
                alt=""
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Pink shade overlay with soft opacity so the flowers show through */}
              <div className="absolute inset-0 bg-[#faf2f2] opacity-85 transition-colors duration-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-serif text-[#473935]">
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-[#758a99] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#231f1d]">Hydration</strong>
                  <span>Replenish fresh cool water every 2 days</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <SunMedium className="w-4 h-4 text-[#c2954a] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#231f1d]">Indirect Light</strong>
                  <span>Keep away from direct heat & fruit bowls</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#8a7267] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#231f1d]">Vase Life</strong>
                  <span>7–10 days with floral nutrient pack</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions with Pink Fill for Button and Sharp Edges */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onOrderStyle(item);
                onClose();
              }}
              className="w-full sm:flex-1 py-3 text-xs md:text-sm font-serif font-bold text-[#231f1d] bg-[#c9acac] hover:bg-[#bca0a0] rounded-none border border-black/10 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Inquire / Request This Exact Styling</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 text-xs font-serif text-[#665450] hover:text-[#231f1d] border border-black/15 rounded-none hover:bg-black/5 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
