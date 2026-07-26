import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const Index = () => {
  const { t } = useLanguage();
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
              {t("cta.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              {t("cta.desc")}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://t.me/solinahomes" target="_blank" rel="noopener noreferrer">
                <Button variant="telegram" size="lg" className="gap-2 text-base px-8 py-3 h-auto group">
                  <TelegramIcon className="h-5 w-5 group-hover:animate-pulse" />
                   {t("cta.order")}
                 </Button>
               </a>
               <Link to="/contact">
                 <Button variant="gold-outline" size="lg" className="text-base px-8 py-3 h-auto">
                   {t("cta.contact")}
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
