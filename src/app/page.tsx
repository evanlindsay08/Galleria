'use client'

import { toast } from 'react-hot-toast'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LoadingArtwork from './components/LoadingArtwork'

interface Artwork {
  id: string
  prompt: string
  imageUrl: string
  user: {
    walletAddress: string
  }
  likeCount: number
}

export default function Home() {
  const [recentArtworks, setRecentArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentArtworks()
  }, [])

  const fetchRecentArtworks = async () => {
    try {
      const response = await fetch('/api/artwork/public?limit=3')
      const data = await response.json()
      if (data.success) {
        setRecentArtworks(data.artworks)
      }
    } catch (error) {
      console.error('Failed to fetch recent artworks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyCA = () => {
    navigator.clipboard.writeText('8ShgrHgHWViDJ2vfSJX8dH7KAztT3uzwiqW4BzF6pump')
    toast.success('Contract address copied to clipboard!')
  }

  return (
    <main className="min-h-screen relative z-10">
      {/* Contract Info - Fixed at top */}
      <div className="bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-2">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">CA:</span>
              <button 
                onClick={handleCopyCA}
                className="text-black hover:text-gray-600 transition-colors font-mono flex items-center gap-2"
              >
                8ShgrHgHWViDJ2vfSJX8dH7KAztT3uzwiqW4BzF6pump
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 16h8M8 12h8m-8-4h8m4 0v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2z" />
                </svg>
              </button>
            </div>
            <div className="h-4 w-px bg-black/10"></div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Ticker:</span>
              <span className="font-medium">$SSAI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl font-bold mb-6">
            Welcome to SolSpace AI
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Create, share, and explore AI-generated artwork. Connect your wallet to start your creative journey.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/create" 
              className="social-button min-w-[200px] justify-center text-lg py-3">
              Create Artwork
            </Link>
            <Link href="/gallery/public" 
              className="social-button min-w-[200px] justify-center text-lg py-3">
              Browse Gallery
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <a href="https://x.com/SolSpace_AI" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-button"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
              </svg>
              Twitter
            </a>
            <a href="https://pump.fun/coin/8ShgrHgHWViDJ2vfSJX8dH7KAztT3uzwiqW4BzF6pump" 
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
        </motion.div>

        {/* How It Works Section */}
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            How It Works
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Create",
                description: "Connect your wallet and use AI to generate unique artwork from your text descriptions. Each creation is uniquely yours."
              },
              {
                title: "2. Connect",
                description: "Add social links to your artwork and turn them into full projects. Share with your community across platforms."
              },
              {
                title: "3. Launch (Coming Soon)",
                description: "Deploy AI agents for your projects with $SSAI tokens. No coding required."
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.1 
                }}
                className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                          shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Creations Section */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-8"
          >
            <h2 className="text-3xl font-bold">Recent Creations</h2>
            <Link href="/gallery/public" className="social-button">
              View All
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <LoadingArtwork key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {recentArtworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeOut",
                    delay: index * 0.1 
                  }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-[24px] p-4 border-[3px] border-black 
                            shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
                >
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.prompt}
                    className="w-full aspect-square object-cover rounded-xl mb-4"
                  />
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{artwork.prompt}</p>
                  <Link 
                    href={`/gallery/${artwork.user.walletAddress}`}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    by {artwork.user.walletAddress.slice(0, 4)}...{artwork.user.walletAddress.slice(-4)}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 
