import { Shield, Truck, Paintbrush, Award } from "lucide-react";

const features = [
  { icon: Paintbrush, title: "Custom Design", desc: "Every piece tailored to your unique style and space requirements." },
  { icon: Shield, title: "Quality Guarantee", desc: "Premium materials and craftsmanship backed by our quality promise." },
  { icon: Truck, title: "Free Delivery", desc: "Complimentary delivery across Addis Ababa on all orders." },
  { icon: Award, title: "10+ Years Experience", desc: "A decade of creating beautiful furniture for Ethiopian homes." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">Why Solina</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Crafted With Care
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <f.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
