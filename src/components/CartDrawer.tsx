import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CartDrawer = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg bg-background">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">{t("cart.title")}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag className="h-16 w-16 opacity-30" />
            <p className="text-lg font-medium">{t("cart.empty")}</p>
            <Button variant="gold" onClick={() => setIsCartOpen(false)} asChild>
              <Link to="/products">{t("cart.browse")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="flex gap-4 p-3 rounded-xl bg-card border border-border"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-foreground text-sm truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{item.selectedColor}</p>
                      <p className="text-sm font-bold text-gold-dark mt-1">{item.product.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          aria-label={`Decrease ${item.product.name} quantity`}
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center hover:bg-gold/10 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          aria-label={`Increase ${item.product.name} quantity`}
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center hover:bg-gold/10 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          aria-label={`Remove ${item.product.name} from cart`}
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto h-7 w-7 rounded-full flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <SheetFooter className="flex-col gap-3 border-t border-border pt-4">
              <div className="flex justify-between w-full text-lg">
                <span className="font-medium text-foreground">{t("cart.total")}</span>
                <span className="font-bold font-display text-gold-dark">
                  {totalPrice.toLocaleString()} ETB
                </span>
              </div>
              <Button
                variant="gold"
                size="lg"
                className="w-full"
                asChild
                onClick={() => setIsCartOpen(false)}
              >
                <Link to="/checkout">{t("cart.checkout")}</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
