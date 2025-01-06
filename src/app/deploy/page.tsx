'use client'

export default function DeployPage() {
  return (
    <main className="min-h-screen px-12 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Deploy SolSpace AI Agent</h1>

        <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                      shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all relative overflow-hidden">
          
          {/* Blurred preview content */}
          <div className="filter blur-md pointer-events-none opacity-40">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  Identity
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">AI AGENT NAME</label>
                    <input type="text" className="w-full p-3 rounded-xl border-2 border-black/10" placeholder="Agent name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">TICKER NAME</label>
                    <input type="text" className="w-full p-3 rounded-xl border-2 border-black/10" placeholder="Ticker name" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">AI AGENT AGE</label>
                  <input type="number" className="w-full p-3 rounded-xl border-2 border-black/10" placeholder="Age" />
                  <p className="text-sm text-gray-500 mt-1">This is your AI Agent's age. Minimum age is 18.</p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">AI AGENT IMAGE</label>
                  <div className="border-2 border-dashed border-black/10 rounded-xl p-8 text-center">
                    <p className="text-gray-500">Upload an image that represents your AI Agent</p>
                    <p className="text-sm text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-600">Deploy your own SolSpace AI agent with your artwork</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 