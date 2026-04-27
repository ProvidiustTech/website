"use client";
import { useState } from "react";

const faqs = [
  { name: "Emma Wilson", question: "What is Providius?" },
  { name: "James Rodriguez", question: "Is this just another AI chatbot?" },
  { name: "Sophia Chen", question: "Do I need technical skills to use it?" },
  { name: "Andrew Thomas", question: "Is my customer's data safe?" },
  { name: "Rukayat Ahmed", question: "How long does it take to set up?" },
];

const answers: Record<string, string> = {
  "Is this just another AI chatbot?": "No.\nProvidius goes beyond basic Automated chatbots.\nIt understands context, uses your knowledge, and improves over time so conversations feel more natural and accurate.",
  "What is Providius?": "Providius is an AI-powered customer support platform that automates conversations across WhatsApp, web chat, and more, trained on your business knowledge.",
  "Do I need technical skills to use it?": "No technical skills required. Providius is designed for business teams. You can set up your knowledge base and start handling customer messages in minutes.",
  "Is my customer's data safe?": "Yes. We use industry-standard encryption and never share your data with third parties. Full GDPR compliance is built in.",
  "How long does it take to set up?": "Most teams are up and running within 24 hours. Simply connect your channels, upload your knowledge base, and Providius handles the rest.",
};

export default function FAQSection() {
  const [selected, setSelected] = useState("Is this just another AI chatbot?");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="bg-[#000000] py-16 px-7 ml-8 md:px-8 w-full overflow-hidden">
      {/* Badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#1f2937] border border-[#374151] rounded-full px-4 py-2">
            <img src="./everything.png" className="w-10" alt="" />
          
          <span className="text-gray-300 text-sm font-medium">Everything you need to know</span>
        </div>
      </div>

      {/* FAQ UI */}
      <div className="max-w-3xl mx-auto bg-[#1a2233] rounded-2xl overflow-hidden border border-[#2d3748]">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2d3748]">
          <div className="w-3 h-3 rounded-full bg-[#3d4758]"></div>
          <div className="w-3 h-3 rounded-full bg-[#3d4758]"></div>
          <span className="text-white font-semibold text-sm ml-2">FAQs</span>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left: FAQ list */}
          <div className="md:w-2/5 border-b md:border-b-0 md:border-r border-[#2d3748]">
            {faqs.map((faq) => (
              <button
                key={faq.question}
                onClick={() => setSelected(faq.question)}
                className={`w-full text-left px-4 py-3 border-b border-[#2d3748] last:border-b-0 hover:bg-[#1f2d42] transition-colors ${selected === faq.question ? "bg-[#1f2d42]" : ""}`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${selected === faq.question ? "bg-teal-400" : "bg-[#4b5563]"}`}></div>
                  <p className="text-xs text-gray-400">{faq.name}</p>
                  <p className="text-xs text-gray-500 ml-auto">2m ago</p>
                </div>
                <p className={`text-sm ml-3.5 ${selected === faq.question ? "text-white font-medium" : "text-gray-300"}`}>
                  {faq.question}
                </p>
              </button>
            ))}
          </div>

          {/* Right: Answer */}
          <div className="md:w-3/5 p-0">
            {/* Search bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2d3748]">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-300 outline-none placeholder-gray-500"
                placeholder="Have a question for us ?"
              />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4" stroke="#6b7280" strokeWidth="1.2"/>
                <path d="M9.5 9.5L12 12" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Answer content */}
            <div className="p-5">
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-4">
                <img src="/federico.png" className="w-12" alt="" />
                <div>
                  <p className="text-white font-semibold text-sm">Federico</p>
                  <p className="text-gray-400 text-xs">Reply-To</p>
                  <p className="text-gray-300 text-xs">{selected}</p>
                </div>
              </div>

              <div className="border-t border-[#2d3748] pt-4">
                {answers[selected]?.split('\n').map((line, i) => (
                  <p key={i} className={`text-gray-100 text-sm ${i === 0 ? "mb-2 font-medium" : "mb-1"}`}>{line}</p>
                ))}
                <p className="text-gray-500 text-xs mt-4">Sent from my iPhone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
