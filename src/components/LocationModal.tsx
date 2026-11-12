import React from 'react';
import { X, Clock, MapPin, Compass, Car, Coffee, Flower } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f6] rounded-none shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#c9acac]/60 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#c9acac] p-6 text-[#231f1d] flex items-center justify-between border-b border-black/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-white/60 flex items-center justify-center text-[#231f1d] border border-black/10">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-serif uppercase tracking-widest block text-[#231f1d]/75">
                Floral Studio & Workshop
              </span>
              <h3 className="font-serif font-bold text-xl md:text-2xl">
                Someplace in this Earth
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-none bg-white/80 hover:bg-white text-[#231f1d] transition-colors cursor-pointer border border-black/10 shadow-2xs"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Aesthetic Map Illustration */}
          <div className="relative rounded-none overflow-hidden bg-[#e8dfdb] border border-black/10 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-none bg-white/80 shadow-md flex items-center justify-center text-[#9c6a6a] border border-black/10">
              <Compass className="w-7 h-7 animate-spin-slow" />
            </div>
            <div>
              <p className="font-serif font-bold text-base text-[#231f1d]">
                Flowerbed Co. Botanical Atelier
              </p>
              <p className="font-serif text-xs text-[#6e5d59]">
                Garden Courtyard · 42 Bloom Blossom Lane, Suite 100
              </p>
            </div>

            <span className="px-3 py-1 bg-white/90 rounded-none text-[11px] font-serif text-[#665450] shadow-2xs border border-black/10">
              Walk-ins welcome for fresh daily bouquets & coffee
            </span>
          </div>

          {/* Visiting Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-xs uppercase tracking-wider text-[#3d3330] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8a5d5d]" />
              <span>Studio & Pickup Hours</span>
            </h4>

            <div className="bg-white rounded-none border border-black/10 p-4 space-y-2 text-xs font-serif text-[#544642]">
              <div className="flex justify-between pb-1.5 border-b border-black/5">
                <span>Monday – Friday</span>
                <span className="font-semibold text-[#231f1d]">8:00 AM – 6:30 PM</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-black/5">
                <span>Saturday Studio Workshop</span>
                <span className="font-semibold text-[#231f1d]">9:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-semibold text-[#8a5d5d]">10:00 AM – 3:00 PM (Market Editions)</span>
              </div>
            </div>
          </div>

          {/* Studio Amenities */}
          <div className="grid grid-cols-2 gap-3 text-xs font-serif text-[#5c4d49]">
            <div className="flex items-center gap-2 p-3 bg-white rounded-none border border-black/10">
              <Car className="w-4 h-4 text-[#7d6863] shrink-0" />
              <span>Dedicated Curbside Pickup</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-none border border-black/10">
              <Coffee className="w-4 h-4 text-[#7d6863] shrink-0" />
              <span>Artisanal Tea & Espresso Bar</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-none border border-black/10">
              <Flower className="w-4 h-4 text-[#7d6863] shrink-0" />
              <span>Floral Arranging Workshops</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-none border border-black/10">
              <MapPin className="w-4 h-4 text-[#7d6863] shrink-0" />
              <span>Complimentary Parking</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 text-xs md:text-sm font-serif font-bold text-[#231f1d] bg-[#c9acac] hover:bg-[#bda0a0] rounded-none border border-black/10 cursor-pointer transition-colors shadow-xs"
          >
            Got It · Return to Flowerbed Co.
          </button>
        </div>
      </div>
    </div>
  );
};
