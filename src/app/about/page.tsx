'use client'

export default function AboutPage() {
  return (
    <main className="min-h-screen px-12 py-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[32px] p-8 border-[3px] border-black 
                    shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-bold mb-12">About Galleria</h1>

        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">What is Galleria?</h2>
            <p className="text-gray-600 leading-relaxed">
              Galleria is a place where anyone can create amazing artwork using AI. 
              Whether you're an artist or just someone who loves being creative, 
              our platform gives you the tools to turn your ideas into beautiful images. 
              Best of all, everything you create is yours to keep and share.
            </p>
          </section>

          {/* Core Features */}
          <section>
            <h2 className="text-2xl font-bold mb-4">What Can You Do?</h2>
            <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                          shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Create Art with AI</h3>
                  <p className="text-gray-600">
                    Just type in what you want to create, and our AI will help bring your 
                    vision to life. It's like having a digital artist at your fingertips. 
                    Every piece you create is unique to you.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">Your Personal Gallery</h3>
                  <p className="text-gray-600">
                    Think of it as your own digital art studio. Your wallet address gives 
                    you a personal space to show off everything you create. You can organize 
                    your work however you like and share it with others easily.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">Share Your Work</h3>
                  <p className="text-gray-600">
                    Connect with other artists and share your creations on Twitter, 
                    pump.fun, and more. It's easy to build a following and become part 
                    of our growing community of creators.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology */}
          <section>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                          shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Create & Share</h3>
                  <p className="text-gray-600">
                    Start by creating art with our AI - just type what you want to see. 
                    Turn your creations into projects by adding social links to Twitter, 
                    Telegram, or your website. Share your work and connect with other artists 
                    in our community.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">The Blockchain</h3>
                  <p className="text-gray-600">
                    We use Solana because it's fast and cheap to use. Your wallet is your 
                    key to the platform - use it to save art, like others' work, and soon, 
                    to unlock special features with $GALLERIA tokens.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">AI Agents (Coming Soon)</h3>
                  <p className="text-gray-600">
                    $GALLERIA token holders will unlock powerful AI features:
                  </p>
                  <ul className="mt-2 space-y-2 text-gray-600 list-disc pl-6">
                    <li>Personal AI chatbots that learn your style</li>
                    <li>Auto-posting to Twitter and Telegram</li>
                    <li>Discord community integration</li>
                    <li>Video and audio generation</li>
                    <li>Train AI on your own style</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-500">
                    Note: These advanced features will be exclusive to $GALLERIA holders
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Future Plans */}
          <section>
            <h2 className="text-2xl font-bold mb-4">What's Coming Next?</h2>
            <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                          shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <p className="text-gray-600 mb-4">
                We're launching AI agents for $GALLERIA token holders that will unlock:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li>
                  <strong>AI Chatbots:</strong> Personal AI assistants that learn your style 
                  and help you create better art
                </li>
                <li>
                  <strong>Social Integration:</strong> Auto-post your art to Twitter, 
                  Telegram, and Discord
                </li>
                <li>
                  <strong>Advanced Generation:</strong> Create videos and audio to go 
                  with your artwork
                </li>
                <li>
                  <strong>Custom Training:</strong> Train the AI to understand your 
                  unique style
                </li>
                <li>
                  <strong>Smart Collections:</strong> AI-powered organization of your 
                  artwork into themed galleries
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                These features will be exclusive to $GALLERIA token holders - stay tuned 
                for our token launch!
              </p>
            </div>
          </section>

          {/* Vision */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Goal</h2>
            <p className="text-gray-600 leading-relaxed">
              We're building more than just an AI art platform - we're creating the first 
              gallery where anyone can turn their AI creations into full-fledged projects 
              with just a few clicks. Start by making art, add social connections, and soon, 
              deploy your own AI agents that can interact with your community. Whether you're 
              an artist looking to build a following or a creator wanting to launch the next 
              big AI project, Galleria gives you all the tools you need in one place. Our 
              mission is to make launching AI projects as simple as creating art - no coding 
              required, just your creativity and ideas.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
} 