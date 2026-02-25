import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showSizes, setShowSizes] = useState(false);

  const handleAdd = () => {
    addItem(product, selectedSize);
    toast.success(`${product.name} added to bag`, {
      description: `Size: ${selectedSize}`,
    });
  };

  return (
    <div className="group">
      <div
        className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4 cursor-pointer"
        onMouseEnter={() => setShowSizes(true)}
        onMouseLeave={() => setShowSizes(false)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick add overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-background/95 backdrop-blur-sm p-4 transition-transform duration-300 ${
            showSizes ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex flex-wrap gap-2 mb-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-xs font-body uppercase tracking-wider border transition-colors ${
                  selectedSize === size
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            onClick={handleAdd}
            className="w-full bg-foreground text-background py-2 font-body text-xs uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors"
          >
            Add to Bag
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-display text-sm font-medium text-foreground">
          {product.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
