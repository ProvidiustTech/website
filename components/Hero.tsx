export default function Hero() {
  return (
    <section className="bg-[#f5f5f7] pt-12 pb-0 px-4 text-center relative overflow-hidden">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-8">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5"/>
            <path d="M5 7l1.5 1.5L9 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-gray-700 text-sm font-medium">Built for modern customer support</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-black text-[#1a1a2e] leading-tight mb-4 max-w-4xl mx-auto">
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
        <button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-4 rounded-2xl text-base font-bold hover:opacity-90 transition-opacity">
          Get Started
        </button>
        <button className="bg-teal-500 text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-teal-600 transition-colors">
          See Demo
        </button>
      </div>

      {/* Floating status pills - desktop only */}
      <div className="relative max-w-5xl mx-auto">
        {/* Top left pill */}
        <div className="hidden md:flex absolute left-0 top-8 items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-md z-10">
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-500 text-xs font-bold">!</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-800">Questions unanswered</p>
            <p className="text-xs text-gray-400">No response in 20+ mins</p>
          </div>
        </div>

        {/* Bottom left pill */}
        <div className="hidden md:flex absolute left-[-60px] top-24 items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-md z-10">
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-500 text-xs font-bold">!</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-800">Response Incorrect</p>
            <p className="text-xs text-gray-400">Low Confidence</p>
          </div>
        </div>

        {/* Top right pill */}
        <div className="hidden md:flex absolute right-0 top-4 items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-md z-10">
          <div className="w-8 h-6 bg-teal-500 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">98%</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-800">High confidence reply</p>
            <p className="text-xs text-gray-400">Verified</p>
          </div>
        </div>

        {/* Middle right pill */}
        <div className="hidden md:flex absolute right-[-20px] top-20 items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-md z-10">
          <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2 2 4-4" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-800">Auto-resolved</p>
            <p className="text-xs text-gray-400">2 min ago</p>
          </div>
        </div>

        {/* Bottom right pill */}
        <div className="hidden md:flex absolute right-[-10px] top-36 items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-md z-10">
          <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2 2 4-4" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-800">request handled</p>
            <p className="text-xs text-gray-400">smooth escalation</p>
          </div>
        </div>

        {/* Chat screenshots */}
        <div className="flex gap-4 items-start justify-center">
          {/* Left chat - Failed bot */}
          <div className="w-full md:w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 px-4 py-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Lead Bot</p>
                <p className="text-blue-200 text-xs">Online</p>
              </div>
            </div>
            <div className="p-4 space-y-3 bg-gray-50">
              {/* User message */}
              <div className="text-xs text-gray-500 text-left">Hi, where&apos;s my order?</div>
              <div className="text-xs text-gray-400">10:32 AM</div>
              {/* Failed response 1 */}
              <div className="bg-red-500 rounded-lg p-2">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-white text-xs">●</span>
                  <span className="text-white text-xs font-semibold">FAILED</span>
                </div>
                <p className="text-white text-xs">Did not understand the question</p>
                <p className="text-red-200 text-xs">Confidence: 23%</p>
                <p className="text-red-200 text-xs text-right mt-1">No reply sent</p>
              </div>
              {/* User message 2 */}
              <div className="text-xs text-gray-500 text-left">It&apos;s order #12847</div>
              <div className="text-xs text-gray-400">10:33 AM</div>
              {/* Failed response 2 */}
              <div className="bg-red-500 rounded-lg p-2">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-white text-xs">●</span>
                  <span className="text-white text-xs font-semibold">FAILED</span>
                </div>
                <p className="text-white text-xs">Order lookup timeout</p>
                <p className="text-red-200 text-xs">Confidence: 41%</p>
              </div>
              {/* Attempted response */}
              <div className="bg-yellow-400 rounded-lg p-2">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-yellow-800 text-xs">●</span>
                  <span className="text-yellow-800 text-xs font-semibold">ATTEMPTED</span>
                </div>
                <p className="text-yellow-800 text-xs">Could you please provide your order number?</p>
              </div>
            </div>
          </div>

          {/* Right chat - Success */}
          <div className="hidden md:block w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold">EW</div>
                <div>
                  <p className="text-gray-800 text-xs font-semibold">Emma Wilson</p>
                  <p className="text-gray-400 text-xs">WhatsApp · Customer since Jan 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-teal-100 text-teal-600 text-xs px-2 py-0.5 rounded-full font-medium">AI Active</span>
                <span className="text-gray-400 text-xs">Confidence: 92%</span>
                <span className="text-red-400 text-xs font-medium cursor-pointer">Z. Escalate</span>
              </div>
            </div>
            <div className="p-4 space-y-3 bg-gray-50">
              {/* User message */}
              <div className="text-xs text-gray-500 text-left">Hi, where&apos;s my order?</div>
              <div className="text-xs text-gray-400">10:32 AM</div>
              {/* AI response */}
              <div className="bg-teal-500 rounded-2xl rounded-tl-sm p-3 ml-4">
                <p className="text-white text-xs">Hi Emma! I&apos;d be happy to help you track your order. Could you please provide your order number?</p>
                <p className="text-teal-200 text-xs mt-1">10:32 AM · AI · 92% confidence</p>
              </div>
              {/* User reply */}
              <div className="text-xs text-gray-500 text-left">It&apos;s order #12847</div>
              <div className="text-xs text-gray-400">10:33 AM</div>
              {/* Checking status */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-teal-500 text-xs">↻</span>
                </div>
                <p className="text-gray-500 text-xs">Checking order status...</p>
              </div>
              {/* AI final response */}
              <div className="bg-teal-500 rounded-2xl rounded-tl-sm p-3 ml-4">
                <p className="text-white text-xs">Thanks! I found your order #12847. It&apos;s currently in transit and expected to arrive tomorrow by 5 PM. Here&apos;s the tracking link: trk.io/12847</p>
                <p className="text-teal-200 text-xs mt-1">AI · 89% confidence</p>
              </div>
              <p className="text-gray-400 text-xs">📎 Sources used</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
