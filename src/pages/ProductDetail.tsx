import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowLeft } from "lucide-react";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

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

  const whatsappMessage = encodeURIComponent(`Hi Solina! I'm interested in the "${product.name}" (${product.price}). Can you share more details?`);

  return (
    <div className="pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-lg overflow-hidden bg-card border border-border">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-gold-dark font-body mb-6">{product.price}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            <div className="space-y-4 mb-8">
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
                    <span key={color} className="text-xs bg-secondary px-3 py-1 rounded-full text-muted-foreground">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a href={`https://wa.me/251900000000?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg" className="gap-2 w-full sm:w-auto text-base px-8 py-3 h-auto">
                <Phone className="h-5 w-5" />
                Order via WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
