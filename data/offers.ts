import { Offer } from "@/types";

export const offers: Offer[] = [
  {
    id: "off-01",
    title: "Up to 30% off feeding essentials",
    subtitle: "Little treats, lovely prices on bowls, sets and bibs.",
    discountPercent: 30,
    image:
      "/Feeding_essentia.jpeg",
    ctaLabel: "Shop Feeding",
    accent: "sky",
    productSlugs: ["silicone-feeding-set", "baby-bib-set"],
  },
  {
    id: "off-02",
    title: "25% off cozy nursery picks",
    subtitle: "Warm up the nursery for less this season.",
    discountPercent: 25,
    image:
      "/Nursery_picks.jpeg",
    ctaLabel: "Shop Nursery",
    accent: "mint",
    productSlugs: ["cozy-baby-blanket", "cloud-nursery-lamp"],
  },
  {
    id: "off-03",
    title: "Gift bundles from $38",
    subtitle: "Ready-to-give sets for showers and birthdays.",
    discountPercent: 15,
    image:
      "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=900&q=80&auto=format&fit=crop",
    ctaLabel: "Shop Gifts",
    accent: "sunshine",
    productSlugs: ["nursery-gift-box", "first-birthday-gift-set"],
  },
];
