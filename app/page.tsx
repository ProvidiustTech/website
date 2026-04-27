import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import HowItWorks from "@/components/HowItWorks";
import AutomateSection from "@/components/AutomateSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] w-full overflow-hidden">
      <div className="h-" />
      <Navbar />
      
      <FadeInOnScroll>
        <Hero />
      </FadeInOnScroll>

      <FadeInOnScroll direction="down" delay={100}>
        <Integrations />
      </FadeInOnScroll>

      <FadeInOnScroll direction="up" delay={150}>
        <HowItWorks />
      </FadeInOnScroll>

      <FadeInOnScroll direction="left" delay={100}>
        <AutomateSection />
      </FadeInOnScroll>

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
