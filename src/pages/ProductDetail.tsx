import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Check, Heart } from "lucide-react";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="pt-32 text-center container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Product Not Found</h1>
        <Link to="/products">
          <Button variant="gold">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const activeColor = selectedColor || product.colors[0];
  const inWishlist = isInWishlist(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, activeColor);
    toast({ title: "Added to cart!", description: `${product.name} in ${activeColor}` });
  };

  return (
    <PageTransition>
      <div className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-square rounded-2xl overflow-hidden bg-card border border-border relative group cursor-crosshair"
            >
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 origin-center ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && <div className="absolute inset-0 bg-card animate-pulse" />}
              <div className="absolute top-4 left-4">
                <span className="bg-gold text-accent-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                  {product.category}
                </span>
              </div>
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  inWishlist
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-destructive"
                }`}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              </button>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
              <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-gold-dark font-body mb-6">{product.price}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-foreground min-w-[80px]">Materials:</span>
                  <span className="text-sm text-muted-foreground">{product.materials}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-foreground min-w-[80px]">Size:</span>
                  <span className="text-sm text-muted-foreground">{product.sizes}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-foreground min-w-[80px]">Colors:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 flex items-center gap-1.5 ${
                          activeColor === color
                            ? "bg-gold text-accent-foreground shadow-md shadow-gold/20"
                            : "bg-secondary text-muted-foreground hover:bg-gold/10 hover:text-gold"
                        }`}
                      >
                        {activeColor === color && <Check className="h-3 w-3" />}
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="gold"
                  size="lg"
                  className="gap-2 flex-1 sm:flex-none text-base px-8 py-3 h-auto group"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 group-hover:animate-pulse" />
                  Add to Cart
                </Button>
                <Button
                  variant={inWishlist ? "destructive" : "outline"}
                  size="lg"
                  className="gap-2 px-6 py-3 h-auto"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
                  {inWishlist ? "Saved" : "Wishlist"}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.id}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-foreground group-hover:text-gold transition-colors">{p.name}</h3>
                      <p className="text-gold-dark font-bold mt-1">{p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
