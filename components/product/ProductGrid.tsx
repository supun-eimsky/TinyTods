import { Product as ProductModel } from "@/models/Product";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Array<Product | ProductModel>;
  columns?: "2-4" | "2-3-4";
}

export function ProductGrid({ products, columns = "2-4" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-display text-xl text-teal-800">No products found</p>
        <p className="text-teal-700/60 mt-2 text-sm">
          Try a different category or search term.
        </p>
      </div>
    );
  }

  const gridClass =
    columns === "2-4"
      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6";

  return (
    <div className={gridClass}>
      {products.map((product) => {
        const productData = product instanceof ProductModel ? product.toJSON() : product;
        return <ProductCard key={productData.id} product={productData} />;
      })}
    </div>
  );
}
