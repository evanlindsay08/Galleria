'use client'

import Link from 'next/link'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { publicKey } = useWallet()
  const router = useRouter()

  const handleCreate = () => {
    if (!publicKey) {
      toast.error('Please connect your wallet first')
      return
    }
    router.push('/create')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl font-bold mb-6">
              Welcome to Galleria
            </h1>
            <p className="text-xl text-gray-600">
              Exploring the future of artificial creativity.
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleCreate}
              className="social-button"
            >
              Create
            </button>
            <Link 
              href="/gallery/public" 
              className="social-button"
            >
              Browse Creations
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 
