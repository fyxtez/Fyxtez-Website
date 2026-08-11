import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fyxtez.com"),
  title: {
    default: "Fyxtez — Rust Engineer & Trader",
    template: "%s — Fyxtez",
  },
  description:
    "Rust engineer building real-time systems, trading infrastructure, exchange integrations, and high-performance automation.",
  openGraph: {
    title: "Fyxtez — Rust Engineer & Trader",
    description:
      "Real-time systems, trading infrastructure, and pragmatic product engineering.",
    url: "/",
    siteName: "Fyxtez",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
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
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
