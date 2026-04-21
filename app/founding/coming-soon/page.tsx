'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

/* ── Logo ───────────────────────────────────────────────────────────────── */

/* ── Eye-slash icon ─────────────────────────────────────────────────────── */
function EyeSlashIcon() {
  return (
    <svg width="80" height="64" viewBox="0 0 80 64" fill="none" className="mx-auto mb-6">
      {/* Eye outline */}
      <path
        d="M40 10C20 10 4 32 4 32s16 22 36 22 36-22 36-22S60 10 40 10z"
        stroke="#2DD4BF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
      {/* Pupil */}
      <circle cx="40" cy="32" r="9" stroke="#2DD4BF" strokeWidth="3.5" fill="none"/>
      {/* Slash line,diagonal */}
      <line x1="12" y1="8" x2="68" y2="56" stroke="#2DD4BF" strokeWidth="4.5" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Blurred background preview ─────────────────────────────────────────── */
function BlurredBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {/* Fake hero section */}
      <div className="absolute inset-0 bg-gray-50" />
      <div className="absolute top-20 left-8 right-8 space-y-3 blur-sm opacity-40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#2DD4BF]/40" />
          <div className="h-3 w-40 rounded bg-gray-300" />
        </div>
        <div className="h-8 w-80 rounded bg-gray-800/70" />
        <div className="h-8 w-64 rounded bg-gray-800/70" />
        <div className="h-3 w-96 rounded bg-gray-300 mt-3" />
        <div className="h-3 w-80 rounded bg-gray-300" />
        <div className="flex gap-3 mt-4">
          <div className="h-10 w-28 rounded-lg bg-[#2DD4BF]/60" />
          <div className="h-10 w-28 rounded-lg bg-[#2DD4BF]/30" />
        </div>
      </div>
      {/* Right side card blur */}
      <div className="absolute top-16 right-8 w-64 space-y-3 blur-sm opacity-30">
        <div className="h-36 w-full rounded-xl bg-gray-200" />
        <div className="h-10 w-full rounded-lg bg-[#2DD4BF]/40" />
        <div className="h-10 w-full rounded-lg bg-[#2DD4BF]/60" />
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function ComingSoonPage() {
  const [form, setForm] = useState({ email: '', company: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email.trim() || !form.email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          company: form.company || null,
          source: 'coming-soon',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">

      {/* Blurred background content */}
      <BlurredBg />

      {/* Navbar,sits above blur */}
      <Navbar />

      {/* Centred overlay card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[560px] text-center">

          <EyeSlashIcon />

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-widest uppercase mb-5">
            COMING SOON
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-[460px] mx-auto">
            This webpage contains sensitive information that will transform your{' '}
            <span className="text-[#2DD4BF] font-semibold">customer support</span>{' '}
            experience
          </p>

          {/* Email signup */}
          {submitted ? (
            <div className="flex items-center justify-center gap-2 py-4 px-6 bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 rounded-2xl max-w-[440px] mx-auto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L20 7" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-sm text-[#2DD4BF] font-semibold">
                You're on the list! We'll notify you at <strong>{form.email}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-[440px] mx-auto space-y-3">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  required
                  className="w-full px-5 py-3.5 text-lg bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/15 transition-all placeholder-gray-400 text-gray-800 shadow-sm disabled:opacity-50"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={form.company}
                  onChange={set('company')}
                  placeholder="Company name (optional)"
                  disabled={isLoading}
                  className="w-full px-5 py-3.5 text-lg bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/15 transition-all placeholder-gray-400 text-gray-800 shadow-sm disabled:opacity-50"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full px-7 py-3.5 bg-[#2DD4BF] hover:bg-[#26b8a6] disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-medium rounded-2xl transition-all active:scale-[0.98] shadow-md shadow-[#2DD4BF]/20">
                {isLoading ? 'Submitting...' : 'Stay Tuned'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}