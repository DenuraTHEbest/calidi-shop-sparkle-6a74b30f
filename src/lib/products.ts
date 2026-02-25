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
    id: "3",
    name: "Tailored Navy Trousers",
    price: 195,
    category: "Men",
    image: product3,
    description: "Classic navy blue tailored trousers with a refined silhouette.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "4",
    name: "Oversized Cotton Tee",
    price: 85,
    category: "Men",
    image: product4,
    description: "Premium oversized white cotton t-shirt with a relaxed fit.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "5",
    name: "Leather Crossbody Bag",
    price: 320,
    category: "Accessories",
    image: product5,
    description: "Camel brown leather crossbody bag with gold hardware.",
    sizes: ["One Size"],
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
  {
    id: "7",
    name: "Cashmere Turtleneck",
    price: 275,
    category: "Men",
    image: product7,
    description: "Black cashmere turtleneck sweater for timeless layering.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "8",
    name: "Gold Chain Necklace",
    price: 140,
    category: "Accessories",
    image: product8,
    description: "Minimalist gold chain necklace with a bar pendant.",
    sizes: ["One Size"],
  },
];

export const categories = ["All", "Women", "Men", "Accessories"];
