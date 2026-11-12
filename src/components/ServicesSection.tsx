import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/florals';
import { ServiceItem } from '../types';
import { ArrowUpRight, Calculator, Check, X } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [eventType, setEventType] = useState<'wedding' | 'party' | 'subscription' | 'gift'>('wedding');
  const [tableCount, setTableCount] = useState(8);
  const [includeBridal, setIncludeBridal] = useState(true);

  const calculateEstimate = () => {
    if (eventType === 'wedding') {
      const bridalBase = includeBridal ? 350 : 0;
      const tablesCost = tableCount * 95;
      const ceremonyArch = 450;
      return bridalBase + tablesCost + ceremonyArch;
    }
    if (eventType === 'party') {
      return tableCount * 85 + 150;
    }
    if (eventType === 'subscription') {
      return 65 * 4;
    }
    return 85;
  };

  return (
    <section
      id="services"
      className="w-full bg-[#f2f2f2] py-20 md:py-28 relative overflow-hidden paper-stack-top"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-16 w-full">
        {/* Centered Services Title matching Figma */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-[40px] text-[#231f1d] tracking-tight">
            Services
          </h2>
          <p className="font-serif text-xs md:text-sm text-[#5e514d] mt-2 max-w-md mx-auto">
            Thoughtfully tailored floral experiences for personal milestones, curated homes, and
            grand gatherings.
          </p>

          <div className="mt-3 flex justify-center">
            <button
              onClick={() => setCalculatorOpen(true)}
              className="btn-subtle-pill px-4 py-1.5 text-xs font-serif flex items-center gap-1.5 cursor-pointer bg-white hover:bg-[#eae4e1]"
            >
              <Calculator className="w-3.5 h-3.5 text-[#8a5d5d]" />
              <span>Investment & Budget Estimator</span>
            </button>
          </div>
        </motion.div>

        {/* Layout: Left 6 Services (3x2), Right User-Provided Arrangement Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Services 6-item Grid matching Figma columns (1&2, 3&4, 5&6) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-7 lg:gap-y-8">
              {/* Column 1: Items 1 and 2 */}
              <div className="flex flex-col gap-6 lg:gap-7">
                {/* Service 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  onClick={() => onSelectService(SERVICES_LIST[0])}
                  className="card-hover-enlarge group cursor-pointer flex flex-col items-start text-left p-3 rounded-none hover:bg-white/80 border border-transparent hover:border-black/5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-[#eee5dc] text-[#5c4a38] font-serif font-semibold text-sm flex items-center justify-center shrink-0 border border-[#dfd2c4] shadow-2xs group-hover:bg-[#c9acac] group-hover:text-white transition-colors">
                      {SERVICES_LIST[0].number}
                    </span>
                    <h3 className="font-serif font-bold text-base md:text-lg text-[#231f1d] group-hover:text-[#8f6666] transition-colors flex items-center gap-1">
                      <span>{SERVICES_LIST[0].title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8f6666]" />
                    </h3>
                  </div>
                  <p className="font-serif text-xs md:text-[13px] leading-relaxed text-[#594c48] pl-[44px]">
                    {SERVICES_LIST[0].description}
                  </p>
                </motion.div>

                {/* Service 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  onClick={() => onSelectService(SERVICES_LIST[1])}
                  className="card-hover-enlarge group cursor-pointer flex flex-col items-start text-left p-3 rounded-none hover:bg-white/80 border border-transparent hover:border-black/5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-[#eee5dc] text-[#5c4a38] font-serif font-semibold text-sm flex items-center justify-center shrink-0 border border-[#dfd2c4] shadow-2xs group-hover:bg-[#c9acac] group-hover:text-white transition-colors">
                      {SERVICES_LIST[1].number}
                    </span>
                    <h3 className="font-serif font-bold text-base md:text-lg text-[#231f1d] group-hover:text-[#8f6666] transition-colors flex items-center gap-1">
                      <span>{SERVICES_LIST[1].title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8f6666]" />
                    </h3>
                  </div>
                  <p className="font-serif text-xs md:text-[13px] leading-relaxed text-[#594c48] pl-[44px]">
                    {SERVICES_LIST[1].description}
                  </p>
                </motion.div>
              </div>

              {/* Column 2: Items 3 and 4 */}
              <div className="flex flex-col gap-6 lg:gap-7">
                {/* Service 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  onClick={() => onSelectService(SERVICES_LIST[2])}
                  className="card-hover-enlarge group cursor-pointer flex flex-col items-start text-left p-3 rounded-none hover:bg-white/80 border border-transparent hover:border-black/5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-[#eee5dc] text-[#5c4a38] font-serif font-semibold text-sm flex items-center justify-center shrink-0 border border-[#dfd2c4] shadow-2xs group-hover:bg-[#c9acac] group-hover:text-white transition-colors">
                      {SERVICES_LIST[2].number}
                    </span>
                    <h3 className="font-serif font-bold text-base md:text-lg text-[#231f1d] group-hover:text-[#8f6666] transition-colors flex items-center gap-1">
                      <span>{SERVICES_LIST[2].title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8f6666]" />
                    </h3>
                  </div>
                  <p className="font-serif text-xs md:text-[13px] leading-relaxed text-[#594c48] pl-[44px]">
                    {SERVICES_LIST[2].description}
                  </p>
                </motion.div>

                {/* Service 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => onSelectService(SERVICES_LIST[3])}
                  className="card-hover-enlarge group cursor-pointer flex flex-col items-start text-left p-3 rounded-none hover:bg-white/80 border border-transparent hover:border-black/5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-[#eee5dc] text-[#5c4a38] font-serif font-semibold text-sm flex items-center justify-center shrink-0 border border-[#dfd2c4] shadow-2xs group-hover:bg-[#c9acac] group-hover:text-white transition-colors">
                      {SERVICES_LIST[3].number}
                    </span>
                    <h3 className="font-serif font-bold text-base md:text-lg text-[#231f1d] group-hover:text-[#8f6666] transition-colors flex items-center gap-1">
                      <span>{SERVICES_LIST[3].title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8f6666]" />
                    </h3>
                  </div>
                  <p className="font-serif text-xs md:text-[13px] leading-relaxed text-[#594c48] pl-[44px]">
                    {SERVICES_LIST[3].description}
                  </p>
                </motion.div>
              </div>

              {/* Column 3: Items 5 and 6 */}
              <div className="flex flex-col gap-6 lg:gap-7">
                {/* Service 5 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  onClick={() => onSelectService(SERVICES_LIST[4])}
                  className="card-hover-enlarge group cursor-pointer flex flex-col items-start text-left p-3 rounded-none hover:bg-white/80 border border-transparent hover:border-black/5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-[#eee5dc] text-[#5c4a38] font-serif font-semibold text-sm flex items-center justify-center shrink-0 border border-[#dfd2c4] shadow-2xs group-hover:bg-[#c9acac] group-hover:text-white transition-colors">
                      {SERVICES_LIST[4].number}
                    </span>
                    <h3 className="font-serif font-bold text-base md:text-lg text-[#231f1d] group-hover:text-[#8f6666] transition-colors flex items-center gap-1">
                      <span>{SERVICES_LIST[4].title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8f6666]" />
                    </h3>
                  </div>
                  <p className="font-serif text-xs md:text-[13px] leading-relaxed text-[#594c48] pl-[44px]">
                    {SERVICES_LIST[4].description}
                  </p>
                </motion.div>

                {/* Service 6 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onClick={() => onSelectService(SERVICES_LIST[5])}
                  className="card-hover-enlarge group cursor-pointer flex flex-col items-start text-left p-3 rounded-none hover:bg-white/80 border border-transparent hover:border-black/5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-[#eee5dc] text-[#5c4a38] font-serif font-semibold text-sm flex items-center justify-center shrink-0 border border-[#dfd2c4] shadow-2xs group-hover:bg-[#c9acac] group-hover:text-white transition-colors">
                      {SERVICES_LIST[5].number}
                    </span>
                    <h3 className="font-serif font-bold text-base md:text-lg text-[#231f1d] group-hover:text-[#8f6666] transition-colors flex items-center gap-1">
                      <span>{SERVICES_LIST[5].title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8f6666]" />
                    </h3>
                  </div>
                  <p className="font-serif text-xs md:text-[13px] leading-relaxed text-[#594c48] pl-[44px]">
                    {SERVICES_LIST[5].description}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column: User-provided arrangement image replacing the tree illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-center justify-center"
          >
            <div className="relative group p-2 bg-white/70 rounded-none border border-black/10 shadow-sm">
              <div className="overflow-hidden rounded-none bg-[#e5dfda] aspect-[3/4] max-h-[380px] lg:max-h-[440px] flex items-center justify-center">
                <img
                  src="/assets/optimized/arrangement_green_urn.webp"
                  alt="Sculptural botanical arrangement with anthuriums, orchids, and hydrangeas in round olive vessel"
                  className="flower-hover-zoom w-full h-full object-cover select-none cursor-pointer rounded-none"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-2.5 px-2 flex items-center justify-between text-xs font-serif text-[#574945]">
                <span className="font-bold text-[#231f1d]">The Grand Botanical Urn</span>
                <span className="italic text-[11px]">Event Centerpiece</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Investment Estimator Modal (Keeps Services section fitting in one screen!) */}
      {calculatorOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setCalculatorOpen(false)}
        >
          <div
            className="bg-[#faf8f6] rounded-none shadow-2xl max-w-xl w-full p-6 md:p-8 border border-[#c9acac]/60 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCalculatorOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-none bg-white/80 hover:bg-white text-[#231f1d] border border-black/10 transition-colors cursor-pointer shadow-2xs"
              aria-label="Close Estimator"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-black/10">
              <Calculator className="w-4 h-4 text-[#8a5d5d]" />
              <h3 className="font-serif font-bold text-xl text-[#231f1d]">
                Floral Project Investment Calculator
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#453733] mb-1.5 font-semibold">
                  Service / Occasion
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'wedding', label: 'Wedding & Romance' },
                    { id: 'party', label: 'Celebration Florals' },
                    { id: 'subscription', label: 'Seasonal Subscription' },
                    { id: 'gift', label: 'Bespoke Bouquet' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEventType(t.id as any)}
                      className={`p-2.5 rounded-none text-xs font-serif border text-left transition-all cursor-pointer ${
                        eventType === t.id
                          ? 'bg-[#231f1d] text-white border-[#231f1d]'
                          : 'bg-white text-[#544541] border-black/10 hover:bg-[#ede5e1]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {eventType === 'wedding' && (
                <div className="space-y-3 pt-1">
                  <div>
                    <div className="flex justify-between text-xs font-serif text-[#544541] mb-1">
                      <span>Reception Tables: {tableCount}</span>
                      <span>~${tableCount * 95}</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={30}
                      value={tableCount}
                      onChange={(e) => setTableCount(Number(e.target.value))}
                      className="w-full accent-[#231f1d]"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-xs font-serif text-[#473935] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBridal}
                      onChange={(e) => setIncludeBridal(e.target.checked)}
                      className="rounded-none accent-[#231f1d]"
                    />
                    <span>Include Bridal Party Bouquets & Boutonnieres (+$350)</span>
                  </label>
                </div>
              )}

              {eventType === 'party' && (
                <div>
                  <div className="flex justify-between text-xs font-serif text-[#544541] mb-1">
                    <span>Dining / Buffet Tables: {tableCount}</span>
                    <span>~${tableCount * 85}</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    value={tableCount}
                    onChange={(e) => setTableCount(Number(e.target.value))}
                    className="w-full accent-[#231f1d]"
                  />
                </div>
              )}

              <div className="p-4 bg-[#f2ebe7] rounded-none border border-black/10 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] font-serif uppercase tracking-widest text-[#8a5d5d] block">
                    Estimated Studio Investment
                  </span>
                  <div className="font-serif font-bold text-2xl md:text-3xl text-[#231f1d]">
                    ~${calculateEstimate()}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCalculatorOpen(false);
                    onSelectService(SERVICES_LIST[eventType === 'wedding' ? 1 : 0]);
                  }}
                  className="px-5 py-2.5 text-xs font-serif font-bold text-[#231f1d] bg-[#c9acac] hover:bg-[#bda0a0] rounded-none border border-black/10 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
