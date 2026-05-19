"use client";
import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowRight, Star } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import AnimatedGradientBorder from "@/components/ui/AnimatedGradientBorder";
import SectionBadge from "@/components/ui/SectionBadge";

type Tab = "website" | "bundle" | "ai";

const tabs: { id: Tab; label: string }[] = [
  { id: "website", label: "Website Only" },
  { id: "bundle", label: "Website + AI Bundle" },
  { id: "ai", label: "AI Assistant" },
];

interface Plan {
  name: string;
  price: string;
  duration: string;
  popular?: boolean;
  features: string[];
  note?: string;
}

const plans: Record<Tab, Plan[]> = {
  website: [
    {
      name: "Starter",
      price: "£900",
      duration: "1 Year",
      features: [
        "Custom business website",
        "Mobile responsive design",
        "SEO foundations",
        "5 pages included",
        "Contact form",
        "Google Business Profile setup",
        "12 months support",
      ],
    },
    {
      name: "Business Growth",
      price: "£1,600",
      duration: "2 Years",
      features: [
        "Everything in Starter",
        "Up to 10 pages",
        "Advanced SEO setup",
        "Lead capture forms",
        "Google Analytics",
        "24 months support",
      ],
    },
    {
      name: "Enterprise",
      price: "£3,000",
      duration: "5 Years",
      features: [
        "Everything in Business Growth",
        "Unlimited pages",
        "Full SEO strategy",
        "Conversion rate optimisation",
        "Priority support",
        "60 months support",
        "Free annual redesign",
      ],
    },
    {
      name: "Lifetime Access",
      price: "£6,000",
      duration: "Forever",
      popular: true,
      note: "One payment. Yours for life. Never pay again.",
      features: [
        "Everything in Enterprise",
        "Lifetime ownership",
        "Unlimited pages",
        "Full SEO strategy",
        "Free redesigns every 2 years",
        "Lifetime priority support",
        "No recurring fees — ever",
      ],
    },
  ],
  bundle: [
    {
      name: "Starter",
      price: "£1,400",
      duration: "1 Year",
      features: [
        "Custom business website",
        "AI chat assistant",
        "Basic AI training",
        "Lead capture & routing",
        "Google Business Profile setup",
        "12 months support",
        "Setup & onboarding",
      ],
    },
    {
      name: "Business Growth",
      price: "£2,400",
      duration: "2 Years",
      features: [
        "Everything in Starter",
        "Advanced AI training",
        "Appointment booking",
        "CRM integrations",
        "Multi-channel support",
        "24 months support",
      ],
    },
    {
      name: "Enterprise",
      price: "£5,000",
      duration: "5 Years",
      features: [
        "Everything in Business Growth",
        "Full AI automation suite",
        "Custom AI workflows",
        "Analytics dashboard",
        "Priority 24/7 support",
        "60 months support",
        "Quarterly strategy calls",
      ],
    },
    {
      name: "Lifetime Access",
      price: "£10,000",
      duration: "Forever",
      popular: true,
      note: "One payment. Website + AI, owned forever.",
      features: [
        "Everything in Enterprise",
        "Lifetime website ownership",
        "Lifetime AI assistant",
        "Unlimited AI retraining",
        "Free redesigns every 2 years",
        "Lifetime priority 24/7 support",
        "No recurring fees — ever",
      ],
    },
  ],
  ai: [
    {
      name: "Starter",
      price: "£500",
      duration: "1 Year",
      features: [
        "Custom-trained AI assistant",
        "Integrated into existing site",
        "FAQ & product knowledge",
        "Lead capture automation",
        "Human handoff option",
        "12 months support",
      ],
    },
    {
      name: "Business",
      price: "£800",
      duration: "2 Years",
      features: [
        "Everything in Starter",
        "Advanced AI training",
        "Appointment booking",
        "Multi-channel support",
        "24 months support",
      ],
    },
    {
      name: "Enterprise",
      price: "£2,000",
      duration: "5 Years",
      features: [
        "Everything in Business",
        "Full AI automation suite",
        "Custom AI workflows",
        "Analytics dashboard",
        "Priority 24/7 support",
        "60 months support",
      ],
    },
    {
      name: "Lifetime Access",
      price: "£4,000",
      duration: "Forever",
      popular: true,
      note: "One payment. AI assistant owned for life.",
      features: [
        "Everything in Enterprise",
        "Lifetime AI assistant ownership",
        "Unlimited AI retraining",
        "Custom AI workflows",
        "Lifetime priority 24/7 support",
        "No recurring fees — ever",
      ],
    },
  ],
};

