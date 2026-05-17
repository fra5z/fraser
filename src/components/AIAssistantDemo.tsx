"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Bot, Send, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "bot";
  text: string;
}

const conversations: Array<{ prompt: string; reply: string }> = [
  {
    prompt: "Book an appointment",
    reply: "I'd love to help you book an appointment! 📅 Could you let me know:\n1. What service you need\n2. Your preferred date & time\n3. Your name and contact number",
  },
  {
    prompt: "Get a quote",
    reply: "Great! I can get you a personalised quote. 💼 To make sure we give you the most accurate price, could you tell me a bit about your project requirements?",
  },
  {
    prompt: "What services do you offer?",
    reply: "We offer a full range of services including:\n• Premium website design & development\n• AI chat assistant integration\n• Website + AI bundle packages\n\nAll designed to grow your business and generate more leads! 🚀",
  },
  {
    prompt: "Can you help me choose a package?",
    reply: "Absolutely! 🎯 Here's a quick guide:\n\n• Just starting? → Website Starter (£900)\n• Want automation? → Bundle (from £1,400)\n• Best value? → 5-Year Enterprise plan\n\nWant me to book a free consultation to find the perfect fit?",
  },
];

let messageId = 0;

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray-400"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

export default function AIAssistantDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: messageId++,
      type: "bot",
      text: "👋 Hi! I'm the Frazs AI assistant. I can help with bookings, quotes, and questions about our services. What can I help you with today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: messageId++, type: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const convo =
      conversations.find((c) => c.prompt.toLowerCase() === text.toLowerCase()) ||
      conversations[Math.floor(Math.random() * conversations.length)];

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 600));
    setIsTyping(false);
    setMessages((prev) => [...prev, { id: messageId++, type: "bot", text: convo.reply }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <section id="ai-demo" className="relative py-32 px-6 overflow-hidden bg-gray-50/50">
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{
                background: "rgba(124,58,237,0.07)",
                border: "1px solid rgba(124,58,237,0.18)",
                color: "#7c3aed",
              }}
            >
              AI Assistant Demo
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-6 leading-tight">
              Your Business,{" "}
              <span className="gradient-text">Always Open</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-[1.8] mb-10">
              Our AI assistants are trained on your business data — they answer questions,
              capture leads, book appointments, and handle support 24/7 without you lifting a finger.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { value: "24/7", label: "Always available" },
                { value: "<2s", label: "Response time" },
                { value: "100%", label: "Lead capture" },
                { value: "∞", label: "Conversations/day" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-4 bg-white"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <p className="text-2xl font-black font-display mb-1 gradient-text">
                    {s.value}
                  </p>
                  <p className="text-gray-400 text-xs">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Quick prompts */}
            <div className="flex flex-wrap gap-2">
              {conversations.map((c) => (
                <button
                  key={c.prompt}
                  onClick={() => sendMessage(c.prompt)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105 bg-white border border-gray-200 hover:border-blue-200 hover:shadow-sm"
                >
                  {c.prompt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — chat UI */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)",
                filter: "blur(30px)",
                transform: "scale(1.1)",
              }}
            />

            {/* Chat window */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "#0f172a",
                border: "1px solid rgba(124,58,237,0.2)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(124,58,237,0.1)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center"
                      style={{ boxShadow: "0 0 16px rgba(124,58,237,0.4)" }}
                    >
                      <Bot size={18} className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0f172a]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Frazs AI</p>
                    <p className="text-emerald-400 text-xs">Online — Ready to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                  </button>
                  <div className="flex gap-1.5 ml-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    style={{ overflow: "hidden" }}
                  >
                    {/* Messages */}
                    <div
                      className="px-5 py-5 space-y-4 overflow-y-auto"
                      style={{ height: "360px", scrollbarWidth: "none" }}
                    >
                      <AnimatePresence>
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 12, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            {msg.type === "bot" && (
                              <div
                                className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5"
                                style={{ boxShadow: "0 0 10px rgba(124,58,237,0.3)" }}
                              >
                                <Bot size={13} className="text-white" />
                              </div>
                            )}
                            <div
                              className="max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                              style={
                                msg.type === "user"
                                  ? {
                                      background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                                      color: "white",
                                      borderRadius: "18px 18px 4px 18px",
                                    }
                                  : {
                                      background: "rgba(255,255,255,0.07)",
                                      color: "rgba(255,255,255,0.85)",
                                      border: "1px solid rgba(255,255,255,0.08)",
                                      borderRadius: "18px 18px 18px 4px",
                                    }
                              }
                            >
                              {msg.text}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <AnimatePresence>
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-start"
                          >
                            <div
                              className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0"
                              style={{ boxShadow: "0 0 10px rgba(124,58,237,0.3)" }}
                            >
                              <Bot size={13} className="text-white" />
                            </div>
                            <div
                              className="rounded-2xl"
                              style={{
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              <TypingIndicator />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form
                      onSubmit={handleSubmit}
                      className="px-4 py-4"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="flex items-center gap-3 rounded-xl px-4 py-2"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.09)",
                        }}
                      >
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Ask me anything..."
                          className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                        />
                        <button
                          type="submit"
                          disabled={!inputValue.trim() || isTyping}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-40"
                          style={{
                            background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
                          }}
                        >
                          <Send size={13} className="text-white" />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
