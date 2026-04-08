import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProvidiusTech - AI Customer Support",
  description: "No More Basic AI Chatbots. Get customer Care that runs itself.",
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
