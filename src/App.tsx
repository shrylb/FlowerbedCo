import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { AlmanacSection } from './components/AlmanacSection';
import { FloralCareSection } from './components/FloralCareSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ShopModal } from './components/ShopModal';
import { CartDrawer } from './components/CartDrawer';
import { AtelierBuilderModal } from './components/AtelierBuilderModal';
import { GalleryModal } from './components/GalleryModal';
import { ServiceModal } from './components/ServiceModal';
import { LocationModal } from './components/LocationModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { CartItem, FloralProduct, GalleryItem, ServiceItem } from './types';
import { PRODUCTS, SERVICES_LIST } from './data/florals';
import { ShoppingBag, Check } from 'lucide-react';
import { useSound } from './context/SoundContext';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAtelierOpen, setIsAtelierOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<string>('Jane Doe');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { playCartChime } = useSound();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: FloralProduct, quantity: number = 1, giftMessage?: string) => {
    playCartChime();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, giftCardMessage: giftMessage || item.giftCardMessage }
            : item
        );
      }
      return [...prev, { product, quantity, giftCardMessage: giftMessage }];
    });
    showToast(`Added "${product.name}" to your bag`);
  };

  const handleQuickOrder = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
    if (product) {
      handleAddToCart(product, 1);
      setIsCartOpen(true);
    }
  };

  const handleOrderGalleryStyle = (item: GalleryItem) => {
    const matched = PRODUCTS.find((p) => p.image === item.image);
    if (matched) {
      handleAddToCart(matched, 1);
      setIsCartOpen(true);
    } else {
      setSelectedService(SERVICES_LIST[0]);
    }
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#c9acac] text-[#231f1d] selection:bg-[#231f1d] selection:text-[#f2f2f2] relative font-serif">
      {/* Navigation matching Figma layout with natural extensions */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
        onOpenAtelier={() => setIsAtelierOpen(true)}
        onOpenAdmin={() => setIsAdminLoginOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onExploreShop={() => setIsShopOpen(true)}
          onOpenAtelier={() => setIsAtelierOpen(true)}
        />

        {/* 2. Gallery Section */}
        <GallerySection
          onSelectItem={(item) => setSelectedGalleryItem(item)}
          onQuickOrder={handleQuickOrder}
          onOpenAtelier={() => setIsAtelierOpen(true)}
        />

        {/* 3. About Us Section with interactive polaroids & studio story */}
        <AboutSection />

        {/* 4. Services Section with numbered 1-6 layout & tree branch artwork */}
        <ServicesSection onSelectService={(service) => setSelectedService(service)} />

        {/* 5. Enhanced Section: Seasonal Harvest Almanac & Floriography */}
        <AlmanacSection />

        {/* 6. Enhanced Section: Botanical Care & Longevity Masterclass */}
        <FloralCareSection />

        {/* 7. Enhanced Section: Editorial Press & Client Stories */}
        <ReviewsSection />

        {/* 8. Contact Us Section with tall flower installation & consultation form */}
        <ContactSection onOpenLocation={() => setIsLocationOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Interactive Drawers */}
      <ShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenCart={() => {
          setIsShopOpen(false);
          setIsCartOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenShop={() => {
          setIsCartOpen(false);
          setIsShopOpen(true);
        }}
      />

      <AtelierBuilderModal
        isOpen={isAtelierOpen}
        onClose={() => setIsAtelierOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenCart={() => {
          setIsAtelierOpen(false);
          setIsCartOpen(true);
        }}
      />

      <GalleryModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        onOrderStyle={handleOrderGalleryStyle}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(name) => {
          setAdminUser(name);
          setIsAdminLoginOpen(false);
          setIsAdminDashboardOpen(true);
          showToast(`Welcome to Flowerbed Co. Admin Dashboard, ${name}`);
        }}
      />

      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={() => {
          setIsAdminDashboardOpen(false);
          showToast('Signed out of Studio Admin');
        }}
        adminName={adminUser}
      />

      {/* Floating Cart Button for Quick Access */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#231f1d] hover:bg-black text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 transition-transform duration-200 hover:scale-105 cursor-pointer border border-white/20"
          aria-label="View Shopping Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="font-serif text-sm font-semibold tracking-wide">
            Bag ({totalCartCount})
          </span>
        </button>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#231f1d] text-white px-5 py-2.5 rounded-full shadow-xl text-xs font-serif flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 border border-white/20">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
