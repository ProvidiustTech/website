import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Plans & Access | ProvidiusTech",
  description: "Flexible plans for every stage of customer support. Join the waitlist, apply as a founding company, or talk to us for a custom solution.",
};

const plans = [
  {
    id: "waitlist",
    name: "Waitlist",
    tagline: "Early access interest",
    price: null,
    cta: "Join Waitlist",
    ctaHref: "/founding",
    ctaStyle: "outline",
    featured: false,
    badge: null,
    features: [
      "Early platform access",
      "Product updates and rollout notifications",
      "Preview access to core AI customer care features",
      "Priority onboarding consideration",
    ],
  },
  {
    id: "founding",
    name: "Founding Companies Program",
    tagline: "Limited spots available for early partner onboarding.",
    price: null,
    cta: "Apply as a Founding Company",
    ctaHref: "/founding",
    ctaStyle: "primary",
    featured: true,
    badge: "Most Popular",
    features: [
      "AI-powered customer care across supported channels",
      "Direct onboarding and support from the team",
      "Priority access to upcoming features",
      "Priority onboarding consideration",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Tailored Business Solutions",
    price: null,
    cta: "Talk to Us",
    ctaHref: "/founding",
    ctaStyle: "secondary",
    featured: false,
    badge: null,
    features: [
      "Custom onboarding and implementation",
      "Workflow and AI customization",
      "Custom integrations",
      "Dedicated support and collaboration",
    ],
  },
];

const faqs = [
  {
    q: "Is this just another AI chatbot?",
    a: "No. Providius goes beyond basic automated chatbots. It understands context, uses your knowledge base, and improves over time so conversations feel more natural and accurate.",
  },
  {
    q: "Do I need technical skills to use it?",
    a: "Not at all. Providius is built for business teams. Setup is guided, and our team supports you through onboarding.",
  },
  {
    q: "Is my customer's data safe?",
    a: "Absolutely. We follow industry-standard security practices and data is never shared with third parties without your consent.",
  },
  {
    q: "How long does it take to sell?",
    a: "Most businesses are live within a few days of onboarding. Our team handles the heavy lifting.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 md:pt-44 pb-20 px-4 text-center">
        <FadeInOnScroll>
          <span className="inline-block bg-white text-teal-600 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm mb-6">
            Built for Early Businesses. No surprise fees.
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] leading-tight max-w-4xl mx-auto mb-5">
            Flexible Plans for Every Stage
            <br />
            of <span className="text-teal-500">Customer Support</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            From early access to tailored AI customer care deployments, Providius offers flexible
            ways for businesses to automate conversations, streamline support, and scale across
            multiple channels.
          </p>
        </FadeInOnScroll>
      </section>

      {/* Plans Grid */}
      <section className="px-4 md:px-8 pb-28 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <FadeInOnScroll key={plan.id} direction="up" delay={i * 80}>
              <div
                className={`relative rounded-3xl p-8 flex flex-col h-full transition-shadow ${
                  plan.featured
                    ? "bg-gradient-to-b from-teal-600 to-teal-700 text-white shadow-2xl shadow-teal-500/30 scale-[1.02] md:scale-105"
                    : "bg-white text-[#1E293B] shadow-sm"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                    plan.featured ? "bg-white/20" : "bg-teal-50"
                  }`}
                >
                  <PlanIcon id={plan.id} featured={plan.featured} />
                </div>

                <h3
                  className={`text-xl font-black mb-1 ${
                    plan.featured ? "text-white" : "text-[#1E293B]"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-8 ${
                    plan.featured ? "text-teal-100" : "text-gray-500"
                  }`}
                >
                  {plan.tagline}
                </p>

                <Link href={plan.ctaHref} className="block mb-8">
                  <button
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                      plan.ctaStyle === "primary"
                        ? "bg-white text-teal-700 hover:bg-teal-50"
                        : plan.ctaStyle === "secondary"
                        ? "bg-teal-500 text-white hover:bg-teal-600"
                        : "border-2 border-teal-500 text-teal-600 hover:bg-teal-50"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>

                <ul className="space-y-3 mt-auto">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <svg
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.featured ? "text-teal-200" : "text-teal-500"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={plan.featured ? "text-teal-50" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      {/* FAQ Section — dark */}
      <section className="bg-[#22242A] py-24 px-4">
        <FadeInOnScroll>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              {/* Left: demo chat */}
              <div className="md:w-1/2">
                <div className="bg-[#17181C] rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-gray-500 text-xs">FAQs</span>
                  </div>

                  <div className="mb-4 relative">
                    <input
                      type="text"
                      readOnly
                      placeholder="Have a question for us?"
                      className="w-full bg-[#22242A] text-gray-400 text-sm px-4 py-3 rounded-xl pr-10 focus:outline-none placeholder-gray-600"
                    />
                    <svg className="w-4 h-4 text-gray-500 absolute right-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <div key={i} className="bg-[#22242A] rounded-2xl p-4">
                        <p className="text-gray-300 text-sm font-medium mb-2">{faq.q}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: plan summary */}
              <div className="md:w-1/2 flex flex-col justify-center">
                <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-4">
                  Everything you need to know
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  Common questions about our plans
                </h2>
                <p className="text-gray-400 text-base mb-8">
                  Not sure which plan is right for you? Whether you're an early-stage startup or a
                  growing business ready to scale support, we have a path for you.
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Waitlist", desc: "Free. Join early, get first access." },
                    { label: "Founding Companies", desc: "Limited spots. Priority onboarding." },
                    { label: "Custom", desc: "Talk to us about your specific needs." },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4 bg-white/5 rounded-2xl p-4">
                      <div className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                      <div>
                        <p className="text-white text-sm font-semibold">{item.label}</p>
                        <p className="text-gray-400 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/founding" className="mt-8 inline-block">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-colors">
                    Apply as a Founding Company
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      <Footer />
    </main>
  );
}

function PlanIcon({ id, featured }: { id: string; featured: boolean }) {
  const cls = `w-6 h-6 ${featured ? "text-white" : "text-teal-600"}`;
  if (id === "waitlist")
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  if (id === "founding")
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}