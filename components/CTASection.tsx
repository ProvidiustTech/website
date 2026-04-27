export default function CTASection() {
  return (
    <section className="bg-[#101010] py-32 mt-[-32px] px-4 md:px-8 text-center relative overflow-hidden w-full">
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-teal-500 opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-teal-400 opacity-20 blur-2xl pointer-events-none"></div>

      {/* Glowing logo */}
      <div className="flex justify-center mb-10 items-center">
        <div className="relative">
          {/* Pulsing Background Circle */}
          <div className="absolute inset-0 rounded-full background-pulse"
            style={{

              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0) 70%)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Glowing Logo */}
          <div className="relative rounded-full flex items-center justify-center logo-glow"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
              border: '2px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <img src="/footer.png" className="w-40" alt="logo" />
          </div>
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-white mb-6 max-w-2xl mx-auto">
        Let your AI handle the conversations
      </h2>

      <button className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3.5 rounded-2xl text-lg font-medium transition-colors">
        Get Started
      </button>
    </section>
  );
}
