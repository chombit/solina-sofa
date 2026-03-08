import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-section relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Visit our showroom in Bole, Addis Ababa or order your dream furniture via WhatsApp.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/251900000000" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="gap-2 text-base px-8 py-3 h-auto group">
                  <Phone className="h-5 w-5 group-hover:animate-pulse" />
                  Order via WhatsApp
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="gold-outline" size="lg" className="text-base px-8 py-3 h-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
