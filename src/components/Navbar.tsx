import { ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <h1 className="font-display text-2xl font-bold tracking-wider text-foreground">
            CALIDI
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground text-center">
            CLOTHING CO.
          </p>
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-body text-sm tracking-widest uppercase text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-foreground transition-colors">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/shop?category=Women" className="hover:text-foreground transition-colors">
              Women
            </Link>
          </li>
          <li>
            <Link to="/shop?category=Men" className="hover:text-foreground transition-colors">
              Men
            </Link>
          </li>
          <li>
            <Link to="/shop?category=Accessories" className="hover:text-foreground transition-colors">
              Accessories
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={handleSignOut}
              className="text-foreground hover:text-muted-foreground transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-foreground hover:text-muted-foreground transition-colors"
              aria-label="Sign in"
              title="Sign in"
            >
              <User size={20} />
            </Link>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="relative text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Open cart"
          >
          <ShoppingBag size={22} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-body text-primary-foreground">
              {totalItems}
            </span>
          )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4">
          <ul className="flex flex-col gap-4 font-body text-sm tracking-widest uppercase text-muted-foreground">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">Home</Link></li>
            <li><Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">Shop</Link></li>
            <li><Link to="/shop?category=Women" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">Women</Link></li>
            <li><Link to="/shop?category=Men" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">Men</Link></li>
            <li><Link to="/shop?category=Accessories" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">Accessories</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
