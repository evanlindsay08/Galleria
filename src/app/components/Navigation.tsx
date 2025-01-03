'use client'

import Link from 'next/link'
import { useWallet } from '@solana/wallet-adapter-react'
import { navigateToUserGallery } from '../utils/navigation'

export default function Navigation() {
  const { publicKey } = useWallet()

  return (
    <nav className="flex items-center gap-4">
      <Link href="/create">
        Create
      </Link>
      <Link href="/gallery/public">
        Public Gallery
      </Link>
      {publicKey && (
        <Link href={navigateToUserGallery(publicKey)}>
          My Gallery
        </Link>
      )}
    </nav>
  )
} 