import type { Category } from "@/types";
import { CategoryCard } from "@/components/product/CategoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="py-16 sm:py-20 bg-cream">
      <div className="container-content">
        <SectionHeading title="Shop by Category" subtitle="Everything for your little world" />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
