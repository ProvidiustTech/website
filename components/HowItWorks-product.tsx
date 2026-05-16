function Step({
  number,
  title,
  description,
  align = "left",
  accent = false,
}: {
  number: string;
  title: string;
  description: string;
  align?: "left" | "right";
  accent?: boolean;
}) {
  return (
    <div className={`flex items-start gap-4 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
          accent ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 text-base mb-1">{title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-8xl mx-auto w-[92%] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">How it Works</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We use AI to respond instantly, escalate when necessary, and give your team full visibility
            into every interaction.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — steps */}
          <div className="flex flex-col gap-8">
            <Step
              number="1"
              title="Your Customers Send a Message"
              description="Customers reach out via WhatsApp, email, web chat, Telegram, or Instagram — all in one place."
              accent
            />
            <Step
              number="2"
              title="AI Understands Intent"
              description="Our AI analyses the message, checks your knowledge base, and determines the appropriate response."
              accent
            />
            <Step
              number="3"
              title="AI Responds Instantly"
              description="Customers get an accurate, on-brand response in under a second, 24/7."
              accent
            />
            <Step
              number="4"
              title="Escalates to Agent Only If Needed"
              description="When a query is too complex or sensitive, the AI hands it off to a human agent — with full context."
              accent
            />
            <Step
              number="5"
              title="Business Monitors Everything"
              description="Track all conversations, response quality, and team performance from the real-time dashboard."
              accent
            />
          </div>

          {/* Right — visual flow placeholder */}
          <div className="relative">
            {/* Flow diagram */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 flex flex-col gap-4">
              {/* Customer bubble */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[0, 1].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center text-xs text-teal-600 font-bold">
                      {["C", "U"][i]}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">Your Customers</span>
                <span className="ml-auto text-xs bg-teal-500 text-white px-3 py-1 rounded-full">Send</span>
              </div>
              <div className="ml-4 bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-600 max-w-xs">
                Hi, where&apos;s my order? 📦
              </div>

              <div className="border-l-2 border-dashed border-teal-200 ml-4 h-4" />

              {/* AI understands */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">AI Understands</span>
                  <span className="ml-2 text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full border border-teal-200">Intent</span>
                </div>
              </div>

              <div className="border-l-2 border-dashed border-teal-200 ml-4 h-4" />

              {/* AI responds */}
              <div className="ml-4 bg-teal-500 text-white rounded-2xl rounded-tl-none px-4 py-3 text-sm max-w-xs">
                I&apos;d be happy to help you track your order. Could you please provide your order number?
                <div className="mt-1 text-xs text-teal-200">AI • 97% confidence</div>
              </div>

              <div className="border-l-2 border-dashed border-gray-200 ml-4 h-4" />

              {/* Escalates */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Escalates to Agent</span>
                  <span className="ml-2 text-xs text-gray-400">Only if Needed</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400">Business monitors everything in</span>
                <span className="text-xs bg-gray-100 text-gray-700 font-semibold px-3 py-1 rounded-full">Dashboard</span>
              </div>
            </div>

            {/* Image slot overlay hint */}
            <div className="absolute -top-3 -right-3 bg-teal-50 border border-dashed border-teal-300 rounded-xl px-3 py-2 text-xs text-teal-500">
              + Illustration coming soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
