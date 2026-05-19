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

import FlowFieldBackground from "@/components/ui/FlowFieldBackground";

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
        {/* Fixed flow field behind entire site */}
        <div className="fixed inset-0 -z-10">
          <FlowFieldBackground />
        </div>
        {children}
      </body>
    </html>
  );
}
