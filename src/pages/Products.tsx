import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { products, categories } from "@/data/products";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-20 md:pt-24">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">Our Collection</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold">Furniture Catalog</h1>
          <p className="text-primary-foreground/70 mt-4 max-w-lg mx-auto">
            Explore our range of handcrafted sofas, beds, and office furniture.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-gold text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-gold/10 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-gold tracking-widest uppercase mb-1">{product.category}</p>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-xl font-bold text-gold-dark">{product.price}</p>
                    <Button variant="gold" size="sm">View Details</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center mt-16 p-8 bg-secondary rounded-lg">
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
      </section>
    </div>
  );
};

export default Products;
