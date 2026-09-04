import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { DecoStar, DecoHeart } from "@/components/ui/Decorations";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream pt-10 sm:pt-10 pb-5 sm:pb-5"
    >
      
      {/* background image */}
      <div className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/full.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true">
        <Image
          src="/full.jpeg"
          alt=""
          fill
          priority
          className="object-cover"
        />

        {/* overlay to keep text/content readable over the image */}
        <div className="absolute inset-0 bg-cream/80" />
      </div>
      {/* organic background shapes, echoing the logo's soft blobs */}
     
      <div
        className="hidden sm:flex absolute -bottom-32 -right-32 w-[26rem] h-[26rem] rounded-full bg-mint-light/70 blur-2xl"
        aria-hidden="true"
      />
     
      <div
        className="  absolute -top-32 -left-20 w-80 h-80 rounded-full bg-peach-light/60 blur-2xl"
        aria-hidden="true"
      />
      <DecoStar className="absolute top-16 left-[8%] w-6 h-6 animate-floaty hidden sm:block" />
      <DecoHeart className="absolute bottom-24 left-[20%] w-5 h-5 animate-floaty hidden sm:block" color="#F5B78F" />
      <DecoStar className="absolute top-28 right-[12%] w-4 h-4 hidden sm:block" color="#6DBFD8" />

      <div className="container-content relative grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-1.5 text-xs font-semibold text-teal-700 shadow-card">
            <DecoStar className="w-3.5 h-3.5" /> New arrivals every month
          </span>

          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl text-teal-800 leading-[1.08]">
            Little Things, Big<br className="hidden sm:block" />  Smiles
          </h1>

          <p className="mt-5 text-base sm:text-lg text-teal-700/70 max-w-md mx-auto lg:mx-0">
            Everything your little one needs, chosen with love.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
           
            <Button href="/categories" size="lg" variant="outline">
              Explore Categories
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-teal-700/60 text-xs sm:text-sm">
            <span>🍼 Baby-safe materials</span>
            <span className="hidden sm:inline">💚 Loved by parents</span>
          </div>
          
        </div>

        <div className="">
       <img
       src="logo95.jpeg"
       alt="Happy baby surrounded by TinyTods products"
       >

       </img>

        </div>
      </div>
    </section>
  );
}
