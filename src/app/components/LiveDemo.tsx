export default function LiveDemo() {
  return (
    <div className="live-demo-card">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[17px] font-medium">Live Demo</h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
          <span className="text-[15px] font-medium text-gray-600">AI Active</span>
        </div>
      </div>
      
      <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center border border-black/5">
        <span className="text-gray-500 text-[15px] font-medium">AI Demo Placeholder</span>
      </div>
    </div>
  )
} 