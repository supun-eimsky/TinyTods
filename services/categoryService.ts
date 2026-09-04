import { categories, getCategoryBySlug } from "@/data/categories";
import { Category as CategoryModel } from "@/models/Category";

export const CategoryService = {
  async list(): Promise<CategoryModel[]> {
    return categories.map((c) => new CategoryModel(c));
  },

  async getBySlug(slug: string): Promise<CategoryModel | null> {
    const found = getCategoryBySlug(slug);
    return found ? new CategoryModel(found) : null;
  },
};
