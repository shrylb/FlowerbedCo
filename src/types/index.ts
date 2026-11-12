export interface FloralProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'bouquets' | 'baskets' | 'tabletop' | 'vases';
  image: string;
  blooms: string[];
  dimensions?: string;
  scentProfile?: string;
  palette: string;
  stemCount?: number;
  badge?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  blooms: string[];
  occasion: string;
  featured?: boolean;
  photographer?: string;
  paletteNotes?: string;
}

export interface ServiceItem {
  number: number;
  title: string;
  description: string;
  details: string;
  startingPrice: string;
  recommendedFor: string;
  turnaround?: string;
  includedItems?: string[];
}

export interface CartItem {
  product: FloralProduct;
  quantity: number;
  deliveryDate?: string;
  giftCardMessage?: string;
  customNotes?: string;
}

export interface CustomArrangementConfig {
  vessel: 'wicker-basket' | 'seaglass-flagon' | 'pedestal-bowl' | 'linen-wrap' | 'burlap-posy';
  palette: 'sunset-amber' | 'pastel-blush' | 'wild-meadow' | 'ivory-cream' | 'autumn-saffron';
  stems: string[];
  ribbon: 'butter-silk' | 'antique-rose' | 'raw-linen' | 'natural-raffia';
  cardMessage: string;
  recipientName: string;
  preferredDeliveryDate: string;
  stemDensity: 'intimate' | 'generous' | 'opulent';
}

export interface SeasonalBloom {
  name: string;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  scientificName: string;
  floriography: string;
  fragranceProfile: string;
  vaseLifeDays: number;
  colorRange: string[];
  imageDesc: string;
}

export interface EditorialReview {
  id: string;
  quote: string;
  author: string;
  role: string;
  publicationOrOccasion: string;
  rating: number;
  arrangementOrdered: string;
  date: string;
  backgroundImage?: string;
}

export interface FloralCareStep {
  number: string;
  title: string;
  description: string;
  proTip: string;
}

export type OrderStatus = 'Pending' | 'Arranging' | 'Packed' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderItemDetail {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  blooms?: string[];
}

export interface StudioOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  recipientName: string;
  deliveryDate: string;
  orderDate: string;
  status: OrderStatus;
  items: OrderItemDetail[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  cardMessage?: string;
  floristNotes?: string;
  courier?: string;
  paymentMethod: string;
}
