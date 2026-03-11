import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";
import product5 from "@/assets/product-5.png";
import product6 from "@/assets/product-6.png";
import product7 from "@/assets/product-7.png";
import product8 from "@/assets/product-8.png";
import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Linen Tailored Blazer",
    price: 245,
    category: "Women",
    image: product1,
    description: "A beautifully crafted cream linen blazer with a single-button closure.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Pleated Midi Skirt",
    price: 165,
    category: "Women",
    image: product2,
    description: "Elegant dusty rose pleated midi skirt in flowing fabric.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "6",
    name: "Wool Overcoat",
    price: 450,
    category: "Women",
    image: product6,
    description: "Olive green wool overcoat with a structured silhouette.",
    sizes: ["XS", "S", "M", "L"],
  },
];

export const categories = ["All", "Women"];
