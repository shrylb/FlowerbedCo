import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Palette, HandHeart, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { useSound } from '../context/SoundContext';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenShop: () => void;
  onOpenAtelier: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenShop,
  onOpenAtelier,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const { soundEnabled, toggleSound } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'gallery', 'about', 'services', 'almanac', 'care', 'reviews', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'GALLERY', href: '#gallery', id: 'gallery' },
    { label: 'SERVICES', href: '#services', id: 'services' },
    { label: 'ALMANAC', href: '#almanac', id: 'almanac' },
    { label: 'CARE', href: '#care', id: 'care' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      {announcementVisible && (
        <div className="w-full bg-[#3d3330] text-[#f2ede7] py-2 px-4 text-[11px] font-serif flex items-center justify-between tracking-wide relative z-50">
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9acac] inline-block" />
            <span>
              Spring Harvest Now Live · Complimentary Handwritten Calligraphy Card & Local Delivery
              Over $120
            </span>
          </div>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="text-stone-400 hover:text-white transition-colors p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <header
        className={`w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'fixed top-0 left-0 bg-[#c9acac]/95 backdrop-blur-md shadow-sm py-3 px-6 md:px-14'
            : 'absolute top-auto left-0 py-6 md:py-8 px-6 md:px-16'
        }`}
      >
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          {/* Brand mark (Typography only, logo only appears as tab icon) */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className={`font-serif italic font-bold text-xl md:text-2xl transition-colors duration-300 ${
                scrolled ? 'text-[#231f1d]' : 'text-white drop-shadow-md'
              }`}
            >
              Flowerbed Co.
            </a>
          </div>

          {/* Desktop Navigation Links matching Figma layout with natural extensions */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-serif tracking-[0.16em] text-xs font-medium transition-all relative py-1 drop-shadow-xs ${
                    scrolled
                      ? isActive ? 'text-[#231f1d] font-bold' : 'text-[#231f1d]/85 hover:text-[#231f1d]'
                      : isActive ? 'text-white font-bold' : 'text-white/85 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full ${
                        scrolled ? 'bg-[#231f1d]' : 'bg-white'
                      }`}
                    />
                  )}
                </a>
              );
            })}

            {/* Atelier & Shop Controls */}
            <div className={`flex items-center gap-3 pl-4 border-l ${scrolled ? 'border-[#231f1d]/20' : 'border-white/30'}`}>
              <button
                onClick={onOpenAtelier}
                className={`btn-subtle-pill px-3 py-1 text-xs font-serif flex items-center gap-1.5 cursor-pointer transition-colors ${
                  scrolled
                    ? 'bg-white/60 hover:bg-white text-[#231f1d]'
                    : 'bg-white/20 hover:bg-white/35 text-white border-white/30'
                }`}
                title="Custom Bouquet Builder"
              >
                <Palette className={`w-3 h-3 ${scrolled ? 'text-[#8a5d5d]' : 'text-rose-200'}`} />
                <span>Atelier</span>
              </button>

              <button
                onClick={onOpenShop}
                className={`text-xs font-serif tracking-widest uppercase underline-offset-4 hover:underline transition-all cursor-pointer ${
                  scrolled ? 'text-[#231f1d] hover:text-black' : 'text-white hover:text-stone-200'
                }`}
              >
                Shop
              </button>

              {/* Gentle Floral Chime Toggle */}
              <button
                onClick={toggleSound}
                data-sound-toggle="true"
                className={`px-2.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 border shadow-xs ${
                  soundEnabled
                    ? scrolled
                      ? 'bg-emerald-900/10 hover:bg-emerald-900/20 text-[#231f1d] border-emerald-800/30'
                      : 'bg-white/25 hover:bg-white/35 text-white border-white/40'
                    : scrolled
                      ? 'bg-black/5 hover:bg-black/10 text-[#231f1d]/50 border-black/15'
                      : 'bg-black/25 hover:bg-black/35 text-white/60 border-white/20'
                }`}
                title={soundEnabled ? 'Floral Chime Active on Button Clicks (Click to Mute)' : 'Floral Chime Muted (Click to Unmute)'}
                aria-label={soundEnabled ? 'Mute floral chime sound' : 'Unmute floral chime sound'}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className={`w-3.5 h-3.5 ${scrolled ? 'text-emerald-800' : 'text-emerald-300'}`} />
                    <span className="text-[11px] font-sans font-semibold tracking-wide">Chime</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 opacity-60" />
                    <span className="text-[11px] font-sans font-semibold tracking-wide line-through opacity-70">Muted</span>
                  </>
                )}
              </button>

              {/* Shopping Bag */}
              <button
                onClick={onOpenCart}
                aria-label="View Shopping Cart"
                className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                  scrolled ? 'hover:bg-black/5 text-[#231f1d]' : 'hover:bg-white/15 text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-sans font-semibold flex items-center justify-center animate-bounce ${
                    scrolled ? 'bg-[#231f1d] text-white' : 'bg-white text-[#231f1d]'
                  }`}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Admin Portal Icon Button */}
              <button
                onClick={onOpenAdmin}
                aria-label="Admin Portal"
                title="Studio Admin Portal (Order Tracking & Fulfillment)"
                className={`p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                  scrolled ? 'hover:bg-black/5 text-[#231f1d]' : 'hover:bg-white/15 text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </nav>

          {/* Mobile Menu & Cart Buttons */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Mobile Sound Chime Toggle */}
            <button
              onClick={toggleSound}
              data-sound-toggle="true"
              className={`p-2 rounded-full transition-colors ${
                soundEnabled
                  ? 'bg-emerald-900/15 text-[#231f1d]'
                  : 'bg-black/10 text-[#231f1d]/50'
              }`}
              title={soundEnabled ? 'Chime Active' : 'Chime Muted'}
              aria-label="Toggle Chime"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-800" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#231f1d]/50" />
              )}
            </button>

            <button
              onClick={onOpenAtelier}
              className="p-2 rounded-full bg-white/60 text-[#231f1d] text-xs font-serif flex items-center gap-1"
            >
              <HandHeart className="w-3.5 h-3.5" />
              <span className="text-[11px]">Build</span>
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2 rounded-full text-[#231f1d]"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#231f1d] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Admin Icon Button */}
            <button
              onClick={onOpenAdmin}
              aria-label="Admin Portal"
              title="Studio Admin Portal"
              className="p-2 rounded-full text-[#231f1d] hover:bg-black/5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg text-[#231f1d] hover:bg-black/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#c9acac] p-6 flex flex-col justify-between lg:hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-[#231f1d]/15">
            <span className="font-serif italic font-bold text-2xl text-[#231f1d]">
              Flowerbed Co.
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[#231f1d]"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-serif tracking-widest text-lg font-medium text-[#231f1d] hover:translate-x-2 transition-transform"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#231f1d]/15 flex flex-col gap-3">
            <button
              onClick={toggleSound}
              data-sound-toggle="true"
              className="w-full py-2.5 px-4 text-xs font-serif flex items-center justify-between rounded-none bg-white/50 border border-[#231f1d]/20 text-[#231f1d]"
            >
              <div className="flex items-center gap-2">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-800" />
                ) : (
                  <VolumeX className="w-4 h-4 text-[#231f1d]/50" />
                )}
                <span>Floral Sound Chime</span>
              </div>
              <span className={`text-[11px] font-sans font-bold uppercase px-2 py-0.5 rounded-none ${
                soundEnabled ? 'bg-emerald-700 text-white' : 'bg-stone-300 text-stone-700'
              }`}>
                {soundEnabled ? 'Active' : 'Muted'}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAtelier();
              }}
              className="btn-subtle-pill w-full py-3 text-xs font-serif flex items-center justify-center gap-2 bg-white"
            >
              <Palette className="w-4 h-4 text-[#8a5d5d]" />
              <span>Launch Custom Bouquet Atelier</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShop();
              }}
              className="btn-figma-pill w-full py-3 text-sm font-serif flex items-center justify-center gap-2"
            >
              <span>Explore Boutique Shop</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 text-xs font-serif flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#231f1d] border border-black/15 shadow-xs cursor-pointer font-bold"
            >
              <ShieldCheck className="w-4 h-4 text-[#8a5d5d]" />
              <span>Studio Admin & Orders Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
