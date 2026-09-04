export type CategorySlug =
  | "clothing"
  | "toys"
  | "feeding"
  | "bath-care"
  | "accessories"
  | "nursery"
  | "gifts";

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  accent: "mint" | "sky" | "peach" | "sunshine" | "sage";
  productCount: number;
}

export interface ProductOption {
  label: string;
  values: string[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: CategorySlug;
  price: number;
  oldPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  images: string[];
  shortDescription: string;
  description: string;
  options?: ProductOption[];
  isNew?: boolean;
  isFeatured?: boolean;
  discountPercent?: number;
  stock: number;
  reviews?: ProductReview[];
  shippingInfo?: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  discountPercent: number;
  image: string;
  ctaLabel: string;
  accent: "mint" | "sky" | "peach" | "sunshine";
  productSlugs: string[];
}

export interface CartLine {
  productId: string;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: "sparkles" | "heart" | "shield" | "smile";
}
