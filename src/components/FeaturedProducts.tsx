import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";

const FeaturedProducts = () => {
  const featured = products.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">Our Collection</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Featured Furniture
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((product) => (
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
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-gold tracking-widest uppercase mb-1">{product.category}</p>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                <p className="font-body text-lg font-bold text-gold-dark">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="gold" size="lg" className="gap-2">
              View All Products <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
