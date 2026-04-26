import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ProvidiusTech",
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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#1BAA87" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ProvidiusTech" />
        <meta name="msapplication-TileColor" content="#1BAA87" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-degular">
        {children}
        {/* Service Worker Registration */}
        <script dangerouslySetInnerHTML={{__html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js')
                .then((reg) => console.log('Service Worker registered:', reg))
                .catch((err) => console.error('Service Worker registration failed:', err));
            });
          }
        `}} />
      </body>
      <SpeedInsights />
    </html>
  );
}