'use client'
import { useState } from 'react'
import { X, Check } from 'lucide-react'
import Link from 'next/link'
import ApplicationSuccessPage from './success/page'

/* ── Brand logo ─────────────────────────────────────────────────────────── */
function Logo() {
    return (
        <div className="absolute top-[140px] ml-[-48px]">
            <img src="./logo.png" className='w-56' alt="logo" />
        </div>
    )
}

/* ── Integration icons row ──────────────────────────────────────────────── */
function IntegrationIcons() {
    // Coloured icon placeholders matching the screenshot: HubSpot, Paystack, Slack, Stripe, WhatsApp, Salesforce
  
    return (
        <div className="flex items-center justify-center gap-7 flex-wrap">
            <img src="./whatsappicon.png" className='w-7' alt="" />
            <img src="./telegram.png" className='w-8' alt="" />
            <img src="./email.png" className='w-8' alt="" />
            <img src="./instagram.png" className='w-8' alt="" />

            {/* {icons.map(ic => (
                ic.text
                    ? <span key={ic.label} className="text-sm font-bold" style={{ color: ic.textColor }}>{ic.text}</span>
                    : (
                        <div key={ic.label}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                            style={{ background: ic.bg }}>
                            {ic.letter}
                        </div>
                    )
            ))} */}
        </div>
    )
}

