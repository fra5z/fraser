"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import LiquidGlassButton from "@/components/ui/LiquidGlassButton";

// ─── Browser-window mockup ─────────────────────────────────────────────────────
function BrowserMockup() {
  const stats = [
    { v: "+60%", l: "Leads"  },
    { v: "24/7",  l: "AI"    },
    { v: "£0",    l: "Setup" },
  ];

  return (
    <div
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow:
          "0 50px 100px -20px rgba(0,0,0,0.28), 0 20px 50px rgba(59,111,245,0.18), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Browser chrome ─────────────────────────── */}
      <div
        style={{
          height: "38px",
          background: "#12172a",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            maxWidth: 220,
            margin: "0 auto",
            height: 22,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            gap: 5,
          }}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path
              d="M4.5 0a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 1.5a3 3 0 110 6 3 3 0 010-6z"
              fill="rgba(255,255,255,0.3)"
            />
          </svg>
          <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", letterSpacing: "0.01em" }}>
            frazs.co.uk
          </span>
        </div>

        {/* Tab group spacer */}
        <div style={{ flex: 1 }} />
      </div>

      {/* ── Screen content ─────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(145deg, #04081a 0%, #060e28 50%, #0c1242 100%)",
          position: "relative",
          overflow: "hidden",
          minHeight: 340,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Ambient glow orbs */}
        <div style={{
          position: "absolute", width: "60%", height: "90%",
          right: "-10%", top: "-30%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,111,245,0.45) 0%, transparent 65%)",
          animation: "screenGlow1 7s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: "55%", height: "80%",
          left: "-10%", bottom: "-30%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.38) 0%, transparent 65%)",
          animation: "screenGlow2 9s ease-in-out infinite 2s",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />

        {/* Website UI */}
        <div style={{ position: "relative", zIndex: 1, padding: "20px 22px 22px", flex: 1 }}>

          {/* Nav */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
          }}>
            <span style={{
              fontSize: 15, fontWeight: 800,
              background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}>Frazs</span>
            <div style={{ display: "flex", gap: 18 }}>
              {["Services", "Pricing", "Contact"].map((item) => (
                <span key={item} style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                  {item}
                </span>
              ))}
            </div>
            <div style={{
              fontSize: 11, fontWeight: 600,
              padding: "5px 14px", borderRadius: 100,
              background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
              color: "white",
            }}>Get Started</div>
          </div>

          {/* Scrolling slides */}
          <div style={{ overflow: "hidden" }}>
            <div style={{ animation: "screenSlide 12s ease-in-out infinite" }}>

              {/* Slide 1 */}
              <div style={{ paddingBottom: 28 }}>
                <div style={{
                  display: "inline-block",
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase" as const,
                  color: "#60a5fa",
                  background: "rgba(59,111,245,0.12)",
                  border: "1px solid rgba(59,111,245,0.22)",
                  borderRadius: 100,
                  padding: "4px 12px", marginBottom: 14,
                }}>UK AI Agency</div>

                <div style={{
                  fontSize: "clamp(18px, 3.5vw, 30px)",
                  fontWeight: 900, lineHeight: 1.08,
                  color: "white", marginBottom: 16,
                  letterSpacing: "-0.03em",
                }}>
                  Websites &amp; AI
                  <span style={{
                    display: "block",
                    backgroundImage: "linear-gradient(135deg, #3b6ff5, #7c3aed, #0ea5e9, #3b6ff5)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundSize: "300% auto",
                    animation: "screenGradientShift 4s ease infinite",
                  }}>That Grow</span>
                  Your Business
                </div>

                <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                  {stats.map((s) => (
                    <div key={s.l} style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10, padding: "10px 8px",
                      textAlign: "center" as const,
                    }}>
                      <div style={{
                        fontSize: "clamp(14px, 2.2vw, 20px)", fontWeight: 800,
                        backgroundImage: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      }}>{s.v}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  fontSize: 12, fontWeight: 700, color: "white",
                  background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                  borderRadius: 9, padding: "9px 18px",
                  animation: "screenPulse 3s ease-in-out infinite",
                }}>
                  Get Started Free <span>→</span>
                </div>
              </div>

              {/* Slide 2 */}
              <div>
                <div style={{
                  fontSize: "clamp(16px, 2.8vw, 24px)", fontWeight: 800,
                  color: "white", marginBottom: 16, letterSpacing: "-0.02em",
                }}>How it works</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { n: "01", t: "We Design",     d: "Custom modern website"   },
                    { n: "02", t: "AI Integrated", d: "24/7 automated support"  },
                    { n: "03", t: "You Grow",       d: "+60% more leads"         },
                  ].map((step) => (
                    <div key={step.n} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 10, padding: "10px 14px",
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#3b6ff5" }}>
                        {step.n}
                      </span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>
                          {step.t}
                        </div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>
                          {step.d}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Glass reflection */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 25%, transparent 45%)",
        }} />

        {/* Light sweep */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0,
            left: 0, width: "28%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.065), transparent)",
            transform: "skewX(-12deg)",
            animation: "lightSweep 10s ease-in-out infinite 3s",
          }} />
        </div>
      </div>
    </div>
  );
}

