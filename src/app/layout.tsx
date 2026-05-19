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
      <body className="antialiased bg-white text-gray-900 overflow-x-hidden">
        {/* Animated dot-grid — sits at z:-9, above solid white base */}
        <AnimatedGridBackground />

        {/* Gradient orbs — soft coloured depth at z:-8, above the grid */}
        <div
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: -8 }}
        >
          {/* Blue — top right */}
          <div
            className="absolute rounded-full"
            style={{
              width: "900px", height: "900px",
              top: "-300px", right: "-250px",
              background: "radial-gradient(circle, rgba(59,111,245,0.13) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          {/* Purple — mid left */}
          <div
            className="absolute rounded-full"
            style={{
              width: "700px", height: "700px",
              top: "38%", left: "-300px",
              background: "radial-gradient(circle, rgba(124,58,237,0.11) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          {/* Cyan — lower centre-right */}
          <div
            className="absolute rounded-full"
            style={{
              width: "600px", height: "600px",
              bottom: "8%", right: "10%",
              background: "radial-gradient(circle, rgba(14,165,233,0.09) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          {/* Violet — upper centre */}
          <div
            className="absolute rounded-full"
            style={{
              width: "500px", height: "500px",
              top: "8%", left: "30%",
              background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {children}
      </body>
    </html>
  );
}
