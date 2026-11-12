import React from 'react';
import { EDITORIAL_REVIEWS } from '../data/florals';
import { Star, Award, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export const ReviewsSection: React.FC = () => {
  return (
    <section
      id="reviews"
      className="w-full bg-[#c9acac] py-20 md:py-28 relative overflow-hidden border-t border-[#231f1d]/10"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="w-4 h-4 text-[#231f1d]/75" />
            <span className="font-serif italic text-xs tracking-widest uppercase text-[#231f1d]/75">
              Press Accolades & Client Testimonials
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-[40px] text-[#231f1d] tracking-tight">
            Words From Our Patrons
          </h2>
          <p className="font-serif text-sm md:text-base text-[#2d2624] mt-3">
            From intimate anniversary gestures to country estate weddings, our floral compositions
            leave lasting impressions.
          </p>
        </div>

        {/* 3 Editorial Cards Grid with Girls Holding Bouquets as Backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {EDITORIAL_REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative rounded-none overflow-hidden shadow-xl border border-white/20 min-h-[460px] md:min-h-[500px] flex flex-col justify-between p-6 sm:p-8 cursor-default transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Background Image of Girl Holding Bouquet */}
              <div className="absolute inset-0 z-0">
                <img
                  src={rev.backgroundImage || '/assets/optimized/image_61bdc89d.webp'}
                  alt={`Patron with ${rev.arrangementOrdered}`}
                  className="w-full h-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                {/* Luxury Scrim Overlay for Crystal-Clear Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/30 backdrop-blur-[0.5px]" />
              </div>

              {/* Card Top: 5 Gold Stars & Verified Pill */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                  ))}
                  <span className="text-xs font-serif text-white/90 ml-1.5 font-semibold">
                    5.0 Verified
                  </span>
                </div>

                <div className="w-8 h-8 rounded-none bg-white/20 backdrop-blur-md flex items-center justify-center text-white/90">
                  <Heart className="w-4 h-4 fill-white/20" />
                </div>
              </div>

              {/* Card Center: Patron Quote */}
              <div className="relative z-10 my-auto py-6">
                <p className="font-serif italic text-base md:text-[17px] text-white/95 leading-relaxed drop-shadow-sm">
                  "{rev.quote}"
                </p>
              </div>

              {/* Card Bottom: Author, Occasion, & Ordered Arrangement Badge */}
              <div className="relative z-10 pt-4 border-t border-white/20 text-white">
                <div className="mb-3">
                  <h4 className="font-serif font-bold text-base text-white tracking-wide">
                    {rev.author}
                  </h4>
                  <p className="font-serif text-xs text-white/80">
                    {rev.role} · <span className="italic">{rev.publicationOrOccasion}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-serif bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-none border border-white/20">
                  <span className="text-white/90 truncate mr-2 font-medium">
                    {rev.arrangementOrdered}
                  </span>
                  <span className="text-white/70 shrink-0">{rev.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial Press Strip */}
        <div className="mt-14 pt-8 border-t border-[#231f1d]/15 flex flex-wrap items-center justify-center gap-8 md:gap-14 text-xs font-serif text-[#231f1d]/70 uppercase tracking-widest">
          <span className="hover:text-[#231f1d] transition-colors">Vogue Living</span>
          <span>·</span>
          <span className="hover:text-[#231f1d] transition-colors">Architectural Digest</span>
          <span>·</span>
          <span className="hover:text-[#231f1d] transition-colors">Kinfolk Botanical</span>
          <span>·</span>
          <span className="hover:text-[#231f1d] transition-colors">Elle Decor</span>
          <span>·</span>
          <span className="hover:text-[#231f1d] transition-colors">The Flower Society</span>
        </div>
      </div>
    </section>
  );
};
