import { Product as ProductType, ProductReview, ProductOption } from "@/types";

/**
 * Product model — wraps raw product data with derived, presentation-ready
 * getters so components never compute pricing/formatting logic themselves.
 * Swapping the data layer (mock -> API/database) only requires the
 * ProductService to keep returning objects shaped like ProductType.
 */
export class Product {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly categorySlug: string;
  readonly price: number;
  readonly oldPrice?: number;
  readonly currency: string;
  readonly rating: number;
  readonly reviewCount: number;
  readonly images: string[];
  readonly shortDescription: string;
  readonly description: string;
  readonly options?: ProductOption[];
  readonly isNew?: boolean;
  readonly isFeatured?: boolean;
  readonly stock: number;
  readonly reviews?: ProductReview[];
  readonly shippingInfo?: string;

  constructor(data: ProductType) {
    this.id = data.id;
    this.slug = data.slug;
    this.name = data.name;
    this.categorySlug = data.categorySlug;
    this.price = data.price;
    this.oldPrice = data.oldPrice;
    this.currency = data.currency;
    this.rating = data.rating;
    this.reviewCount = data.reviewCount;
    this.images = data.images;
    this.shortDescription = data.shortDescription;
    this.description = data.description;
    this.options = data.options;
    this.isNew = data.isNew;
    this.isFeatured = data.isFeatured;
    this.stock = data.stock;
    this.reviews = data.reviews;
    this.shippingInfo = data.shippingInfo;
  }

  get discountPercent(): number {
    if (!this.oldPrice || this.oldPrice <= this.price) return 0;
    return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
  }

  get isOnSale(): boolean {
    return this.discountPercent > 0;
  }

  get inStock(): boolean {
    return this.stock > 0;
  }

  formattedPrice(): string {
    return `${this.currency}${this.price.toFixed(2)}`;
  }

  formattedOldPrice(): string | null {
    return this.oldPrice ? `${this.currency}${this.oldPrice.toFixed(2)}` : null;
  }

  toJSON(): ProductType {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      categorySlug: this.categorySlug as ProductType["categorySlug"],
      price: this.price,
      oldPrice: this.oldPrice,
      currency: this.currency,
      rating: this.rating,
      reviewCount: this.reviewCount,
      images: this.images,
      shortDescription: this.shortDescription,
      description: this.description,
      options: this.options,
      isNew: this.isNew,
      isFeatured: this.isFeatured,
      discountPercent: this.discountPercent,
      stock: this.stock,
      reviews: this.reviews,
      shippingInfo: this.shippingInfo,
    };
  }
}
