import { StudioOrder } from '../types';

export const INITIAL_STUDIO_ORDERS: StudioOrder[] = [
  {
    id: 'FB-9401',
    customerName: 'Adeline Brooks',
    customerEmail: 'adeline.brooks@example.com',
    customerPhone: '+1 (555) 234-8910',
    deliveryAddress: '742 Evergreen Terrace, Apt 4B, Floral Hills',
    recipientName: 'Genevieve Brooks',
    deliveryDate: '2026-11-12',
    orderDate: '2026-11-11 14:22',
    status: 'Packed',
    items: [
      {
        productId: 'prod-stargazer-vase',
        name: 'Fluted Glass Stargazer & Lily Vase',
        price: 145,
        quantity: 1,
        image: '/assets/optimized/image_ae0ec34e.webp',
        blooms: ['Pink Stargazer Lilies', 'Canary Yellow Tulips', 'Garden Tea Roses'],
      },
    ],
    subtotal: 145,
    deliveryFee: 15,
    total: 160,
    cardMessage: 'Wishing you the happiest 70th birthday dearest Mom. Your grace inspires us all daily.',
    floristNotes: 'Double hydration reservoir pack attached. Fragile glass cylinder wrapped in studio paper.',
    courier: 'Metro Floral Express · Courier Van 03',
    paymentMethod: 'Visa ending in 4092',
  },
  {
    id: 'FB-9402',
    customerName: 'Marcus Sterling',
    customerEmail: 'm.sterling@capitalpartners.com',
    customerPhone: '+1 (555) 871-3342',
    deliveryAddress: '120 Wall Street, Executive Suite 4400, Financial District',
    recipientName: 'Elena Rostova',
    deliveryDate: '2026-11-12',
    orderDate: '2026-11-11 18:05',
    status: 'Delivered',
    items: [
      {
        productId: 'prod-pedestal-urn',
        name: 'The Classical Alabaster Pedestal Urn',
        price: 195,
        quantity: 1,
        image: '/assets/optimized/image_ae0b3296.webp',
        blooms: ['Lavender Clematis Bells', 'Pink Oriental Lilies', 'White Garden Dahlias'],
      },
    ],
    subtotal: 195,
    deliveryFee: 0,
    total: 195,
    cardMessage: 'Congratulations on closing the merger! Sensational partnership as always.',
    floristNotes: 'Delivered to reception lobby concierge desk at 10:15 AM. Signed by R. Vance.',
    courier: 'Priority White Glove Fleet',
    paymentMethod: 'Amex ending in 1004',
  },
  {
    id: 'FB-9403',
    customerName: 'Camilla Valenti',
    customerEmail: 'cvalenti@studioarch.design',
    customerPhone: '+1 (555) 412-9908',
    deliveryAddress: '88 Grand Vista Boulevard, Penthouse C, Highland Heights',
    recipientName: 'Oliver & Camilla Valenti',
    deliveryDate: '2026-11-12',
    orderDate: '2026-11-12 08:30',
    status: 'Out for Delivery',
    items: [
      {
        productId: 'prod-delphinium-bouquet',
        name: 'Sky Delphinium & Amber Ranunculus Meadow',
        price: 120,
        quantity: 2,
        image: '/assets/optimized/image_ea1ecdaa.webp',
        blooms: ['Sky-Blue Delphinium', 'Apricot Ranunculus', 'Orange Freesia Spires'],
      },
    ],
    subtotal: 240,
    deliveryFee: 0,
    total: 240,
    cardMessage: 'For our anniversary celebration dinner table. May our home always smell like springtime.',
    floristNotes: 'Pair of tall delphinium meadow hand-ties with antique rose raw silk ribbons.',
    courier: 'Eco-Van 07 · Driver Liam Santos (En Route)',
    paymentMethod: 'Mastercard ending in 6621',
  },
  {
    id: 'FB-9404',
    customerName: 'Julian Thorne',
    customerEmail: 'julian.t@thornebooks.org',
    customerPhone: '+1 (555) 773-1928',
    deliveryAddress: '14 Cambridge Crescent, Heritage Square',
    recipientName: 'Sophia Lin-Thorne',
    deliveryDate: '2026-11-13',
    orderDate: '2026-11-12 09:15',
    status: 'Arranging',
    items: [
      {
        productId: 'prod-countryside-posy',
        name: 'Sunlit Countryside Dahlia Posy',
        price: 110,
        quantity: 1,
        image: '/assets/optimized/image_f01a30ea.webp',
        blooms: ['White Pompom Dahlias', 'Coral Garden Roses', 'Lavender Scabiosa'],
      },
    ],
    subtotal: 110,
    deliveryFee: 15,
    total: 125,
    cardMessage: 'Good luck on your gallery premiere tonight! You poured your heart into every canvas.',
    floristNotes: 'Stems conditioning in cellar. Arrangement starts at 2:00 PM today.',
    courier: 'Morning Dispatch Courier B',
    paymentMethod: 'Apple Pay',
  },
  {
    id: 'FB-9405',
    customerName: 'Beatrix Dupont',
    customerEmail: 'b_dupont@botanica.fr',
    customerPhone: '+1 (555) 902-4411',
    deliveryAddress: '310 Magnolia Lane, Rosewood District',
    recipientName: 'Dr. Arthur Dupont',
    deliveryDate: '2026-11-13',
    orderDate: '2026-11-12 10:02',
    status: 'Packed',
    items: [
      {
        productId: 'prod-blush-rose-cloud',
        name: 'Blush Garden Rose & Ranunculus Cloud',
        price: 165,
        quantity: 1,
        image: '/assets/optimized/image_2cfa2372.webp',
        blooms: ['Soft Blush Garden Roses', 'Pink Clonal Ranunculus', 'Pale Peach Tulips'],
      },
    ],
    subtotal: 165,
    deliveryFee: 0,
    total: 165,
    cardMessage: 'Speedy recovery dearest Father. Sending you warm sunlight and fresh roses.',
    floristNotes: 'Includes extra floral nutrient elixir vial. Sealed in bespoke cardboard carrier.',
    courier: 'Pending Courier Assignment',
    paymentMethod: 'Visa ending in 8119',
  },
  {
    id: 'FB-9406',
    customerName: 'Evelyn Montgomery',
    customerEmail: 'evelyn.m@montgomeryestate.com',
    customerPhone: '+1 (555) 612-8800',
    deliveryAddress: '550 Orchard Hill Road, The Manor, St. Jude Hills',
    recipientName: 'Evelyn Montgomery',
    deliveryDate: '2026-11-14',
    orderDate: '2026-11-12 10:45',
    status: 'Pending',
    items: [
      {
        productId: 'prod-bridal-cascade',
        name: 'Seraphic Calla Lily & Peony Cascade',
        price: 185,
        quantity: 2,
        image: '/assets/optimized/image_61bdc89d.webp',
        blooms: ['White Mini Calla Lilies', 'White Peony Blossoms', 'Lavender Clematis'],
      },
    ],
    subtotal: 370,
    deliveryFee: 0,
    total: 370,
    cardMessage: 'For Saturday evening estate banquet dining tables.',
    floristNotes: 'Customer requested stems with minimum 12-day vase life.',
    courier: 'Direct Studio Florist Hand Delivery',
    paymentMethod: 'Direct Studio Account Invoice',
  },
];

const STORAGE_KEY = 'flowerbed_studio_orders';

export function getStoredOrders(): StudioOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return INITIAL_STUDIO_ORDERS;
}

export function saveStoredOrders(orders: StudioOrder[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // localStorage disabled/full
  }
}
