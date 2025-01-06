'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useWallet } from '@solana/wallet-adapter-react'
import { navigateToUserGallery } from '../utils/navigation'
import WalletButton from './WalletButton'

export default function Header() {
  const { publicKey } = useWallet()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-black/10 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/solverselogo.png" 
            alt="SolSpace AI Logo" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
          <span className="font-bold text-xl">SolSpace AI</span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link 
            href="/gallery/public" 
            className="text-gray-600 hover:text-black transition-colors"
          >
            Gallery
          </Link>
          
          <Link 
            href={publicKey ? navigateToUserGallery(publicKey) : '/gallery/public'} 
            className="text-gray-600 hover:text-black transition-colors"
          >
            My Gallery
          </Link>

          <Link 
            href="/deploy" 
            className="text-gray-600 hover:text-black transition-colors"
          >
            Deploy
          </Link>

          <Link 
            href="/about" 
            className="text-gray-600 hover:text-black transition-colors"
          >
            About
          </Link>

          <WalletButton />
        </nav>
      </div>
    </header>
  )
} 