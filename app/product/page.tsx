import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Product | ProvidiusTech",
  description: "Automate customer support across WhatsApp, chat, and email with AI that responds instantly and escalates when needed.",
};

const features = [
  {
    id: "inbox",
    label: "Unified Customer Inbox",
    title: "Every conversation. One place.",
    description:
      "All customer messages from WhatsApp, email, and web chat land in one intelligent inbox. No tab-switching, no missed threads — just complete context on every interaction.",
    badge: "Core Feature",
    highlights: ["WhatsApp, Gmail & Webchat", "Real-time sync", "Thread history"],
    accent: "teal",
  },
  {
    id: "dashboard",
    label: "Real-Time Dashboard",
    title: "Full visibility into every interaction.",
    description:
      "Monitor conversations, response quality, resolution rates, and team performance live. Know what's happening at any moment without waiting for reports.",
    badge: "Analytics",
    highlights: ["Live conversation tracking", "CSAT scoring", "Response-time metrics"],
    accent: "blue",
  },
  {
    id: "ai",
    label: "AI-Powered Responses",
    title: "Instant, accurate, on-brand replies.",
    description:
      "The AI reads context, draws from your knowledge base, and replies in your company's tone. FAQs, order status, complaints — handled automatically, escalated only when it matters.",
    badge: "AI Engine",
    highlights: ["Context-aware replies", "Knowledge-base grounding", "Tone matching"],
    accent: "teal",
  },
  {
    id: "escalation",
    label: "Smart Escalation",
    title: "Humans in the loop — exactly when needed.",
    description:
      "Routine queries are resolved by AI. Complex issues, frustrated customers, and edge cases are flagged and routed to the right agent with full context attached.",
    badge: "Automation",
    highlights: ["Sentiment detection", "Priority routing", "Full context handoff"],
    accent: "blue",
  },
  {
    id: "training",
    label: "AI Training & Customization",
    title: "An AI that actually sounds like you.",
    description:
      "Upload your FAQs, policies, and past conversations. The AI learns your knowledge base and communication style — so every response feels native, not generic.",
    badge: "Customization",
    highlights: ["FAQ ingestion", "Tone calibration", "Continuous learning"],
    accent: "teal",
  },
];

const channels = [
  { name: "WhatsApp", icon: "whatsapp", color: "#25D366" },
  { name: "Gmail", icon: "gmail", color: "#EA4335" },
  { name: "Webchat", icon: "webchat", color: "#14B8A6" },
  { name: "Telegram", icon: "telegram", color: "#0088cc" },
  { name: "Instagram", icon: "instagram", color: "#E1306C" },
];

const steps = [
  {
    num: "01",
    title: "Customer sends a message",
    desc: "Across any connected channel — WhatsApp, email, or webchat.",
  },
  {
    num: "02",
    title: "AI reads intent & context",
    desc: "Providius classifies the request and retrieves relevant knowledge.",
  },
  {
    num: "03",
    title: "AI responds instantly",
    desc: "A tailored, on-brand reply is sent — no human required.",
  },
  {
    num: "04",
    title: "Escalates only when needed",
    desc: "Edge cases go to your team with full conversation context.",
  },
  {
    num: "05",
    title: "Dashboard logs everything",
    desc: "Every interaction is tracked for quality, performance, and review.",
  },
];

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 md:pt-44 pb-20 px-4 text-center">
        <FadeInOnScroll>
          <span className="inline-block bg-white text-teal-600 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm mb-6">
            AI Customer Care for Modern Businesses
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] leading-tight max-w-4xl mx-auto mb-5">
            Automate Customer Support
            <br />
            <span className="text-teal-500">Across Every Channel</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-10">
            Automate customer conversations across WhatsApp, web chat, and email with AI that
            responds instantly and escalates when needed.
          </p>
          <Link href="/founding">
            <button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-4 rounded-2xl text-base font-semibold hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </Link>
        </FadeInOnScroll>
      </section>

      {/* Core Offerings */}
      <section className="px-4 md:px-8 pb-24 max-w-7xl mx-auto">
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mb-4">Our Core Offerings</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              From collecting messages across channels to responding with AI and escalating when
              needed — everything works together in one system.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="space-y-8">
          {features.map((f, i) => (
            <FadeInOnScroll key={f.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 60}>
              <div
                className={`bg-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                } gap-8 items-center shadow-sm`}
              >
                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        f.accent === "teal"
                          ? "bg-teal-50 text-teal-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {f.badge}
                    </span>
                    <span className="text-gray-400 text-sm">{f.label}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#1E293B] mb-3">{f.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed mb-6">{f.description}</p>
                  <ul className="space-y-2">
                    {f.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-teal-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual placeholder */}
                <div
                  className={`flex-1 w-full rounded-2xl h-52 md:h-64 flex items-center justify-center ${
                    f.accent === "teal"
                      ? "bg-gradient-to-br from-teal-50 to-teal-100"
                      : "bg-gradient-to-br from-blue-50 to-blue-100"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      f.accent === "teal" ? "bg-teal-500" : "bg-blue-500"
                    }`}
                  >
                    <FeatureIcon id={f.id} />
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-[#22242A] py-24 px-4">
        <FadeInOnScroll>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How it Works</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                We use AI to respond instantly, escalate when necessary, and give your team full
                visibility into every interaction.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line — desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-700 -translate-x-1/2" />

              <div className="space-y-12">
                {steps.map((s, i) => (
                  <FadeInOnScroll key={s.num} direction={i % 2 === 0 ? "left" : "right"} delay={i * 80}>
                    <div
                      className={`flex flex-col md:flex-row ${
                        i % 2 !== 0 ? "md:flex-row-reverse" : ""
                      } items-center gap-8`}
                    >
                      <div className={`flex-1 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                        <p className="text-teal-400 text-sm font-semibold mb-1">{s.num}</p>
                        <h3 className="text-white text-xl font-bold mb-2">{s.title}</h3>
                        <p className="text-gray-400 text-sm">{s.desc}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center shrink-0 z-10 shadow-lg shadow-teal-500/30">
                        <span className="text-white font-bold text-sm">{i + 1}</span>
                      </div>
                      <div className="flex-1 hidden md:block" />
                    </div>
                  </FadeInOnScroll>
                ))}
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* Channels */}
      <section className="bg-[#22242A] pb-24 px-4">
        <FadeInOnScroll>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">Channels we support</h2>
            <p className="text-gray-400 mb-10 text-base">
              Connect with your customers across the platforms they already use, while managing every
              conversation through one intelligent customer care system.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {channels.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  <ChannelIcon name={c.icon} color={c.color} />
                  {c.name}
                </div>
              ))}
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* CTA */}
      <section className="bg-[#22242A] pb-24 px-4">
        <FadeInOnScroll>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 mx-auto mb-8 flex items-center justify-center shadow-xl shadow-teal-500/30">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Let your AI handle the conversations
            </h2>
            <Link href="/founding">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-colors mt-4">
                Get Started
              </button>
            </Link>
          </div>
        </FadeInOnScroll>
      </section>

      <Footer />
    </main>
  );
}

function FeatureIcon({ id }: { id: string }) {
  const cls = "w-8 h-8 text-white";
  if (id === "inbox")
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  if (id === "dashboard")
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  if (id === "ai")
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    );
  if (id === "escalation")
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  );
}

function ChannelIcon({ name, color }: { name: string; color: string }) {
  if (name === "whatsapp")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    );
  if (name === "gmail")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    );
  if (name === "telegram")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    );
  if (name === "instagram")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} stroke="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-5H7l5-9v5h4l-5 9z" />
    </svg>
  );
}