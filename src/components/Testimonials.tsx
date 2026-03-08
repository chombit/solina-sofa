import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    name: "Abebe Kebede",
    text: "The quality of our Solina sofa is exceptional. It has been 3 years and it still looks brand new. Highly recommend!",
    rating: 5,
    role: "Homeowner",
  },
  {
    name: "Sara Mekonnen",
    text: "We ordered custom furniture for our new home. The team was professional and the results exceeded our expectations.",
    rating: 5,
    role: "Interior Designer",
  },
  {
    name: "Daniel Hailu",
    text: "Best furniture store in Addis Ababa. Fair prices, beautiful designs, and excellent customer service.",
    rating: 5,
    role: "Business Owner",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        <AnimatedSection className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            What Our Customers Say
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
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
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-primary-foreground/80 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-display font-semibold text-gold">{t.name}</p>
                <p className="text-xs text-primary-foreground/50">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
