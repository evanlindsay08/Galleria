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
  user: {
    walletAddress: string
  }
  likeCount: number
  isLikedByUser?: boolean
  socialLinks?: {
    twitter?: string
    telegram?: string
    website?: string
    pumpFun?: string
  } | null
}

interface Filters {
  sortBy: 'newest' | 'oldest' | 'mostLiked'
  hasSocialLinks: boolean | 'all'
  timeFrame: 'all' | 'day' | 'week' | 'month'
}

export default function PublicGalleryPage() {
  const { publicKey } = useWallet()
  const router = useRouter()
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<Filters>({
    sortBy: 'newest',
    hasSocialLinks: 'all',
    timeFrame: 'all'
  })

  useEffect(() => {
    fetchPublicArtworks()
  }, [publicKey])

  const fetchPublicArtworks = async () => {
    try {
      setLoading(true)
      setError('')
      
      const url = new URL('/api/artwork/public', window.location.origin)
      if (publicKey) {
        url.searchParams.set('wallet', publicKey.toBase58())
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Public artworks response:', data)
      
      if (data.success) {
        setArtworks(data.artworks)
        const likedIds = data.artworks
          .filter((art: Artwork) => art.isLikedByUser)
          .map((art: Artwork) => art.id)
        setLikedArtworks(new Set<string>(likedIds))
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
      } else {
        throw new Error(data.error || 'Failed to update like')
      }
    } catch (error) {
      console.error('Like error:', error)
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

  const filteredArtworks = artworks
    .filter(artwork => {
      if (filters.hasSocialLinks === 'all') return true
      return filters.hasSocialLinks === Boolean(artwork.socialLinks && Object.keys(artwork.socialLinks).length > 0)
    })
    .filter(artwork => {
      if (filters.timeFrame === 'all') return true
      const date = new Date(artwork.createdAt)
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const days = diff / (1000 * 60 * 60 * 24)
      
      switch (filters.timeFrame) {
        case 'day': return days <= 1
        case 'week': return days <= 7
        case 'month': return days <= 30
        default: return true
      }
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'mostLiked':
          return (b.likeCount || 0) - (a.likeCount || 0)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Public Gallery</h1>
          <button 
            onClick={handleViewMyGallery}
            className="social-button"
          >
            View My Gallery
          </button>
        </div>

        <div className="mb-4 bg-white rounded-[24px] p-4 border-[3px] border-black 
                      shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select 
                className="w-full p-2 rounded-lg border-2 border-black/10"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  sortBy: e.target.value as Filters['sortBy']
                }))}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="mostLiked">Most Liked</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Social Links</label>
              <select 
                className="w-full p-2 rounded-lg border-2 border-black/10"
                value={filters.hasSocialLinks.toString()}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  hasSocialLinks: e.target.value === 'all' ? 'all' : e.target.value === 'true'
                }))}
              >
                <option value="all">All</option>
                <option value="true">Has Social Links</option>
                <option value="false">No Social Links</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time Frame</label>
              <select 
                className="w-full p-2 rounded-lg border-2 border-black/10"
                value={filters.timeFrame}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  timeFrame: e.target.value as Filters['timeFrame']
                }))}
              >
                <option value="all">All Time</option>
                <option value="day">Last 24 Hours</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <LoadingArtwork key={i} />
            ))}
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No public artworks yet</p>
            <Link href="/create" className="social-button inline-flex justify-center">
              Create First Artwork
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArtworks.map((artwork) => (
              <div 
                key={artwork.id}
                className="bg-white rounded-[24px] p-4 border-[3px] border-black 
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
                        {likedArtworks.has(artwork.id) ? '❤️' : '🤍'} 
                        <span className="font-medium">{artwork.likeCount || 0}</span>
                      </button>
                    </div>
                  </div>

                  {artwork.socialLinks && <SocialLinks links={artwork.socialLinks} />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 