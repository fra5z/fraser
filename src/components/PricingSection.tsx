"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles, ArrowRight, Star } from "lucide-react";
import AnimatedGradientBorder from "@/components/ui/AnimatedGradientBorder";
import SectionBadge from "@/components/ui/SectionBadge";

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    "Custom business website",
    "AI chat assistant included",
    "Mobile responsive design",
    "SEO foundations",
    "Lead capture & automation",
    "24/7 AI customer support",
    "Monthly updates & support",
    "No setup fee",
  ];

  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <SectionBadge className="mb-5">Simple Pricing</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-5">
            Invest in Your Growth
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            One simple plan. Everything you need to grow your business online.
          </p>
        </motion.div>

        {/* Single plan card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="max-w-md mx-auto"
        >
          <AnimatedGradientBorder
            borderRadius={16}
            borderWidth={2}
            animationSpeed={4}
            className="relative overflow-hidden h-full"
            style={{ boxShadow: "0 8px 40px rgba(124,58,237,0.18), 0 2px 8px rgba(0,0,0,0.04)" }}
          >
            {/* Top gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400" />

            {/* Most popular badge */}
            <div className="flex justify-center pt-4">
              <span
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.2)",
                }}
              >
                <Sparkles size={11} className="text-violet-500" />
                <span className="popular-badge">WEBSITE + AI BUNDLE</span>
              </span>
            </div>

            <div className="p-8">
              {/* Plan name */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-gray-900">All-In-One Plan</h3>
                  <p className="text-gray-400 text-sm mt-0.5">Per month</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={10} className="text-violet-500 fill-violet-500" />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-5xl font-black font-display"
                    style={{
                      background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    £297
                  </span>
                  <span className="text-gray-400 text-sm font-medium">/month</span>
                </div>
                <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                  Website + AI assistant. No setup fee. Cancel anytime.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-6" />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #3b6ff5, #7c3aed)" }}
                    >
                      <Check size={11} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group/btn w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                  color: "white",
                  boxShadow: "0 4px 16px rgba(59,111,245,0.3)",
                }}
              >
                Get Started
                <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </AnimatedGradientBorder>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-gray-400 text-sm mt-10"
        >
          All plans include a free consultation. No hidden fees. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
