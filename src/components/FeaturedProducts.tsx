import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const featured = products.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-gradient-section">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">{t("featured.badge")}</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t("featured.title")}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/products/${product.id}`}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 block"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={false}
                  >
                    <span className="inline-block bg-gold text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {t("featured.viewDetails")}
                    </span>
                  </motion.div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gold tracking-widest uppercase mb-1">{product.category}</p>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors">{product.name}</h3>
                  <p className="font-body text-lg font-bold text-gold-dark">{product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12" delay={0.3}>
          <Link to="/products">
            <Button variant="gold" size="lg" className="gap-2 group">
              {t("featured.viewAll")}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedProducts;
