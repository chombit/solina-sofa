import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { t, language, toggleLanguage } = useLanguage();

  const navLinks = [
    { labelKey: "nav.home", path: "/" },
    { labelKey: "nav.products", path: "/products" },
    { labelKey: "nav.gallery", path: "/gallery" },
    { labelKey: "nav.about", path: "/about" },
    { labelKey: "nav.contact", path: "/contact" },
  ];

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
        {/* Left: Logo (both mobile + desktop) */}
        <Link to="/" className="flex-shrink-0" aria-label="Solina Home">
          <img src="/photo_2021-05-28_20-26-41.jpg" alt="Solina" className="h-10 md:h-12 w-auto rounded" />
        </Link>

        {/* Desktop: nav links (center) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.path === "/"
              ? location.pathname === "/"
              : location.pathname === link.path || location.pathname.startsWith(link.path + "/");
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                  isActive ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {t(link.labelKey)}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side: icons */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1">
            <Link to="/account" aria-label="Wishlist" className="relative p-2 rounded-full hover:bg-secondary transition-colors">
              <Heart className="h-5 w-5 text-muted-foreground hover:text-gold transition-colors" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gold text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button
              aria-label="Open shopping cart"
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
            <Link to="/auth" aria-label="Sign in" className="p-2 rounded-full hover:bg-secondary transition-colors">
              <User className="h-5 w-5 text-muted-foreground hover:text-gold transition-colors" />
            </Link>
            <button
              aria-label="Toggle language"
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full text-xs font-bold border border-border hover:border-gold hover:text-gold transition-colors text-muted-foreground"
            >
              {t("lang.toggle")}
            </button>
            <a href="https://t.me/solinahomes" target="_blank" rel="noopener noreferrer" className="ml-1">
              <Button variant="telegram" size="sm" className="gap-2">
                <TelegramIcon className="h-4 w-4" />
                {t("nav.telegram")}
              </Button>
            </a>
          </div>

          {/* Mobile: lang toggle + cart + hamburger on right */}
          <div className="flex md:hidden items-center gap-1">
            <button
              aria-label="Toggle language"
              onClick={toggleLanguage}
              className="px-2 py-1 rounded-full text-[11px] font-bold border border-border hover:border-gold hover:text-gold transition-colors text-muted-foreground"
            >
              {t("lang.toggle")}
            </button>
            <button
              aria-label="Open shopping cart"
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
            <button aria-label={isOpen ? "Close menu" : "Open menu"} className="text-foreground p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
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
              {navLinks.map((link, i) => {
                const isActive = link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname === link.path || location.pathname.startsWith(link.path + "/");
                return (
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
                        isActive ? "text-gold" : "text-muted-foreground"
                      }`}
                    >
                      {t(link.labelKey)}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="flex gap-3 mt-2">
                <Link to="/account" onClick={() => setIsOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <User className="h-4 w-4" /> {t("nav.account")}
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsOpen(false)} className="flex-1">
                  <Button variant="gold" className="w-full">{t("auth.signIn")}</Button>
                </Link>
              </div>
              <a href="https://t.me/solinahomes" target="_blank" rel="noopener noreferrer">
                <Button variant="telegram" className="w-full gap-2">
                  <TelegramIcon className="h-4 w-4" />
                  {t("nav.orderTelegram")}
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
