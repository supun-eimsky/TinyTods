import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { DecoHeart } from "@/components/ui/Decorations";

export function BrandStory() {
  return (
    <section className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="container-content grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] rounded-4xl overflow-hidden shadow-lift">
            <Image
              src="https://images.unsplash.com/photo-1522771930-78848d9293e8?w=900&q=80&auto=format&fit=crop"
              alt="Parent smiling with their baby"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-sunshine-light flex items-center justify-center shadow-card">
            <DecoHeart className="w-8 h-8" color="#07545A" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="font-display text-3xl sm:text-4xl text-teal-800">Made for Little Moments</h2>
          <p className="mt-5 text-teal-700/70 leading-relaxed max-w-lg">
            At TinyTods, we believe the smallest moments create the biggest memories.
            We carefully choose beautiful, practical and baby-friendly products to make
            everyday moments a little more special.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
