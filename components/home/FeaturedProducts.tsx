import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-content">
        <SectionHeading title="Little Favorites" subtitle="Made for tiny moments and big smiles." />
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/categories" variant="outline">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
