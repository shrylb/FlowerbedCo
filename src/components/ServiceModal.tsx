import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { X, Check, Calendar, Flower2, DollarSign, Send } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [budgetTier, setBudgetTier] = useState('Standard');
  const [specialNotes, setSpecialNotes] = useState('');

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f6] rounded-none shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#c9acac]/60 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#c9acac] p-6 text-[#231f1d] flex items-center justify-between border-b border-black/10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-none bg-[#f2ede7] text-[#5c4a38] font-serif font-bold text-sm flex items-center justify-center border border-black/10 shadow-2xs">
              {service.number}
            </span>
            <div>
              <span className="text-[11px] font-serif uppercase tracking-widest block text-[#231f1d]/75">
                Service Inquiry & Consultation
              </span>
              <h3 className="font-serif font-bold text-xl md:text-2xl">{service.title}</h3>
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

        {/* Details & Form */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Details Card with Cosmos Background & Pink Shade Overlay */}
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

            {/* Content above overlay */}
            <div className="relative z-10 space-y-3">
              <p className="font-serif text-sm text-[#382b27] leading-relaxed">
                {service.details}
              </p>
              <div className="pt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-serif text-[#5c4a45] border-t border-[#c9acac]/40">
                <span>
                  <strong className="text-[#231f1d]">Pricing Guide:</strong> {service.startingPrice}
                </span>
                <span>
                  <strong className="text-[#231f1d]">Ideal for:</strong> {service.recommendedFor}
                </span>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-none bg-[#c9acac] text-[#231f1d] flex items-center justify-center mx-auto border border-black/10 shadow-2xs">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-xl text-[#231f1d]">
                Consultation Request Received!
              </h4>
              <p className="font-serif text-xs md:text-sm text-[#5c4c47] max-w-sm mx-auto">
                Thank you, {clientName || 'valued customer'}. Our lead floral designer will review
                your preferred palette and contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#231f1d] flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-[#8a5d5d]" />
                <span>Reserve or Inquire About {service.title}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-[#544541] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Adeline Brooks"
                    className="w-full px-3.5 py-2.5 text-xs font-serif bg-white border border-black/15 rounded-none focus:outline-none focus:border-[#231f1d] focus:ring-1 focus:ring-[#231f1d]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-[#544541] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="adeline@example.com"
                    className="w-full px-3.5 py-2.5 text-xs font-serif bg-white border border-black/15 rounded-none focus:outline-none focus:border-[#231f1d] focus:ring-1 focus:ring-[#231f1d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-[#544541] mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Event or Desired Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-serif bg-white border border-black/15 rounded-none focus:outline-none focus:border-[#231f1d] focus:ring-1 focus:ring-[#231f1d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-[#544541] mb-1 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span>Approximate Budget</span>
                  </label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-serif bg-white border border-black/15 rounded-none focus:outline-none focus:border-[#231f1d] focus:ring-1 focus:ring-[#231f1d]"
                  >
                    <option>Under $100 (Intimate posy/vase)</option>
                    <option>Standard ($100 - $250)</option>
                    <option>Premium ($250 - $600)</option>
                    <option>Grand Event / Wedding ($1,000+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#544541] mb-1">
                  Styling Notes, Color Mood or Venue
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Tell us about the setting, flower loves or dislikes, dress colors..."
                  className="w-full px-3.5 py-2.5 text-xs font-serif bg-white border border-black/15 rounded-none focus:outline-none focus:border-[#231f1d] focus:ring-1 focus:ring-[#231f1d] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs md:text-sm font-serif font-bold text-[#231f1d] bg-[#c9acac] hover:bg-[#bca0a0] rounded-none border border-black/10 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Consultation Request</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 text-xs font-serif text-[#665450] hover:text-[#231f1d] rounded-none border border-black/15 hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