// ─── Hero section ──────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-blue-50/70 via-indigo-50/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-[900px] h-[900px] rounded-full bg-blue-100/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-50/30 blur-3xl" />
        <div className="dot-grid absolute inset-0 opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left — copy ─────────────────────────── */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-black font-display tracking-tight text-gray-900"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.5rem)", lineHeight: 1.07 }}
            >
              Websites &amp; AI Assistants
              <span className="block mt-2 gradient-text">That Grow Your Business</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-6 text-lg text-gray-500 max-w-lg leading-[1.78]"
            >
              Modern websites and AI chat assistants designed to generate more
              leads, automate customer support, and increase your revenue —
              built for UK businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <LiquidGlassButton
                onClick={() => scrollTo("#contact")}
                variant="primary"
                className="text-white font-bold"
              >
                Get Started Free
                <ArrowRight size={16} />
              </LiquidGlassButton>
              <LiquidGlassButton
                onClick={() => scrollTo("#pricing")}
                variant="secondary"
                className="text-gray-700 font-semibold"
              >
                View Pricing
              </LiquidGlassButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.54 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              {[
                { value: "£0",   label: "Setup Fee"      },
                { value: "24/7", label: "AI Support"     },
                { value: "UK",   label: "Based Agency"   },
                { value: "Fast", label: "Turnaround"     },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-sm font-bold gradient-text">{s.value}</span>
                  <span className="text-gray-400 text-sm">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right — browser mockup ──────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 36, scale: 0.97 }}
            animate={visible ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Camera drift */}
            <motion.div
              animate={visible ? { x: [0, 4, 0, -4, 0] } : {}}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="relative"
            >
              {/* Float + rock */}
              <motion.div
                animate={visible ? {
                  y:      [0, -12, 0],
                  rotate: [0, 0.3, 0, -0.25, 0],
                } : {}}
                transition={{
                  y:      { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                  rotate: { duration: 7,   repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                }}
                className="relative"
              >
                {/* Ambient shadow */}
                <motion.div
                  animate={visible ? {
                    scaleX:  [1, 0.76, 1],
                    scaleY:  [1, 0.5,  1],
                    opacity: [0.45, 0.18, 0.45],
                  } : {}}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  style={{
                    position: "absolute",
                    bottom: "-6%", left: "10%",
                    width: "80%", height: "10%",
                    background: "radial-gradient(ellipse, rgba(30,50,140,0.28) 0%, rgba(0,0,0,0.1) 50%, transparent 70%)",
                    filter: "blur(16px)",
                    pointerEvents: "none",
                    transformOrigin: "center center",
                  }}
                />

                {/* Screen bloom glow (behind the window) */}
                <motion.div
                  animate={visible ? { opacity: [0.5, 0.85, 0.5] } : {}}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  style={{
                    position: "absolute",
                    inset: "-8%",
                    background: "radial-gradient(ellipse at 55% 45%, rgba(59,111,245,0.22) 0%, rgba(124,58,237,0.12) 45%, transparent 70%)",
                    filter: "blur(32px)",
                    pointerEvents: "none",
                    zIndex: 0,
                    borderRadius: "24px",
                  }}
                />

                {/* Browser window */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <BrowserMockup />
                </div>

                {/* Floating stat — bottom left */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-3.5 shadow-xl border border-gray-100"
                  style={{ zIndex: 2 }}
                >
                  <p className="text-xs text-gray-400 mb-0.5">Avg. lead increase</p>
                  <p className="text-2xl font-black gradient-text">+60%</p>
                </motion.div>

                {/* Floating stat — top right */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -top-5 -right-5 bg-white rounded-2xl px-5 py-3.5 shadow-xl border border-gray-100"
                  style={{ zIndex: 2 }}
                >
                  <p className="text-xs text-gray-400 mb-0.5">AI response time</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-sm font-bold text-gray-800">Under 2 seconds</p>
                  </div>
                </motion.div>

              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-gray-300 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-gray-300 animate-bounce" />
      </motion.div>

    </section>
  );
}
