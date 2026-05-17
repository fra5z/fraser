"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description: "We learn about your business, goals, target audience, and what success looks like for you.",
    color: "from-blue-500 to-blue-700",
    accent: "#3b6ff5",
    details: ["Free discovery call", "Business goals mapping", "Custom strategy plan"],
  },
  {
    number: "02",
    icon: Cpu,
    title: "Build & Setup",
    description: "We design your premium website and integrate AI automation — built for performance and conversions.",
    color: "from-violet-600 to-violet-400",
    accent: "#7c3aed",
    details: ["Custom design", "AI assistant training", "Full integration"],
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & Grow",
    description: "We launch your complete system and provide ongoing support as your business scales.",
    color: "from-cyan-500 to-blue-500",
    accent: "#0ea5e9",
    details: ["Smooth launch", "Ongoing optimisation", "Priority support"],
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden bg-white">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
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
              background: "rgba(14,165,233,0.07)",
              border: "1px solid rgba(14,165,233,0.18)",
              color: "#0ea5e9",
            }}
          >
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-5">
            From Zero to Launch in 3 Steps
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            A simple, proven process that gets your business online and growing fast.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
              className="h-full origin-left"
              style={{
                background: "linear-gradient(90deg, #3b6ff5, #7c3aed, #0ea5e9)",
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative group text-center"
              >
                {/* Icon bubble */}
                <div className="relative flex justify-center mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center z-10 shadow-lg`}
                    style={{ boxShadow: `0 8px 24px ${step.accent}30` }}
                  >
                    <step.icon size={28} className="text-white" />
                  </motion.div>
                </div>

                {/* Number watermark */}
                <p className="text-5xl font-black font-display text-gray-100 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 select-none">
                  {step.number}
                </p>

                {/* Content card */}
                <div
                  className="rounded-2xl p-6 text-left bg-white transition-all duration-300 hover:shadow-md"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <h3 className="text-xl font-bold font-display text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-[1.75] mb-5">{step.description}</p>
                  <ul className="space-y-1.5">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`}
                        />
                        <span className="text-xs text-gray-400">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group px-10 py-4 text-base font-bold text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
              boxShadow: "0 4px 20px rgba(59,111,245,0.3)",
            }}
          >
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}