/* ── Apply Modal ────────────────────────────────────────────────────────── */
function ApplyModal({ onClose }: { onClose: () => void }) {
    const [form, setForm] = useState({
        company: '', companyEmail: '', industry: '', channel: '', volume: '', challenge: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const set = (k: keyof typeof form) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm(f => ({ ...f, [k]: e.target.value }))

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.company.trim()) return

        setIsLoading(true)
        setError('')

        try {
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to submit application')
            }

            setSubmitted(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            console.error('Form submission error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const selectCls = "w-full bg-[#1a1a2a] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-gray-400 outline-none appearance-none cursor-pointer focus:border-[#2DD4BF] transition-colors"
    const inputCls = "w-full bg-[#1a1a2a] border border-[#2a2a3a] rounded-xl px-4 py-3 lg:py-2 text-sm lg:text-base text-white placeholder-gray-600 outline-none focus:border-[#2DD4BF] transition-colors"
    const placeholder = "lg:text-base"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

            {submitted ? (
                /* ── Success state ── */
                <div className="relative bg-[#111118] border border-none rounded-2xl w-full max-w-[1520px] lg:max-w-full shadow-2xl overflow-hidden">

                    <ApplicationSuccessPage />

                </div>
            ) : (
                /* ── Form ── */
                <>
                    <div className="relative bg-[#111118] border border-[#2a2a3a] rounded-2xl w-full max-w-[520px] shadow-2xl overflow-hidden">
                        <div className='mt-0'>
                            <div>
                                <div className="flex items-center justify-between px-7 pt-7 pb-5">
                                    <h3 className="text-2xl text-white">Apply for early access</h3>
                                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                                        <X size={18} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="px-7 pb-7 space-y-4">
                                    {error && (
                                        <div className="bg-red-500/10 border border-red-500/50 rounded-xl px-4 py-3 text-sm text-red-400">
                                            {error}
                                        </div>
                                    )}

                                    {/* Company name */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={form.company}
                                            onChange={set('company')}
                                            required
                                            disabled={isLoading}
                                            className={inputCls}
                                        />
                                    </div>

                                    {/* Company Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            Company Email
                                        </label>
                                        <input
                                            type="email"
                                            value={form.companyEmail}
                                            onChange={set('companyEmail')}
                                            required
                                            disabled={isLoading}
                                            className={inputCls}
                                        />
                                    </div>

                                    {/* Industry */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Industries</label>
                                        <div className="relative">
                                            <select value={form.industry} onChange={set('industry')} disabled={isLoading} className={selectCls}>
                                                <option value="" disabled hidden>Select Industry</option>
                                                <option value="retail">Retail / E-commerce</option>
                                                <option value="finance">Finance Institution</option>
                                                <option value="healthcare">Hospitality</option>
                                                <option value="logistics">Logistics</option>
                                                <option value="tech">Technology</option>
                                                <option value="other">Aviation</option>
                                            </select>
                                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Channel */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">What channel(s) do you currently use for customer support?</label>
                                        <div className="relative">
                                            <select value={form.channel} onChange={set('channel')} disabled={isLoading} className={selectCls}>
                                                <option value="" disabled hidden>Select Channel</option>
                                                <option value="webchat">Website Chat</option>
                                                <option value="whatsapp">WhatsApp</option>
                                                <option value="telegram">Telegram</option>
                                                <option value="instagram">Instagram</option>
                                                <option value="gmail">Email</option>
                                            </select>
                                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Volume */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Monthly customer conversation</label>
                                        <div className="relative">
                                            <select value={form.volume} onChange={set('volume')} disabled={isLoading} className={selectCls}>
                                                <option value="" disabled hidden>Select Channel</option>
                                                <option value="under100"> &lt; 1,000</option>
                                                <option value="100-500">1,000 / month</option>
                                                <option value="500-2k">&gt; 1,000 / month</option>

                                            </select>
                                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Challenge */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Biggest customer support challenge</label>
                                        <textarea
                                            value={form.challenge}
                                            onChange={set('challenge')}
                                            disabled={isLoading}
                                            placeholder="Briefly describe your biggest customer care pain point..."
                                            rows={4}
                                            className={`${inputCls} resize-none ${placeholder}`}
                                        />
                                    </div>

                                    <div className='flex justify-center'>
                                        <button type="submit"
                                            disabled={isLoading}
                                            className="w-full lg:w-40 py-3.5 bg-[#14B8A6] hover:bg-[#26b8a6] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl text-lg transition-all active:scale-[0.98] mt-2">
                                            {isLoading ? 'Submitting...' : 'Submit'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

/* ── Main page ──────────────────────────────────────────────────────────── */
export default function FoundingProgramPage() {
    const [showModal, setShowModal] = useState(false)

    const benefits = [
        'Exclusive early access to our AI Customer Care Platform',
        'Dedicated onboarding and priority support',
        'Get a custom setup tailored to your customer support workflows',
    ]

    return (
        <>
            {/* Full-screen dark background */}
            <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-[540px] lg:max-w-[940px] lg:p-20">

                    {/* Card */}
                    <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl px-10 sm:px-10 py-10 sm:py-12 shadow-2xl">

                        {/* Logo */}
                        <div className="lg:mb-8 top-[-190px] relative ml-0">
                            <Link href="/">
                            <Logo />
                            </Link>
                        </div>

                        <div className='mt-20'>
                            {/* Headline */}
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-5 leading-tight tracking-tight">
                                Providius Founding Companies Program
                            </h1>

                            {/* Description */}
                            <p className="text-sm text-white leading-relaxed mb-2">
                                Apply to become part of our founding companies pilot program and get early access to our AI customer care platform.
                            </p>
                            <p className="text-sm text-white leading-relaxed mb-7">
                                Help shape the future of customer service automation.
                            </p>

                            {/* Divider */}
                            <div className="h-px bg-[#1e1e2e] mb-7" />

                            {/* Benefits */}
                            <ul className="space-y-4 mb-9">
                                {benefits.map((b, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full border border-[#2DD4BF]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <img src="./check2.png" alt="" />

                                        </div>
                                        <span className="text-sm font-semibold text-gray-300 leading-relaxed">{b}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Integrations */}
                            <div className="mb-9">
                                <p className="text-xs text-white font-normal text-center mb-4">Seamlessly integrates with your existing tools</p>
                                <IntegrationIcons />
                            </div>

                            {/* CTA */}
                            <div className="flex justify-center lg:w-full">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="w-full lg:w-56 py-4 bg-[#14B8A6] hover:bg-[#26b8a6] text-white font-medium text-xl rounded-xl transition-all active:scale-[0.99] shadow-lg shadow-[#2DD4BF]/20"
                                >
                                    Apply Now
                                </button>
                            </div>

                            {/* Fine print */}
                            <p className="text-xs text-gray-600 text-center mt-4">
                                Limited spots available for the founding program.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && <ApplyModal onClose={() => setShowModal(false)} />}
        </>
    )
}