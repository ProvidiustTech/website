'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Confetti canvas ────────────────────────────────────────────────────── */
function Confetti() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        // Teal confetti pieces matching the screenshot
        const COLORS = ['#2DD4BF', '#1fb8a4', '#5ee8d8', '#0e9f8e', '#a7f3ec']
        const pieces: {
            x: number; y: number; vx: number; vy: number
            w: number; h: number; rot: number; vr: number; color: string
        }[] = []

        for (let i = 0; i < 80; i++) {
            pieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.6,   // cluster at top
                vx: (Math.random() - 0.5) * 1.2,
                vy: Math.random() * 1.5 + 0.4,
                w: Math.random() * 8 + 4,
                h: Math.random() * 14 + 6,
                rot: Math.random() * Math.PI * 2,
                vr: (Math.random() - 0.5) * 0.08,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            })
        }

        let raf: number
        function draw() {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            pieces.forEach(p => {
                ctx.save()
                ctx.translate(p.x, p.y)
                ctx.rotate(p.rot)
                ctx.fillStyle = p.color
                ctx.globalAlpha = 0.85
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
                ctx.restore()
                p.x += p.vx
                p.y += p.vy
                p.rot += p.vr
                // Reset to top when fallen off screen
                if (p.y > canvas.height + 20) {
                    p.y = -20
                    p.x = Math.random() * canvas.width
                }
                if (p.x < -20) p.x = canvas.width + 20
                if (p.x > canvas.width + 20) p.x = -20
            })
            raf = requestAnimationFrame(draw)
        }
        draw()

        const onResize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        window.addEventListener('resize', onResize)
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl"
        />
    )
}

/* ── Check icon ─────────────────────────────────────────────────────────── */
function CheckCircle() {
    return (
        <div className="relative mx-auto mb-8" style={{ width: 80, height: 80 }}>
            {/* Outer dark ring */}
            <div className="absolute inset-0 rounded-full bg-[#1e1e2e] border-2 border-[#2a2a3a]" />
            {/* Inner lighter circle */}
            <div className="absolute inset-2 rounded-full bg-[#2a2a3c]" />
            {/* Check */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function ApplicationSuccessPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-8">
            <div className="relative w-full max-w-[740px] bg-[#0d0d15] border border-[#1e1e2e] rounded-2xl overflow-hidden">

                {/* Confetti — fills entire card */}
                <Confetti />

                {/* Content — sits above canvas */}
                <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-20 text-center">
                    <CheckCircle />

                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
                        Application Received 🎉
                    </h1>

                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-2">
                        Thanks for applying to the{' '}
                        <strong className="text-white font-bold">Providiustech</strong>{' '}
                        Founding Companies Program.
                    </p>

                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-1 max-w-[520px] mx-auto">
                        We're reviewing your application to understand your customer support workflow and
                        determine how we can best help you automate it.
                    </p>

                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-10 max-w-[520px] mx-auto">
                        We reach out within 24–48 hours, selected companies will be onboarded into our pilot program
                    </p>

                    {/* Book a call */}
                    <p className="text-sm sm:text-base text-gray-400 mb-1">
                        Want to move faster?
                    </p>
                    <p className="text-sm sm:text-base text-gray-400">
                        Skip the wait and{' '}
                        <a
                            href="/founding/meet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2DD4BF] font-semibold underline underline-offset-2 hover:text-[#26b8a6] transition-colors"
                        >
                            book a quick call
                        </a>
                    </p>
                    <Link href="/">
                        <button
                            className="w-full py-3.5 mt-10 bg-[#2DD4BF] hover:bg-[#26b8a6] text-black font-medium rounded-xl text-lg transition-colors">
                            Go Back to Homepage
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    )
}