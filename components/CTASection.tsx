export default function CTASection() {
  return (
    <section className="bg-[#0d1117] py-20 px-4 text-center relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-teal-500 opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-teal-400 opacity-20 blur-2xl pointer-events-none"></div>

      {/* Glowing logo */}
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 rounded-3xl bg-teal-400 opacity-30 blur-xl scale-110"></div>
        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 via-teal-500 to-green-400 flex items-center justify-center shadow-2xl mx-auto">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <rect x="8" y="8" width="12" height="12" rx="2" fill="white" opacity="0.9"/>
            <rect x="24" y="8" width="12" height="12" rx="2" fill="white" opacity="0.9"/>
            <rect x="8" y="24" width="12" height="12" rx="2" fill="white" opacity="0.9"/>
            <rect x="24" y="26" width="4" height="10" rx="1" fill="white" opacity="0.7"/>
            <rect x="32" y="24" width="4" height="10" rx="1" fill="white" opacity="0.7"/>
          </svg>
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-white mb-6 max-w-lg mx-auto">
        Let your AI handle the conversations
      </h2>

      <button className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3.5 rounded-2xl text-base font-bold transition-colors">
        Get Started
      </button>
    </section>
  );
}
