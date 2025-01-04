'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import WalletButton from '../components/WalletButton'
import { toast } from 'react-hot-toast'

export default function CreatePage() {
  const { publicKey } = useWallet()
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleGenerate = async () => {
    if (!prompt) return
    setIsGenerating(true)
    setError('')
    setIsSaved(false)
    
    try {
      toast.loading('Starting image generation...', { id: 'generation' })
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const data = await response.json()
      
      if (data.success) {
        setPreviewImage(data.imageUrl)
        toast.success('Image generated successfully!', { id: 'generation' })
      } else {
        throw new Error(data.error || 'Failed to generate image')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate image'
      setError(message)
      toast.error(message, { id: 'generation' })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveToGallery = async () => {
    if (!publicKey || !previewImage || isSaved) return
    
    setIsSaving(true)
    try {
      const response = await fetch('/api/artwork/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageUrl: previewImage,
          walletAddress: publicKey.toBase58(),
          isPublic: true
        })
      })

      const data = await response.json()
      if (data.success) {
        setIsSaved(true)
        toast.success('Artwork saved to your gallery!')
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast.error('Failed to save artwork')
    } finally {
      setIsSaving(false)
    }
  }

  const handleRegenerate = () => {
    setIsSaved(false)
    handleGenerate()
  }

  return (
    <main className="min-h-screen px-12 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create Art</h1>

        <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                      shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all relative z-10">
          {!publicKey ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Connect your wallet to start creating with Artspace</p>
              <WalletButton />
            </div>
          ) : (
            <div className="grid grid-cols-[1fr,1.5fr] gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Your Prompt</label>
                  <textarea 
                    className="w-full h-24 p-4 rounded-xl border-2 border-black/10 
                             focus:border-black/20 focus:ring-0 transition-colors text-sm"
                    placeholder="Describe the artwork you want to create..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="social-button w-full justify-center disabled:opacity-50"
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Preview</h3>
                <div className="aspect-square bg-gray-50 rounded-xl border-2 border-black/10
                              flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Generated artwork"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-400">Your artwork will appear here</p>
                  )}
                </div>

                {previewImage && (
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <button 
                        onClick={handleRegenerate}
                        disabled={isGenerating}
                        className="social-button flex-1 justify-center disabled:opacity-50"
                      >
                        {isGenerating ? 'Regenerating...' : 'Regenerate'}
                      </button>
                      <button 
                        onClick={handleSaveToGallery}
                        disabled={isSaving || isSaved}
                        className={`social-button flex-1 justify-center ${
                          isSaved ? 'bg-green-50 text-green-600 border-green-600' : 
                          'disabled:opacity-50'
                        }`}
                      >
                        {isSaving ? 'Saving...' : isSaved ? 'Saved ✓' : 'Save'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 