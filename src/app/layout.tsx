import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from './providers/WalletProvider'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'

export const metadata: Metadata = {
  title: 'SolSpace AI',
  description: 'Exploring the intersection of AI and art',
  icons: {
    icon: [
      {
        url: '/solversefavicon.png',
        href: '/solversefavicon.png',
      }
    ],
    shortcut: '/solversefavicon.png',
    apple: '/solversefavicon.png',
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
        <link rel="icon" type="image/png" href="/solversefavicon.png" />
        <link rel="apple-touch-icon" href="/solversefavicon.png" />
        <link rel="shortcut icon" type="image/png" href="/solversefavicon.png" />
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