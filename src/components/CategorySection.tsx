import categoryWomen from "@/assets/category-women.png";
import categoryMen from "@/assets/category-men.png";
import categoryAccessories from "@/assets/category-accessories.png";
import { Link } from "react-router-dom";

const categories = [
  { name: "Women", image: categoryWomen },
  { name: "Men", image: categoryMen },
  { name: "Accessories", image: categoryAccessories },
];

export default function CategorySection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name}`}
              className="group relative aspect-square overflow-hidden bg-secondary"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/25 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-end p-8">
                <h3 className="font-display text-2xl text-background tracking-wider">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
