import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Offer } from "@/types";
import { Button } from "@/components/ui/Button";
import { DecoStar } from "@/components/ui/Decorations";

export function OffersSection({ offers }: { offers: Offer[] }) {
  const [primary, ...rest] = offers;

  return (
    <section className="py-16 sm:py-20 bg-teal-800 relative overflow-hidden">
      <DecoStar className="absolute top-10 right-10 w-6 h-6 opacity-70 hidden sm:block" />
      <DecoStar className="absolute bottom-10 left-10 w-4 h-4 opacity-50 hidden sm:block" color="#8FC8B5" />

      <div className="container-content">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl sm:text-4xl text-cream">Special Offers for Little Ones</h2>
          <p className="mt-3 text-cream/70">Up to 30% off — little treats, lovely prices.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {primary && (
            <Link
              href="/offers"
              className="group lg:col-span-2 relative rounded-4xl overflow-hidden bg-sunshine-light min-h-[280px] flex items-end"
            >
              <Image
                src={primary.image}
                alt={primary.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-10 w-full bg-gradient-to-t from-teal-900/80 via-teal-900/20 to-transparent p-6 sm:p-8">
                <span className="inline-block bg-sunshine text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                  Up to {primary.discountPercent}% OFF
                </span>
                <h3 className="mt-3 font-display text-2xl text-white">{primary.title}</h3>
                <p className="mt-1 text-cream/80 text-sm max-w-sm">{primary.subtitle}</p>
              </div>
            </Link>
          )}

          <div className="flex flex-col gap-6">
            {rest.slice(0, 2).map((offer) => (
              <Link
                key={offer.id}
                href="/offers"
                className="group relative rounded-4xl overflow-hidden bg-mint-light flex-1 min-h-[130px] flex items-center"
              >
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="relative z-10 w-full h-full bg-teal-900/45 p-5 flex flex-col justify-end">
                  <span className="text-xs font-bold text-sunshine">{offer.discountPercent}% OFF</span>
                  <h3 className="font-display text-base text-white leading-snug">{offer.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/offers" variant="secondary">
            Shop Offers <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
