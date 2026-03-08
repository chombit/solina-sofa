import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      const msg = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`);
      window.open(`https://wa.me/251900000000?text=${msg}`, "_blank");
      toast.success("Opening WhatsApp...");
      setSending(false);
    }, 500);
  };

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
              Get In Touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/70 mt-4 max-w-lg mx-auto"
            >
              Visit our showroom or reach out — we'd love to hear from you.
            </motion.p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <AnimatedSection direction="left">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="group">
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                        placeholder="Your full name"
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                        placeholder="+251 9XX XXX XXX"
                        maxLength={20}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                        placeholder="your@email.com"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-all duration-300"
                        placeholder="Tell us about your furniture needs..."
                        maxLength={1000}
                      />
                    </div>
                    <Button type="submit" variant="gold" size="lg" className="w-full gap-2 group" disabled={sending}>
                      <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      {sending ? "Sending..." : "Send via WhatsApp"}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>

              {/* Contact Info */}
              <AnimatedSection direction="right" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                  <div className="space-y-5">
                    {[
                      { icon: Phone, label: "Phone", value: "+251 900 000 000" },
                      { icon: Mail, label: "Email", value: "info@solinasofa.com" },
                      { icon: MapPin, label: "Address", value: "Bole, Addis Ababa, Ethiopia" },
                      { icon: Clock, label: "Hours", value: "Mon - Sat: 9:00 AM - 7:00 PM" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-gold/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-gold/10 transition-shadow duration-300">
                          <item.icon className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                  <iframe
                    title="Solina Showroom Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7893!3d9.0054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMTkuNCJOIDM4wrA0NycyMS41IkU!5e0!3m2!1sen!2set!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
