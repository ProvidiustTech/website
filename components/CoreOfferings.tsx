function ImageSlot({ label }: { label: string }) {
  return (
    <div className="flex-1 min-h-36 rounded-xl bg-white/20 border-2 border-dashed border-white/40 flex items-center justify-center">
      <div className="text-center px-3">
        <svg className="w-8 h-8 mx-auto mb-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs opacity-70">{label}</p>
      </div>
    </div>
  );
}

function ImageSlotLight({ label }: { label: string }) {
  return (
    <div className="flex-1 min-h-36 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
      <div className="text-center px-3">
        <svg className="w-8 h-8 mx-auto mb-1 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export default function CoreOfferings() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-8xl mx-auto w-[92%] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4">Our Core Offerings</h2>
          <p className="text-gray-500 max-w-5xl mx-auto text-xl">
            From collecting messages across channels to responding with AI and escalating when needed,
            everything works together in one system.
          </p>
        </div>

        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Unified Customer Inbox — dark teal */}
          <div className="bg-teal-600 text-white rounded-3xl p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Unified Customer Inbox</h3>
              <p className="text-teal-100 text-sm leading-relaxed">
                All customer messages in one place across WhatsApp, email, and web chat a.t.c.
              </p>
            </div>
            <ImageSlot label="Inbox screenshot" />
          </div>

          {/* Real-Time Dashboard — light */}
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Dashboard</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Monitor conversations, performance, and response quality.
              </p>
            </div>
            <ImageSlotLight label="Dashboard screenshot" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* AI-Powered Responses — light */}
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered Responses</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Instant replies to FAQs, complaints, and support requests.
              </p>
            </div>
            <ImageSlotLight label="AI responses screenshot" />
          </div>

          {/* AI Training & Customization — center, light */}
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI Training &amp; Customization</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Train the AI with your business data, FAQs, and tone — so responses match how you actually communicate.
              </p>
            </div>
            <ImageSlotLight label="Training UI screenshot" />
          </div>

          {/* Smart Escalation — dark teal */}
          <div className="bg-teal-600 text-white rounded-3xl p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Smart Escalation</h3>
              <p className="text-teal-100 text-sm leading-relaxed">
                AI handles routine queries and passes complex issues to humans.
              </p>
            </div>
            <ImageSlot label="Escalation screenshot" />
          </div>
        </div>
      </div>
    </section>
  );
}
