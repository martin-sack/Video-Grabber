import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VideoGrabber - The Ultimate Video Downloader for Creators',
  description: 'Download 4K video, audio, and playlists from YouTube, TikTok, and Instagram in one click. Free, open-source, and powerful.',
  keywords: 'video downloader, youtube downloader, tiktok downloader, 4k downloader, free video downloader',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
