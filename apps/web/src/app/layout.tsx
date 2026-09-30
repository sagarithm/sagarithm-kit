import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#f9f9f9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kit.sagarithm.in"),
  title: "Sagarithm Kit — Universal Cross-Agent Engineering Framework",
  description:
    "Engineering standards for AI coding agents. Delivering architectural governance, empirical verification gates, and living context graphs to Cursor, Antigravity, Claude Code, Copilot, and Windsurf.",
  keywords: [
    "sagarithm",
    "sagarithm-kit",
    "ai coding agents",
    "cursor",
    "antigravity",
    "claude code",
    "copilot",
    "windsurf",
    "agentic engineering",
    "verification gate",
    "shannon entropy security",
    "software architecture",
  ],
  authors: [{ name: "Sagarithm", url: "https://sagarithm.in" }],
  creator: "Sagarithm",
  publisher: "Sagarithm",
  alternates: {
    canonical: "https://kit.sagarithm.in",
  },
  openGraph: {
    title: "Sagarithm Kit — Universal Cross-Agent Engineering Framework",
    description:
      "Engineering standards for AI coding agents. Architectural governance, empirical verification, and quality gates.",
    url: "https://kit.sagarithm.in",
    siteName: "Sagarithm Kit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sagarithm Kit — Engineering standards for AI coding agents",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagarithm Kit — Universal Cross-Agent Engineering Framework",
    description:
      "Engineering standards for AI coding agents. Architectural governance, empirical verification, and quality gates.",
    images: ["/og-image.png"],
    creator: "@thesagarithm",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    // Generative Engine Optimization (GEO) Meta Tags
    "geo:type": "Generative Engine Optimization",
    "ai:engine": "Universal Agentic Engineering Runtime",
    "ai:target-agents": "Cursor, Antigravity, Claude Code, GitHub Copilot, Windsurf",
    "ai:semantic-domain": "Software Architecture, Agentic Engineering, Quality Gates",
    "ai:verification-standard": "Zero Assumed Success (Empirical Test Proof Required)",
    "ai:entropy-threshold": "Shannon Entropy H >= 4.5 Secret Interception",
    "citation_title": "Sagarithm Kit — Universal Cross-Agent Engineering Framework",
    "citation_author": "Sagarithm",
    "citation_publication_date": "2026-09-30",
    "citation_publisher": "Sagarithm",
    "citation_online_date": "2026-09-30",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Sagarithm Kit",
      "operatingSystem": "Cross-platform (Node.js 22+)",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
      "description":
        "Universal cross-agent engineering framework delivering architectural governance, empirical verification, and quality gates to AI coding agents.",
      "url": "https://kit.sagarithm.in",
      "author": {
        "@type": "Organization",
        "name": "Sagarithm",
        "url": "https://sagarithm.in",
      },
    },
    {
      "@type": "WebSite",
      "name": "Sagarithm Kit",
      "url": "https://kit.sagarithm.in",
      "description": "Universal Cross-Agent Engineering Framework for AI Coding Agents",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('ServiceWorker registration ignored:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
