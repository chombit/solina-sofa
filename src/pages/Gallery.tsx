import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import heroSofa from "@/assets/hero-sofa.jpg";
import aboutCraft from "@/assets/about-craft.jpg";
import productSofa1 from "@/assets/product-sofa-1.jpg";
import productSofa4 from "@/assets/product-sofa-4.jpg";

const images = [
  { src: gallery1, caption: "Modern Living Room Setup" },
  { src: gallery2, caption: "Solina Showroom" },
  { src: heroSofa, caption: "Luxury Leather Collection" },
  { src: aboutCraft, caption: "Handcrafted With Care" },
  { src: productSofa1, caption: "Sectional Sofa Design" },
  { src: productSofa4, caption: "Emerald Velvet Collection" },
];

const Gallery = () => {
  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold text-sm tracking-[0.3em] uppercase font-medium mb-3">Our Work</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold">Gallery</h1>
          <p className="text-primary-foreground/70 mt-4 max-w-lg mx-auto">
            Browse our completed projects and showroom displays.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-300 flex items-end">
                  <p className="text-cream font-display font-semibold p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
