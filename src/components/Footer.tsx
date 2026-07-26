import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground relative">
      {/* Back to top */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <motion.button
          aria-label="Back to top"
          onClick={scrollToTop}
          whileHover={{ y: -4 }}
          className="w-12 h-12 rounded-full bg-gold text-accent-foreground flex items-center justify-center shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-shadow"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="container mx-auto px-4 py-16 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src="/photo_2021-05-28_20-26-41.jpg" alt="Solina" className="h-12 w-auto rounded" />
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <div className="flex flex-col gap-2">
              {[
                { labelKey: "nav.products", path: "/products" },
                { labelKey: "nav.gallery", path: "/gallery" },
                { labelKey: "nav.about", path: "/about" },
                { labelKey: "nav.contact", path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-primary-foreground/70 hover:text-gold transition-colors hover:translate-x-1 inline-block transform duration-200">
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t("footer.categories")}</h4>
            <div className="flex flex-col gap-2">
              {["Living Room Sofas", "Luxury Sofas", "Corner Sofas", "Beds", "Office Furniture"].map((cat) => (
                <span key={cat} className="text-sm text-primary-foreground/70">{cat}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <span>+251 911 233 391</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <span>info@solinasofa.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold mt-0.5" />
                <span>Bole, Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Solina Furniture. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
