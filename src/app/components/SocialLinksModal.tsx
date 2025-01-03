'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

interface SocialLinksModalProps {
  artwork: {
    id: string
    socialLinks?: {
      twitter?: string
      telegram?: string
      website?: string
      pumpFun?: string
    } | null
  }
  onClose: () => void
  onSave: (links: {
    twitter?: string
    telegram?: string
    website?: string
    pumpFun?: string
  }) => void
}

export default function SocialLinksModal({ artwork, onClose, onSave }: SocialLinksModalProps) {
  const [links, setLinks] = useState({
    twitter: artwork.socialLinks?.twitter || '',
    telegram: artwork.socialLinks?.telegram || '',
    website: artwork.socialLinks?.website || '',
    pumpFun: artwork.socialLinks?.pumpFun || ''
  })

  const validateUrl = (url: string, type: 'twitter' | 'telegram' | 'website' | 'pumpFun') => {
    if (!url) return url
    try {
      const parsed = new URL(url)
      
      // Add https:// if missing
      if (!url.startsWith('http')) {
        url = `https://${url}`
      }

      // Validate specific URLs
      switch (type) {
        case 'twitter':
          if (!['twitter.com', 'x.com'].includes(parsed.hostname)) {
            toast.error('Please enter a valid Twitter/X URL')
            return ''
          }
          break
        case 'telegram':
          if (!parsed.hostname.includes('t.me')) {
            toast.error('Please enter a valid Telegram URL')
            return ''
          }
          break
        case 'pumpFun':
          if (!parsed.hostname.includes('pump.fun')) {
            toast.error('Please enter a valid Pump.fun URL')
            return ''
          }
          break
      }
      
      return url
    } catch {
      return url
    }
  }

  const handleSave = () => {
    const validatedLinks = {
      twitter: validateUrl(links.twitter, 'twitter'),
      telegram: validateUrl(links.telegram, 'telegram'),
      website: validateUrl(links.website, 'website'),
      pumpFun: validateUrl(links.pumpFun, 'pumpFun')
    }

    // Only save if all URLs are valid
    if (Object.values(validatedLinks).every(url => !url || url.startsWith('http'))) {
      onSave(validatedLinks)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[24px] p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Add Social Links</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">X/Twitter URL</label>
            <input
              type="url"
              value={links.twitter}
              onChange={(e) => setLinks({ ...links, twitter: e.target.value })}
              className="w-full p-2 rounded-xl border-2 border-black/10"
              placeholder="https://x.com/... or https://twitter.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Telegram</label>
            <input
              type="url"
              value={links.telegram}
              onChange={(e) => setLinks({ ...links, telegram: e.target.value })}
              className="w-full p-2 rounded-xl border-2 border-black/10"
              placeholder="https://t.me/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Website</label>
            <input
              type="url"
              value={links.website}
              onChange={(e) => setLinks({ ...links, website: e.target.value })}
              className="w-full p-2 rounded-xl border-2 border-black/10"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <Image 
                  src="/pfnobg.png" 
                  alt="Pump.fun" 
                  width={16} 
                  height={16}
                  className="w-4 h-4"
                />
                Pump.fun
              </div>
            </label>
            <input 
              type="text"
              value={links.pumpFun || ''}
              onChange={(e) => setLinks({ ...links, pumpFun: e.target.value })}
              placeholder="Your pump.fun profile URL"
              className="w-full p-3 rounded-xl border-2 border-black/10 
                        focus:border-black/20 focus:ring-0 transition-colors text-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="social-button flex-1"
          >
            Save Links
          </button>
          <button
            onClick={onClose}
            className="social-button flex-1 bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
} 