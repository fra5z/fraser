"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

const testimonials = [
  {
    name: "Paul Brown",
    role: "Owner",
    company: "Newcastle Tiles & Adhesives",
    avatar: "PB",
    color: "from-blue-600 to-indigo-500",
    stars: 5,
    text: "Works great the AI — I had a look and a bit of a play, very impressed!",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <SpotlightCard glowColor="blue" className="flex-shrink-0 w-[340px] md:w-[380px] rounded-2xl p-6 relative bg-white" style={{ border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      {/* Quote icon */}
      <div className="absolute top-5 right-5 opacity-[0.06]">
        <Quote size={40} className="text-gray-900" />
      </div>

      {/* Stars */}
      <StarRating count={t.stars} />

      {/* Text */}
      <p className="text-gray-600 text-sm leading-[1.75] mt-5 mb-7">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-gray-900 text-sm font-semibold">{t.name}</p>
          <p className="text-gray-400 text-xs">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden bg-gray-50/60">
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#d97706",
            }}
          >
            Client Results
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-5">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Real feedback from real businesses across the UK.
          </p>
        </motion.div>

        {/* Single testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <TestimonialCard t={testimonials[0]} />
        </motion.div>

        {/* Be our first client CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 text-center rounded-2xl p-8 bg-white"
          style={{ border: "1px solid rgba(59,111,245,0.12)", boxShadow: "0 2px 12px rgba(59,111,245,0.06)" }}
        >
          <p className="text-gray-900 font-semibold mb-1">Want to be our next case study?</p>
          <p className="text-gray-500 text-sm mb-5">
            We&apos;re onboarding new clients now. Get a featured testimonial and case study on this page.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
              boxShadow: "0 4px 14px rgba(59,111,245,0.25)",
            }}
          >
            Get Started Free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
