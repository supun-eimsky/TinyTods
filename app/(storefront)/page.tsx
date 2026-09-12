import { getHomePageData } from "@/controllers/homeController";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { OffersSection } from "@/components/home/OffersSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BrandStory } from "@/components/home/BrandStory";
import { Newsletter } from "@/components/home/Newsletter";

export default async function HomePage() {
  const { featuredProducts, categories, offers } = await getHomePageData();

  return (
    <>
      <HeroSection />
      <CategorySection categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <OffersSection offers={offers} />
      <WhyChooseUs />
      <BrandStory />
      <Newsletter />
    </>
  );
}
