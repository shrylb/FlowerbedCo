import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/florals';
import { X, Plus, Check, ShoppingBag, Filter, Image as ImageIcon } from 'lucide-react';
import { FloralProduct } from '../types';
import { useSound } from '../context/SoundContext';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: FloralProduct, quantity: number, giftMessage?: string) => void;
  onOpenCart: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);
  // Default is false: Upon opening, cards show clean photo and title first
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const { playCartChime } = useSound();

  // Preload all product WebP images into browser cache immediately for instantaneous rendering
  useEffect(() => {
    if (typeof window !== 'undefined') {
      PRODUCTS.forEach((product) => {
        const img = new Image();
        img.src = product.image;
        if (img.complete) {
          setLoadedImages((prev) => ({ ...prev, [product.id]: true }));
        } else {
          img.onload = () => {
            setLoadedImages((prev) => ({ ...prev, [product.id]: true }));
          };
        }
      });
    }
  }, []);

  if (!isOpen) return null;

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAdd = (product: FloralProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    playCartChime();
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const toggleCardExpansion = (productId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f6] rounded-none shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-[#c9acac]/60 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pink Header matching original studio palette */}
        <div className="bg-[#c9acac] px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-[#231f1d] border-b border-black/10 shrink-0">
          <div>
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#231f1d] tracking-tight">
              Flowerbed Co. Boutique Shop
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="p-2.5 rounded-none bg-white/80 hover:bg-white text-[#231f1d] transition-colors relative cursor-pointer border border-black/10 shadow-xs"
              title="View Cart"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-none bg-white/80 hover:bg-white text-[#231f1d] transition-colors cursor-pointer border border-black/10 shadow-xs"
              aria-label="Close Shop"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="px-6 py-3.5 bg-white border-b border-black/10 flex items-center justify-between overflow-x-auto gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#5c4f4b] hidden sm:inline" />
            <span className="text-xs font-serif text-[#5c4f4b] hidden sm:inline">Collection:</span>
            {[
              { id: 'all', label: 'All Arrangements' },
              { id: 'vases', label: 'Vase Urns' },
              { id: 'tabletop', label: 'Tabletop Pedestals' },
              { id: 'bouquets', label: 'Hand-Tied Bouquets' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-serif rounded-none transition-all cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat.id
                    ? 'bg-[#231f1d] text-white font-bold border-[#231f1d] shadow-sm'
                    : 'bg-[#f0ebe9] text-[#5c4f4b] border-transparent hover:bg-[#e4dedb]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-serif text-[#6e5d59] italic whitespace-nowrap hidden sm:inline">
            Click any arrangement to view details, stems & order
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 bg-[#f2ece8]">
          {filteredProducts.map((product) => {
            const isExpanded = expandedCards[product.id] ?? false;

            return (
              <div
                key={product.id}
                role="button"
                tabIndex={0}
                aria-label={`View ${product.name} details`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCardExpansion(product.id);
                  }
                }}
                onClick={() => toggleCardExpansion(product.id)}
                className="relative overflow-hidden rounded-none border border-black/10 hover:border-black/30 shadow-lg transition-all duration-300 flex flex-col justify-between group min-h-[420px] cursor-pointer select-none bg-[#ded4cf]"
              >
                {/* Background Photo: Always distinct real photo for every arrangement with optimized WebP */}
                <div className="absolute inset-0 z-0 bg-[#ded4cf]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="eager"
                    decoding="async"
                    onLoad={() => setLoadedImages((prev) => ({ ...prev, [product.id]: true }))}
                    className={`w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out ${
                      loadedImages[product.id] ? 'opacity-100' : 'opacity-85'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark Overlay — Active ONLY when clicked into glassmorphic view */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/92 via-black/68 to-black/45 backdrop-blur-[1.5px] transition-opacity duration-400 ease-in-out ${
                      isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                </div>

                {/* VIEW 1 (DEFAULT UPON OPENING): Clean Photo with Arrangement Title & Price First */}
                <div
                  className={`relative z-10 flex flex-col justify-between h-full p-6 transition-all duration-400 ease-in-out ${
                    isExpanded
                      ? 'opacity-0 pointer-events-none scale-98'
                      : 'opacity-100 scale-100'
                  }`}
                >
                  {/* Top Bar on Photo: Subtle Badge */}
                  <div className="flex items-center justify-between">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-serif uppercase tracking-widest px-3 py-1 rounded-none border border-white/20 font-semibold shadow-xs">
                      {product.badge || 'Studio Floral'}
                    </span>

                    <span className="bg-white/90 backdrop-blur-md text-[#231f1d] px-3 py-1 rounded-none text-xs font-serif font-bold shadow-md">
                      ${product.price}
                    </span>
                  </div>

                  {/* Bottom Bar on Photo: Arrangement Title & Tap Cue */}
                  <div className="p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent -mx-6 -mb-6 pt-16 flex flex-col justify-end">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h4 className="font-serif font-bold text-2xl text-white leading-tight drop-shadow-md group-hover:text-rose-200 transition-colors">
                          {product.name}
                        </h4>
                        <p className="font-serif italic text-xs text-stone-200/90 mt-1.5">
                          {product.dimensions || 'Curated Studio Scale'}
                        </p>
                      </div>

                      <span className="text-[11px] font-serif bg-white/25 hover:bg-[#f0a8b4] hover:text-[#231f1d] backdrop-blur-md text-white border border-white/35 px-3 py-1.5 rounded-none font-semibold whitespace-nowrap shadow-sm transition-colors shrink-0">
                        Details & Order →
                      </span>
                    </div>
                  </div>
                </div>

                {/* VIEW 2 (ON CLICK): Glassmorphic View with Dark Overlay, White Tags & Pink Buttons */}
                <div
                  className={`absolute inset-0 z-20 p-6 flex flex-col justify-between h-full bg-white/[0.04] backdrop-blur-md transition-all duration-400 ease-in-out ${
                    isExpanded
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 pointer-events-none scale-102'
                  }`}
                >
                  <div>
                    {/* Top Badges Row: Solid White Fill Tags */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="bg-white text-[#231f1d] text-[10px] font-serif uppercase tracking-widest px-3 py-1.5 rounded-none shadow-md border border-white font-bold drop-shadow-xs">
                        {product.badge || 'Studio Floral'}
                      </span>

                      <span className="bg-white text-[#231f1d] px-3.5 py-1.5 rounded-none text-sm font-serif font-bold shadow-md border border-white">
                        ${product.price}
                      </span>
                    </div>

                    {/* Title & Dimensions */}
                    <h4 className="font-serif font-bold text-xl md:text-2xl text-white leading-snug group-hover:text-rose-200 transition-colors drop-shadow-sm mb-2">
                      {product.name}
                    </h4>

                    {product.dimensions && (
                      <p className="text-[11px] font-serif text-stone-200/90 mb-3 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f0a8b4] inline-block" />
                        <span>Dimensions: {product.dimensions} · {product.stemCount} stems</span>
                      </p>
                    )}

                    {/* Description */}
                    <p className="font-serif text-xs text-stone-100/85 leading-relaxed line-clamp-2 mb-4 drop-shadow-xs">
                      {product.description}
                    </p>

                    {/* Curated Blooms Tags with Solid White Fill & Dark Text */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {product.blooms.slice(0, 3).map((bloom, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-serif bg-white text-[#231f1d] font-semibold px-2.5 py-1 rounded-none border border-white shadow-xs"
                        >
                          {bloom}
                        </span>
                      ))}
                      {product.blooms.length > 3 && (
                        <span className="text-[11px] font-serif bg-white text-[#231f1d] font-semibold px-2 py-1 rounded-none border border-white shadow-xs">
                          +{product.blooms.length - 3} more
                        </span>
                      )}
                    </div>

                    {product.scentProfile && (
                      <p className="text-[11px] font-serif italic text-rose-200/95 mt-1">
                        Aroma: {product.scentProfile}
                      </p>
                    )}
                  </div>

                  {/* Card Action Buttons (Pink Fill Buttons) */}
                  <div className="pt-5 mt-4 border-t border-white/15 flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCardExpansion(product.id);
                      }}
                      className="p-3 bg-[#f0a8b4] hover:bg-[#f5bcc5] text-[#231f1d] rounded-none border border-[#f0a8b4] shadow-md transition-all cursor-pointer shrink-0 font-bold hover:scale-105 active:scale-95 flex items-center gap-1"
                      title="Return to Clean Photo View"
                      aria-label="Return to Clean Photo View"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span className="text-[10px] hidden sm:inline uppercase tracking-wider">Photo</span>
                    </button>

                    <button
                      onClick={(e) => handleAdd(product, e)}
                      className={`flex-1 py-3 px-4 text-xs font-serif uppercase tracking-wider rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer font-bold shadow-lg border hover:scale-[1.01] active:scale-[0.99] ${
                        addedId === product.id
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-[#f0a8b4] hover:bg-[#f5bcc5] text-[#231f1d] border-[#f0a8b4]'
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Bag · ${product.price}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
