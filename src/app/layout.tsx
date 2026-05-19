import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Frazs — Premium Websites & AI Assistants",
  description:
    "Modern business websites and AI chat assistants designed to generate more leads, automate customer support, and increase sales. Premium digital solutions for growing businesses.",
  keywords: [
    "business website",
    "AI chat assistant",
    "web design agency",
    "AI automation",
    "lead generation",
    "digital agency UK",
    "Frazs",
  ],
  authors: [{ name: "Frazs" }],
  creator: "Frazs",
  openGraph: {
    title: "Frazs — Premium Websites & AI Assistants",
    description:
      "Modern business websites and AI chat assistants designed to generate more leads, automate customer support, and increase sales.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frazs — Premium Websites & AI Assistants",
    description: "Modern websites and AI chat assistants that grow your business.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "h4wdypQ7JBJ2lj8tbrvTGvU5etuNAukTxilEgp0o1kY",
  },
};

import AnimatedGridBackground from "@/components/ui/AnimatedGridBackground";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased text-gray-900 overflow-x-hidden">

        {/* ── Background layer z:0 ────────────────────────────────────────
            Fixed wrapper holds both the animated canvas and the colour
            orbs. Positive z-index guarantees it's never buried under a
            painted body/html background box.
        ──────────────────────────────────────────────────────────────── */}
        <div
          style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
        >
          {/* Animated dot grid canvas */}
          <AnimatedGridBackground />

          {/* Colour orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute rounded-full" style={{ width: "900px", height: "900px", top: "-300px", right: "-250px", background: "radial-gradient(circle, rgba(59,111,245,0.14) 0%, transparent 70%)", filter: "blur(50px)" }} />
            <div className="absolute rounded-full" style={{ width: "700px", height: "700px", top: "38%", left: "-300px", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", filter: "blur(50px)" }} />
            <div className="absolute rounded-full" style={{ width: "600px", height: "600px", bottom: "8%", right: "10%", background: "radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)", filter: "blur(50px)" }} />
            <div className="absolute rounded-full" style={{ width: "500px", height: "500px", top: "8%", left: "30%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
          </div>
        </div>

        {/* ── Content layer z:1 ───────────────────────────────────────────
            All page content sits above the background. Transparent areas
            (section padding, headings, gaps) let the dots show through.
        ──────────────────────────────────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>

      </body>
    </html>
  );
}
