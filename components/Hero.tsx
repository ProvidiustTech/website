import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#f5f5f7] pt-12 pb-0 px-4 text-center relative overflow-hidden">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-8">
          <img src="buildicon.svg" alt="" />
        {/* <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
        </div> */}
        <span className="text-gray-700 text-sm">Built for modern customer support</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] leading-tight mb-4 max-w-4xl mx-auto">
        No More Basic Ai Chatbots
        <br />
        Get{" "}
        <span className="text-teal-500">customer Care</span>{" "}
        that runs itself
      </h1>

      {/* Subheadline */}
      <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-10">
        Providius is an AI customer support platform that reads, understands, and recognizes customer
        messages across WhatsApp, web chat, and other channels automatically.
      </p>

      {/* CTAs */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
       <Link href="/founding">
        <button className="bg-gradient-to-r px-32 from-blue-500 to-teal-400 text-white lg:px-8 py-4 rounded-2xl text-lg font-medium hover:opacity-90 transition-opacity">
          Join the waitlist
        </button>
        </Link>
        <Link href='/founding/seedemo'>
        <button className="bg-teal-500 px-[32%] text-white lg:px-8 py-4 rounded-2xl text-lg font-medium hover:bg-teal-600 transition-colors">
          See Demo
        </button>
        </Link>
      </div>

      {/* Floating status pills - desktop only */}
      <img src="./chat.png" className="h-full w-[90%] ml-3 lg:ml-20" alt="" />
      
    </section>
  );
}
