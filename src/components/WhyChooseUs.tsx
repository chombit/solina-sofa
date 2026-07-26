import { Shield, Truck, Paintbrush, Award } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyChooseUs = () => {
  const { t } = useLanguage();
  const features = [
    { icon: Paintbrush, titleKey: "why.custom.title", descKey: "why.custom.desc" },
    { icon: Shield, titleKey: "why.quality.title", descKey: "why.quality.desc" },
    { icon: Truck, titleKey: "why.delivery.title", descKey: "why.delivery.desc" },
    { icon: Award, titleKey: "why.experience.title", descKey: "why.experience.desc" },
  ];
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <AnimatedSection className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">{t("why.badge")}</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t("why.title")}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="text-center group cursor-default"
            >
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-gold/10 to-gold/20 flex items-center justify-center group-hover:from-gold/20 group-hover:to-gold/30 group-hover:shadow-lg group-hover:shadow-gold/10 transition-all duration-500">
                <f.icon className="h-8 w-8 text-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{t(f.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
