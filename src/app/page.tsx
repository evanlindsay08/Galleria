import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50">
      <nav className="fixed w-full p-6 flex justify-between items-center">
        <div className="text-xl font-semibold">
          {/* Replace with your project name */}
          AI Art Project™
        </div>
        <div className="space-x-8">
          <Link href="/about" className="hover:text-gray-600">ABOUT</Link>
          <Link href="/gallery" className="hover:text-gray-600">GALLERY</Link>
          <Link href="/whitepaper" className="hover:text-gray-600">WHITEPAPER</Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-32">
        <div className="max-w-3xl">
          <h1 className="text-7xl font-light leading-tight mb-12">
            Exploring the future of artificial creativity.
          </h1>

          <div className="space-x-4">
            <Link 
              href="/gallery"
              className="inline-flex items-center px-6 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors"
            >
              View Gallery
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center px-6 py-3 border-2 border-transparent hover:border-black rounded-full transition-colors"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-16 flex space-x-4">
            <a href="#" className="inline-flex items-center px-4 py-2 border rounded-full hover:bg-gray-50">
              <span>Twitter</span>
            </a>
            <a href="#" className="inline-flex items-center px-4 py-2 border rounded-full hover:bg-gray-50">
              <span>Instagram</span>
            </a>
            <a href="#" className="inline-flex items-center px-4 py-2 border rounded-full hover:bg-gray-50">
              <span>Discord</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 