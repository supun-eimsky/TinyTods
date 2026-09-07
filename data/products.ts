import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "p-01",
    slug: "soft-cotton-baby-romper",
    name: "Soft Cotton Baby Romper",
    categorySlug: "clothing",
    price: 18.99,
    oldPrice: 24.99,
    currency: "Rs",
    rating: 4.8,
    reviewCount: 142,
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519457851969-91d0dc32a99c?w=900&q=80&auto=format&fit=crop",
    ],
    shortDescription: "Breathable organic cotton romper for everyday cuddles.",
    description:
      "Made from 100% organic cotton, this romper keeps little ones comfortable from nap time to playtime. A soft ribbed collar and easy snap closures make dressing a breeze, while the relaxed cut allows plenty of room to wiggle, crawl, and grow.",
    options: [
      { label: "Size", values: ["0-3M", "3-6M", "6-12M"] },
      { label: "Color", values: ["Sage", "Cream", "Sky Blue"] },
    ],
    isFeatured: true,
    stock: 34,
    shippingInfo: "Ships in 1-2 business days. Free returns within 30 days.",
    reviews: [
      {
        id: "r1",
        author: "Amara J.",
        rating: 5,
        comment: "So soft and the snaps make diaper changes so quick.",
        date: "2026-06-02",
      },
      {
        id: "r2",
        author: "Priya S.",
        rating: 4,
        comment: "Lovely fabric, runs slightly big which is great for growing.",
        date: "2026-05-18",
      },
    ],
  },
  {
    id: "p-02",
    slug: "baby-elephant-plush-toy",
    name: "Baby Elephant Plush Toy",
    categorySlug: "toys",
    price: 15.5,
    currency: "Rs",
    rating: 4.9,
    reviewCount: 210,
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558877385-1c4b7f5eba30?w=900&q=80&auto=format&fit=crop",
    ],
    shortDescription: "A huggable elephant friend for nap time and beyond.",
    description:
      "Inspired by our very own TinyTods elephant, this plush toy is stitched from ultra-soft minky fabric and filled with hypoallergenic stuffing. Embroidered features mean no small parts, making it safe from day one.",
    options: [{ label: "Size", values: ["Small", "Large"] }],
    isFeatured: true,
    isNew: true,
    stock: 58,
    shippingInfo: "Ships in 1-2 business days. Machine washable.",
    reviews: [
      {
        id: "r1",
        author: "Dilani F.",
        rating: 5,
        comment: "My daughter has not let go of this since it arrived.",
        date: "2026-07-11",
      },
    ],
  },
  {
    id: "p-03",
    slug: "silicone-feeding-set",
    name: "Silicone Feeding Set",
    categorySlug: "feeding",
    price: 22.0,
    oldPrice: 28.0,
    currency: "Rs",
    rating: 4.7,
    reviewCount: 96,
    images: [
      "/Silicone_feeding1 (1).jpeg",
      "/Silicone_feeding2.jpeg",
    ],
    shortDescription: "Suction bowl, plate and spoon set for early feeders.",
    description:
      "Food-grade silicone that stays put with a strong suction base, so mealtime mess stays on the tray, not the floor. Dishwasher, microwave and freezer safe for easy meal prep.",
    options: [{ label: "Color", values: ["Mint", "Peach", "Sky"] }],
    isFeatured: true,
    stock: 40,
    shippingInfo: "Ships in 1-2 business days.",
  },
  {
    id: "p-04",
    slug: "cozy-baby-blanket",
    name: "Cozy Baby Blanket",
    categorySlug: "nursery",
    price: 26.0,
    currency: "Rs",
    rating: 4.9,
    reviewCount: 178,
    images: [
      "/Cozy_baby_blanke1.jpeg",
      "/Cozy_baby_bla2.jpeg",
    ],
    shortDescription: "A featherlight knit blanket for swaddling and strolls.",
    description:
      "Woven from a breathable cotton-bamboo blend, this blanket is light enough for summer naps and cozy enough for cool evenings. Finished with a scalloped edge inspired by TinyTods' signature dashed trim.",
    isFeatured: true,
    stock: 25,
    shippingInfo: "Ships in 1-2 business days.",
  },
  {
    id: "p-05",
    slug: "baby-bath-set",
    name: "Baby Bath Set",
    categorySlug: "bath-care",
    price: 19.99,
    oldPrice: 27.99,
    currency: "Rs",
    rating: 4.6,
    reviewCount: 87,
    images: [
      "/Baby_bath.jpeg",
    ],
    shortDescription: "Gentle wash, shampoo and hooded towel bundle.",
    description:
      "A tear-free wash and shampoo paired with a plush hooded towel, formulated with calming chamomile for sensitive skin. Everything you need for a soothing bath-time routine.",
    isFeatured: true,
    stock: 30,
    shippingInfo: "Ships in 1-2 business days.",
  },
  {
    id: "p-06",
    slug: "wooden-learning-blocks",
    name: "Wooden Learning Blocks",
    categorySlug: "toys",
    price: 21.5,
    currency: "Rs",
    rating: 4.8,
    reviewCount: 64,
    images: [
      "/Wooden_learning.jpeg",
    ],
    shortDescription: "Hand-painted blocks for stacking and sorting fun.",
    description:
      "Sustainably sourced beechwood blocks finished with plant-based, non-toxic paint. Numbers, letters and shapes encourage early learning through open-ended play.",
    isNew: true,
    isFeatured: true,
    stock: 45,
    shippingInfo: "Ships in 1-2 business days.",
  },
  {
    id: "p-07",
    slug: "baby-bib-set",
    name: "Baby Bib Set",
    categorySlug: "feeding",
    price: 12.99,
    currency: "Rs",
    rating: 4.5,
    reviewCount: 53,
    images: [
      "/Baby_bib_set.jpeg",
    ],
    shortDescription: "A set of 3 wipeable bibs for tidier mealtimes.",
    description:
      "Soft on the neckline, wipeable on the front — these bibs are built for real-life mealtimes. Adjustable snaps grow with your little one from first purees to finger foods.",
    isFeatured: true,
    stock: 60,
    shippingInfo: "Ships in 1-2 business days.",
  },
  {
    id: "p-08",
    slug: "nursery-gift-box",
    name: "Nursery Gift Box",
    categorySlug: "gifts",
    price: 42.0,
    oldPrice: 55.0,
    currency: "Rs",
    rating: 5.0,
    reviewCount: 39,
    images: [
      "/Nursery_gif.jpeg",
    ],
    shortDescription: "A curated welcome bundle for a new little one.",
    description:
      "Wrapped in TinyTods signature packaging, this gift box brings together a plush toy, blanket, and keepsake card — a ready-to-give gift for baby showers and new arrivals.",
    isFeatured: true,
    stock: 20,
    shippingInfo: "Ships in 1-2 business days. Gift wrap included.",
  },
  {
    id: "p-09",
    slug: "star-print-sleepsuit",
    name: "Star Print Sleepsuit",
    categorySlug: "clothing",
    price: 16.5,
    currency: "Rs",
    rating: 4.7,
    reviewCount: 71,
    images: [
      "/Star_Print_Slee.jpeg",
    ],
    shortDescription: "Footed sleepsuit with a dreamy star print.",
    description:
      "Two-way zips make midnight changes simple, while the soft cotton jersey keeps little ones warm without overheating. Finished with the same starry motif as our logo.",
    options: [{ label: "Size", values: ["0-3M", "3-6M", "6-12M", "12-18M"] }],
    stock: 38,
    shippingInfo: "Ships in 1-2 business days.",
  },
  {
    id: "p-10",
    slug: "stacking-rainbow-toy",
    name: "Stacking Rainbow Toy",
    categorySlug: "toys",
    price: 17.0,
    currency: "Rs",
    rating: 4.8,
    reviewCount: 58,
    images: [
      "/Stacking_rainb.jpeg",
    ],
    shortDescription: "A wooden rainbow stacker for tiny hands.",
    description:
      "Rounded, chunky pieces in soft pastel tones help build fine motor skills through stacking, sorting and imaginative play.",
    stock: 42,
    shippingInfo: "Ships in 1-2 business days.",
  },
  {
    id: "p-11",
    slug: "gentle-baby-lotion",
    name: "Gentle Baby Lotion",
    categorySlug: "bath-care",
    price: 13.5,
    currency: "Rs",
    rating: 4.6,
    reviewCount: 49,
    images: [
      "/Baby_loti.jpeg",
    ],
    shortDescription: "Fragrance-light lotion for everyday softness.",
    description:
      "A lightweight, fast-absorbing lotion made with shea butter and oat extract to keep delicate skin soft and comfortable all day.",
    stock: 55,
    shippingInfo: "Ships in 1-2 business days.",
  },
  {
    id: "p-12",
    slug: "quilted-diaper-bag",
    name: "Quilted Diaper Bag",
    categorySlug: "accessories",
    price: 34.0,
    oldPrice: 44.0,
    currency: "Rs",
    rating: 4.7,
    reviewCount: 66,
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&q=80&auto=format&fit=crop",
    ],
    shortDescription: "A spacious, stylish bag for busy days out.",
    description:
      "Quilted mint canvas with a wipeable lining, insulated bottle pockets, and a fold-out changing mat — everything for a day out, organized in one place.",
    isNew: true,
    stock: 27,
    shippingInfo: "Ships in 1-2 business days.",
  },
  {
    id: "p-13",
    slug: "cloud-nursery-lamp",
    name: "Cloud Nursery Lamp",
    categorySlug: "nursery",
    price: 24.5,
    currency: "Rs",
    rating: 4.9,
    reviewCount: 44,
    images: [
      "/Cloud_nursery_lamp.jpeg",
    ],
    shortDescription: "A soft-glow lamp shaped like a little cloud.",
    description:
      "Dimmable, warm LED light in a huggable cloud silhouette — a gentle glow for feedings, story time, and easing into sleep.",
    stock: 33,
    shippingInfo: "Ships in 1-2 business days.",
  },
  {
    id: "p-14",
    slug: "first-birthday-gift-set",
    name: "First Birthday Gift Set",
    categorySlug: "gifts",
    price: 38.0,
    currency: "Rs",
    rating: 4.9,
    reviewCount: 22,
    images: [
      "/First_Birthday_.jpeg",
    ],
    shortDescription: "A celebration bundle for a very big first year.",
    description:
      "A keepsake bib, milestone cards, and a plush toy come together in this gift set — made for marking the little moments that lead to one big birthday.",
    stock: 18,
    shippingInfo: "Ships in 1-2 business days. Gift wrap included.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.isFeatured);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getSaleProducts() {
  return products.filter((p) => p.oldPrice && p.oldPrice > p.price);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}
