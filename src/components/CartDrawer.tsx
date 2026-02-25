import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md bg-background flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-xl tracking-wider">
            Shopping Bag
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground font-body text-lg">
              Your bag is empty
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 border-b border-border pb-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-sm bg-secondary"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-sm font-medium text-foreground">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-body mt-0.5">
                        Size: {item.size}
                      </p>
                      <p className="text-sm font-body text-foreground mt-1">
                        ${item.product.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-body w-6 text-center text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm uppercase tracking-wider text-muted-foreground">
                  Total
                </span>
                <span className="font-display text-lg text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full bg-foreground text-background hover:bg-foreground/90 font-body uppercase tracking-widest text-sm py-6 rounded-sm"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/checkout");
                }}
              >
                Checkout
              </Button>
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors font-body uppercase tracking-wider"
              >
                Clear Bag
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
