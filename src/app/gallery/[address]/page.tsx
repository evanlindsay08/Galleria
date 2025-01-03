'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import Link from 'next/link'
import WalletButton from '../../components/WalletButton'
import LoadingArtwork from '../../components/LoadingArtwork'
import SocialLinksModal from '../../components/SocialLinksModal'
import { toast } from 'react-hot-toast'
import SocialLinks from '../../components/SocialLinks'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'

interface Artwork {
  id: string
  prompt: string
  imageUrl: string
  createdAt: string
  likes: number
  shares: number
  socialLinks: {
    twitter?: string
    instagram?: string
    website?: string
    pumpFun?: string
  } | null
  user: {
    walletAddress: string
  }
  likeCount: number
  isLikedByUser?: boolean
}

export default function UserGalleryPage({ params }: { params: { address: string } }) {
  const address = params.address
  const { publicKey } = useWallet()
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [showSocialModal, setShowSocialModal] = useState(false)
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set())
  const [artworkToDelete, setArtworkToDelete] = useState<Artwork | null>(null)

  const isOwner = publicKey?.toBase58() === address

  useEffect(() => {
    fetchUserArtworks()
  }, [address, publicKey])

  const fetchUserArtworks = async () => {
    try {
      const url = new URL(`/api/artwork/user/${address}`, window.location.origin)
      if (publicKey) {
        url.searchParams.set('viewer', publicKey.toBase58())
      }
      
      const response = await fetch(url)
      const data = await response.json()
      console.log('Fetched artworks:', data)
      if (data.success) {
        setArtworks(data.artworks)
        const initialLikedArtworks = new Set(
          data.artworks
            .filter(art => art.isLikedByUser)
            .map(art => art.id)
        )
        setLikedArtworks(initialLikedArtworks)
      }
    } catch (error) {
      console.error('Failed to fetch artworks:', error)
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

  const handleDelete = async (artworkId: string) => {
    try {
      const response = await fetch(`/api/artwork/delete/${artworkId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: publicKey?.toBase58()
        })
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Artwork deleted successfully')
        setArtworks(artworks.filter(art => art.id !== artworkId))
      } else {
        throw new Error(data.error || 'Failed to delete artwork')
      }
    } catch (error) {
      toast.error('Failed to delete artwork')
    } finally {
      setArtworkToDelete(null)
    }
  }

  return (
    <div className="min-h-screen p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {address.slice(0, 4)}...{address.slice(-4)}'s Gallery
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {artworks.length} {artworks.length === 1 ? 'artwork' : 'artworks'}
            </p>
          </div>
          <Link href="/gallery/public" className="social-button">
            View Public Gallery
          </Link>
        </div>

        {/* Rest of your gallery rendering code */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingArtwork key={i} />
            ))}
          </div>
        ) : artworks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No artworks yet</p>
            {isOwner && (
              <Link 
                href="/create" 
                className="social-button inline-flex justify-center"
              >
                Create Your First Artwork
              </Link>
            )}
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
                <div className="flex flex-col gap-4 min-h-[120px] justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{artwork.prompt}</p>
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
                    {isOwner && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedArtwork(artwork)
                            setShowSocialModal(true)
                          }}
                          className="social-button text-sm"
                        >
                          Add Links
                        </button>
                        <button 
                          onClick={() => setArtworkToDelete(artwork)}
                          className="social-button text-sm bg-red-50 text-red-600 border-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <SocialLinks links={artwork.socialLinks} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showSocialModal && selectedArtwork && (
        <SocialLinksModal
          artwork={selectedArtwork}
          onClose={() => setShowSocialModal(false)}
          onSave={async (links) => {
            try {
              const response = await fetch(`/api/artwork/social/${selectedArtwork.id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  ...links,
                  walletAddress: publicKey?.toBase58()
                })
              })

              if (response.ok) {
                toast.success('Social links updated!')
                fetchUserArtworks() // Refresh the gallery
              } else {
                throw new Error('Failed to update social links')
              }
            } catch (error) {
              toast.error('Failed to update social links')
            }
            setShowSocialModal(false)
          }}
        />
      )}

      {artworkToDelete && (
        <DeleteConfirmationModal
          artworkPrompt={artworkToDelete.prompt}
          onConfirm={() => handleDelete(artworkToDelete.id)}
          onCancel={() => setArtworkToDelete(null)}
        />
      )}
    </div>
  )
} 