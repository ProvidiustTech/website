export default function AutomateSection() {
  return (
    <section className="bg-[#f5f5f7] py-16 px-4 md:px-8 w-full overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] max-w-2xl leading-tight">
            Automate customer Care without losing quality
          </h2>
          <div className="flex items-center gap-2 bg-white rounded-full w-96 px-7 py-3 shadow-sm self-start md:self-auto">
              <img src="/thunderbolt.png" className="w-8" alt="" />
            
            <span className="text-gray-600 text-sm font-medium">Smarter support, without the overhead.</span>
          </div>
        </div>

        {/* Feature 01 */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
          {/* Left: feature text with number */}
          <div className="flex gap-6 md:w-1/2">
            <div className="flex flex-col items-center">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-0.5 h-8 bg-teal-500 rounded-full"></div>
                ))}
              </div>
              <span className="text-teal-500 text-xs font-bold mt-1 rotate-90 origin-center translate-y-4">01</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">AI trained on your business knowledge</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Uses your documents, FAQs, and past conversations to give accurate, relevant responses every time.
              </p>
            </div>
          </div>

          {/* Right: chat UI */}
          <div className="md:w-1/2 w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-sm mx-auto md:mx-0 md:ml-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 10.5C2 8.5 4 7 7 7s5 1.5 5 3.5" stroke="#14b8a6" strokeWidth="1.2" strokeLinecap="round"/>
                      <circle cx="7" cy="4" r="2.5" stroke="#14b8a6" strokeWidth="1.2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Live Conversation</p>
                    <p className="text-xs text-gray-400">WhatsApp · Active now</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>

              {/* Chat body */}
              <img src="/conversationcard.png" className="w-full" alt="" />
              

              {/* Input */}
              <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2">
                <span className="text-gray-400">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H6M12 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input className="flex-1 text-xs text-gray-400 outline-none bg-transparent" placeholder="Type a message..." readOnly/>
                <button className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 5 2 2v2.5L6 5l-4 .5V8z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
