export interface EmiPlan {
  id: string;
  months: number;
  monthlyAmount: number;   // in rupees
  totalAmount: number;
  interestRate: number;    // annual %, 0 = no-cost
  processingFee: number;
  label: string;           // e.g. "No-cost EMI"
}

export interface Variant {
  id: string;
  label: string;           // e.g. "128 GB / Midnight Black"
  price: number;
  mrp: number;
  available: boolean;
  emiPlans: EmiPlan[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  tagline: string;
  images: string[];        // URLs (Unsplash / placeholder)
  description: string;
  highlights: string[];
  variants: Variant[];
  defaultVariantId: string;
}

// ─── EMI plan factory ────────────────────────────────────────────────────────

function makeEmiPlans(price: number): EmiPlan[] {
  return [
    {
      id: '3m',
      months: 3,
      monthlyAmount: Math.round(price / 3),
      totalAmount: price,
      interestRate: 0,
      processingFee: 0,
      label: 'No-cost EMI',
    },
    {
      id: '6m',
      months: 6,
      monthlyAmount: Math.round((price * 1.06) / 6),
      totalAmount: Math.round(price * 1.06),
      interestRate: 12,
      processingFee: 199,
      label: 'Standard EMI',
    },
    {
      id: '12m',
      months: 12,
      monthlyAmount: Math.round((price * 1.13) / 12),
      totalAmount: Math.round(price * 1.13),
      interestRate: 13,
      processingFee: 199,
      label: 'Standard EMI',
    },
    {
      id: '18m',
      months: 18,
      monthlyAmount: Math.round((price * 1.18) / 18),
      totalAmount: Math.round(price * 1.18),
      interestRate: 14,
      processingFee: 299,
      label: 'Standard EMI',
    },
  ];
}

// ─── Mock catalogue ──────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    category: 'Smartphones',
    tagline: '48MP camera. A16 Bionic. Dynamic Island.',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
      'https://images.unsplash.com/photo-1695048064166-c5e3e4e3e3e3?w=600&q=80',
    ],
    description:
      'iPhone 15 features a 48MP main camera, the powerful A16 Bionic chip, and Dynamic Island — all in a durable colour-infused glass design.',
    highlights: [
      '48MP main camera with 2x optical zoom',
      'A16 Bionic chip',
      'Dynamic Island',
      'USB-C connector',
      'All-day battery life',
    ],
    defaultVariantId: 'iphone-15-128-black',
    variants: [
      {
        id: 'iphone-15-128-black',
        label: '128 GB · Black',
        price: 79900,
        mrp: 79900,
        available: true,
        emiPlans: makeEmiPlans(79900),
      },
      {
        id: 'iphone-15-128-blue',
        label: '128 GB · Blue',
        price: 79900,
        mrp: 79900,
        available: true,
        emiPlans: makeEmiPlans(79900),
      },
      {
        id: 'iphone-15-256-black',
        label: '256 GB · Black',
        price: 89900,
        mrp: 89900,
        available: true,
        emiPlans: makeEmiPlans(89900),
      },
      {
        id: 'iphone-15-256-blue',
        label: '256 GB · Blue',
        price: 89900,
        mrp: 89900,
        available: false,
        emiPlans: makeEmiPlans(89900),
      },
    ],
  },
  {
    id: 'samsung-s24',
    name: 'Galaxy S24',
    brand: 'Samsung',
    category: 'Smartphones',
    tagline: 'Galaxy AI. ProVisual Engine. Titanium frame.',
    images: [
      'https://images.unsplash.com/photo-1706439136316-9c4e3e3e3e3e?w=600&q=80',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80',
    ],
    description:
      'Galaxy S24 brings Galaxy AI features, a 50MP ProVisual camera system, and a durable titanium frame to the flagship Android experience.',
    highlights: [
      '50MP ProVisual camera',
      'Snapdragon 8 Gen 3',
      'Galaxy AI features',
      'Titanium frame',
      '4000 mAh battery',
    ],
    defaultVariantId: 's24-256-violet',
    variants: [
      {
        id: 's24-256-violet',
        label: '256 GB · Cobalt Violet',
        price: 74999,
        mrp: 79999,
        available: true,
        emiPlans: makeEmiPlans(74999),
      },
      {
        id: 's24-256-black',
        label: '256 GB · Onyx Black',
        price: 74999,
        mrp: 79999,
        available: true,
        emiPlans: makeEmiPlans(74999),
      },
      {
        id: 's24-512-violet',
        label: '512 GB · Cobalt Violet',
        price: 84999,
        mrp: 89999,
        available: true,
        emiPlans: makeEmiPlans(84999),
      },
    ],
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Laptops',
    tagline: 'Supercharged by M3. Up to 18 hours battery.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    ],
    description:
      'MacBook Air with M3 chip delivers exceptional performance in an impossibly thin design, with up to 18 hours of battery life.',
    highlights: [
      'Apple M3 chip',
      '8-core CPU, 10-core GPU',
      'Up to 24 GB unified memory',
      '18-hour battery life',
      'Liquid Retina display',
    ],
    defaultVariantId: 'mba-m3-8-256-midnight',
    variants: [
      {
        id: 'mba-m3-8-256-midnight',
        label: '8 GB · 256 GB · Midnight',
        price: 114900,
        mrp: 114900,
        available: true,
        emiPlans: makeEmiPlans(114900),
      },
      {
        id: 'mba-m3-8-512-midnight',
        label: '8 GB · 512 GB · Midnight',
        price: 134900,
        mrp: 134900,
        available: true,
        emiPlans: makeEmiPlans(134900),
      },
      {
        id: 'mba-m3-16-512-starlight',
        label: '16 GB · 512 GB · Starlight',
        price: 154900,
        mrp: 154900,
        available: true,
        emiPlans: makeEmiPlans(154900),
      },
    ],
  },
  {
    id: 'sony-wh1000xm5',
    name: 'WH-1000XM5',
    brand: 'Sony',
    category: 'Audio',
    tagline: 'Industry-leading noise cancellation.',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
    ],
    description:
      'Sony WH-1000XM5 headphones deliver industry-leading noise cancellation with 30-hour battery life and crystal-clear hands-free calling.',
    highlights: [
      'Industry-leading ANC',
      '30-hour battery life',
      'Multipoint connection (2 devices)',
      'Speak-to-Chat auto-pause',
      'Foldable design',
    ],
    defaultVariantId: 'xm5-black',
    variants: [
      {
        id: 'xm5-black',
        label: 'Black',
        price: 26990,
        mrp: 29990,
        available: true,
        emiPlans: makeEmiPlans(26990),
      },
      {
        id: 'xm5-silver',
        label: 'Silver',
        price: 26990,
        mrp: 29990,
        available: true,
        emiPlans: makeEmiPlans(26990),
      },
    ],
  },
  {
    id: 'ipad-air-m2',
    name: 'iPad Air M2',
    brand: 'Apple',
    category: 'Tablets',
    tagline: 'Serious performance. Thin and light.',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    ],
    description:
      'iPad Air with M2 chip brings serious performance to a thin and light design, with a stunning Liquid Retina display.',
    highlights: [
      'Apple M2 chip',
      'Liquid Retina display',
      'Apple Pencil Pro support',
      'Magic Keyboard compatible',
      'All-day battery life',
    ],
    defaultVariantId: 'ipad-air-m2-128-blue',
    variants: [
      {
        id: 'ipad-air-m2-128-blue',
        label: '11" · 128 GB · Blue',
        price: 59900,
        mrp: 59900,
        available: true,
        emiPlans: makeEmiPlans(59900),
      },
      {
        id: 'ipad-air-m2-256-blue',
        label: '11" · 256 GB · Blue',
        price: 69900,
        mrp: 69900,
        available: true,
        emiPlans: makeEmiPlans(69900),
      },
      {
        id: 'ipad-air-m2-128-purple',
        label: '11" · 128 GB · Purple',
        price: 59900,
        mrp: 59900,
        available: true,
        emiPlans: makeEmiPlans(59900),
      },
    ],
  },
  {
    id: 'dyson-v15',
    name: 'V15 Detect',
    brand: 'Dyson',
    category: 'Home',
    tagline: 'Laser-guided. Scientifically proven.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    description:
      'Dyson V15 Detect uses a laser to reveal microscopic dust and an acoustic sensor to count and size particles in real time.',
    highlights: [
      'Laser Slim Fluffy cleaner head',
      'Piezo sensor counts particles',
      '60-minute run time',
      'HEPA filtration',
      'LCD screen',
    ],
    defaultVariantId: 'v15-yellow',
    variants: [
      {
        id: 'v15-yellow',
        label: 'Yellow / Nickel',
        price: 52900,
        mrp: 62900,
        available: true,
        emiPlans: makeEmiPlans(52900),
      },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getVariant(product: Product, variantId: string): Variant | undefined {
  return product.variants.find((v) => v.id === variantId);
}

export function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export function getMinEmi(variant: Variant): number {
  const nocost = variant.emiPlans.find((p) => p.interestRate === 0);
  return nocost ? nocost.monthlyAmount : variant.emiPlans[0].monthlyAmount;
}
