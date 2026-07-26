import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { t } = useLanguage();
  const testimonials = [
    {
      name: "Abebe Kebede",
      textKey: "testimonials.1.text",
      rating: 5,
      roleKey: "testimonials.1.role",
    },
    {
      name: "Sara Mekonnen",
      textKey: "testimonials.2.text",
      rating: 5,
      roleKey: "testimonials.2.role",
    },
    {
      name: "Daniel Hailu",
      textKey: "testimonials.3.text",
      rating: 5,
      roleKey: "testimonials.3.role",
    },
  ];
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        <AnimatedSection className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">{t("testimonials.badge")}</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            {t("testimonials.title")}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((tItem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-8 relative group hover:border-gold/30 transition-colors duration-500"
            >
              <Quote className="h-8 w-8 text-gold/20 absolute top-6 right-6 group-hover:text-gold/40 transition-colors duration-500" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: tItem.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-primary-foreground/80 leading-relaxed mb-6 italic">"{t(tItem.textKey)}"</p>
              <div>
                <p className="font-display font-semibold text-gold">{tItem.name}</p>
                <p className="text-xs text-primary-foreground/50">{t(tItem.roleKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
