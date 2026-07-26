import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import heroSofa from "@/assets/hero-sofa.jpg";
import aboutCraft from "@/assets/about-craft.jpg";
import productSofa1 from "@/assets/product-sofa-1.jpg";
import productSofa4 from "@/assets/product-sofa-4.jpg";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";

const images = [
  { src: gallery1, caption: "Modern Living Room Setup", category: "Living Room" },
  { src: gallery2, caption: "Solina Showroom", category: "Showroom" },
  { src: heroSofa, caption: "Luxury Leather Collection", category: "Living Room" },
  { src: aboutCraft, caption: "Handcrafted With Care", category: "Workshop" },
  { src: productSofa1, caption: "Sectional Sofa Design", category: "Living Room" },
  { src: productSofa4, caption: "Emerald Velvet Collection", category: "Living Room" },
];

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const goNext = useCallback(() => {
    setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, []);

  const goPrev = useCallback(() => {
    setSelectedImage((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    if (selectedImage === null) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, goNext, goPrev, closeLightbox]);

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
              {t("gallery.badge")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold"
            >
              {t("gallery.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/70 mt-4 max-w-lg mx-auto"
            >
              {t("gallery.desc")}
            </motion.p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="break-inside-avoid"
                >
                  <div
                    className="group relative rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(i)}
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <span className="text-xs text-gold tracking-widest uppercase mb-1">{img.category}</span>
                      <p className="text-cream font-display text-lg font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                aria-label="Close lightbox"
                className="absolute top-6 right-6 text-cream/70 hover:text-cream transition-colors z-50"
                onClick={closeLightbox}
              >
                <X className="h-8 w-8" />
              </button>

              <button
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream transition-colors z-50 p-2 rounded-full hover:bg-cream/10"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream transition-colors z-50 p-2 rounded-full hover:bg-cream/10"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <motion.img
                key={selectedImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={images[selectedImage].src}
                alt={images[selectedImage].caption}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <p className="text-cream font-display text-lg font-semibold">{images[selectedImage].caption}</p>
                <p className="text-cream/50 text-sm">{selectedImage + 1} / {images.length}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Gallery;
