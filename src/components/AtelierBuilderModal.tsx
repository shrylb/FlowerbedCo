import React, { useState } from 'react';
import { X, Palette, Check, ArrowRight, ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FloralProduct } from '../types';

interface AtelierBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: FloralProduct, quantity: number, giftMessage?: string) => void;
  onOpenCart: () => void;
}

export const AtelierBuilderModal: React.FC<AtelierBuilderModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenCart,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Configuration state with authentic flower arrangement
  const [vessel, setVessel] = useState<{ id: string; name: string; price: number; image: string }>({
    id: 'stargazer-vase',
    name: 'Fluted Glass Cylinder Vase',
    price: 45,
    image: '/assets/optimized/image_ae0ec34e.webp',
  });

  const [palette, setPalette] = useState<{ id: string; name: string; hex: string; desc: string }>({
    id: 'peach-blush',
    name: 'Pastel Peach & Rose Quartz',
    hex: '#e8bebe',
    desc: 'Soft garden roses, coral gerberas, and gentle ivory',
  });

  const [selectedStems, setSelectedStems] = useState<string[]>([
    'Pink Stargazer Lily',
    'Apricot Clonal Ranunculus',
  ]);

  const [density, setDensity] = useState<'Intimate' | 'Generous' | 'Opulent'>('Generous');
  const [ribbon, setRibbon] = useState<string>('Buttercream Double Silk');
  const [cardNote, setCardNote] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');

  if (!isOpen) return null;

  // Real, authentic floral vessels and presentations from gallery and new uploads
  const vesselOptions = [
    {
      id: 'stargazer-vase',
      name: 'Fluted Glass Cylinder Vase',
      price: 45,
      image: '/assets/optimized/image_ae0ec34e.webp',
      desc: 'Mouth-blown fluted clear glass showcasing fresh stem stems',
    },
    {
      id: 'alabaster-urn',
      name: 'Classical Alabaster Pedestal Urn',
      price: 55,
      image: '/assets/optimized/image_353303d5.webp',
      desc: 'Fluted architectural stone pedestal urn for 360° display',
    },
    {
      id: 'olive-vessel',
      name: 'Grand Moss-Olive Botanical Vessel',
      price: 60,
      image: '/assets/optimized/arrangement_green_urn.webp',
      desc: 'Heavy matte olive stoneware for sculptural botanical volume',
    },
    {
      id: 'ribbed-ceramic',
      name: 'Artisanal Ribbed Ceramic Urn',
      price: 50,
      image: '/assets/optimized/image_2cfa2372.webp',
      desc: 'Textured ivory and earth ceramic vessel with classical ribs',
    },
    {
      id: 'bridal-silk',
      name: 'Cascading Silk-Tied Presentation',
      price: 65,
      image: '/assets/optimized/image_f86b61f9.webp',
      desc: 'Formal cascading bridal presentation bound with trailing silk ribbons',
    },
    {
      id: 'meadow-kraft',
      name: 'Delphinium Meadow Kraft Wrap',
      price: 35,
      image: '/assets/optimized/image_ea1ecdaa.webp',
      desc: 'Classic French florist kraft wrapping with internal hydration pack',
    },
  ];

  const paletteOptions = [
    {
      id: 'peach-blush',
      name: 'Pastel Peach & Rose Quartz',
      hex: '#e8bebe',
      desc: 'Soft garden roses, coral gerberas, and warm chamomile',
    },
    {
      id: 'sunset-amber',
      name: 'Sunset Amber & Saffron',
      hex: '#e8a87c',
      desc: 'Tangerine ranunculus, marigold, and golden poppies',
    },
    {
      id: 'wild-meadow',
      name: 'Wild Meadow Lilac & Celadon',
      hex: '#cbbdd8',
      desc: 'Lilac sweet peas, larkspur, and sea-green eucalyptus',
    },
    {
      id: 'ivory-cream',
      name: 'Pure Vanilla & Cloud White',
      hex: '#f5efe6',
      desc: 'White garden peonies, cream ranunculus, and baby’s breath',
    },
  ];

  const stemOptions = [
    'Pink Stargazer Lily',
    'Lavender Clematis Bell',
    'Sky-Blue Delphinium',
    'Blush Garden Peony',
    'Velvet White Calla Lily',
    'Apricot Clonal Ranunculus',
    'Matricaria Chamomile',
    'White Pompom Dahlia',
    'Juliet Garden Rose',
    'Chartreuse Anthurium',
    'Cascading Orchid Spire',
    'Coral Hibiscus Bloom',
  ];

  const densityMultipliers = {
    Intimate: { label: 'Intimate (18 stems)', priceAdd: 40 },
    Generous: { label: 'Generous (28 stems)', priceAdd: 65 },
    Opulent: { label: 'Opulent (42 stems)', priceAdd: 95 },
  };

  const totalPrice = vessel.price + densityMultipliers[density].priceAdd;

  const toggleStem = (stem: string) => {
    if (selectedStems.includes(stem)) {
      if (selectedStems.length > 1) {
        setSelectedStems(selectedStems.filter((s) => s !== stem));
      }
    } else {
      if (selectedStems.length < 4) {
        setSelectedStems([...selectedStems, stem]);
      }
    }
  };

  const handleFinish = () => {
    // Fire festive flower petal confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c9acac', '#e8a87c', '#cbbdd8', '#f5efe6', '#c2954a'],
    });

    const customProduct: FloralProduct = {
      id: `custom-${Date.now()}`,
      name: `Custom ${vessel.name} (${palette.name})`,
      price: totalPrice,
      description: `Bespoke arrangement featuring ${selectedStems.join(', ')} in ${palette.name} tones, bound with ${ribbon}.`,
      category: 'bouquets',
      image: vessel.image,
      blooms: selectedStems,
      palette: palette.name,
      dimensions: density === 'Opulent' ? '18" W x 26" H' : '14" W x 20" H',
      scentProfile: 'Custom blended botanical essence and morning blossoms',
    };

    onAddToCart(customProduct, 1, cardNote);
    onClose();
    setTimeout(() => {
      onOpenCart();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f6] rounded-none shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-[#c9acac]/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#c9acac] p-5 md:p-6 text-[#231f1d] flex items-center justify-between border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-white/70 flex items-center justify-center border border-white/50">
              <Palette className="w-5 h-5 text-[#231f1d]" />
            </div>
            <div>
              <span className="text-[11px] font-serif uppercase tracking-widest block text-[#231f1d]/75">
                The Botanical Atelier
              </span>
              <h3 className="font-serif font-bold text-xl md:text-2xl">
                Design Your Bespoke Arrangement
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-serif font-bold text-xl md:text-2xl text-[#231f1d]">
              ${totalPrice}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-none bg-white/70 hover:bg-white text-[#231f1d] transition-colors cursor-pointer"
              aria-label="Close Atelier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-[#e8dfdb] px-6 py-2.5 flex items-center justify-between text-xs font-serif text-[#473b37] border-b border-black/5">
          <div className="flex items-center gap-6">
            <span
              className={`flex items-center gap-1.5 ${
                step === 1 ? 'font-bold text-[#231f1d]' : 'text-[#6e5d59]'
              }`}
            >
              <span className="w-4 h-4 rounded-none bg-white text-[10px] flex items-center justify-center font-sans font-bold">
                1
              </span>
              <span>Vessel & Presentation</span>
            </span>
            <span className="text-black/20">/</span>
            <span
              className={`flex items-center gap-1.5 ${
                step === 2 ? 'font-bold text-[#231f1d]' : 'text-[#6e5d59]'
              }`}
            >
              <span className="w-4 h-4 rounded-none bg-white text-[10px] flex items-center justify-center font-sans font-bold">
                2
              </span>
              <span>Palette & Stems</span>
            </span>
            <span className="text-black/20">/</span>
            <span
              className={`flex items-center gap-1.5 ${
                step === 3 ? 'font-bold text-[#231f1d]' : 'text-[#6e5d59]'
              }`}
            >
              <span className="w-4 h-4 rounded-none bg-white text-[10px] flex items-center justify-center font-sans font-bold">
                3
              </span>
              <span>Density & Gift Details</span>
            </span>
          </div>

          <span className="text-[11px] italic hidden md:inline">
            Crafted fresh morning of dispatch
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h4 className="font-serif font-bold text-lg md:text-xl text-[#231f1d] mb-1">
                  Step 1: Choose Your Vessel & Style
                </h4>
                <p className="font-serif text-xs md:text-sm text-[#665450]">
                  Select the structural foundation for your floral composition. Every vessel uses authentic studio photographs.
                </p>
              </div>

              {/* Vessels Grid: Real Full-bleed Arrangement Photos with 0-Radius Corners */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {vesselOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setVessel(opt)}
                    className={`cursor-pointer rounded-none border transition-all duration-200 flex flex-col justify-between group overflow-hidden ${
                      vessel.id === opt.id
                        ? 'bg-white border-[#231f1d] shadow-lg ring-2 ring-[#c9acac]'
                        : 'bg-white/80 border-black/10 hover:border-black/30 hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Photo Container: Clean Full-Bleed with No Cluttered Padding */}
                      <div className="aspect-[4/5] bg-[#f0ebe8] overflow-hidden relative">
                        <img
                          src={opt.image}
                          alt={opt.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-600 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2.5 right-2.5 bg-[#231f1d]/90 text-white text-xs font-serif font-bold px-2.5 py-1 rounded-none shadow-sm">
                          ${opt.price}
                        </div>
                      </div>

                      <div className="p-4">
                        <h5 className="font-serif font-bold text-base text-[#231f1d] group-hover:text-[#8a5d5d] transition-colors">
                          {opt.name}
                        </h5>
                        <p className="font-serif text-xs text-[#695753] mt-1 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-3 pt-0 flex items-center justify-between text-xs font-serif">
                      <span className="text-[#8a5d5d] font-semibold">${opt.price} Vessel Base</span>
                      {vessel.id === opt.id ? (
                        <span className="font-semibold text-emerald-800 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Selected
                        </span>
                      ) : (
                        <span className="text-stone-400 group-hover:text-[#231f1d]">Select</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h4 className="font-serif font-bold text-lg md:text-xl text-[#231f1d] mb-1">
                  Step 2: Color Mood & Key Stems
                </h4>
                <p className="font-serif text-xs md:text-sm text-[#665450]">
                  Select your primary floral palette and pick 2 to 4 priority bloom varieties.
                </p>
              </div>

              {/* Palettes */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#453733] mb-2.5 font-semibold">
                  1. Color Harmony & Palette
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {paletteOptions.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setPalette(p)}
                      className={`cursor-pointer p-4 rounded-none border flex items-center gap-3.5 transition-all ${
                        palette.id === p.id
                          ? 'bg-white border-[#231f1d] shadow-sm ring-1 ring-[#c9acac]'
                          : 'bg-white/70 border-black/10 hover:border-black/20'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-none shrink-0 shadow-inner border border-black/10"
                        style={{ backgroundColor: p.hex }}
                      />
                      <div className="min-w-0">
                        <h5 className="font-serif font-bold text-sm text-[#231f1d]">
                          {p.name}
                        </h5>
                        <p className="font-serif text-xs text-[#6e5d59] truncate">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stems */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-serif uppercase tracking-wider text-[#453733] font-semibold">
                    2. Priority Bloom Stems (Pick 2 to 4)
                  </label>
                  <span className="text-xs font-serif text-[#8a5d5d] font-semibold">
                    {selectedStems.length}/4 selected
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {stemOptions.map((stem) => {
                    const isSelected = selectedStems.includes(stem);
                    return (
                      <button
                        key={stem}
                        type="button"
                        onClick={() => toggleStem(stem)}
                        className={`p-3 rounded-none border text-left text-xs font-serif transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#231f1d] text-white border-[#231f1d] font-semibold shadow-xs'
                            : 'bg-white text-[#473a36] border-black/10 hover:bg-[#faf4f2]'
                        }`}
                      >
                        <span className="truncate">{stem}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h4 className="font-serif font-bold text-lg md:text-xl text-[#231f1d] mb-1">
                  Step 3: Density, Silk Ribbon & Calligraphy
                </h4>
                <p className="font-serif text-xs md:text-sm text-[#665450]">
                  Choose arrangement scale and personalize with a handwritten note.
                </p>
              </div>

              {/* Density options */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#453733] mb-2 font-semibold">
                  Stem Density & Scale
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Intimate', 'Generous', 'Opulent'] as const).map((d) => (
                    <div
                      key={d}
                      onClick={() => setDensity(d)}
                      className={`cursor-pointer p-4 rounded-none border text-center transition-all ${
                        density === d
                          ? 'bg-white border-[#231f1d] shadow-sm ring-1 ring-[#c9acac]'
                          : 'bg-white/70 border-black/10 hover:bg-white'
                      }`}
                    >
                      <h5 className="font-serif font-bold text-sm text-[#231f1d]">{d}</h5>
                      <p className="font-serif text-xs text-[#735f5b] mt-1">
                        {densityMultipliers[d].label}
                      </p>
                      <span className="text-xs font-serif font-semibold text-[#8a5d5d] mt-2 block">
                        +${densityMultipliers[d].priceAdd}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ribbon Selection */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#453733] mb-2 font-semibold">
                  Finishing Ribbon
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Buttercream Double Silk',
                    'Antique Rose Grosgrain',
                    'Frayed Raw Linen',
                    'Natural Raffia Twine',
                  ].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRibbon(r)}
                      className={`px-3.5 py-1.5 rounded-none text-xs font-serif border transition-all cursor-pointer ${
                        ribbon === r
                          ? 'bg-[#231f1d] text-white border-[#231f1d] font-semibold'
                          : 'bg-white text-[#453733] border-black/10 hover:border-black/30'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gift Note */}
              <div className="p-5 bg-white/80 rounded-none border border-black/10 space-y-3">
                <span className="text-xs font-serif font-semibold text-[#231f1d] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#a86565]" />
                  <span>Complimentary Calligraphy Card (Wax-Sealed)</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Recipient's Name (e.g. Clara)"
                    className="w-full px-3.5 py-2.5 text-xs font-serif bg-white border border-black/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#231f1d]"
                  />
                  <input
                    type="text"
                    value={cardNote}
                    onChange={(e) => setCardNote(e.target.value)}
                    placeholder="Message: Thinking of you with blooming love..."
                    className="w-full px-3.5 py-2.5 text-xs font-serif bg-white border border-black/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#231f1d]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation Footer */}
        <div className="p-4 md:p-6 bg-[#f0eae7] border-t border-black/10 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 text-xs font-serif flex items-center gap-1 text-[#544440] hover:text-[#231f1d] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-4">
            <span className="text-xs font-serif text-[#695854]">
              Total: <strong className="text-sm text-[#231f1d]">${totalPrice}</strong>
            </span>

            {step < 3 ? (
              <button
                onClick={() => setStep((step + 1) as any)}
                className="px-6 py-2.5 text-xs font-serif flex items-center gap-1.5 cursor-pointer rounded-none bg-[#231f1d] hover:bg-[#3d3633] text-white shadow-sm font-semibold transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-7 py-3 text-xs md:text-sm font-serif flex items-center gap-2 cursor-pointer font-semibold rounded-none bg-[#231f1d] hover:bg-[#3d3633] text-white shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Bespoke Creation to Bag (${totalPrice})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
