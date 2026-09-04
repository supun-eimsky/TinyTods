import { ProductService } from "@/services/productService";
import { CategoryService } from "@/services/categoryService";
import { OfferService } from "@/services/offerService";

/**
 * Assembles all the data the home page needs. Keeping this in a
 * controller (rather than inline in app/page.tsx) means the page
 * component stays focused on layout/markup only.
 */
export async function getHomePageData() {
  const [featuredProducts, categories, offers] = await Promise.all([
    ProductService.getFeatured(),
    CategoryService.list(),
    OfferService.list(),
  ]);

  return { featuredProducts, categories, offers };
}
