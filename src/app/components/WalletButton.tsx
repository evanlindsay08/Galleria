'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function WalletButton() {
  const { publicKey } = useWallet()

  return (
    <div className="wallet-button-wrapper">
      <WalletMultiButton>
        {publicKey ? 
          `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : 
          'Connect Wallet'
        }
      </WalletMultiButton>
    </div>
  )
} 