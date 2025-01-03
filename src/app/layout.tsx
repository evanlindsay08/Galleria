import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from './providers/WalletProvider'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'

export const metadata: Metadata = {
  title: 'Galleria',
  description: 'Exploring the intersection of AI and art',
  icons: {
    icon: [
      {
        url: '/Favicon.png',
        href: '/Favicon.png',
      }
    ],
    shortcut: '/Favicon.png',
    apple: '/Favicon.png',
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
        <link rel="icon" type="image/png" href="/Favicon.png" />
        <link rel="apple-touch-icon" href="/Favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/Favicon.png" />
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