import { Category as CategoryType, CategorySlug } from "@/types";

export class Category {
  readonly id: string;
  readonly slug: CategorySlug;
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly accent: CategoryType["accent"];
  readonly productCount: number;

  constructor(data: CategoryType) {
    this.id = data.id;
    this.slug = data.slug;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.accent = data.accent;
    this.productCount = data.productCount;
  }

  get href(): string {
    return `/categories?category=${this.slug}`;
  }
}
