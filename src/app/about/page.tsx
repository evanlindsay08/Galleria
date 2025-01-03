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
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Galleria represents the convergence of artificial intelligence and creative expression. 
              Our platform empowers creators to explore the boundless possibilities of AI-generated artwork 
              while maintaining complete ownership of their creations through blockchain technology. 
              Whether you're an established artist or just beginning your creative journey, Galleria 
              provides the tools and platform to bring your artistic vision to life.
            </p>
          </section>

          {/* Core Features */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Core Features</h2>
            <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                          shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">AI Art Generation</h3>
                  <p className="text-gray-600">
                    At the heart of Galleria is our advanced AI art generation system. Using 
                    state-of-the-art diffusion models, users can transform text descriptions into 
                    stunning visual artwork. Our AI understands complex artistic concepts, styles, 
                    and compositions, allowing for precise control over the creative process. Each 
                    generation is unique, ensuring your artwork stands out in the digital landscape.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">Personal Galleries</h3>
                  <p className="text-gray-600">
                    Your Galleria profile is more than just a collection - it's your digital art studio. 
                    Each gallery is uniquely tied to your wallet address, providing a secure and 
                    personalized space to showcase your creations. Features include customizable 
                    display options, artwork management tools, and integrated social sharing 
                    capabilities. Your gallery grows with you, documenting your artistic journey 
                    on the blockchain.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">Social Integration</h3>
                  <p className="text-gray-600">
                    Art thrives in community, which is why we've built comprehensive social features 
                    into Galleria. Connect your creations to Twitter, Instagram, and pump.fun to share 
                    your work across platforms. Engage with fellow artists, build your following, and 
                    participate in the growing AI art community. Our integrated social tools make it 
                    seamless to share your creative process and final pieces with the world.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Technology</h2>
            <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                          shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">AI Architecture</h3>
                  <p className="text-gray-600">
                    Our AI system is built on cutting-edge diffusion models, optimized for both 
                    quality and performance. The architecture includes advanced prompt processing 
                    that understands artistic context and style references. We've implemented 
                    custom optimizations to ensure rapid generation times without compromising 
                    on image quality or artistic integrity. The system continuously learns and 
                    adapts, improving its understanding of artistic styles and techniques.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">Blockchain Integration</h3>
                  <p className="text-gray-600">
                    Galleria leverages Solana's high-performance blockchain to provide a seamless 
                    and cost-effective experience. Our smart contract architecture ensures secure 
                    ownership attribution while maintaining minimal transaction costs. The platform's 
                    integration with Solana wallets provides a frictionless experience for users 
                    while ensuring robust security for all platform interactions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Future Development */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Future Development: AI Agents</h2>
            <div className="bg-white rounded-[24px] p-6 border-[3px] border-black 
                          shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <p className="text-gray-600 mb-4">
                The future of Galleria lies in the development of sophisticated AI agents that will 
                revolutionize how creators interact with the platform. These autonomous digital 
                entities will serve as creative assistants, curators, and collaborators:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li>
                  <strong>Style Analysis and Learning:</strong> Agents will study your artistic 
                  preferences and help develop your unique style
                </li>
                <li>
                  <strong>Prompt Enhancement:</strong> Intelligent assistance in crafting and 
                  refining prompts for optimal results
                </li>
                <li>
                  <strong>Gallery Curation:</strong> Smart organization and presentation of 
                  your artwork portfolio
                </li>
                <li>
                  <strong>Creative Collaboration:</strong> AI-facilitated partnerships between 
                  artists with complementary styles
                </li>
                <li>
                  <strong>Personalized Collections:</strong> Automated curation of themed 
                  collections based on artistic preferences
                </li>
              </ul>
            </div>
          </section>

          {/* Vision */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Galleria envisions a future where AI amplifies human creativity rather than 
              replacing it. We're building more than just a platform - we're creating an 
              ecosystem where artists can push the boundaries of their creativity, supported 
              by cutting-edge AI technology and blockchain innovation. Our commitment is to 
              maintain the balance between technological advancement and artistic authenticity, 
              ensuring that Galleria remains a space where creativity flourishes and artists 
              thrive.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
} 