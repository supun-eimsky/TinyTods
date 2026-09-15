import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types";

const accentBg: Record<string, string> = {
  mint: "bg-mint-light",
  sky: "bg-sky-light",
  peach: "bg-peach-light",
  sunshine: "bg-sunshine-light",
  sage: "bg-sage",
};

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories?category=${category.slug}`}
      className="group relative flex flex-col items-center text-center rounded-4xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className={`absolute inset-0 rounded-4xl ${accentBg[category.accent]} transition-transform duration-300 group-hover:scale-[1.03]`}
        aria-hidden="true"
      />
      <div className="relative w-full">
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white shadow-card">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="120px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <h3 className="mt-4 font-display text-base sm:text-lg text-teal-800">{category.name}</h3>
        <p className="mt-1 text-xs sm:text-sm text-teal-700/60">{category.description}</p>
      </div>
    </Link>
  );
}
