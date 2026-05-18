"use client";
import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "Website Development", href: "#services" },
    { label: "AI Chat Assistants", href: "#services" },
    { label: "Website + AI Bundle", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Process", href: "#process" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  Resources: [
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
    { label: "Book a Call", href: "#contact" },
  ],
};

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-gray-50 border-t border-gray-100">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <button
              onClick={() => handleNav("#home")}
              className="flex items-center gap-2 mb-5"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm font-display">F</span>
              </div>
              <span className="text-xl font-bold font-display">
                <span className="text-gray-900">Fraz</span>
                <span className="gradient-text-blue">s</span>
              </span>
            </button>

            <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs">
              Premium websites and AI chat assistants that help businesses generate more leads,
              automate support, and grow revenue.
            </p>

            {/* Direct contact */}
            <div className="space-y-2.5 mb-6">
              <a
                href="tel:07947449469"
                className="flex items-center gap-2.5 text-gray-500 hover:text-gray-900 text-sm transition-colors group"
              >
                <Phone size={13} className="text-emerald-500 flex-shrink-0" />
                07947 449 469
              </a>
              <a
                href="mailto:fra5er2007@outlook.com"
                className="flex items-center gap-2.5 text-gray-500 hover:text-gray-900 text-sm transition-colors group"
              >
                <Mail size={13} className="text-blue-500 flex-shrink-0" />
                fra5er2007@outlook.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 bg-white border border-gray-200 text-gray-500 hover:text-blue-500 hover:border-blue-200 hover:shadow-sm"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-gray-900 text-sm font-semibold mb-4">{category}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.href)}
                      className="text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white"
          style={{ border: "1px solid rgba(59,111,245,0.12)", boxShadow: "0 2px 12px rgba(59,111,245,0.06)" }}
        >
          <div>
            <p className="text-gray-900 font-semibold font-display">Ready to grow your business?</p>
            <p className="text-gray-400 text-sm">Get a free consultation today — no commitment.</p>
          </div>
          <button
            onClick={() => handleNav("#contact")}
            className="group flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
              boxShadow: "0 4px 14px rgba(59,111,245,0.25)",
            }}
          >
            Get Started Free
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Frazs by Fraser Forrest. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
