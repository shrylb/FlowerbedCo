import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Plus,
  RotateCcw,
  LogOut,
  ChevronDown,
  Eye,
  FileText,
  User,
  MapPin,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  Heart,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { StudioOrder, OrderStatus } from '../../types';
import { getStoredOrders, saveStoredOrders, INITIAL_STUDIO_ORDERS } from '../../data/mockOrders';
import { PRODUCTS } from '../../data/florals';
import { useSound } from '../../context/SoundContext';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  adminName: string;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  adminName,
}) => {
  const [orders, setOrders] = useState<StudioOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<StudioOrder | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const { playCartChime } = useSound();

  // Load orders from localStorage
  useEffect(() => {
    if (isOpen) {
      setOrders(getStoredOrders());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    playCartChime();
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: newStatus } : ord
      );
      saveStoredOrders(updated);
      return updated;
    });

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    triggerToast(`Order ${orderId} updated to "${newStatus}"`);
  };

  const handleAddTestOrder = () => {
    playCartChime();
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const newId = `FB-${Math.floor(9500 + Math.random() * 499)}`;
    const newOrder: StudioOrder = {
      id: newId,
      customerName: 'Clara Sterling',
      customerEmail: 'clara.sterling@example.com',
      customerPhone: '+1 (555) 392-1144',
      deliveryAddress: '240 Primrose Avenue, Suite 6A, Kensington',
      recipientName: 'Arthur & Clara Sterling',
      deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      orderDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Packed',
      items: [
        {
          productId: randomProduct.id,
          name: randomProduct.name,
          price: randomProduct.price,
          quantity: 1,
          image: randomProduct.image,
          blooms: randomProduct.blooms,
        },
      ],
      subtotal: randomProduct.price,
      deliveryFee: 15,
      total: randomProduct.price + 15,
      cardMessage: 'Celebrating our new boutique home. With heartfelt love and gratitude.',
      floristNotes: 'Packaged in signature studio fluted cardboard container with hydration reservoir.',
      courier: 'White Glove Express Courier 01',
      paymentMethod: 'Apple Pay',
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveStoredOrders(updated);
    triggerToast(`Created test order ${newId}`);
  };

  const handleResetOrders = () => {
    playCartChime();
    setOrders(INITIAL_STUDIO_ORDERS);
    saveStoredOrders(INITIAL_STUDIO_ORDERS);
    triggerToast('Orders restored to default studio state');
  };

  // Filter & Search Logic
  const filteredOrders = orders.filter((ord) => {
    const matchesFilter = statusFilter === 'all' || ord.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      ord.id.toLowerCase().includes(query) ||
      ord.customerName.toLowerCase().includes(query) ||
      ord.recipientName.toLowerCase().includes(query) ||
      ord.deliveryAddress.toLowerCase().includes(query) ||
      ord.items.some((item) => item.name.toLowerCase().includes(query));
    return matchesFilter && matchesQuery;
  });

  // Summary Metrics
  const countPacked = orders.filter((o) => o.status === 'Packed').length;
  const countDelivered = orders.filter((o) => o.status === 'Delivered').length;
  const countOutForDelivery = orders.filter((o) => o.status === 'Out for Delivery').length;
  const countArranging = orders.filter((o) => o.status === 'Arranging').length;
  const countPending = orders.filter((o) => o.status === 'Pending').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold';
      case 'Packed':
        return 'bg-indigo-50 text-indigo-800 border-indigo-300 font-bold';
      case 'Out for Delivery':
        return 'bg-purple-50 text-purple-800 border-purple-300 font-bold';
      case 'Arranging':
        return 'bg-amber-50 text-amber-800 border-amber-300 font-bold';
      case 'Pending':
        return 'bg-stone-100 text-stone-800 border-stone-300';
      case 'Cancelled':
        return 'bg-red-50 text-red-800 border-red-300';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f6] rounded-none shadow-2xl max-w-7xl w-full max-h-[96vh] flex flex-col overflow-hidden border border-[#c9acac]/70 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pink Header matching navbar & shop header */}
        <div className="bg-[#c9acac] px-6 py-4 md:px-8 md:py-5 text-[#231f1d] flex flex-wrap items-center justify-between border-b border-black/10 gap-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-none bg-white/80 flex items-center justify-center border border-black/10 shadow-2xs">
              <Package className="w-5 h-5 text-[#8a5d5d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-serif uppercase tracking-widest text-[#231f1d]/75 font-semibold">
                  Flowerbed Co. Studio Administration
                </span>
                <span className="text-[10px] font-sans uppercase px-2 py-0.5 bg-white/70 text-[#231f1d] font-bold border border-black/10">
                  Live Management
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl md:text-2xl text-[#231f1d] tracking-tight">
                Order Tracking & Fulfillment Dashboard
              </h3>
            </div>
          </div>

          {/* Admin Profile & Actions */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/70 border border-black/10 text-xs font-serif text-[#231f1d]">
              <User className="w-3.5 h-3.5 text-[#8a5d5d]" />
              <span>Admin: <strong className="font-bold">{adminName}</strong></span>
            </div>

            <button
              onClick={handleAddTestOrder}
              className="px-3.5 py-1.5 text-xs font-serif bg-white hover:bg-stone-50 text-[#231f1d] border border-black/15 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs font-semibold"
              title="Add a sample order to test the pipeline"
            >
              <Plus className="w-3.5 h-3.5 text-[#8a5d5d]" />
              <span className="hidden sm:inline">Add Test Order</span>
            </button>

            <button
              onClick={handleResetOrders}
              className="px-3 py-1.5 text-xs font-serif bg-white/60 hover:bg-white text-[#231f1d] border border-black/15 flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              title="Reset orders to default seed data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3 py-1.5 text-xs font-serif bg-[#231f1d] hover:bg-black text-white border border-[#231f1d] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              title="Log Out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-none bg-white/80 hover:bg-white text-[#231f1d] transition-colors cursor-pointer border border-black/10 shadow-2xs ml-1"
              aria-label="Close Dashboard"
              title="Return to Storefront"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Metrics Bar */}
        <div className="bg-white border-b border-black/10 px-6 py-4 md:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 shrink-0">
          <div className="p-3 bg-[#faf8f6] border border-black/10 rounded-none">
            <span className="text-[10px] font-serif uppercase tracking-wider text-[#695854] block">
              Total Orders
            </span>
            <div className="font-serif font-bold text-xl md:text-2xl text-[#231f1d]">
              {orders.length}
            </div>
          </div>

          <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-none">
            <span className="text-[10px] font-serif uppercase tracking-wider text-amber-900 block flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-700" />
              <span>Arranging</span>
            </span>
            <div className="font-serif font-bold text-xl md:text-2xl text-amber-900">
              {countArranging + countPending}
            </div>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-200/80 rounded-none">
            <span className="text-[10px] font-serif uppercase tracking-wider text-indigo-900 block flex items-center gap-1">
              <Package className="w-3 h-3 text-indigo-700" />
              <span>Packed</span>
            </span>
            <div className="font-serif font-bold text-xl md:text-2xl text-indigo-900">
              {countPacked}
            </div>
          </div>

          <div className="p-3 bg-purple-50/70 border border-purple-200/80 rounded-none">
            <span className="text-[10px] font-serif uppercase tracking-wider text-purple-900 block flex items-center gap-1">
              <Truck className="w-3 h-3 text-purple-700" />
              <span>Out for Delivery</span>
            </span>
            <div className="font-serif font-bold text-xl md:text-2xl text-purple-900">
              {countOutForDelivery}
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-none">
            <span className="text-[10px] font-serif uppercase tracking-wider text-emerald-900 block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              <span>Delivered</span>
            </span>
            <div className="font-serif font-bold text-xl md:text-2xl text-emerald-900">
              {countDelivered}
            </div>
          </div>

          <div className="p-3 bg-[#faf8f6] border border-black/10 rounded-none">
            <span className="text-[10px] font-serif uppercase tracking-wider text-[#695854] block">
              Studio Revenue
            </span>
            <div className="font-serif font-bold text-xl md:text-2xl text-[#231f1d]">
              ${totalRevenue}
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#f5f1ed] px-6 py-3.5 md:px-8 border-b border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: `All (${orders.length})` },
              { id: 'Packed', label: `Packed (${countPacked})` },
              { id: 'Out for Delivery', label: `Out for Delivery (${countOutForDelivery})` },
              { id: 'Delivered', label: `Delivered (${countDelivered})` },
              { id: 'Arranging', label: `In Studio (${countArranging})` },
              { id: 'Pending', label: `Pending (${countPending})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-serif rounded-none transition-all cursor-pointer whitespace-nowrap border ${
                  statusFilter === tab.id
                    ? 'bg-[#231f1d] text-white font-bold border-[#231f1d] shadow-xs'
                    : 'bg-white text-[#574945] border-black/10 hover:bg-[#ede5e1]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#786460]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order #, customer, arrangement..."
              className="w-full pl-9 pr-3 py-1.5 text-xs font-serif bg-white border border-black/15 rounded-none focus:outline-none focus:border-[#231f1d]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {filteredOrders.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-white border border-black/10 p-8">
              <div className="w-12 h-12 rounded-none bg-[#f2ede7] flex items-center justify-center mx-auto text-[#7d6864] border border-black/10">
                <Filter className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#231f1d]">No Orders Found</h4>
              <p className="font-serif text-xs text-[#6e5d59] max-w-sm mx-auto">
                No orders match your filter criteria. Try clearing the search query or switching the status tab.
              </p>
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-serif bg-[#c9acac] hover:bg-[#bda0a0] text-[#231f1d] font-bold rounded-none border border-black/10 cursor-pointer shadow-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="bg-white border border-black/10 shadow-xs overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-serif">
                <thead>
                  <tr className="bg-[#f0ebe7] border-b border-black/10 text-[#423531] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4 font-bold">Order ID & Date</th>
                    <th className="py-3 px-4 font-bold">Customer & Recipient</th>
                    <th className="py-3 px-4 font-bold">Arrangement Items</th>
                    <th className="py-3 px-4 font-bold">Total</th>
                    <th className="py-3 px-4 font-bold">Status (Interactive)</th>
                    <th className="py-3 px-4 font-bold text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-[#faf7f5] transition-colors group cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {/* 1. Order ID & Date */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-sm text-[#231f1d] tracking-tight flex items-center gap-1.5">
                          <span>{order.id}</span>
                        </div>
                        <div className="text-[11px] text-[#705e5a] mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#945858]" />
                          <span>Deliv: {order.deliveryDate}</span>
                        </div>
                        <div className="text-[10px] text-[#8e7b77] mt-0.5">
                          Placed: {order.orderDate}
                        </div>
                      </td>

                      {/* 2. Customer & Recipient */}
                      <td className="py-3.5 px-4 align-top max-w-xs">
                        <div className="font-bold text-[#231f1d] text-[13px]">
                          {order.recipientName}
                        </div>
                        <div className="text-[11px] text-[#544541]">
                          Ordered by {order.customerName}
                        </div>
                        <div className="text-[10px] text-[#786662] truncate mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0 text-[#8a5d5d]" />
                          <span className="truncate">{order.deliveryAddress}</span>
                        </div>
                      </td>

                      {/* 3. Items */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="space-y-1.5">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <img
                                src={it.image}
                                alt={it.name}
                                className="w-9 h-9 object-cover border border-black/10 shrink-0 bg-[#e8dfdb]"
                              />
                              <div>
                                <div className="font-semibold text-[#231f1d] line-clamp-1">
                                  {it.name}
                                </div>
                                <div className="text-[10px] text-[#7a6864]">
                                  Qty: {it.quantity} · ${it.price} each
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* 4. Total & Payment */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-sm text-[#231f1d]">
                          ${order.total}
                        </div>
                        <div className="text-[10px] text-[#7d6965] mt-0.5">
                          {order.paymentMethod}
                        </div>
                        {order.deliveryFee === 0 ? (
                          <span className="inline-block text-[9px] uppercase px-1.5 py-0.2 bg-emerald-50 text-emerald-800 border border-emerald-200 mt-1">
                            Free Deliv
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#8c7a76] block mt-0.5">
                            +$15 Delivery
                          </span>
                        )}
                      </td>

                      {/* 5. Status Interactive Dropdown */}
                      <td className="py-3.5 px-4 align-top" onClick={(e) => e.stopPropagation()}>
                        <div className="relative inline-block w-40">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className={`w-full py-1.5 px-2.5 text-xs font-serif border rounded-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#231f1d] shadow-2xs transition-colors appearance-none ${getStatusBadgeStyle(
                              order.status
                            )}`}
                          >
                            <option value="Pending">Pending Review</option>
                            <option value="Arranging">Arranging (In Studio)</option>
                            <option value="Packed">Packed</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                        </div>

                        {/* Courier indicator */}
                        {order.courier && (
                          <div className="text-[10px] text-[#705e5a] mt-1.5 flex items-center gap-1">
                            <Truck className="w-2.5 h-2.5 text-[#8a5d5d]" />
                            <span className="truncate max-w-[150px]">{order.courier}</span>
                          </div>
                        )}
                      </td>

                      {/* 6. Quick Action Buttons */}
                      <td className="py-3.5 px-4 align-top text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {order.status !== 'Packed' && order.status !== 'Delivered' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'Packed')}
                              className="px-2.5 py-1 text-[11px] font-serif bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 transition-colors cursor-pointer shadow-2xs font-semibold"
                              title="Mark this arrangement as packed"
                            >
                              Mark Packed
                            </button>
                          )}

                          {order.status === 'Packed' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'Out for Delivery')}
                              className="px-2.5 py-1 text-[11px] font-serif bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 transition-colors cursor-pointer shadow-2xs font-semibold"
                              title="Dispatch order with courier"
                            >
                              Dispatch
                            </button>
                          )}

                          {order.status === 'Out for Delivery' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'Delivered')}
                              className="px-2.5 py-1 text-[11px] font-serif bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors cursor-pointer shadow-2xs font-semibold"
                              title="Mark arrangement as successfully delivered"
                            >
                              Mark Delivered
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 text-xs font-serif bg-white hover:bg-stone-100 text-[#4a3e3b] border border-black/15 transition-colors cursor-pointer shadow-2xs"
                            title="Inspect Order Slip & Handwritten Card"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="bg-[#f0ebe7] px-6 py-3 md:px-8 border-t border-black/10 flex flex-wrap items-center justify-between text-xs font-serif text-[#665450] shrink-0 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-none bg-emerald-600 inline-block" />
            <span>Studio Live Storage Synchronized · Auto-saves updates locally</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Showing {filteredOrders.length} of {orders.length} total studio orders</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-serif font-bold text-[#231f1d] bg-[#c9acac] hover:bg-[#bda0a0] rounded-none border border-black/10 cursor-pointer shadow-xs transition-colors"
            >
              Return to Storefront
            </button>
          </div>
        </div>

        {/* Detail Order Slide-Over Modal */}
        {selectedOrder && (
          <div
            className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-end animate-in fade-in duration-200"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-[#faf8f6] max-w-xl w-full h-full shadow-2xl p-6 md:p-8 flex flex-col overflow-y-auto border-l border-[#c9acac] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pink Header on Drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div>
                  <span className="text-[11px] font-serif uppercase tracking-widest text-[#8a5d5d] font-semibold block">
                    Order Details & Dispatch Slip
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-[#231f1d]">
                    Order {selectedOrder.id}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-none bg-white hover:bg-stone-100 text-[#231f1d] border border-black/10 cursor-pointer shadow-2xs"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Order Status Ribbon */}
              <div className="my-5 p-4 bg-white border border-[#c9acac]/50 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif uppercase tracking-wider font-semibold text-[#574945]">
                    Current Status:
                  </span>
                  <span className={`px-3 py-1 text-xs font-serif border ${getStatusBadgeStyle(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-black/5 flex flex-wrap gap-2">
                  <span className="text-xs font-serif text-[#6e5d59] self-center mr-1">Update to:</span>
                  {(['Pending', 'Arranging', 'Packed', 'Out for Delivery', 'Delivered'] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className={`px-2.5 py-1 text-[11px] font-serif border transition-all cursor-pointer ${
                        selectedOrder.status === st
                          ? 'bg-[#231f1d] text-white font-bold border-[#231f1d]'
                          : 'bg-white hover:bg-[#ede5e1] text-[#4d3e3b] border-black/15'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery and Customer Information */}
              <div className="space-y-4 text-xs font-serif">
                <div className="p-4 bg-white border border-black/10 space-y-2.5">
                  <h4 className="font-serif font-bold text-sm text-[#231f1d] flex items-center gap-1.5 pb-1 border-b border-black/5">
                    <MapPin className="w-4 h-4 text-[#8a5d5d]" />
                    <span>Recipient & Delivery Destination</span>
                  </h4>
                  <div className="space-y-1 text-[#473834]">
                    <div><strong>Recipient Name:</strong> {selectedOrder.recipientName}</div>
                    <div><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</div>
                    <div><strong>Scheduled Date:</strong> {selectedOrder.deliveryDate}</div>
                    <div><strong>Assigned Courier:</strong> {selectedOrder.courier || 'Standard Studio Van'}</div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-black/10 space-y-2.5">
                  <h4 className="font-serif font-bold text-sm text-[#231f1d] flex items-center gap-1.5 pb-1 border-b border-black/5">
                    <User className="w-4 h-4 text-[#8a5d5d]" />
                    <span>Customer & Payment Information</span>
                  </h4>
                  <div className="space-y-1 text-[#473834]">
                    <div><strong>Customer:</strong> {selectedOrder.customerName}</div>
                    <div><strong>Email:</strong> {selectedOrder.customerEmail}</div>
                    <div><strong>Phone:</strong> {selectedOrder.customerPhone}</div>
                    <div><strong>Payment:</strong> {selectedOrder.paymentMethod}</div>
                    <div><strong>Order Placed:</strong> {selectedOrder.orderDate}</div>
                  </div>
                </div>

                {/* Handwritten Calligraphy Card Note */}
                {selectedOrder.cardMessage && (
                  <div className="p-4 bg-[#faf2f2] border border-[#c9acac]/60 relative space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-serif uppercase tracking-wider text-[#8a5d5d] font-bold">
                      <Heart className="w-3.5 h-3.5 text-[#8a5d5d]" />
                      <span>Complimentary Calligraphy Card Note</span>
                    </div>
                    <p className="font-serif italic text-sm text-[#382b27] leading-relaxed pl-2 border-l-2 border-[#c9acac]">
                      "{selectedOrder.cardMessage}"
                    </p>
                  </div>
                )}

                {/* Items in Order */}
                <div className="p-4 bg-white border border-black/10 space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[#231f1d] pb-1 border-b border-black/5">
                    Arrangement Stems Breakdown
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex items-start gap-3 pb-3 border-b border-black/5 last:border-b-0 last:pb-0">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-14 h-14 object-cover border border-black/10 shrink-0 bg-[#eee8e4]"
                        />
                        <div className="flex-1">
                          <div className="font-serif font-bold text-sm text-[#231f1d]">
                            {it.name}
                          </div>
                          <div className="text-xs text-[#6e5d59]">
                            Quantity: {it.quantity} · ${it.price} each (${it.price * it.quantity})
                          </div>
                          {it.blooms && it.blooms.length > 0 && (
                            <div className="text-[11px] text-[#85706b] italic mt-1">
                              Stems: {it.blooms.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-black/10 flex justify-between font-bold text-sm text-[#231f1d]">
                    <span>Total Order Value</span>
                    <span>${selectedOrder.total}</span>
                  </div>
                </div>

                {/* Florist Studio Packing Checklist */}
                <div className="p-4 bg-[#f8f5f2] border border-black/10 space-y-2">
                  <div className="font-serif font-bold text-xs uppercase tracking-wider text-[#453733]">
                    Studio Packaging Quality Assurance
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#52433f]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Internal hydration reservoir pack sealed around stems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Vase vessel cushioned with corrugated fluted wrap</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Wax-sealed parchment envelope attached to ribbon</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Close Button at bottom */}
              <div className="pt-6 mt-auto">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full py-3 text-xs font-serif font-bold text-[#231f1d] bg-[#c9acac] hover:bg-[#bda0a0] rounded-none border border-black/10 cursor-pointer shadow-xs transition-colors"
                >
                  Done Reviewing Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast confirmation */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-70 bg-[#231f1d] text-white px-5 py-2.5 rounded-none shadow-2xl text-xs font-serif flex items-center gap-2 border border-white/20 animate-in fade-in duration-200">
            <Sparkles className="w-4 h-4 text-[#c9acac]" />
            <span>{toast}</span>
          </div>
        )}
      </div>
    </div>
  );
};
