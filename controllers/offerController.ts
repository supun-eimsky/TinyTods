import { OfferService } from "@/services/offerService";
import { ProductService } from "@/services/productService";

export async function getOffersPageData() {
  const [offers, saleProducts] = await Promise.all([
    OfferService.list(),
    ProductService.getOnSale(),
  ]);
  return { offers, saleProducts };
}
