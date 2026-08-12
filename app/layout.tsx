import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteDescription =
  "Rust engineer building real-time systems, automation, exchange integrations, and practical software products across web, desktop, and mobile.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fyxtez.com"),
  title: {
    default: "Fyxtez — Rust Engineer | Real-Time Systems & Product Engineering",
    template: "%s — Fyxtez",
  },
  description: siteDescription,
  applicationName: "Fyxtez",
  authors: [{ name: "Fyxtez", url: "https://fyxtez.com" }],
  creator: "Fyxtez",
  publisher: "Fyxtez",
  category: "technology",
  keywords: [
    "Rust engineer",
    "real-time systems",
    "product engineering",
    "automation",
    "React",
    "Tauri",
    "exchange integrations",
    "trading infrastructure",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Fyxtez — Rust Engineer | Real-Time Systems & Product Engineering",
    description: siteDescription,
    url: "/",
    siteName: "Fyxtez",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fyxtez — Rust engineer building real-time systems and software products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fyxtez — Rust Engineer | Real-Time Systems & Product Engineering",
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Fyxtez — Rust Engineer",
    url: "https://fyxtez.com",
    description: siteDescription,
    mainEntity: {
      "@type": "Person",
      name: "Fyxtez",
      url: "https://fyxtez.com",
      jobTitle: "Rust Engineer",
      knowsAbout: [
        "Rust",
        "Real-time systems",
        "Automation",
        "Product engineering",
        "React",
        "Tauri",
        "Exchange integrations",
      ],
      sameAs: ["https://github.com/fyxtez", "https://t.me/fyxtez"],
    },
  };

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
