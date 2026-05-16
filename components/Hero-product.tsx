export default function Hero() {
  return (
    <section className="pt-10 h-[70vh] rounded-3xl w-[88%] mt-36 mx-auto pb-16 bg-gradient-to-br from-teal-50 via-white to-green-50 overflow-hidden">
      <div className="max-w-8xl mx-auto w-[92%] px-4 sm:px-6 lg:px-3">
        {/* Top mini-banner */}
        <div className="flex justify-end mb-6">
          <div className="hidden md:flex items-center gap-9 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 text-sm text-black">
            <span>AI Customer Care for Modern Businesses</span>
            <a
              href="#"
              className="bg-teal-500 text-white text-md font-medium px-4 py-1.5 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div className="mt-[-130px] ">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-3 mb-6">
                <img src="/check1.png" className="w-8 h-8" alt="" />
             
              <span className="text-sm text-black font-">Respond Intelligently. Reduce support workload</span>
            </div>
<h1 className="text-4xl mt-10 sm:text-5xl w-[80%] font-extrabold text-gray-900 mb-6 leading-tight]">
  Automate Customer Support Across Every Channel
</h1>

            <p className="text-lg text-gray-500 mb-8 max-w-lg">
              Automate customer conversations across WhatsApp, web chat, and email with AI that responds instantly and escalates when needed.
            </p>

            
          </div>

          {/* Right — dashboard placeholder */}
          <div className="relative hidden xl:block">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <img src="/desktop-product.png" alt="" />
            </div>

            {/* Floating chat bubble */}
            <div className="absolute -bottom-40 z-[1000px] -left-4 bg-white rounded-2xl shadow-lg border-none border-gray-100 flex items-center gap-3 max-w-56">
              <img src="/provchat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
