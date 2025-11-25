import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'VideoGrabber - Universal Video Downloader',
  description: 'Download videos from YouTube, Reddit, Twitter, Vimeo, and 1000+ sites. GPU acceleration, queue management, and beautiful UI. Free and open-source.',
  keywords: 'video downloader, youtube downloader, reddit downloader, twitter downloader, 4k downloader, free video downloader',
  icons: {
    icon: '/VG.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
