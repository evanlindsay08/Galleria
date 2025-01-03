'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import Link from 'next/link'

export default function CreateArtCard() {
  return (
    <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                    shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all relative z-10">
      <h2 className="text-xl font-bold mb-4">Create AI Art</h2>
      
      <div className="mb-6">
        <p className="text-gray-600">Connect your wallet to start creating</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border-2 border-black/10">
        <p className="text-gray-600 mb-4">
          Welcome to Galleria, where AI meets artistry. Each artwork is uniquely 
          yours and can be showcased in your personal gallery.
        </p>
        <p className="text-sm text-gray-500">
          Transform your ideas into stunning AI-generated artwork with just a prompt.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <button className="w-full social-button justify-center">
          Create
        </button>
        <button className="w-full social-button justify-center">
          Browse Creations
        </button>
      </div>
    </div>
  )
} 