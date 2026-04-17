import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProvidiusTech - AI Customer Support Automation | No Basic Chatbots",
  description: "Intelligent AI-powered customer support platform that eliminates basic chatbots. Automate tickets, manage omnichannel communication, and scale customer care with autonomous AI.",
  keywords: [
    "AI customer support",
    "customer service automation",
    "chatbot alternative",
    "omnichannel support",
    "customer support software",
    "support automation",
    "AI service desk",
  ],
  authors: [{ name: "ProvidiusTech" }],
  creator: "ProvidiusTech",
  publisher: "ProvidiusTech",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://providiustech.com",
    title: "ProvidiusTech - AI Customer Support Automation",
    description: "Eliminate basic chatbots. Get intelligent customer care that runs itself.",
    siteName: "ProvidiusTech",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProvidiusTech - AI Customer Support Automation",
    description: "Eliminate basic chatbots. Get intelligent customer care that runs itself.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://providiustech.com",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-degular">{children}</body>
    </html>
  );
}
