import aboutCraft from "@/assets/about-craft.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import { useEffect, useRef, useState } from "react";

const stats = [
  { num: 10, suffix: "+", label: "Years Experience" },
  { num: 5000, suffix: "+", label: "Happy Customers" },
  { num: 200, suffix: "+", label: "Designs Available" },
  { num: 50, suffix: "+", label: "Custom Projects/Month" },
];

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
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold"
            >
              About Solina
            </motion.h1>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <AnimatedSection direction="left">
                <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">Since 2014</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  A Decade of Ethiopian Craftsmanship
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in Addis Ababa, Solina Furniture has spent over a decade perfecting the art of furniture making. What started as a small workshop has grown into one of Ethiopia's most trusted furniture brands.
                  </p>
                  <p>
                    Every piece we create combines modern design with traditional Ethiopian craftsmanship. Our skilled artisans use only premium materials — genuine leather, solid hardwood frames, and luxurious fabrics — to ensure every sofa, bed, and desk meets our exacting standards.
                  </p>
                  <p>
                    We believe furniture is more than function — it's an expression of who you are. That's why we offer fully custom designs, allowing you to create furniture that perfectly matches your vision and space.
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
                  Visit Our Showroom
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Experience our furniture in person at our Bole showroom in Addis Ababa. Our team is ready to help you find or design the perfect piece for your home or office.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <CountUp target={stat.num} suffix={stat.suffix} />
                      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
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
