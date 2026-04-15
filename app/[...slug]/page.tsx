'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CatchAllPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to coming soon page
    router.push('/founding/coming-soon')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Redirecting...</p>
    </div>
  )
}
