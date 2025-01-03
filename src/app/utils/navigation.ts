import { PublicKey } from '@solana/web3.js'

export const navigateToUserGallery = (publicKey: PublicKey | null) => {
  if (!publicKey) return '/gallery/public'
  return `/gallery/${publicKey.toBase58()}`
} 