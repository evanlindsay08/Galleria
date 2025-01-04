import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from './providers/WalletProvider'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'

export const metadata: Metadata = {
  title: 'Artspace',
  description: 'Exploring the intersection of AI and art',
  icons: {
    icon: [
      {
        url: '/Artspacefavicon.png',
        href: '/Artspacefavicon.png',
      }
    ],
    shortcut: '/Artspacefavicon.png',
    apple: '/Artspacefavicon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/Artspacefavicon.png" />
        <link rel="apple-touch-icon" href="/Artspacefavicon.png" />
        <link rel="shortcut icon" type="image/png" href="/Artspacefavicon.png" />
      </head>
      <body>
        <WalletProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </WalletProvider>
      </body>
    </html>
  )
} 