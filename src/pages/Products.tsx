import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Search, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high">("default");

  const filtered = useMemo(() => {
    let result = activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-low" || sortBy === "price-high") {
      result = [...result].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));
        return sortBy === "price-low" ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <PageTransition>
      <div className="pt-20 md:pt-24">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="container mx-auto px-4 text-center relative">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3"
            >
              Our Collection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold"
            >
              Furniture Catalog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-primary-foreground/70 mt-4 max-w-lg mx-auto"
            >
              Explore our range of handcrafted sofas, beds, and office furniture.
            </motion.p>
          </div>
        </section>

        {/* Search + Filter */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Search bar */}
            <AnimatedSection className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search furniture..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    maxLength={100}
                  />
                </div>
                <div className="relative">
                  <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="pl-11 pr-8 py-3 rounded-full bg-card border border-border text-foreground text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="default">Sort by</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                  </select>
                </div>
              </div>
            </AnimatedSection>

            {/* Category filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gold text-accent-foreground shadow-lg shadow-gold/20"
                      : "bg-secondary text-muted-foreground hover:bg-gold/10 hover:text-gold"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Product count */}
            <p className="text-sm text-muted-foreground text-center mb-8">
              Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 block"
                    >
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {/* Color swatches preview */}
                        <div className="absolute bottom-4 left-4 flex gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          {product.colors.slice(0, 3).map((color) => (
                            <span
                              key={color}
                              className="inline-block text-xs bg-cream/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-charcoal font-medium"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-xs text-gold tracking-widest uppercase mb-1">{product.category}</p>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-gold transition-colors">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="font-body text-xl font-bold text-gold-dark">{product.price}</p>
                          <Button variant="gold" size="sm" className="group-hover:shadow-md transition-shadow">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <AnimatedSection className="text-center py-16">
                <p className="text-2xl font-display font-bold text-foreground mb-2">No products found</p>
                <p className="text-muted-foreground">Try a different search or category.</p>
              </AnimatedSection>
            )}

            {/* WhatsApp CTA */}
            <AnimatedSection className="text-center mt-16">
              <div className="p-10 bg-secondary rounded-2xl border border-border relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
                </div>
                <div className="relative">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">Don't see what you're looking for?</h3>
                  <p className="text-muted-foreground mb-6">We create custom furniture. Tell us your dream design!</p>
                  <a href="https://wa.me/251900000000?text=Hi%20Solina!%20I%27m%20interested%20in%20custom%20furniture" target="_blank" rel="noopener noreferrer">
                    <Button variant="whatsapp" size="lg" className="gap-2">
                      <Phone className="h-5 w-5" />
                      Request Custom Order
                    </Button>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Products;
