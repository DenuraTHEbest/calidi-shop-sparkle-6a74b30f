import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="py-20 px-6 bg-secondary/50">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">
          New Arrivals
        </h2>
        <p className="font-body text-center text-muted-foreground mb-12">
          Curated essentials for the season ahead
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-block border border-foreground text-foreground px-10 py-3 font-body text-sm uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-all duration-300"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
