import aboutCraft from "@/assets/about-craft.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref}>
      <p className="text-3xl md:text-4xl font-display font-bold text-gold">
        {count.toLocaleString()}{suffix}
      </p>
    </div>
  );
};

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { num: 10, suffix: "+", labelKey: "about.years" },
    { num: 5000, suffix: "+", labelKey: "about.customers" },
    { num: 200, suffix: "+", labelKey: "about.designs" },
    { num: 50, suffix: "+", labelKey: "about.projects" },
  ];

  return (
    <PageTransition>
      <div className="pt-20 md:pt-24">
        <section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="container mx-auto px-4 text-center relative">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3"
            >
              {t("about.badge")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold"
            >
              {t("about.title")}
            </motion.h1>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <AnimatedSection direction="left">
                <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">{t("about.since")}</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  {t("about.decadeTitle")}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {t("about.p1")}
                  </p>
                  <p>
                    {t("about.p2")}
                  </p>
                  <p>
                    {t("about.p3")}
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection direction="right">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img src={aboutCraft} alt="Solina craftsman at work" className="w-full h-full object-cover" />
                </div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="left" className="order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img src={gallery2} alt="Solina showroom" className="w-full h-full object-cover" />
                </div>
              </AnimatedSection>
              <AnimatedSection direction="right" className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  {t("about.showroomTitle")}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t("about.showroomDesc")}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.labelKey}>
                      <CountUp target={stat.num} suffix={stat.suffix} />
                      <p className="text-sm text-muted-foreground mt-1">{t(stat.labelKey)}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
