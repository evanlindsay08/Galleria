'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LoadingArtwork from '../../components/LoadingArtwork'
import { toast } from 'react-hot-toast'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'
import { navigateToUserGallery } from '../../utils/navigation'
import SocialLinks from '../../components/SocialLinks'

interface Artwork {
  id: string
  prompt: string
  imageUrl: string
  createdAt: string
  shares: number
  likeCount: number
  isLikedByUser?: boolean
  user: {
    walletAddress: string
  }
  socialLinks?: {
    twitter?: string
    telegram?: string
    website?: string
    pumpFun?: string
  } | null
}

export default function PublicGalleryPage() {
  const { publicKey } = useWallet()
  const router = useRouter()
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchPublicArtworks()
  }, [publicKey])

  const fetchPublicArtworks = async () => {
    try {
      setLoading(true)
      setError('')
      
      const url = new URL('/api/artwork/public', window.location.origin)
      if (publicKey) {
        url.searchParams.set('viewer', publicKey.toBase58())
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Public artworks response:', data)
      
      if (data.success) {
        setArtworks(data.artworks || [])
        // Initialize liked artworks from the response
        const initialLikedArtworks = new Set(
          data.artworks
            .filter(art => art.isLikedByUser)
            .map(art => art.id)
        )
        setLikedArtworks(initialLikedArtworks)
      } else {
        throw new Error(data.error || 'Failed to fetch artworks')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch artworks'
      console.error('Failed to fetch artworks:', error)
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (artworkId: string) => {
    if (!publicKey) {
      toast.error('Please connect your wallet to like artworks')
      return
    }

    try {
      const response = await fetch(`/api/artwork/like/${artworkId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58()
        })
      })

      const data = await response.json()
      if (data.success) {
        setArtworks(artworks.map(art => 
          art.id === artworkId 
            ? { ...art, likeCount: data.likeCount } 
            : art
        ))
        
        if (data.liked) {
          setLikedArtworks(new Set([...likedArtworks, artworkId]))
          toast.success('Artwork liked!')
        } else {
          const newLikedArtworks = new Set(likedArtworks)
          newLikedArtworks.delete(artworkId)
          setLikedArtworks(newLikedArtworks)
          toast.success('Like removed!')
        }
      }
    } catch (error) {
      toast.error('Failed to toggle like')
    }
  }

  const handleViewMyGallery = () => {
    if (!publicKey) {
      toast.error('Please connect your wallet first')
      return
    }
    router.push(navigateToUserGallery(publicKey))
  }

  return (
    <div className="min-h-screen p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Public Gallery</h1>
          <button 
            onClick={handleViewMyGallery}
            className="social-button"
          >
            View My Gallery
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingArtwork key={i} />
            ))}
          </div>
        ) : artworks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No public artworks yet</p>
            <Link href="/create" className="social-button inline-flex justify-center">
              Create First Artwork
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <div 
                key={artwork.id}
                className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                          shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all hover:translate-y-[-2px]"
              >
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.prompt}
                  className="w-full aspect-square object-cover rounded-xl mb-4"
                />
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{artwork.prompt}</p>
                    <Link 
                      href={`/gallery/${artwork.user.walletAddress}`}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      by {artwork.user.walletAddress.slice(0, 4)}...{artwork.user.walletAddress.slice(-4)}
                    </Link>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm">
                      <button 
                        onClick={() => handleLike(artwork.id)}
                        className={`hover:scale-110 transition-transform flex items-center gap-1 ${
                          likedArtworks.has(artwork.id) ? 'text-red-500' : ''
                        }`}
                      >
                        {likedArtworks.has(artwork.id) ? '❤️' : '🤍'} {artwork.likeCount}
                      </button>
                    </div>
                  </div>

                  <SocialLinks links={artwork.socialLinks} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 