import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Recommendations from "@/components/Recommendations";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0] ?? ""
  );

  if (!product) {
    navigate("/shop");
    return null;
  }

  const handleAdd = () => {
    addItem(product, selectedSize);
    toast.success(`${product.name} added to bag`, {
      description: `Size: ${selectedSize}`,
    });
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-6 py-10">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-4xl text-foreground">
                {product.name}
              </h1>
            </div>

            <p className="font-display text-2xl text-foreground">
              ${product.price}
            </p>

            <p className="font-body text-base text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size selector */}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-body uppercase tracking-wider border transition-colors ${
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="w-full md:w-auto bg-foreground text-background hover:bg-foreground/90 font-body text-xs uppercase tracking-[0.2em] py-6 px-10 rounded-none"
            >
              Add to Bag
            </Button>
          </div>
        </div>

        {/* Recommendations */}
        <Recommendations productId={product.id} />
      </div>
    </main>
  );
}
