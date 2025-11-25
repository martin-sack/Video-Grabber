'use client'

import { motion } from 'framer-motion'
import { Download, Zap, Shield, Video, List, Cpu } from 'lucide-react'

const GITHUB_REPO = 'https://github.com/martin-sack/Video-Grabber'
const RELEASES_URL = `${GITHUB_REPO}/releases/latest`

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-fuchsia-900/20" />
        
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6">
              The Universal
              <br />
              <span className="gradient-text">Video Downloader</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Save video and audio from anywhere. YouTube, Vimeo, Twitter, and 1000+ sites.
              <br />
              No ads, no tracking, completely free.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <a
                href="https://github.com/martin-sack/Video-Grabber/releases/latest/download/VideoGrabber-Setup.exe"
                className="group flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
              >
                <Download className="h-5 w-5" />
                Download for Windows
              </a>
              
              <a
                href="https://github.com/martin-sack/Video-Grabber/releases/latest/download/VideoGrabber-mac-universal.dmg"
                className="group flex items-center gap-2 rounded-lg glass px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all hover:scale-105"
              >
                <Download className="h-5 w-5" />
                Download for macOS
              </a>
              
              <a
                href="https://github.com/martin-sack/Video-Grabber/releases/latest/download/VideoGrabber.AppImage"
                className="group flex items-center gap-2 rounded-lg glass px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all hover:scale-105"
              >
                <Download className="h-5 w-5" />
                Download for Linux
              </a>
            </div>

            {/* Screenshot */}
            <motion.div
              className="mt-16 glass rounded-2xl p-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <img 
                src="/screenshot.png" 
                alt="VideoGrabber Interface" 
                className="rounded-xl shadow-2xl w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-400">
              Everything you need to download videos like a pro
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Video,
                title: 'Offline Viewing',
                description: 'Save videos for offline access. Perfect for travel, commutes, or areas with poor connectivity.'
              },
              {
                icon: Shield,
                title: 'Archiving',
                description: 'Preserve important content before it disappears. Keep your favorite videos forever.'
              },
              {
                icon: List,
                title: 'Education & Research',
                description: 'Download educational content, lectures, and tutorials for study and reference.'
              },
              {
                icon: Zap,
                title: 'GPU Acceleration',
                description: 'Process videos 2-6x faster with hardware-accelerated encoding.'
              },
              {
                icon: Cpu,
                title: 'Cross-Platform',
                description: 'Works seamlessly on Windows, macOS, and Linux with native performance.'
              },
              {
                icon: Download,
                title: '1000+ Sites',
                description: 'Download from YouTube, Vimeo, Twitter, Facebook, Reddit, Dailymotion, and more.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-400">
              Three simple steps to download any video
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Paste Link',
                description: 'Copy any video URL from YouTube, Vimeo, Twitter, Facebook, or 1000+ other sites.'
              },
              {
                step: '02',
                title: 'Select Format',
                description: 'Choose your preferred quality: 4K, 1080p, 720p, or audio-only MP3.'
              },
              {
                step: '03',
                title: 'Done',
                description: 'Click download and watch the magic happen. Your video is ready in seconds.'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-violet-600 text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="glass rounded-3xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Ready to Start Downloading?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Join thousands of creators using VideoGrabber
            </p>
            <a
              href={RELEASES_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
            >
              <Download className="h-6 w-6" />
              Download Now - It's Free
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-400">
              © 2024 VideoGrabber. Open source and free forever.
            </p>
            <a
              href={GITHUB_REPO}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Open Source on GitHub →
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
