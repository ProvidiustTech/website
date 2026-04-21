'use client'
import { useState, useEffect, useRef } from 'react'



const FEATURES = [
  {
    num: '01',
    title: 'AI trained on your business knowledge',
    desc: 'Uses your documents, FAQs, and past conversations to give accurate, relevant responses every time.',
  },
  {
    num: '02',
    title: 'Instant replies to customer questions',
    desc: 'Handle customer support automatically, 24/7, so your customers never have to wait for answers.',
  },
  {
    num: '03',
    title: 'Smart escalation to human agents',
    desc: 'When something needs a human touch, it smoothly passes the conversation to your team without confusion.',
  },
  {
    num: '04',
    title: 'Multi-channel customer support in one place',
    desc: 'Manage and respond to messages across WhatsApp, web chat, email, and more all from a single system.',
  },
]
 
const DURATION = 10_000 // ms per slide
 
/* ─────────────────────────────────────────────────────────────────────────────
   WaveformIndicator
   Recreates the SVG design in pure React/Tailwind:
   • Active section → full teal, waveform bars grow outward from center
   • Inactive sections → teal at 30% opacity, all bars same short height
   • Dotted connector lines between sections
   • Number label (01–04) rotated 90° beside the wave
───────────────────────────────────────────────────────────────────────────── */
 
/** Bar heights for the waveform,tallest in center, mirrors the SVG exactly */
const BAR_HEIGHTS = [10, 14, 21, 26, 35, 40,  47, 52, 47,  40, 35, 26, 21, 14, 10]
const BAR_COUNT   = BAR_HEIGHTS.length
const BAR_WIDTH   = 2   // px
const BAR_GAP     = 13   // px
const WAVE_WIDTH  = BAR_COUNT * (BAR_WIDTH + BAR_GAP) - BAR_GAP
const BAR_THICKNESS = 3   // px,height of each horizontal bar
const MAX_WIDTH = 59
 
function Waveform({ active }: { active: boolean }) {
  if (!active) return null
  return (
      <div
      className="flex font-light flex-col items-center transition-opacity duration-500"
      style={{
        gap: BAR_GAP,
        width: MAX_WIDTH,
        opacity: active ? 1 : 0.3,
      }}
      aria-hidden
    >
      {BAR_HEIGHTS.map((w, i) => (
        <div
          key={i}
          className="rounded-full bg-teal-500 transition-all duration-500"
          style={{
            height: BAR_THICKNESS,
            // Active → each bar is its designed width (bell curve)
            // Inactive → all bars collapse to the same short width
            width: active ? w : 10,
          }}
        />
      ))}
    </div>
  )
}
 
/** Connector: dotted vertical line between two sections */
function Connector() {
  return (
    <div className="flex flex-col items-center" style={{ width: WAVE_WIDTH }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-full bg-white"
          style={{ width: 1, height: 6, opacity: 0.25, marginBottom: 4 }}
        />
      ))}
    </div>
  )
}
 
/** One full section: number + waveform side by side */
function SectionIndicator({
  num,
  active,
}: {
  num: string
  active: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Number label,rotated, matching the SVG */}
      <span
        className="text-teal-500 text-xl font-bold select-none transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0.35,
          writingMode: 'vertical-lr',
          transform: 'rotate(0deg)',
          letterSpacing: '0.05em',
        }}
      >
        {num}
      </span>
 
      {/* Waveform bars */}
      <Waveform active={active} />
    </div>
  )
}
 
/** The full left-column scroll indicator showing all 4 sections */
function ScrollIndicator({ active }: { active: number }) {
  return (
    <div className="flex flex-col items-start">
      {FEATURES.map((f, i) => (
        <div key={f.num}>
          <SectionIndicator num={f.num} active={active === i} />
          {i < FEATURES.length - 1 && <Connector />}
        </div>
      ))}
    </div>
  )
}
 
/* ─────────────────────────────────────────────────────────────────────────────
   Progress bar,thin teal line that fills over DURATION ms
───────────────────────────────────────────────────────────────────────────── */
function ProgressBar({ key: _k, duration }: { key: number; duration: number }) {
  return (
    <div className="w-full h-0.5 bg-teal-100 rounded-full overflow-hidden mt-4">
      <div
        className="h-full bg-teal-500 rounded-full"
        style={{ animation: `fillBar ${duration}ms linear forwards` }}
      />
    </div>
  )
}


