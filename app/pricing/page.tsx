import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";

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




      <div className=" max-w-8xl w-[88%] mx-auto">
        <section className="mt-36 mb-32 items-center flex justify-center md:pt-10 pb-20 bg-gradient-to-b rounded-3xl shadow-sm from-[#14b8a558] to-[#dbebf3] py-20 xl:py-20 px-4 text-center">
          <FadeInOnScroll>
            <span className="inline-flex items-center gap-2 text-xs xl:text-sm xl:mt-3 font-medium text-gray-600 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <img src="/check1.png" className="w-7 xl:w-10" alt="" />
              Built for Early Businesses. No surprise fees.
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl mt-8 font-bold text-[#1A1F2E] mb-4 leading-tight">
              Flexible Plans for Every Stage
              <br />
              of <span className="text-teal-500">Customer Support</span>
            </h1>
            <p className="text-[#6B7280] max-w-4xl mx-auto text-base sm:text-lg">
              From early access to tailored AI customer care deployments, Providius offers flexible ways for businesses to automate conversations, streamline support, and scale across multiple channels.
            </p>
          </FadeInOnScroll>
        </section>

        {/* Hero */}

        {/* Plans Grid */}
        <section className="px-4 mb-20 md:px-8 pb-28 max-w-7xl mt-0 xl:py-10 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <FadeInOnScroll key={plan.id} direction="up" delay={i * 80}>
                <div
                  className={`relative rounded-3xl p-8 flex flex-col h-full transition-shadow ${plan.featured
                      ? "bg-white text-[#1E293B]"
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
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${plan.featured ? "bg-white/20" : "bg-teal-50"
                      }`}
                  >
                    <PlanIcon id={plan.id} featured={plan.featured} />
                  </div>

                  <h3
                    className={`xl:text-3xl text-base font-semibold mb-1 ${plan.featured ? "text-[#1E293B]" : "text-[#1E293B]"
                      }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-base mb-8 ${plan.featured ? "text-gray-500" : "text-gray-500"
                      }`}
                  >
                    {plan.tagline}
                  </p>

                  <Link href={plan.ctaHref} className="block mb-8">
                    <button
                      className={`w-full py-3 rounded-xl font-semibold text-sm xl:text-base transition-all cursor-pointer ${plan.ctaStyle === "primary"
                          ? "bg-teal-500 text-white hover:bg-teal-600"
                          : plan.ctaStyle === "primary"
                            ? "bg-teal-500 text-white hover:bg-teal-600"
                            : "border-2 border-teal-500 text-teal-600 hover:bg-teal-50"
                        }`}
                    >
                      {plan.cta}
                    </button>
                  </Link>

                  <ul className="space-y-3 mt-auto">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-xs xl:text-md">
                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5 26.7675L11.25 20.5163L13.0163 18.75L17.5 23.2325L26.9812 13.75L28.75 15.5187L17.5 26.7675Z" fill="#14B8A6" />
                          <path d="M20 2.5C16.5388 2.5 13.1554 3.52636 10.2775 5.44928C7.39967 7.37221 5.15665 10.1053 3.83212 13.303C2.50758 16.5007 2.16102 20.0194 2.83627 23.4141C3.51151 26.8087 5.17822 29.9269 7.62564 32.3744C10.0731 34.8218 13.1913 36.4885 16.5859 37.1637C19.9806 37.839 23.4993 37.4924 26.697 36.1679C29.8947 34.8434 32.6278 32.6003 34.5507 29.7225C36.4737 26.8446 37.5 23.4612 37.5 20C37.5 15.3587 35.6563 10.9075 32.3744 7.62563C29.0925 4.34374 24.6413 2.5 20 2.5ZM20 35C17.0333 35 14.1332 34.1203 11.6665 32.472C9.19972 30.8238 7.27713 28.4811 6.14181 25.7403C5.0065 22.9994 4.70945 19.9834 5.28823 17.0736C5.86701 14.1639 7.29562 11.4912 9.39341 9.3934C11.4912 7.29561 14.1639 5.867 17.0737 5.28822C19.9834 4.70944 22.9994 5.00649 25.7403 6.14181C28.4811 7.27712 30.8238 9.19971 32.472 11.6664C34.1203 14.1332 35 17.0333 35 20C35 23.9782 33.4197 27.7936 30.6066 30.6066C27.7936 33.4196 23.9783 35 20 35Z" fill="#14B8A6" />
                        </svg>

                        <span className={plan.featured ? "text-gray-600" : "text-gray-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </section>
      </div>

      {/* FAQ Section — dark */}
      <FadeInOnScroll direction="right" delay={100}>
        <FAQSection />
      </FadeInOnScroll>
      <FadeInOnScroll delay={100}>
        <CTASection />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Footer />
      </FadeInOnScroll>
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