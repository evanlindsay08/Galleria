'use client'

interface DeleteConfirmationModalProps {
  onConfirm: () => void
  onCancel: () => void
  artworkPrompt: string
}

export default function DeleteConfirmationModal({ 
  onConfirm, 
  onCancel,
  artworkPrompt
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                    shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Delete Artwork?</h2>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-2">Are you sure you want to delete this artwork?</p>
          <div className="bg-gray-50 p-3 rounded-xl border-2 border-black/10">
            <p className="text-sm text-gray-500 line-clamp-2">{artworkPrompt}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="social-button flex-1 justify-center bg-red-50 text-red-600 border-red-600 
                     hover:bg-red-100"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="social-button flex-1 justify-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
} 