function PlanCardShell({ plan, children }: { plan: Plan; children: ReactNode }) {
  if (plan.popular) {
    return (
      <AnimatedGradientBorder
        borderRadius={16}
        borderWidth={2}
        animationSpeed={4}
        className="relative overflow-hidden h-full"
        style={{ boxShadow: "0 8px 40px rgba(124,58,237,0.18), 0 2px 8px rgba(0,0,0,0.04)" }}
      >
        {children}
      </AnimatedGradientBorder>
    );
  }
  return (
    <SpotlightCard
      glowColor="blue"
      className="relative rounded-2xl overflow-hidden bg-white h-full"
      style={{ border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      {children}
    </SpotlightCard>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<Tab>("bundle");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const currentPlans = plans[activeTab];
  const isAI = activeTab === "ai";

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
            Transparent pricing with no hidden fees. Choose the plan that fits your business.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center mb-10"
        >
          <div
            className="flex items-center gap-1 p-1.5 rounded-2xl bg-gray-100 border border-gray-200"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl bg-white shadow-sm"
                    style={{ border: "1px solid rgba(59,111,245,0.15)" }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 ${activeTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
                  {tab.label}
                  {tab.id === "bundle" && (
                    <span
                      className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider"
                      style={{
                        background: activeTab === "bundle"
                          ? "linear-gradient(135deg, #3b6ff5, #7c3aed)"
                          : "rgba(124,58,237,0.12)",
                        color: activeTab === "bundle" ? "white" : "#7c3aed",
                      }}
                    >
                      <Sparkles size={8} />
                      POPULAR
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Plan cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          >
            {currentPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -6 }}
              >
                <PlanCardShell plan={plan}>
                  {/* Popular gradient top bar */}
                  {plan.popular && (
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400" />
                  )}

                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="flex justify-center pt-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                        style={{
                          background: "rgba(124,58,237,0.08)",
                          border: "1px solid rgba(124,58,237,0.2)",
                        }}
                      >
                        <Sparkles size={11} className="text-violet-500" />
                        <span className="popular-badge">MOST POPULAR</span>
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan name & duration */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold font-display text-gray-900">{plan.name}</h3>
                        <p className="text-gray-400 text-sm mt-0.5">{plan.duration}</p>
                      </div>
                      {plan.popular && (
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, s) => (
                            <Star key={s} size={10} className="text-violet-500 fill-violet-500" />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-5xl font-black font-display"
                          style={
                            plan.popular
                              ? {
                                  background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }
                              : { color: "#0f172a" }
                          }
                        >
                          {plan.price}
                        </span>
                      </div>
                      {plan.note && (
                        <p className="text-gray-400 text-xs mt-2 leading-relaxed">{plan.note}</p>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 mb-6" />

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <div
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                            style={
                              plan.popular
                                ? { background: "linear-gradient(135deg, #3b6ff5, #7c3aed)" }
                                : { background: "rgba(59,111,245,0.1)", border: "1px solid rgba(59,111,245,0.2)" }
                            }
                          >
                            <Check size={11} className="text-white" style={plan.popular ? {} : { color: "#3b6ff5" }} />
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
                      style={
                        plan.popular
                          ? {
                              background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                              color: "white",
                              boxShadow: "0 4px 16px rgba(59,111,245,0.3)",
                            }
                          : {
                              background: "#f8faff",
                              border: "1px solid #e2e8f0",
                              color: "#374151",
                            }
                      }
                    >
                      Get Started
                      <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </PlanCardShell>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

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
