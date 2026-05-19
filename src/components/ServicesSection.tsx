"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Bot, Package, Check, ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    tagline: "Conversion-first design",
    color: "from-blue-500 to-blue-700",
    accent: "#3b6ff5",
    accentLight: "rgba(59,111,245,0.08)",
    accentBorder: "rgba(59,111,245,0.15)",
    glowColor: "blue" as const,
    features: [
      "Modern business websites",
      "Mobile responsive design",
      "SEO optimized structure",
      "Fast performance & Core Web Vitals",
      "Premium UI/UX design",
      "Google Business Profile setup included",
    ],
    cta: "Explore Websites",
  },
  {
    icon: Bot,
    title: "AI Chat Assistants",
    tagline: "24/7 intelligent automation",
    color: "from-violet-600 to-violet-400",
    accent: "#7c3aed",
    accentLight: "rgba(124,58,237,0.08)",
    accentBorder: "rgba(124,58,237,0.2)",
    glowColor: "purple" as const,
    features: [
      "24/7 customer support",
      "AI-powered lead generation",
      "Automated smart responses",
      "Appointment booking",
      "Business process automation",
      "Trained on your business data",
    ],
    cta: "Explore AI Assistants",
    featured: true,
  },
  {
    icon: Package,
    title: "Website + AI Bundle",
    tagline: "The complete solution",
    color: "from-cyan-500 to-blue-500",
    accent: "#0ea5e9",
    accentLight: "rgba(14,165,233,0.08)",
    accentBorder: "rgba(14,165,233,0.15)",
    glowColor: "cyan" as const,
    features: [
      "Full business solution",
      "Complete setup & onboarding",
      "Best long-term value",
      "Fully integrated system",
      "Professional automation",
      "Google Business Profile setup included",
    ],
    cta: "Explore Bundle",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: "rgba(59,111,245,0.07)",
              border: "1px solid rgba(59,111,245,0.18)",
              color: "#3b6ff5",
            }}
          >
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-5">
            Premium Digital Solutions
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Everything your business needs to generate leads, automate support, and scale revenue.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -6 }}
            >
            <SpotlightCard glowColor={service.glowColor} className="group h-full overflow-hidden cursor-pointer bg-white">
              {/* Featured badge */}
              {service.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                    style={{
                      background: "rgba(124,58,237,0.08)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      color: "#7c3aed",
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {/* Accent top bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${service.color}`} />

              <div className="p-8">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-md`}
                >
                  <service.icon size={26} className="text-white" />
                </div>

                <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                  {service.tagline}
                </p>
                <h3 className="text-xl font-bold font-display text-gray-900 mb-7">
                  {service.title}
                </h3>

                {/* Features */}
                <ul className="space-y-3.5 mb-9">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mt-0.5`}
                      >
                        <Check size={11} className="text-white" />
                      </div>
                      <span className="text-sm text-gray-600 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => {
                    const el = document.querySelector("#contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`group/btn w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r ${service.color} text-white hover:opacity-90 hover:scale-[1.02]`}
                >
                  {service.cta}
                  <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
