import { ProductService } from "@/services/productService";
import { notFound } from "next/navigation";

export async function getProductPageData(slug: string) {
  const product = await ProductService.getBySlug(slug);
  if (!product) notFound();

  const related = await ProductService.getRelated(product.toJSON(), 4);
  return { product, related };
}
