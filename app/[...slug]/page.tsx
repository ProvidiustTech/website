'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Preloader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f7] to-[#e9e9ee]">
      <div className="text-center">
        {/* Animated spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-500 border-r-teal-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        
        {/* Loading text */}
        <p className="text-gray-600 text-lg font-medium">Loading</p>
        <p className="text-gray-400 text-sm mt-2">Taking you to the best place...</p>
      </div>
    </div>
  )
}

export default function CatchAllPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to coming soon page
    router.push('/founding/coming-soon')
  }, [router])

  return <Preloader />
}
