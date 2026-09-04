import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-01",
    slug: "clothing",
    name: "Baby Clothing",
    description: "Soft cottons for everyday wear",
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80&auto=format&fit=crop",
    accent: "mint",
    productCount: 24,
  },
  {
    id: "cat-02",
    slug: "toys",
    name: "Toys",
    description: "Playtime that grows little minds",
    image:
      "/toys.jpeg",
    accent: "sunshine",
    productCount: 31,
  },
  {
    id: "cat-03",
    slug: "feeding",
    name: "Feeding",
    description: "Mealtime made simple and safe",
    image:
      "/Feeding_item.jpeg",
    accent: "sky",
    productCount: 18,
  },
  {
    id: "cat-04",
    slug: "bath-care",
    name: "Bath & Care",
    description: "Gentle care from head to toe",
    image:
      "/Bath_care_item.jpeg",
    accent: "peach",
    productCount: 15,
  },
  {
    id: "cat-05",
    slug: "accessories",
    name: "Baby Accessories",
    description: "Little extras for busy days",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80&auto=format&fit=crop",
    accent: "sage",
    productCount: 22,
  },
  {
    id: "cat-06",
    slug: "nursery",
    name: "Nursery",
    description: "Cozy corners for sweet dreams",
    image:
      "/Finding_nursery.jpeg",
    accent: "mint",
    productCount: 19,
  },
  {
    id: "cat-07",
    slug: "gifts",
    name: "Gifts",
    description: "Thoughtful bundles for little ones",
    image:
      "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&q=80&auto=format&fit=crop",
    accent: "sunshine",
    productCount: 12,
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
