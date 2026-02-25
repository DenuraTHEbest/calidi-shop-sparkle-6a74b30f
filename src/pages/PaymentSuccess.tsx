import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-center space-y-6">
      <CheckCircle size={56} className="text-primary" />
      <h1 className="font-display text-3xl font-bold tracking-wider text-foreground">
        Thank You!
      </h1>
      <p className="font-body text-muted-foreground max-w-md">
        Your order has been placed successfully. You'll receive a confirmation email shortly.
      </p>
      <Button
        asChild
        className="bg-foreground text-background hover:bg-foreground/90 font-body uppercase tracking-widest text-sm py-6 px-10 rounded-sm"
      >
        <Link to="/shop">Continue Shopping</Link>
      </Button>
    </main>
  );
}
