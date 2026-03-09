import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Heart, Package, User, ShoppingCart, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

type Tab = "orders" | "wishlist" | "profile";

const Account = () => {
  const [activeTab, setActiveTab] = useState<Tab>("orders");
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "orders", label: "Orders", icon: <Package className="h-4 w-4" /> },
    { key: "wishlist", label: "Wishlist", icon: <Heart className="h-4 w-4" /> },
    { key: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
  ];

  return (
    <PageTransition>
      <div className="pt-20 md:pt-24 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">My Account</h1>

          {/* Tab nav */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-gold text-accent-foreground shadow-md"
                    : "bg-secondary text-muted-foreground hover:bg-gold/10"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors ml-auto">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>

          {/* Orders */}
          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-card rounded-2xl border border-border p-8 text-center">
                <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">
                  Your order history will appear here once you make a purchase.
                </p>
                <Button variant="gold" asChild>
                  <Link to="/products">Start Shopping</Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Wishlist */}
          {activeTab === "wishlist" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {wishlistItems.length === 0 ? (
                <div className="bg-card rounded-2xl border border-border p-8 text-center">
                  <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Wishlist is empty</h3>
                  <p className="text-muted-foreground mb-6">Save items you love for later.</p>
                  <Button variant="gold" asChild>
                    <Link to="/products">Browse Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((product) => (
                    <div
                      key={product.id}
                      className="bg-card rounded-xl border border-border overflow-hidden"
                    >
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full aspect-square object-cover"
                        />
                      </Link>
                      <div className="p-4">
                        <h4 className="font-display font-semibold text-foreground">{product.name}</h4>
                        <p className="text-gold-dark font-bold mt-1">{product.price}</p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="gold"
                            size="sm"
                            className="flex-1 gap-1"
                            onClick={() => addToCart(product)}
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromWishlist(product.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Profile */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-card rounded-2xl border border-border p-8 max-w-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-gold/20 flex items-center justify-center">
                    <User className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">Guest User</h3>
                    <p className="text-sm text-muted-foreground">Sign in to save your profile</p>
                  </div>
                </div>
                <Button variant="gold" asChild>
                  <Link to="/auth">Sign In / Create Account</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Account;