export default function AutomateSection() {


  const [active, setActive]     = useState(0)
  const [tick, setTick]         = useState(0) // used to re-trigger the progress bar
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
 
  /* Auto-advance */
  function startInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % FEATURES.length
        setTick(t => t + 1)
        return next
      })
    }, DURATION)
  }
 
  useEffect(() => {
    startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  function goTo(i: number) {
    setActive(i)
    setTick(t => t + 1)
    startInterval() // reset timer on manual click
  }
 
  const f = FEATURES[active]
 
  


  return (
    <section className="bg-[#f5f5f7] py-16 px-4 md:px-8 xl:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
 
        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row items-center justify-center xl:items-start xl:justify-between gap-6 mb-14">
          <h2 className="text-3xl text-center xl:text-start md:text-4xl font-semibold text-[#1a1a2e] max-w-2xl leading-tight">
            Automate customer Care without losing quality
          </h2>
          <div className="flex items-center justify-center ml-[13%] gap-2 bg-white mt-[-170px] xl:mt-0 rounded-full px-5 py-3 shadow-sm self-start xl:self-auto">
            <img src="/thunderbolt.png" className="w-8" alt="" />
            <span className="text-gray-600 text-sm font-medium">
              Smarter support, without the overhead.
            </span>
          </div>
        </div>
 
        {/* ── DESKTOP layout ── */}
        {/*
          Left column:
            - ScrollIndicator (all 4 waveform sections visible, active one lit up)
            - Feature text with animated progress bar underneath
 
          Right column:
            - Your existing chat gif / mockup (unchanged)
        */}
        <div className="hidden md:flex gap-10 xl:gap-16 items-start">
 
          {/* Left */}
          <div className="flex gap-6 md:w-1/2">
            <div className="flex-shrink-0 mt-1 ml-[-160px]">
              <ScrollIndicator active={active} />
            </div>
 
            {/* Scroll indicator column */}
 
            {/* Feature text */}
            <div className="flex flex-col justify-start pt-1 ml-[-75px]">
              {/* Clickable section dots / labels (invisible,waveform handles visual) */}
              {FEATURES.map((feat, i) => (
                <button
                  key={feat.num}
                  onClick={() => goTo(i)}
                  className={`text-left mb-0 transition-all duration-500 ${
                    active === i ? 'opacity-100' : 'opacity-0 pointer-events-none h-0 overflow-hidden'
                  }`}
                  aria-label={`Feature ${feat.num}`}
                >
                  {active === i && (
                    <div>
                      <h3 className="text-xl xl:text-2xl font-bold text-[#1a1a2e] mb-3 leading-snug">
                        {feat.title}
                      </h3>
                      <p className="text-gray-600 text-sm xl:text-lg xl:w-80 leading-relaxed">
                        {feat.desc}
                      </p>
                      {/* Progress bar,re-mounts on each slide change */}
                      {/* <ProgressBar key={tick} duration={DURATION} /> */}
                    </div>
                  )}
                </button>
              ))}
 
              {/* Dot indicators below text */}
              {/* <div className="flex items-center gap-2 mt-6">
                {FEATURES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      active === i
                        ? 'w-5 h-1.5 bg-teal-500'
                        : 'w-1.5 h-1.5 bg-teal-200 hover:bg-teal-300'
                    }`}
                  />
                ))}
              </div> */}
            </div>
          </div>
 
          {/* Right: your chat gif,unchanged */}
          <div className="md:w-1/2 w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-sm mx-auto md:mx-0 md:ml-auto">
              <img className="w-[full]" src="liveconversation.gif" alt="Live conversation demo" />
            </div>
          </div>
        </div>
 
        {/* ── MOBILE layout ── */}
        {/*
          Stacks vertically.
          Each feature shows:
            - Waveform + number (active = full teal, others = faded)
            - Title + description (only active shown in full)
            - Chat gif below the active item only
          Dot indicators at the bottom.
        */}
        <div className="md:hidden space-y-0 relative h-[500px]">
          {FEATURES.map((feat, i) => {
            const isActive = active === i
            return (
              <button
                key={feat.num}
                onClick={() => goTo(i)}
                className="w-full text-left absolute inset-0"
              >
                {/* Waveform row */}
                <div className="hidden items-center gap-3 py-2">
                  <span
                    className="text-teal-500 text-xl font-bold select-none transition-opacity duration-500 flex-shrink-0"
                    style={{
                      opacity: isActive ? 1 : 0.35,
                      writingMode: 'vertical-lr',
                      transform: 'rotate(0deg)',
                    }}
                  >
                    {feat.num}
                  </span>
                  <Waveform active={isActive} />
                </div>
 
                {/* Text,only visible for active item */}
                <div
                  className={`overflow-hidden p-2 mt-12 transition-all duration-500 ${
                    isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <h3 className="text-lg font-bold text-[#1a1a2e] mb-2 mt-1 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {feat.desc}
                  </p>
                  {/* Chat gif */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-2">
                    <img className="w-full" src="liveconversation.gif" alt="Live conversation demo" />
                  </div>
                  {/* Progress bar */}
                  {/* <ProgressBar key={tick} duration={DURATION} /> */}
                </div>
 
                {/* Connector dots between items */}
                {i < FEATURES.length - 1 && (
                  <div className="flex flex-col items-start pl-7 py-1">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="w-0.5 h-1.5 hidden bg-teal-300 rounded-full mb-1 opacity-40" />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
 
          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 relative top-[515px] pt-6">
            {FEATURES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  active === i
                    ? 'w-5 h-1.5 bg-teal-500'
                    : 'w-1.5 h-1.5 bg-teal-200 hover:bg-teal-300'
                }`}
              />
            ))}
          </div>
        </div>
 
      </div>
 
      {/* ── Keyframe CSS ── */}
      <style>{`
        @keyframes fillBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
