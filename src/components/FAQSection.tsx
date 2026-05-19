"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionBadge from "@/components/ui/SectionBadge";

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "Most websites are ready within 7–14 days from the point we receive your content and branding. More complex projects with custom features may take a little longer, but we'll always give you a clear timeline upfront.",
  },
  {
    q: "Do I own the website after it's built?",
    a: "Yes — completely. Once the project is complete and payment is made, the website is 100% yours. You own all the code, content, and assets. No lock-in, no ongoing fees unless you choose our maintenance plan.",
  },
  {
    q: "Why is there no setup fee?",
    a: "We believe in earning your trust first. There's no upfront setup fee — you only pay once you're happy with the finished result. We're confident in the quality of our work.",
  },
  {
    q: "How does the AI chat assistant work?",
    a: "We build a custom AI assistant trained on your business — your products, services, FAQs, pricing, and tone of voice. It's embedded on your website and handles enquiries, qualifies leads, and answers questions 24/7, automatically.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "None at all. We handle everything from design and development to setup and launch. If you ever need changes made after launch, just message us and we'll sort it.",
  },
  {
    q: "What if I need changes after the site goes live?",
    a: "All projects include a two-week post-launch support period where we'll fix any issues and make small tweaks for free. For ongoing changes, we offer affordable maintenance packages.",
  },
  {
    q: "Do you work with businesses outside the UK?",
    a: "We're based in the UK and primarily work with UK businesses, but we're happy to work with businesses elsewhere — just get in touch and we'll have a conversation.",
  },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
    <SpotlightCard glowColor="blue" className="rounded-2xl bg-white" style={{ border: "1px solid #e2e8f0" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50"
      >
        <span className="text-gray-900 font-semibold text-sm md:text-base">{faq.q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: open ? "rgba(59,111,245,0.1)" : "#f1f5f9" }}>
          {open
            ? <Minus size={14} className="text-blue-500" />
            : <Plus size={14} className="text-gray-500" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="faq" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <SectionBadge className="mb-4">FAQ</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-5">
            Questions & Answers
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {inView && (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400 text-sm">
            Still have questions?{" "}
            <a href="#contact" className="text-blue-500 hover:text-blue-700 font-semibold transition-colors">
              Get in touch
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
