import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Send, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactSectionProps {
  onOpenLocation: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenLocation }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occasion: 'Everyday Delivery',
    message: '',
    date: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('flowerbed@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        occasion: 'Everyday Delivery',
        message: '',
        date: '',
      });
    }, 4500);
  };

  return (
    <section id="contact" className="w-full bg-[#c9acac] py-20 md:py-28 relative overflow-hidden border-t border-[#231f1d]/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-16 w-full">
        {/* Side-by-Side Screen-Filling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Links & Studio Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between h-full"
          >
            <div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-[52px] text-[#231f1d] mb-4 tracking-tight">
                Contact Us
              </h2>
              <p className="font-serif text-[#3b302c] text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                Have a question about today's fresh stem arrivals, need advice on an upcoming wedding,
                or wish to curate a bespoke arrangement? Reach out to our florists directly.
              </p>

              {/* Contact Links List */}
              <div className="space-y-4 w-full max-w-lg mb-8">
                {/* Email */}
                <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs hover:bg-white/80 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-[#231f1d] text-white flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-serif uppercase tracking-wider text-[#63524e]">
                        Direct Studio Email
                      </span>
                      <a
                        href="mailto:flowerbed@gmail.com"
                        className="font-serif text-base md:text-lg font-bold text-[#231f1d] hover:underline underline-offset-4"
                      >
                        flowerbed@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="text-[11px] font-serif uppercase tracking-widest px-3 py-1.5 bg-[#231f1d]/10 hover:bg-[#231f1d] hover:text-white text-[#231f1d] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-800" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <span>Copy</span>
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs hover:bg-white/80 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-[#231f1d] text-white flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-serif uppercase tracking-wider text-[#63524e]">
                        Studio Telephone & WhatsApp
                      </span>
                      <a
                        href="tel:09123456789"
                        className="font-serif text-base md:text-lg font-bold text-[#231f1d] hover:underline underline-offset-4"
                      >
                        0912-345-6789
                      </a>
                    </div>
                  </div>

                  <span className="text-[11px] font-serif text-[#63524e] italic hidden sm:inline">
                    Available 8AM – 6:30PM
                  </span>
                </div>

                {/* Facebook */}
                <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs hover:bg-white/80 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-[#231f1d] text-white flex items-center justify-center shrink-0">
                      <span className="font-serif font-bold text-base">f</span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-serif uppercase tracking-wider text-[#63524e]">
                        Facebook Page & Community
                      </span>
                      <a
                        href="https://facebook.com/flowerbed"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif text-base md:text-lg font-bold text-[#231f1d] hover:underline underline-offset-4"
                      >
                        facebook.com/flowerbed
                      </a>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#231f1d]/50 mr-2" />
                </div>

                {/* Studio Location */}
                <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-xs border border-white/60 shadow-xs hover:bg-white/80 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-[#231f1d] text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-serif uppercase tracking-wider text-[#63524e]">
                        Flagship Atelier Address
                      </span>
                      <button
                        onClick={onOpenLocation}
                        className="font-serif text-base md:text-lg font-bold text-[#231f1d] hover:underline underline-offset-4 text-left cursor-pointer"
                      >
                        148 Blossom Lane, Floral District
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={onOpenLocation}
                    className="text-[11px] font-serif uppercase tracking-widest px-3 py-1.5 bg-[#231f1d]/10 hover:bg-[#231f1d] hover:text-white text-[#231f1d] transition-colors cursor-pointer"
                  >
                    View Map
                  </button>
                </div>
              </div>
            </div>

            {/* Studio Hours Banner */}
            <div className="p-4 bg-black/5 border border-[#231f1d]/15 max-w-lg flex items-center justify-between text-xs font-serif text-[#332724]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#231f1d]" />
                <span>Mon – Sat: 8:00 AM – 6:30 PM · Sun: 9:00 AM – 3:00 PM</span>
              </div>
              <span className="font-semibold text-emerald-900">Open Daily</span>
            </div>
          </motion.div>

          {/* Right Column: Full-Width Consultation & Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 w-full"
          >
            <div className="w-full bg-white/90 backdrop-blur-md p-7 sm:p-9 border border-white/70 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#231f1d]/10">
                <span className="font-serif font-bold text-lg md:text-xl text-[#231f1d] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#8a5d5d]" />
                  <span>Send a Message to Our Florists</span>
                </span>
                <span className="text-xs font-serif text-[#6e5954] italic">
                  Replies within 2 hours
                </span>
              </div>

              {formSubmitted ? (
                <div className="py-12 px-6 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 bg-[#231f1d] text-white flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-2xl text-[#231f1d]">
                    Thank you, {formData.name || 'valued patron'}!
                  </h4>
                  <p className="font-serif text-sm md:text-base text-[#574743] max-w-md mx-auto">
                    We have received your floral inquiry. Our master florist will review your message
                    and respond with stem ideas and customized styling shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-serif uppercase tracking-wider text-[#473b37] mb-1 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Eleanor Vance"
                        className="w-full px-3.5 py-2.5 text-sm font-serif bg-white border border-black/15 focus:outline-none focus:ring-1 focus:ring-[#231f1d]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-serif uppercase tracking-wider text-[#473b37] mb-1 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eleanor@domain.com"
                        className="w-full px-3.5 py-2.5 text-sm font-serif bg-white border border-black/15 focus:outline-none focus:ring-1 focus:ring-[#231f1d]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-serif uppercase tracking-wider text-[#473b37] mb-1 font-semibold">
                        Floral Occasion
                      </label>
                      <select
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm font-serif bg-white border border-black/15 focus:outline-none focus:ring-1 focus:ring-[#231f1d]"
                      >
                        <option>Bespoke Hand-Tied Bouquet</option>
                        <option>Wedding & Bridal Styling</option>
                        <option>Milestone Celebration / Birthday</option>
                        <option>Everyday Home Blooms</option>
                        <option>Seasonal Floral Subscription</option>
                        <option>Sympathy & Condolence Tributes</option>
                        <option>Private Workshop Booking</option>
                        <option>Other Custom Commission</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-serif uppercase tracking-wider text-[#473b37] mb-1 font-semibold">
                        Preferred Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm font-serif bg-white border border-black/15 focus:outline-none focus:ring-1 focus:ring-[#231f1d]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#473b37] mb-1 font-semibold">
                      Notes, Flower Preferences or Sentiments
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your preferred color harmonies, beloved flowers, or special delivery instructions..."
                      className="w-full px-3.5 py-2.5 text-sm font-serif bg-white border border-black/15 focus:outline-none focus:ring-1 focus:ring-[#231f1d] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs font-serif uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer bg-[#231f1d] hover:bg-[#3d3532] text-white shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Floral Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
