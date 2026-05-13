import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Plans & Access | ProvidiusTech",
  description: "Flexible plans for every stage of customer support. Join our Founding companies program, apply as a founding company, or talk to us for a custom solution.",
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
                    className={`xl:text-3xl text-md font-semibold mb-1 ${plan.featured ? "text-[#1E293B]" : "text-[#1E293B]"
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
                      <li key={f} className="flex items-start gap-3 text-xs xl:text-base">
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
  const cls = `xl:w-40 xl:h-40 w-6 h-6 ${featured ? "text-white" : "text-teal-600"}`;
  if (id === "waitlist")
    return (
      <svg className={cls} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.3915 4.28616C24.8586 3.67284 23.1485 3.67284 21.6155 4.28616L6.39783 10.3719C5.52333 10.7219 4.77375 11.326 4.24576 12.106C3.71776 12.8861 3.43556 13.8065 3.43555 14.7484V33.249C3.43522 34.1913 3.71726 35.112 4.24528 35.8924C4.77329 36.6728 5.52306 37.2771 6.39783 37.6273L21.6155 43.713C23.1485 44.3263 24.8586 44.3263 26.3915 43.713L41.6093 37.6273C42.4844 37.2774 43.2345 36.6732 43.7628 35.8928C44.2912 35.1124 44.5735 34.1915 44.5733 33.249V14.7502C44.5731 13.808 44.2907 12.8875 43.7623 12.1074C43.234 11.3273 42.4841 10.7234 41.6093 10.3736L26.3915 4.28616ZM22.5704 6.67245C23.4904 6.30427 24.5167 6.30427 25.4367 6.67245L39.823 12.429L33.643 14.901L17.8235 8.57187L22.5704 6.67245ZM14.3624 9.95702L30.1853 16.2862L24.0035 18.7599L8.1824 12.429L14.3624 9.95702ZM6.0464 14.3456L22.7178 21.0142V41.3833L22.5704 41.3284L7.3544 35.241C6.95685 35.0821 6.61602 34.8077 6.37586 34.4533C6.1357 34.0988 6.00721 33.6806 6.00698 33.2524V14.7484C6.00698 14.6113 6.02012 14.4759 6.0464 14.3422M25.2893 41.3833V21.0142L41.9624 14.3456C41.9875 14.477 42.0001 14.6119 42.0001 14.7502V33.2507C42.0001 34.1267 41.4687 34.9153 40.6544 35.2393L25.4367 41.3284L25.2893 41.3833Z" fill="#14B8A6"/>
</svg>

    );
  if (id === "founding")
    return (
      <svg className={cls} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.9994 40.424L5.19141 17.846L10.6154 7H37.3834L42.8074 17.846L23.9994 40.424ZM17.6334 17H30.3654L26.3654 9H21.6334L17.6334 17ZM22.9994 36.12V19H8.78341L22.9994 36.12ZM24.9994 36.12L39.2154 19H24.9994V36.12ZM32.5834 17H40.1154L36.1154 9H28.5834L32.5834 17ZM7.88341 17H15.4154L19.4154 9H11.8834L7.88341 17Z" fill="#14B8A6"/>
</svg>

    );
  return (
  <svg className={cls} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M42 35C42 36.8565 41.2625 38.637 39.9497 39.9497C38.637 41.2625 36.8565 42 35 42C33.1435 42 31.363 41.2625 30.0503 39.9497C28.7375 38.637 28 36.8565 28 35C28 33.1435 28.7375 31.363 30.0503 30.0503C31.363 28.7375 33.1435 28 35 28C36.8565 28 38.637 28.7375 39.9497 30.0503C41.2625 31.363 42 33.1435 42 35Z" stroke="#14B8A6" stroke-width="2.5"/>
<path d="M35 28H13C11.1435 28 9.36301 28.7375 8.05025 30.0503C6.7375 31.363 6 33.1435 6 35C6 36.8565 6.7375 38.637 8.05025 39.9498C9.36301 41.2625 11.1435 42 13 42H35C36.8565 42 38.637 41.2625 39.9498 39.9498C41.2625 38.637 42 36.8565 42 35C42 33.1435 41.2625 31.363 39.9498 30.0503C38.637 28.7375 36.8565 28 35 28ZM6 13C6 13.9193 6.18106 14.8295 6.53284 15.6788C6.88463 16.5281 7.40024 17.2997 8.05025 17.9497C8.70026 18.5998 9.47194 19.1154 10.3212 19.4672C11.1705 19.8189 12.0807 20 13 20C13.9193 20 14.8295 19.8189 15.6788 19.4672C16.5281 19.1154 17.2997 18.5998 17.9497 17.9497C18.5998 17.2997 19.1154 16.5281 19.4672 15.6788C19.8189 14.8295 20 13.9193 20 13C20 11.1435 19.2625 9.36301 17.9497 8.05025C16.637 6.7375 14.8565 6 13 6C11.1435 6 9.36301 6.7375 8.05025 8.05025C6.7375 9.36301 6 11.1435 6 13Z" stroke="#14B8A6" stroke-width="2.5"/>
<path d="M13 6H35C35.9193 6 36.8295 6.18106 37.6788 6.53284C38.5281 6.88463 39.2997 7.40024 39.9497 8.05025C40.5998 8.70026 41.1154 9.47194 41.4672 10.3212C41.8189 11.1705 42 12.0807 42 13C42 13.9193 41.8189 14.8295 41.4672 15.6788C41.1154 16.5281 40.5998 17.2997 39.9497 17.9497C39.2997 18.5998 38.5281 19.1154 37.6788 19.4672C36.8295 19.8189 35.9193 20 35 20H13C12.0807 20 11.1705 19.8189 10.3212 19.4672C9.47194 19.1154 8.70026 18.5998 8.05025 17.9497C7.40024 17.2997 6.88463 16.5281 6.53284 15.6788C6.18106 14.8295 6 13.9193 6 13C6 12.0807 6.18106 11.1705 6.53284 10.3212C6.88463 9.47194 7.40024 8.70026 8.05025 8.05025C8.70026 7.40024 9.47194 6.88463 10.3212 6.53284C11.1705 6.18106 12.0807 6 13 6Z" fill="url(#paint0_linear_966_4391)" stroke="#14B8A6" stroke-width="2.5"/>
<path d="M20.75 13C20.75 14.8565 20.0125 16.637 18.6997 17.9497C17.387 19.2625 15.6065 20 13.75 20C11.8935 20 10.113 19.2625 8.80025 17.9497C7.4875 16.637 6.75 14.8565 6.75 13C6.75 11.1435 7.4875 9.36301 8.80025 8.05025C10.113 6.7375 11.8935 6 13.75 6C15.6065 6 17.387 6.7375 18.6997 8.05025C20.0125 9.36301 20.75 11.1435 20.75 13Z" fill="white" stroke="#14B8A6" stroke-width="2.5"/>
<defs>
<linearGradient id="paint0_linear_966_4391" x1="6" y1="13" x2="42" y2="13" gradientUnits="userSpaceOnUse">
<stop stop-color="#387DE8"/>
<stop offset="0.5" stop-color="#65A5B4"/>
<stop offset="0.75" stop-color="#7BB99A"/>
<stop offset="1" stop-color="#91CD80"/>
</linearGradient>
</defs>
</svg>


  );
}