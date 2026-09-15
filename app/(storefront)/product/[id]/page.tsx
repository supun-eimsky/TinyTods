import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProductPageData } from "@/controllers/productController";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// See the comment on this same export in app/(storefront)/page.tsx —
// products are admin-managed in MySQL, and a product's price, stock or
// details can change at any time, so this page must always render fresh
// rather than serve a build-time snapshot.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const { product } = await getProductPageData(id);
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const { product, related } = await getProductPageData(id);

  return (
    <div className="bg-cream">
      <div className="container-content pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-teal-700/50">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/categories" className="hover:text-teal-700">
            Categories
          </Link>
          <ChevronRight size={12} />
          <span className="text-teal-700 font-semibold">{product.name}</span>
        </nav>
      </div>

      <section className="container-content py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <ProductPurchasePanel product={product} />
        </div>

        <ProductTabs product={product} />
      </section>

      {related.length > 0 && (
        <section className="py-14 sm:py-20 bg-white">
          <div className="container-content">
            <SectionHeading title="You May Also Like" subtitle="More little favorites in this category." />
            <div className="mt-10">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
