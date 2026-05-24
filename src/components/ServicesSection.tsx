"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Bot, Check, ArrowRight, Sparkles } from "lucide-react";
import AnimatedGradientBorder from "@/components/ui/AnimatedGradientBorder";
import SectionBadge from "@/components/ui/SectionBadge";

const websiteFeatures = [
  "Custom business website",
  "Mobile responsive design",
  "SEO optimized structure",
  "Fast performance & Core Web Vitals",
  "Premium UI/UX design",
  "Google Business Profile setup",
];

const aiFeatures = [
  "24/7 AI customer support",
  "AI-powered lead generation",
  "Automated smart responses",
  "Appointment booking",
  "Business process automation",
  "Trained on your business data",
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionBadge className="mb-4">What We Offer</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-5">
            One Plan. Everything Included.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            A complete digital solution — a professional website and AI assistant, together for one simple monthly price.
          </p>
        </motion.div>

        {/* Main offering card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
        >
          <AnimatedGradientBorder
            borderRadius={20}
            borderWidth={2}
            animationSpeed={5}
            className="relative overflow-hidden"
            style={{ boxShadow: "0 8px 48px rgba(124,58,237,0.15), 0 2px 8px rgba(0,0,0,0.04)" }}
          >
            {/* Top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400" />

            {/* Badge */}
            <div className="flex justify-center pt-6">
              <span
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.2)",
                }}
              >
                <Sparkles size={11} className="text-violet-500" />
                <span className="text-violet-600">Website + AI Assistant Bundle</span>
              </span>
            </div>

            {/* Price */}
            <div className="text-center pt-6 pb-2">
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="text-6xl font-black font-display"
                  style={{
                    background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  £297
                </span>
                <span className="text-gray-400 text-base font-medium">/month</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">No setup fee. No lock-in. Cancel anytime.</p>
            </div>

            {/* Two-column features */}
            <div className="grid md:grid-cols-2 gap-8 p-8 pt-8">
              {/* Website column */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
                    <Globe size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">Included</p>
                    <h3 className="text-base font-bold font-display text-gray-900">Professional Website</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {websiteFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mt-0.5">
                        <Check size={11} className="text-white" />
                      </div>
                      <span className="text-sm text-gray-600 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI column */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center shadow-md">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">Included</p>
                    <h3 className="text-base font-bold font-display text-gray-900">AI Chat Assistant</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {aiFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center mt-0.5">
                        <Check size={11} className="text-white" />
                      </div>
                      <span className="text-sm text-gray-600 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="px-8 pb-8">
              <button
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group/btn w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(59,111,245,0.35)",
                }}
              >
                Get Started Today — £297/month
                <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </AnimatedGradientBorder>
        </motion.div>
      </div>
    </section>
  );
}
