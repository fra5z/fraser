"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Target, TrendingUp } from "lucide-react";

const stats = [
  { value: 120, suffix: "+", label: "Websites Built" },
  { value: 2400, suffix: "+", label: "Leads Generated" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 2, suffix: "s", label: "AI Response Time" },
];

const values = [
  {
    icon: Target,
    title: "Conversion-Focused",
    description: "Every design decision is made to turn visitors into leads.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Performance-optimised sites that rank higher and load instantly.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Built to Last",
    description: "Premium builds that stay modern and effective for years.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    title: "Growth Driven",
    description: "AI automation that scales with your business as it grows.",
    color: "from-violet-600 to-violet-400",
  },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden bg-white">
      <div className="absolute inset-0 dot-grid opacity-40" />

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
            About Frazs
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-6">
            The Agency Built for{" "}
            <span className="gradient-text">Business Growth</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-[1.85]">
            Frazs is a modern AI-powered digital agency specialising in premium website design and intelligent
            automation. We help businesses of all sizes look exceptional online and convert more visitors
            into paying customers.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center rounded-2xl p-6 bg-white"
              style={{ border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="text-4xl md:text-5xl font-black font-display mb-2 gradient-text">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl p-6 cursor-default bg-white transition-all duration-300 hover:shadow-md"
              style={{ border: "1px solid #e2e8f0" }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-md`}>
                <v.icon size={22} className="text-white" />
              </div>
              <h3 className="text-gray-900 font-bold font-display mb-3">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-[1.75]">{v.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-14 text-center rounded-2xl p-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(59,111,245,0.04), rgba(124,58,237,0.04))",
            border: "1px solid rgba(59,111,245,0.12)",
          }}
        >
          <p className="text-xl md:text-2xl font-semibold font-display text-gray-700 max-w-3xl mx-auto leading-relaxed">
            &ldquo;We believe every business deserves a world-class online presence and the power of AI
            working for them 24/7 — not just the big ones.&rdquo;
          </p>
          <p className="mt-4 text-gray-400 text-sm">— The Frazs Team</p>
        </motion.div>
      </div>
    </section>
  );
}
