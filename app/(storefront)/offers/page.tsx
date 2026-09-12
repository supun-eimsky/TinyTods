import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getOffersPageData } from "@/controllers/offerController";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DecoStar, DecoHeart } from "@/components/ui/Decorations";

export const metadata: Metadata = {
  title: "Offers",
  description: "Special offers and discounts on baby clothing, toys, feeding and nursery products at TinyTods.",
};

export default async function OffersPage() {
  const { offers, saleProducts } = await getOffersPageData();

  return (
    <div className="bg-cream min-h-screen">
      <section className="relative py-14 sm:py-20 bg-teal-800 overflow-hidden">
        <DecoStar className="absolute top-8 left-[10%] w-5 h-5 hidden sm:block" />
        <DecoHeart className="absolute bottom-8 right-[14%] w-5 h-5 hidden sm:block" color="#F5B78F" />
        <div className="container-content text-center">
          <span className="inline-block bg-sunshine text-teal-800 text-xs font-bold px-4 py-1.5 rounded-full">
            Up to 30% OFF
          </span>
          <h1 className="mt-5 font-display text-3xl sm:text-5xl text-cream">
            Special Offers for Little Ones
          </h1>
          <p className="mt-4 text-cream/70 max-w-lg mx-auto">
            Little treats, lovely prices — because every family deserves a good deal.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-content">
          <SectionHeading title="Featured Deals" align="left" className="mx-0" />
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div key={offer.id} className="rounded-4xl bg-white shadow-card overflow-hidden group">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-peach text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                    -{offer.discountPercent}%
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-teal-800">{offer.title}</h3>
                  <p className="mt-1.5 text-sm text-teal-700/60">{offer.subtitle}</p>
                  <Link
                    href="#sale-products"
                    className="mt-4 inline-flex text-sm font-semibold text-sky hover:text-teal-700 transition-colors"
                  >
                    {offer.ctaLabel} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sale-products" className="py-14 sm:py-20 bg-white">
        <div className="container-content">
          <SectionHeading title="On Sale Now" subtitle="Grab these little favorites before they're gone." />
          <div className="mt-10">
            <ProductGrid products={saleProducts} />
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/categories">Shop Now</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
