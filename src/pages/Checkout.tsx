import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Truck, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const STANDARD_SHIPPING = 0;

export default function Checkout() {
  const { items, totalPrice } = useCart();
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  if (!loading && items.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16">
        <h1 className="font-display text-2xl text-foreground mb-4">Your bag is empty</h1>
        <Button asChild variant="outline" className="rounded-sm font-body uppercase tracking-widest text-sm">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </main>
    );
  }

  if (!loading && !user) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 space-y-6">
        <Lock size={40} className="text-muted-foreground" />
        <h1 className="font-display text-2xl text-foreground">Sign in to checkout</h1>
        <p className="font-body text-muted-foreground text-center max-w-sm">
          You need to sign in before completing your purchase.
        </p>
        <Button
          asChild
          className="bg-foreground text-background hover:bg-foreground/90 font-body uppercase tracking-widest text-sm py-6 px-10 rounded-sm"
        >
          <Link to="/auth" state={{ from: "/checkout" }}>Sign In</Link>
        </Button>
      </main>
    );
  }

  const orderTotal = totalPrice + STANDARD_SHIPPING;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const lineItems = items.map((item) => ({
        name: `${item.product.name} (${item.size})`,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const data = await apiFetch<{ url: string }>("/checkout/create-session", {
        method: "POST",
        token,
        body: { lineItems, shippingAddress: address },
      });

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      toast.error(err.message || "Checkout failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-[70vh] py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-bold tracking-wider text-foreground mb-10">
          Checkout
        </h1>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Address + Delivery */}
          <div className="lg:col-span-3 space-y-8">
            <section className="space-y-5">
              <h2 className="font-display text-lg tracking-wider text-foreground">Shipping Address</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                  <Input required value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} className="rounded-sm font-body" />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Street Address</Label>
                  <Input required value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="rounded-sm font-body" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">City</Label>
                    <Input required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="rounded-sm font-body" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">State / Province</Label>
                    <Input required value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="rounded-sm font-body" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">ZIP / Postal Code</Label>
                    <Input required value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} className="rounded-sm font-body" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Country</Label>
                    <Input required value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} className="rounded-sm font-body" />
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="font-display text-lg tracking-wider text-foreground">Delivery</h2>
              <div className="border border-primary rounded-sm p-4 flex items-center gap-4 bg-secondary/50">
                <Truck size={20} className="text-foreground shrink-0" />
                <div className="flex-1">
                  <p className="font-body text-sm font-medium text-foreground">Standard Delivery</p>
                  <p className="font-body text-xs text-muted-foreground">5–7 business days</p>
                </div>
                <span className="font-body text-sm font-medium text-foreground">Free</span>
              </div>
            </section>
          </div>

          {/* Right — Order Summary */}
          <aside className="lg:col-span-2 space-y-6">
            <h2 className="font-display text-lg tracking-wider text-foreground">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-18 object-cover rounded-sm bg-secondary" />
                  <div className="flex-1">
                    <p className="font-body text-sm text-foreground">{item.product.name}</p>
                    <p className="font-body text-xs text-muted-foreground">Size: {item.size} · Qty: {item.quantity}</p>
                  </div>
                  <span className="font-body text-sm text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 font-body text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-foreground font-display text-lg pt-2">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-foreground text-background hover:bg-foreground/90 font-body uppercase tracking-widest text-sm py-6 rounded-sm"
            >
              {submitting ? "Processing..." : "Pay Now"}
            </Button>
          </aside>
        </form>
      </div>
    </main>
  );
}
