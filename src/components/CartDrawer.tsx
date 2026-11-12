import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Heart, Check, Gift } from 'lucide-react';
import { CartItem, StudioOrder } from '../types';
import { getStoredOrders, saveStoredOrders } from '../data/mockOrders';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenShop,
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? (subtotal > 150 ? 0 : 15) : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    // Automatically register order into Studio Admin Orders list
    const newOrderId = `FB-${Math.floor(9600 + Math.random() * 399)}`;
    const newStudioOrder: StudioOrder = {
      id: newOrderId,
      customerName: recipientName || 'Online Studio Guest',
      customerEmail: 'guest@flowerbed.co',
      customerPhone: '+1 (555) 800-2442',
      deliveryAddress: 'Bespoke Delivery Address, Metropolitan Area',
      recipientName: recipientName || 'Floral Recipient',
      deliveryDate: deliveryDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      orderDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Pending',
      items: items.map((it) => ({
        productId: it.product.id,
        name: it.product.name,
        price: it.product.price,
        quantity: it.quantity,
        image: it.product.image,
        blooms: it.product.blooms,
      })),
      subtotal,
      deliveryFee,
      total,
      cardMessage: cardMessage || undefined,
      floristNotes: 'Online storefront checkout. Stems prepared upon confirmation.',
      courier: 'Pending Dispatch Assignment',
      paymentMethod: 'Credit Card (Online Checkout)',
    };

    try {
      saveStoredOrders([newStudioOrder, ...getStoredOrders()]);
    } catch {
      // fallback
    }

    setOrderComplete(true);
  };

  const handleFinish = () => {
    onClearCart();
    setOrderComplete(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f6] w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#c9acac]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 md:p-6 bg-[#c9acac] border-b border-black/10 flex items-center justify-between text-[#231f1d]">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-xl md:text-2xl">Your Flower Bag</h3>
            <span className="text-xs font-serif bg-white/60 px-2.5 py-0.5 rounded-full font-semibold">
              {items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/70 hover:bg-white text-[#231f1d] transition-colors"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {orderComplete ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#c9acac] text-white flex items-center justify-center shadow-lg">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-serif font-bold text-2xl text-[#231f1d]">Order Confirmed!</h4>
            <p className="font-serif text-sm text-[#574945] max-w-xs leading-relaxed">
              Thank you! Our florists are preparing your fresh blooms with market-morning stems. A
              confirmation receipt has been generated.
            </p>
            {recipientName && (
              <div className="p-3 bg-white/70 rounded-lg text-xs font-serif text-[#423733] border border-black/5 w-full">
                <strong>Recipient:</strong> {recipientName}
                {deliveryDate && ` · Scheduled for ${deliveryDate}`}
              </div>
            )}
            <button
              onClick={handleFinish}
              className="btn-figma-pill px-8 py-3 text-sm font-serif mt-4 cursor-pointer"
            >
              Continue Exploring Flowerbed Co.
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#f0eae7] flex items-center justify-center mx-auto text-[#7d6864]">
                  <Heart className="w-6 h-6" />
                </div>
                <p className="font-serif text-lg text-[#231f1d] font-semibold">
                  Your floral bag is currently empty
                </p>
                <p className="font-serif text-xs text-[#705e5a] max-w-xs mx-auto">
                  Browse our handcrafted baskets, bouquets, and pedestal vases to brighten someone’s
                  day.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenShop();
                  }}
                  className="btn-figma-pill px-6 py-2.5 text-xs font-serif mt-2 cursor-pointer"
                >
                  Explore Flower Shop
                </button>
              </div>
            ) : (
              <>
                {/* List of Items */}
                <div className="space-y-3.5">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 bg-white rounded-xl border border-black/5 flex items-center gap-3.5 shadow-2xs"
                    >
                      <div className="w-16 h-16 rounded-lg bg-[#f5f1ef] p-1 shrink-0 overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-[#231f1d] truncate">
                          {item.product.name}
                        </h4>
                        <p className="font-serif text-xs text-[#6e5d59]">
                          ${item.product.price} each
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-black/10 rounded-md bg-[#faf8f6]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 text-[#4a3f3c] hover:bg-black/5 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-serif font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 text-[#4a3f3c] hover:bg-black/5 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1 text-[#9c7e7a] hover:text-rose-700 transition-colors"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-serif font-bold text-sm text-[#231f1d]">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery & Message Details Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                  <div className="p-4 bg-white/70 rounded-xl border border-black/5 space-y-3">
                    <span className="text-xs font-serif font-semibold text-[#231f1d] flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#8a5d5d]" />
                      <span>Delivery & Gift Message</span>
                    </span>

                    <div>
                      <label className="block text-[11px] font-serif uppercase tracking-wider text-[#574945] mb-1">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="e.g. Clara Oswald"
                        className="w-full px-3 py-1.5 text-xs font-serif bg-white border border-black/10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#231f1d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-serif uppercase tracking-wider text-[#574945] mb-1">
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        required
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs font-serif bg-white border border-black/10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#231f1d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-serif uppercase tracking-wider text-[#574945] mb-1">
                        Handwritten Card Note (Complimentary)
                      </label>
                      <textarea
                        rows={2}
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value)}
                        placeholder="Wishing you the loveliest day filled with blooms..."
                        className="w-full px-3 py-1.5 text-xs font-serif bg-white border border-black/10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#231f1d] resize-none"
                      />
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* Footer with totals & checkout */}
        {!orderComplete && items.length > 0 && (
          <div className="p-5 md:p-6 bg-white border-t border-black/10 space-y-3">
            <div className="space-y-1.5 text-xs font-serif text-[#574945]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Studio Delivery</span>
                <span>{deliveryFee === 0 ? 'Free ($150+ order)' : `$${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#231f1d] pt-2 border-t border-black/5">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="btn-figma-pill w-full py-3 text-sm font-serif flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Complete Flowerbed Order (${total})</span>
            </button>

            <p className="text-[10px] font-serif text-center text-[#7a6763] italic">
              Carefully wrapped with water reservoir pack for guaranteed freshness
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
