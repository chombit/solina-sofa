import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";

type Step = "shipping" | "payment" | "confirmation";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", region: "",
  });
  const { t } = useLanguage();

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "shipping", label: t("checkout.shipping"), icon: <Truck className="h-4 w-4" /> },
    { key: "payment", label: t("checkout.payment"), icon: <CreditCard className="h-4 w-4" /> },
    { key: "confirmation", label: t("checkout.confirmed"), icon: <CheckCircle2 className="h-4 w-4" /> },
  ];

  const stepIndex = steps.findIndex((s) => s.key === step);

  if (items.length === 0 && step !== "confirmation") {
    return (
      <PageTransition>
        <div className="pt-32 text-center container mx-auto px-4 min-h-screen">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">{t("checkout.cartEmpty")}</h1>
          <Link to="/products">
            <Button variant="gold">Browse Products</Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="pt-20 md:pt-24 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> {t("checkout.continueShopping")}
          </Link>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    i <= stepIndex
                      ? "bg-gold text-accent-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s.icon}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${i < stepIndex ? "bg-gold" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-card rounded-2xl border border-border p-6 md:p-8"
                  >
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">{t("checkout.shippingInfo")}</h2>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setStep("payment");
                      }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          placeholder={t("checkout.firstName")}
                          value={shipping.firstName}
                          onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                          className="h-12 rounded-xl bg-secondary"
                          required maxLength={50}
                        />
                        <Input
                          placeholder={t("checkout.lastName")}
                          value={shipping.lastName}
                          onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                          className="h-12 rounded-xl bg-secondary"
                          required maxLength={50}
                        />
                      </div>
                      <Input
                        type="email"
                        placeholder={t("checkout.emailAddr")}
                        value={shipping.email}
                        onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                        className="h-12 rounded-xl bg-secondary"
                        required maxLength={255}
                      />
                      <Input
                        placeholder={t("checkout.phoneNumber")}
                        value={shipping.phone}
                        onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                        className="h-12 rounded-xl bg-secondary"
                        required maxLength={20}
                      />
                      <Input
                        placeholder={t("checkout.streetAddress")}
                        value={shipping.address}
                        onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                        className="h-12 rounded-xl bg-secondary"
                        required maxLength={200}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          placeholder={t("checkout.city")}
                          value={shipping.city}
                          onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                          className="h-12 rounded-xl bg-secondary"
                          required maxLength={100}
                        />
                        <Input
                          placeholder={t("checkout.region")}
                          value={shipping.region}
                          onChange={(e) => setShipping({ ...shipping, region: e.target.value })}
                          className="h-12 rounded-xl bg-secondary"
                          maxLength={100}
                        />
                      </div>
                      <Button variant="gold" size="lg" className="w-full h-12 mt-4">
                        {t("checkout.continuePayment")}
                      </Button>
                    </form>
                  </motion.div>
                )}

                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-card rounded-2xl border border-border p-6 md:p-8"
                  >
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">{t("checkout.paymentMethod")}</h2>
                    <div className="space-y-4">
                      <button
                        className="w-full p-4 rounded-xl border-2 border-gold bg-gold/5 text-left flex items-center gap-4"
                      >
                        <CreditCard className="h-6 w-6 text-gold" />
                        <div>
                          <p className="font-semibold text-foreground">{t("checkout.creditCard")}</p>
                          <p className="text-xs text-muted-foreground">{t("checkout.cardDesc")}</p>
                        </div>
                      </button>
                      <button
                        className="w-full p-4 rounded-xl border border-border bg-card text-left flex items-center gap-4 hover:border-gold/50 transition-colors"
                      >
                        <div className="h-6 w-6 rounded-full bg-[hsl(142,70%,40%)] flex items-center justify-center text-white text-xs font-bold">
                          T
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{t("checkout.telebirr")}</p>
                          <p className="text-xs text-muted-foreground">{t("checkout.telebirrDesc")}</p>
                        </div>
                      </button>
                      <button
                        className="w-full p-4 rounded-xl border border-border bg-card text-left flex items-center gap-4 hover:border-gold/50 transition-colors"
                      >
                        <Truck className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-semibold text-foreground">{t("checkout.cashDelivery")}</p>
                          <p className="text-xs text-muted-foreground">{t("checkout.cashDesc")}</p>
                        </div>
                      </button>

                      <div className="flex gap-3 mt-6">
                        <Button variant="outline" onClick={() => setStep("shipping")} className="flex-1 h-12 rounded-xl">
                          {t("checkout.back")}
                        </Button>
                        <Button
                          variant="gold"
                          size="lg"
                          className="flex-1 h-12"
                          onClick={() => {
                            setStep("confirmation");
                            clearCart();
                          }}
                        >
                          {t("checkout.placeOrder")}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === "confirmation" && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <CheckCircle2 className="h-20 w-20 text-gold mx-auto mb-6" />
                    </motion.div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-3">{t("checkout.orderConfirmed")}</h2>
                    <p className="text-muted-foreground mb-2">
                      {t("checkout.thankYou")}
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                      {t("checkout.orderNumber")}{Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button variant="gold" asChild>
                        <Link to="/products">{t("checkout.continueShopping")}</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/account">View Orders</Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order summary sidebar */}
            {step !== "confirmation" && (
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">{t("checkout.orderSummary")}</h3>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.selectedColor} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-foreground whitespace-nowrap">{item.product.price}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("checkout.subtotal")}</span>
                      <span className="text-foreground">{totalPrice.toLocaleString()} ETB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("checkout.delivery")}</span>
                      <span className="text-gold font-medium">{t("checkout.free")}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                      <span className="text-foreground">{t("checkout.total")}</span>
                      <span className="text-gold-dark">{totalPrice.toLocaleString()} ETB</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
