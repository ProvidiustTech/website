import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero-product";
import CoreOfferings from "@/components/CoreOfferings";
import HowItWorks from "@/components/HowItWorks-product";
import Channels from "@/components/Channels";
import CtaSection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CoreOfferings />
        <HowItWorks />
        <Channels />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
