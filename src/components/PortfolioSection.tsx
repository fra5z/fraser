"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Bot } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

const projects = [
  {
    name: "Newcastle Tiles & Adhesives",
    url: "https://newcastletilesandadhesives.co.uk",
    description: "AI chat assistant integrated into an established tiles and adhesives supplier. The AI handles product enquiries, stock questions, and customer support around the clock.",
    tags: ["AI Chat Assistant", "Lead Generation", "24/7 Support"],
    color: "from-blue-500 to-indigo-600",
    initials: "NT",
    result: "\"Works great the AI — very impressed!\" — Paul Brown, Owner",
  },
];

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="portfolio" className="relative py-32 px-6 overflow-hidden bg-white">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: "rgba(59,111,245,0.07)",
              border: "1px solid rgba(59,111,245,0.18)",
              color: "#3b6ff5",
            }}
          >
            Our Work
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-5">
            Real Projects, <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Live work we&apos;ve delivered for UK businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <SpotlightCard glowColor="blue" className="rounded-2xl bg-white group" style={{ border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start gap-5 p-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-md`}>
                  {p.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="text-gray-900 font-bold font-display text-lg">{p.name}</h3>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink size={12} />
                      Visit site
                    </a>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(59,111,245,0.07)", color: "#3b6ff5", border: "1px solid rgba(59,111,245,0.15)" }}
                      >
                        <Bot size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs italic">{p.result}</p>
                </div>
              </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400 text-sm mb-4">More case studies coming soon as we grow.</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
              boxShadow: "0 4px 14px rgba(59,111,245,0.25)",
            }}
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
