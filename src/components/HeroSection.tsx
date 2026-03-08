import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-sofa.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxury Solina sofa in modern living room" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/30" />
      </div>

      <div className="relative container mx-auto px-4 pt-20">
        <div className="max-w-2xl">
          <p className="text-gold font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            Handcrafted in Addis Ababa
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-cream leading-tight mb-6">
            Where Comfort
            <br />
            Meets <span className="text-gradient-gold italic">Elegance</span>
          </h1>
          <p className="text-cream/70 text-lg md:text-xl font-body leading-relaxed mb-10 max-w-lg">
            Premium sofas and furniture crafted with Ethiopian artistry. Designed for your lifestyle, built to last generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button variant="hero" size="lg" className="gap-2">
                Explore Collection <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="gold-outline" size="lg" className="text-base px-8 py-3 h-auto border-cream/30 text-cream hover:bg-cream/10 hover:text-cream">
                Visit Showroom
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
