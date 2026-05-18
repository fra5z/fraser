"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle, ArrowRight, Phone, Calendar } from "lucide-react";

const services = [
  "Premium Website",
  "AI Chat Assistant",
  "Website + AI Bundle",
  "Custom Project",
];

type FormState = "idle" | "submitting" | "success";

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-2">
      {children}
    </label>
  );
}

const inputCls = "w-full px-4 py-3 rounded-xl text-sm bg-white border border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", service: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setFormState("success");
    } catch {
      setFormState("idle");
      alert("Something went wrong — please email us directly at fra5er2007@outlook.com");
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden bg-gray-50/50">
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: "rgba(14,165,233,0.07)",
              border: "1px solid rgba(14,165,233,0.18)",
              color: "#0ea5e9",
            }}
          >
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-5">
            Ready To Grow Your Business?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Tell us about your project and we&apos;ll get back to you within 24 hours with a personalised plan.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Book a call */}
            <div
              className="rounded-2xl p-6 bg-white"
              style={{ border: "1px solid rgba(59,111,245,0.15)", boxShadow: "0 2px 12px rgba(59,111,245,0.06)" }}
            >
              <Calendar size={24} className="text-blue-500 mb-3" />
              <h3 className="text-gray-900 font-bold font-display mb-1">Book a Free Call</h3>
              <p className="text-gray-400 text-xs mb-1">Fraser Forrest · Frazs Agency</p>
              <p className="text-gray-500 text-sm mb-5">
                30-minute discovery call — no commitment, just a conversation about your goals.
              </p>
              <a
                href="#"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                  boxShadow: "0 4px 14px rgba(59,111,245,0.25)",
                }}
              >
                Schedule Now
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Phone */}
            <a
              href="tel:07947449469"
              className="block rounded-2xl p-6 bg-white cursor-pointer group transition-all duration-300 hover:border-green-300 hover:shadow-sm"
              style={{ border: "1px solid #e2e8f0" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-50 border border-green-200">
                  <Phone size={18} style={{ color: "#16a34a" }} />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm mb-0.5">07947 449 469</p>
                  <p className="text-gray-400 text-xs">Call or WhatsApp — instant response</p>
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:fra5er2007@outlook.com"
              className="block rounded-2xl p-6 bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-sm"
              style={{ border: "1px solid #e2e8f0" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 border border-blue-200">
                  <Mail size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm mb-0.5">fra5er2007@outlook.com</p>
                  <p className="text-gray-400 text-xs">We reply within 24 hours</p>
                </div>
              </div>
            </a>

            {/* Trust indicators */}
            <div className="space-y-2">
              {[
                "Free consultation included",
                "No hidden fees or contracts",
                "Results guaranteed or we fix it",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-500 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-2xl p-8 bg-white"
              style={{ border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6"
                    >
                      <CheckCircle size={36} className="text-emerald-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold font-display text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Thanks for reaching out. We'll get back to you within 24 hours with a personalised plan.
                    </p>
                    <button
                      onClick={() => { setFormState("idle"); setForm({ name: "", business: "", email: "", phone: "", service: "", message: "" }); }}
                      className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="John Smith" className={inputCls} />
                      </div>
                      <div>
                        <Label htmlFor="business">Business Name</Label>
                        <input id="business" name="business" type="text" value={form.business} onChange={handleChange} placeholder="Acme Ltd" className={inputCls} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@business.co.uk" className={inputCls} />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="07700 900000" className={inputCls} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="service">Interested In</Label>
                      <select
                        id="service" name="service" value={form.service} onChange={handleChange}
                        className={inputCls + " appearance-none"}
                        style={{ color: form.service ? "#0f172a" : "#9ca3af" }}
                      >
                        <option value="" disabled>Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s} style={{ color: "#0f172a" }}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">Tell Us About Your Project</Label>
                      <textarea
                        id="message" name="message" rows={4} value={form.message} onChange={handleChange}
                        placeholder="What does your business do? What are your main goals?"
                        className={inputCls + " resize-none"}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="group w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
                      style={{
                        background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                        boxShadow: "0 4px 16px rgba(59,111,245,0.3)",
                      }}
                    >
                      {formState === "submitting" ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
