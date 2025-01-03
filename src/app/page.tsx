'use client'

import Header from './components/Header'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
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

  const handleCopyCA = () => {
    navigator.clipboard.writeText('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    toast.success('Contract address copied to clipboard!')
  }

  return (
    <main className="min-h-screen px-12 relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <Header />
        
        <div className="grid md:grid-cols-[1.3fr,1fr] gap-24 mt-20">
          <div>
            <h1 className="text-[90px] font-normal leading-[1.1] mb-8 tracking-[-0.02em]">
              Welcome to Galleria
            </h1>
            <p className="text-2xl text-gray-600 mb-16">
              Exploring the future of artificial creativity.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={handleCreate}
                className="social-button"
              >
                Create
              </button>
              <button 
                onClick={() => router.push('/gallery/public')}
                className="social-button"
              >
                Browse Creations
              </button>
            </div>

            <div className="flex gap-3 mt-8">
              <a 
                href="https://x.com/AI_Galleria" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-button"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
                </svg>
                Twitter
              </a>
              <a 
                href="https://pump.fun/board" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-button"
              >
                <Image 
                  src="/pfnobg.png" 
                  alt="Pump.fun" 
                  width={16} 
                  height={16}
                  className="w-4 h-4"
                />
                Pump.fun
              </a>
            </div>
          </div>
        </div>

        {/* Contract Info Box */}
        <div className="mt-16 mb-16">
          <div className="bg-white rounded-[24px] p-4 border-[3px] border-black 
                        shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-fit mx-auto
                        flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">CA:</span>
              <button 
                onClick={handleCopyCA}
                className="text-black hover:text-gray-600 transition-colors font-mono flex items-center gap-2"
              >
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 16h8M8 12h8m-8-4h8m4 0v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2z" 
                  />
                </svg>
              </button>
            </div>

            <div className="h-6 w-px bg-black/10"></div>

            <div className="flex items-center gap-2">
              <span className="text-gray-600">Ticker:</span>
              <span className="font-medium">GALLERIA</span>
            </div>

            <div className="h-6 w-px bg-black/10"></div>

            <div className="flex items-center gap-2">
              <span className="text-gray-600">Dev Supply:</span>
              <span className="font-medium">5%</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 
