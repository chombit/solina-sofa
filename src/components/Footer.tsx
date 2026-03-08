import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold mb-4">
              Solina<span className="text-gold">.</span>
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium handcrafted furniture made with passion in Addis Ababa, Ethiopia.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Products", path: "/products" },
                { label: "Gallery", path: "/gallery" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Categories</h4>
            <div className="flex flex-col gap-2">
              {["Living Room Sofas", "Luxury Sofas", "Corner Sofas", "Beds", "Office Furniture"].map((cat) => (
                <span key={cat} className="text-sm text-primary-foreground/70">{cat}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <span>+251 900 000 000</span>
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
          © {new Date().getFullYear()} Solina Furniture. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
