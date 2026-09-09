import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "p-01",
    slug: "Disney-Pixar-Baby",
    name: "Disney Pixar Baby 2-Piece Tracksuit Set ",
    categorySlug: "clothing",
    price: 1899,
    oldPrice: 24.99,
    currency: "Rs",
    rating: 4.8,
    reviewCount: 0,
    images: [

      "/images/dexip2.jpeg",
      "/images/dexip3.jpeg",
      "/images/disney4.jpeg",
      "/images/Disney_Pixar.jpeg",
    ],
    shortDescription: "Cute and comfortable set",
    description:
      "Cute, comfortable, and perfect for everyday adventures, this adorable two-piece set is made from soft and comfortable cotton-blend fabric with delicate floral details and a fun character print. It features a cozy long-sleeve top paired with matching elastic-waist jogger pants for a relaxed and comfortable fit. Designed for easy movement, this set is perfect for everyday wear, playtime, and keeping little ones cozy throughout the day.",
    options: [
      { label: "Color", values: ["Yellow", "Pink", "White"] },
      { label: "Size", values: ["0-3M", "3-6M", "6-9M", "9-12M"] },

    ],
    isFeatured: true,
    stock: 34,
    shippingInfo: "",
    reviews: [

    ],
  },

  {
    id: "p-02",
    slug: "Body-Suit",
    name: "Body Suit",
    categorySlug: "clothing",

    price: 2600.0,
    currency: "Rs",
    rating: 4.9,
    reviewCount: 178,
    images: [
      "/images/baby_suit.jpeg"
    ],
    shortDescription: "EXPORT QUALITY ",
    description:
      "Discover our carefully selected premiumquality baby bodysuits, chosen with your little one’s comfort and happiness in mind. ",
    isFeatured: true,
    options: [
      { label: "Size", values: [" NEWBORN – 24 MONTHS"] },
      { label: "AVAILABLE", values: ["2, 3, 5 & 7-PIECE SETS"] },
    ],
    stock: 25,
    shippingInfo: "RETAIL & WHOLESALE ORDERS AVAILABLE!",
  },

  {
    id: "p-03",
    slug: "Baby-girl-frock-with-head-band",
    name: "Baby girl frock with head band",
    categorySlug: "clothing",
    price: 1600,
    currency: "Rs",
    rating: 4.7,
    reviewCount: 71,
    images: [
      "/images/image6.jpeg",
      "/images/omagr12.jpeg",
      "/images/image8.jpeg"
    ],
    shortDescription: "Soft and comfortable cotton-blend fabric with delicate floral details. ",
    description:
      "Soft, comfortable, and beautifully designed, this adorable outfit is made from soft and comfortable fabric with a charming floral print design. It features a delicate ruffle collar and matching ruffle details, along with long sleeves finished with elastic cuffs for a cozy and secure fit. Perfect for everyday wear and playtime, this lovely outfit keeps little ones comfortable while adding a sweet and stylish touch to their look.",
    options: [{ label: "Size", values: ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M", "18-24M"] }],
    stock: 5,
    isFeatured: true,
    shippingInfo: "New Shop",
  },
  {
    id: "p-04",
    slug: "Printed-T-shirt",
    name: "Printed T-shirt & pink short ",
    categorySlug: "clothing",
    price: 1900,
    currency: "Rs",
    rating: 4.7,
    reviewCount: 71,
    images: [
      "/images/image9.jpeg",
      "/images/image10.jpeg",
      "/images/image11.jpeg"
    ],
    shortDescription: "Soft and comfortable cotton-blend fabric with delicate floral details. ",
    description:
      "Soft, comfortable, and beautifully designed, this adorable outfit is made from soft and comfortable fabric with a charming floral print design. It features a delicate ruffle collar and matching ruffle details, along with long sleeves finished with elastic cuffs for a cozy and secure fit. Perfect for everyday wear and playtime, this lovely outfit keeps little ones comfortable while adding a sweet and stylish touch to their look.",
    options: [{ label: "Size", values: ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M", "18-24M"] }],
    stock: 5,
    isFeatured: true,
    shippingInfo: "New Shop",
  },


];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.isFeatured);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getSaleProducts() {
  return products.filter((p) => p.oldPrice && p.oldPrice > p.price);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}
