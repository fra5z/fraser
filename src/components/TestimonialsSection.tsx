"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Whitfield",
    role: "Owner",
    company: "Whitfield Plumbing Services",
    avatar: "JW",
    color: "from-blue-500 to-cyan-500",
    stars: 5,
    text: "Since Frazs built our new website with the AI assistant, our enquiries have gone up by over 60%. The AI handles all our after-hours messages and books jobs automatically. Absolutely incredible.",
  },
  {
    name: "Sarah Chen",
    role: "Founder",
    company: "Chen's Boutique Jewellery",
    avatar: "SC",
    color: "from-violet-500 to-pink-500",
    stars: 5,
    text: "Our online store looks absolutely stunning and sales increased by 40% in the first month. The AI assistant answers customer questions 24/7 and has saved me hours every single day.",
  },
  {
    name: "Marcus Ellis",
    role: "Director",
    company: "Ellis Property Management",
    avatar: "ME",
    color: "from-emerald-500 to-teal-500",
    stars: 5,
    text: "Frazs delivered a world-class website that looks premium and professional. Our clients actually comment on how impressive it looks. The AI chat has automated 80% of our tenant enquiries.",
  },
  {
    name: "Priya Patel",
    role: "CEO",
    company: "Patel Legal Consultants",
    avatar: "PP",
    color: "from-orange-500 to-amber-500",
    stars: 5,
    text: "The website is beautifully designed and converts visitors into consultations. The AI assistant pre-qualifies leads before they even speak to us — a massive time saver for the whole team.",
  },
  {
    name: "Tom Bradley",
    role: "Owner",
    company: "Bradley's Auto Repairs",
    avatar: "TB",
    color: "from-red-500 to-rose-500",
    stars: 5,
    text: "I wasn't sure about an AI assistant but it's been a game changer. It books appointments around the clock and we haven't missed a single lead since. Best investment we've made.",
  },
  {
    name: "Emma Foster",
    role: "Manager",
    company: "Foster's Health & Wellness",
    avatar: "EF",
    color: "from-teal-500 to-green-400",
    stars: 5,
    text: "Our bookings are up, our clients love the site, and the AI feels incredibly natural. Frazs clearly knows what they're doing — worth every penny and more.",
  },
  {
    name: "David Okafor",
    role: "Founder",
    company: "Okafor Accountancy",
    avatar: "DO",
    color: "from-indigo-500 to-blue-400",
    stars: 5,
    text: "The 5-year bundle was exactly what we needed. Our new website reflects how professional we are, and the AI handles client enquiries 24/7. New client sign-ups are up 35% since launch.",
  },
  {
    name: "Lucy Barnes",
    role: "Owner",
    company: "Barnes Florist",
    avatar: "LB",
    color: "from-pink-500 to-fuchsia-500",
    stars: 5,
    text: "I've had so many compliments on the website design. It looks like it cost 10 times what we paid! The AI is brilliant — it answers questions, takes orders, and sends confirmations automatically.",
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
    <div
      className="flex-shrink-0 w-[340px] md:w-[380px] rounded-2xl p-6 relative overflow-hidden bg-white"
      style={{
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
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
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden bg-gray-50/60">
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div ref={ref} className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 px-6"
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
            Businesses Love Working With Us
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Real results from real businesses across the UK.
          </p>
        </motion.div>

        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden mb-5">
          <motion.div
            className="flex gap-5 px-5"
            animate={{ x: [0, -(380 + 20) * row1.length] }}
            transition={{
              duration: row1.length * 6,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ width: "max-content" }}
          >
            {[...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} t={t} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-5 px-5"
            animate={{ x: [-(380 + 20) * row2.length, 0] }}
            transition={{
              duration: row2.length * 6,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ width: "max-content" }}
          >
            {[...row2, ...row2].map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} />
            ))}
          </motion.div>
        </div>

        {/* Fade edges */}
        <div
          className="absolute top-0 left-0 bottom-0 w-24 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #f9fafb, transparent)",
            zIndex: 10,
          }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #f9fafb, transparent)",
            zIndex: 10,
          }}
        />
      </div>
    </section>
  );
}
