import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { DecoStar, DecoHeart } from "@/components/ui/Decorations";
import { Sparkles, Heart, ShieldCheck, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn the TinyTods story — how we choose baby products made for tiny moments and big smiles.",
};

const values = [
  {
    icon: Sparkles,
    title: "Why TinyTods",
    text: "We started TinyTods because finding truly thoughtful baby products shouldn't be a search. Every item in our store passes a simple test: would we choose it for our own family?",
  },
  {
    icon: ShieldCheck,
    title: "Quality Promise",
    text: "From stitching to packaging, we check for safety, durability and comfort before anything reaches our shelves — and yours.",
  },
  {
    icon: Heart,
    title: "Our Mission",
    text: "To make everyday parenting a little softer, a little easier, and a lot more joyful, one small product at a time.",
  },
  {
    icon: Users,
    title: "Parents & Little Ones",
    text: "We build TinyTods around real families — real feedback, real routines, and real little ones who test everything first.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <DecoStar className="absolute top-10 left-[10%] w-6 h-6 hidden sm:block" />
        <DecoHeart className="absolute bottom-10 right-[12%] w-5 h-5 hidden sm:block" color="#6DBFD8" />
        <div className="container-content grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-display text-4xl sm:text-5xl text-teal-800">Our Story</h1>
            <p className="mt-5 text-teal-700/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
              TinyTods began with a simple wish: to make it easy for parents to find
              products that feel as caring as they look. What started as a small
              collection of favorites has grown into a home for everything a little
              one needs — chosen thoughtfully, wrapped with love, and delivered with
              a smile.
            </p>
            <div className="mt-8">
              <Button href="/categories">Shop Our Collection</Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] max-w-sm mx-auto rounded-blob overflow-hidden shadow-lift bg-mint-light">
            <Image
              src="https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=900&q=80&auto=format&fit=crop"
              alt="TinyTods curated baby products"
              fill
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-content grid sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="rounded-4xl bg-cream p-7 sm:p-8">
              <div className="w-12 h-12 rounded-full bg-mint-light flex items-center justify-center">
                <v.icon size={22} className="text-teal-700" strokeWidth={1.75} />
              </div>
              <h2 className="mt-4 font-display text-xl text-teal-800">{v.title}</h2>
              <p className="mt-2 text-sm sm:text-base text-teal-700/70 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-content text-center max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl text-teal-800">
            A little brand, built on big love
          </h2>
          <p className="mt-4 text-teal-700/70">
            {"Thank you for being part of our journey — we're so grateful to have you as part of the TinyTods family."}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="outline">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
