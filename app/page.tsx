import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import HowItWorks from "@/components/HowItWorks";
import AutomateSection from "@/components/AutomateSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] w-full overflow-x-hidden">
      <div className="h-6">

      </div>
      <Navbar />
      <Hero />
      <Integrations />
      <HowItWorks />
      <AutomateSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
