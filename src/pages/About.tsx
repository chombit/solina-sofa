import aboutCraft from "@/assets/about-craft.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

const About = () => {
  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold">About Solina</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
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
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src={aboutCraft} alt="Solina craftsman at work" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 aspect-[4/3] rounded-lg overflow-hidden">
              <img src={gallery2} alt="Solina showroom" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Visit Our Showroom
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Experience our furniture in person at our Bole showroom in Addis Ababa. Our team is ready to help you find or design the perfect piece for your home or office.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "10+", label: "Years Experience" },
                  { num: "5,000+", label: "Happy Customers" },
                  { num: "200+", label: "Designs Available" },
                  { num: "50+", label: "Custom Projects/Month" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-display font-bold text-gold">{stat.num}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
