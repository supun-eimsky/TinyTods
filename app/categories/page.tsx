import type { Metadata } from "next";
import { getCategoryPageData } from "@/controllers/categoryController";
import { CategoriesExplorer } from "@/components/categories/CategoriesExplorer";
import { DecoStar, DecoHeart } from "@/components/ui/Decorations";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse baby clothing, toys, feeding, bath & care, nursery and gifts at TinyTods.",
};

interface CategoriesPageProps {
  searchParams: { category?: string };
}

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const { categories, products } = await getCategoryPageData({ category: searchParams.category });

  return (
    <div className="bg-cream min-h-screen">
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <DecoStar className="absolute top-6 left-[8%] w-5 h-5 hidden sm:block" />
        <DecoHeart className="absolute top-10 right-[10%] w-5 h-5 hidden sm:block" color="#F5B78F" />
        <div className="container-content text-center">
          <h1 className="font-display text-3xl sm:text-4xl text-teal-800">Shop All Categories</h1>
          <p className="mt-3 text-teal-700/70 max-w-xl mx-auto">
            Everything for your little one, organized just for you.
          </p>
        </div>
      </section>

      <section className="container-content pb-20">
        <CategoriesExplorer
          categories={categories}
          products={products}
          initialCategory={searchParams.category}
        />
      </section>
    </div>
  );
}
