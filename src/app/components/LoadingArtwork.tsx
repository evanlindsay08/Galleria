export default function LoadingArtwork() {
  return (
    <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                    shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-12" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-20" />
      </div>
    </div>
  )
} 