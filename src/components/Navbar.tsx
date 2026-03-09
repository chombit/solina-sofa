import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ShoppingCart, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-charcoal/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Solina<span className="text-gold">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                location.pathname === link.path ? "text-gold" : "text-muted-foreground"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-1">
          <Link to="/account" className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <Heart className="h-5 w-5 text-muted-foreground hover:text-gold transition-colors" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gold text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-gold transition-colors" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gold text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
          <Link to="/auth" className="p-2 rounded-full hover:bg-secondary transition-colors">
            <User className="h-5 w-5 text-muted-foreground hover:text-gold transition-colors" />
          </Link>
          <a href="https://wa.me/251900000000" target="_blank" rel="noopener noreferrer" className="ml-2">
            <Button variant="whatsapp" size="sm" className="gap-2">
              <Phone className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
        </div>

        {/* Mobile right icons */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gold text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="text-foreground p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium py-2 block transition-colors hover:text-gold ${
                      location.pathname === link.path ? "text-gold" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex gap-3 mt-2">
                <Link to="/account" onClick={() => setIsOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <User className="h-4 w-4" /> Account
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsOpen(false)} className="flex-1">
                  <Button variant="gold" className="w-full">Sign In</Button>
                </Link>
              </div>
              <a href="https://wa.me/251900000000" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Order via WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
