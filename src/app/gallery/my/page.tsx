'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-hot-toast'

export default function MyGalleryRedirect() {
  const { publicKey } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (publicKey) {
      router.push(`/gallery/${publicKey.toBase58()}`)
    } else {
      toast.error('Please connect your wallet first')
      router.push('/gallery/public')
    }
  }, [publicKey, router])

  return null // or a loading state
} 