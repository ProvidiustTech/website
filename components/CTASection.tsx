export default function CTASection() {
  return (
    <section className="bg-[#101010] py-20 px-4 md:px-8 text-center relative overflow-hidden w-full">
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-teal-500 opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-teal-400 opacity-20 blur-2xl pointer-events-none"></div>

      {/* Glowing logo */}
      <div className="relative inline-block mb-[-50px]">
        <div className="">
            <img src="./footer.png" alt="logo" />
        </div>
        
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-white mb-6 max-w-2xl mx-auto">
        Let your AI handle the conversations
      </h2>

      <button className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3.5 rounded-2xl text-base font-bold transition-colors">
        Get Started
      </button>
    </section>
  );
}
