import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Abebe Kebede",
    text: "The quality of our Solina sofa is exceptional. It has been 3 years and it still looks brand new. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sara Mekonnen",
    text: "We ordered custom furniture for our new home. The team was professional and the results exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Daniel Hailu",
    text: "Best furniture store in Addis Ababa. Fair prices, beautiful designs, and excellent customer service.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-primary-foreground/80 leading-relaxed mb-6 italic">"{t.text}"</p>
              <p className="font-display font-semibold text-gold">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
