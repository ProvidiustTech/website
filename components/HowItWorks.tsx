export default function HowItWorks() {
  return (
    <section className="bg-[#f5f5f7] py-16 px-4">
      {/* Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l2.5 2.5L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-gray-600 text-sm font-medium">Turn conversations into resolutions.</span>
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] text-center mb-4">
        How our AI customer support works
      </h2>
      <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
        From the moment a customer sends a message to when it&apos;s resolved, our AI understands the request, finds the
        right information from your knowledge base, responds instantly and follow up, so you don&apos;t have to.
      </p>

      {/* Three cards - desktop horizontal, mobile vertical */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-[#1a1a2e] text-base mb-2">A customer sends a message</h3>
          <p className="text-gray-400 text-sm mb-6">From your website, WhatsApp, or any channel you connect.</p>
          {/* Message preview */}
          <div className="space-y-3">
            <div className="flex items-start justify-between py-2 border-b border-gray-100">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-semibold text-gray-800">Emma Wilson</p>
                  <span className="text-xs text-gray-400 ml-auto">2m ago</span>
                </div>
                <p className="text-xs text-gray-500">Where&apos;s my order? I ordered 3 days ago...</p>
                <div className="flex gap-1 mt-1.5">
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">AI: Medium</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">WhatsApp</span>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-between py-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-semibold text-gray-800">James Rodriguez</p>
                  <span className="text-xs text-gray-400 ml-auto">15m ago</span>
                </div>
                <p className="text-xs text-gray-500">Thanks! That solved my problem.</p>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block">Resolved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-[#1a1a2e] text-base mb-2">Our AI understands and replies instantly</h3>
          <p className="text-gray-400 text-sm mb-6">It uses your knowledge base and past conversations to give accurate answers.</p>
          {/* Knowledge base UI */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-200"></div>
                <span className="text-xs font-semibold text-gray-700">Your Knowledge Base</span>
              </div>
              <span className="text-xs text-gray-400">3 items</span>
            </div>
            <div className="flex flex-col items-center py-4">
              <div className="w-12 h-12 rounded-full border-2 border-teal-400 flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#14b8a6" strokeWidth="1.5"/>
                  <path d="M7 10l2 2 4-4" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700 mb-1">Analyzing Document</p>
              <p className="text-xs text-gray-400 text-center">We&apos;re extracting text and indexing keywords to make your document searchable.</p>
              <div className="mt-3 space-y-1 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-400 flex items-center justify-center">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <path d="M1 3l1.5 1.5L5 2" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">Text extraction complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                  <span className="text-xs text-gray-400">Indexing semantic relationships...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-[#1a1a2e] text-base mb-2">It escalates when needed</h3>
          <p className="text-gray-400 text-sm mb-6">If the AI is unsure, it passes the conversation to your team.</p>
          {/* Dashboard screenshot mockup */}
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <div className="bg-white p-2 border-b border-gray-100">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="flex h-24">
              {/* Sidebar */}
              <div className="w-16 bg-white border-r border-gray-100 p-2 space-y-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-2 bg-gray-100 rounded"></div>
                ))}
              </div>
              {/* Main content */}
              <div className="flex-1 p-2 space-y-1">
                <div className="flex gap-1">
                  <div className="flex-1 space-y-1">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-2 bg-gray-100 rounded"></div>
                    ))}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="h-6 bg-blue-200 rounded"></div>
                    <div className="h-4 bg-blue-100 rounded"></div>
                  </div>
                </div>
                <div className="h-2 bg-teal-100 rounded w-2/3"></div>
                <div className="h-2 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
