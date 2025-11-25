# 🎬 VideoGrabber

A powerful, professional-grade cross-platform video downloader built with Electron and yt-dlp. Download videos from 1000+ websites including TikTok, Instagram, YouTube, Facebook, Reddit, Twitter, and more!

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/martin-sack/Video-Grabber/releases)
[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey.svg)](https://github.com/martin-sack/Video-Grabber)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Downloads](https://img.shields.io/github/downloads/martin-sack/Video-Grabber/total.svg)](https://github.com/martin-sack/Video-Grabber/releases)
[![Stars](https://img.shields.io/github/stars/martin-sack/Video-Grabber.svg)](https://github.com/martin-sack/Video-Grabber/stargazers)

## 🌟 Why VideoGrabber?

- **🎯 No Watermarks** - Download TikTok videos without watermarks
- **⚡ Queue + GPU Acceleration** - Batch downloads with hardware-accelerated processing (2-6x faster)
- **📦 Bundled Binaries** - Works offline, no external dependencies needed
- **🎨 Beginner-Friendly** - Beautiful UI on top of powerful yt-dlp technology
- **🆓 100% Free** - Open source, no ads, no premium tiers, no limits

## ✨ Features

### Core Features
- 🌐 **Universal Support** - Download from 1000+ websites
- 🎯 **Smart Quality Detection** - Automatically selects best quality (1080p, 4K, etc.)
- 🎵 **Audio Extraction** - Download audio-only as MP3
- 📋 **Clipboard Integration** - Auto-detect URLs from clipboard
- 📊 **Real-time Progress** - Live download progress with speed and ETA
- 🎬 **Video Preview** - See thumbnail and metadata before downloading
- 📁 **Custom Save Location** - Choose where to save your downloads

### Advanced Features
- ⚡ **Download Queue** - Batch download multiple videos sequentially
- 🎮 **GPU Acceleration** - Hardware-accelerated video processing (2-6x faster)
- 📊 **Format Selection** - MP4, 4K, 1080p, 720p, MP3
- ⏸️ **Pause/Resume** - Control your downloads
- 🗑️ **File Management** - Delete files, show in folder, manage history
- 💾 **Persistent History** - Never lose track of your downloads
- 🎨 **Modern UI** - Beautiful gradient interface with smooth animations

### Supported Platforms
- ✅ TikTok (videos, no watermark)
- ✅ Instagram (posts, reels, stories, IGTV)
- ✅ YouTube (videos, shorts, live streams, playlists)
- ✅ Facebook (videos, watch)
- ✅ Twitter/X (videos, GIFs)
- ✅ Reddit (videos, v.redd.it)
- ✅ Vimeo
- ✅ Dailymotion
- ✅ Twitch (VODs, clips)
- ✅ And 1000+ more sites!

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/martin-sack/Video-Grabber.git
cd Video-Grabber

# Install dependencies
npm install

# Download yt-dlp binaries
./setup-binaries.sh  # macOS/Linux
# or
setup-binaries.bat   # Windows

# Run the app
npm start
```

### Build Desktop App

```bash
# Build for macOS
npm run build:mac

# Build for Windows
npm run build:win

# Build for both
npm run build
```

The built app will be in the `dist/` folder.

## 📖 Usage

### Basic Download
1. Copy any video URL
2. Paste into VideoGrabber (auto-detects from clipboard)
3. Select format (MP4, 4K, 1080p, 720p, MP3)
4. Click Download
5. Find your video in `~/VideoGrabberDownloads`

### Batch Download
1. Paste URL 1 → Click Download
2. Paste URL 2 → Click Download
3. Paste URL 3 → Click Download
4. All videos download sequentially in the queue

### GPU-Accelerated 4K
1. Select "4K (2160p+)" from format dropdown
2. Ensure "GPU Acceleration" is checked
3. Paste URL and download
4. Enjoy 2-6x faster processing!

## 🎮 GPU Acceleration

GPU acceleration speeds up video **processing** (not downloading) by 2-6x:

- **macOS**: Uses VideoToolbox (M1/M2/M3 or Intel)
- **Windows (NVIDIA)**: Uses NVENC
- **Windows (AMD)**: Uses AMF

**Performance Example:**
- 4K video processing: 3 minutes → 30 seconds
- CPU usage: 100% → 20-30%
- Overall download: 31% faster

See [GPU_ACCELERATION_EXPLAINED.md](GPU_ACCELERATION_EXPLAINED.md) for details.

## 📂 Project Structure

```
videograbber/
├── main.js                 # Electron main process
├── preload.js              # IPC security bridge
├── renderer.js             # Frontend logic
├── queue.js                # Download queue manager
├── getYtDlpExecutable.js   # Binary path resolver
├── index.html              # UI markup
├── styles.css              # Modern styling
├── resources/
│   └── bin/
│       ├── yt-dlp-mac      # macOS binary
│       ├── yt-dlp-win.exe  # Windows binary
│       └── yt-dlp-linux    # Linux binary
└── dist/                   # Built applications
```

## 🔧 Configuration

### Download Location
Default: `~/VideoGrabberDownloads`

Change in Settings (⚙️ button) or modify in code.

### Format Options
- **MP4 (Best Quality)** - Highest available quality
- **4K (2160p+)** - Ultra HD
- **1080p** - Full HD
- **720p** - HD
- **MP3 (Audio Only)** - Extract audio

### GPU Acceleration
Enabled by default. Disable if you experience issues or only download MP3s.

## 🎨 Screenshots

### Main Interface
![Main Interface](https://via.placeholder.com/800x500/667eea/ffffff?text=Main+Interface+-+Coming+Soon)
*Beautiful gradient UI with video preview and real-time progress*

### Download Queue
![Download Queue](https://via.placeholder.com/800x500/764ba2/ffffff?text=Download+Queue+-+Coming+Soon)
*Manage multiple downloads with individual controls*

### History Management
![History](https://via.placeholder.com/800x500/667eea/ffffff?text=History+-+Coming+Soon)
*Track all downloads with clickable items and file management*

> **Note**: Screenshots will be added in the next update. The app is fully functional!

## 🛠️ Development

### Run in Development Mode
```bash
npm start
```

### Build for Production
```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Linux
npm run build:linux
```

### Update yt-dlp
```bash
./setup-binaries.sh
npm run build
```

## 📚 Documentation

- [START_HERE.md](START_HERE.md) - Quick start guide
- [QUICKSTART.md](QUICKSTART.md) - Fast setup instructions
- [INSTALL.md](INSTALL.md) - Detailed installation guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
- [FEATURES.md](FEATURES.md) - Complete feature list
- [PROFESSIONAL_FEATURES.md](PROFESSIONAL_FEATURES.md) - Advanced features guide
- [GPU_ACCELERATION_EXPLAINED.md](GPU_ACCELERATION_EXPLAINED.md) - GPU acceleration details
- [COMMANDS.md](COMMANDS.md) - Command reference
- [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md) - Comprehensive guide

## 🆘 Troubleshooting

### "yt-dlp not found" Error
```bash
# Install yt-dlp
brew install yt-dlp  # macOS
pip install yt-dlp   # Windows/Linux

# Or download binaries
./setup-binaries.sh
```

### Download Fails
- Check internet connection
- Verify URL is valid
- Update yt-dlp: `pip install -U yt-dlp`
- Check console for errors

### App Won't Open (macOS)
- Right-click app → Open
- Or: System Settings → Privacy & Security → Open Anyway

### GPU Not Working
- Check if GPU is supported
- Update GPU drivers
- Disable GPU acceleration if issues persist

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Built with [Electron](https://www.electronjs.org/)
- Powered by [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- Inspired by professional download managers

## ⚠️ Disclaimer

This tool is for personal use only. Please respect copyright laws and terms of service of the platforms you download from. The developers are not responsible for any misuse of this software.

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

## 📞 Support

- 🐛 [Report a Bug](https://github.com/martin-sack/Video-Grabber/issues)
- 💡 [Request a Feature](https://github.com/martin-sack/Video-Grabber/issues)
- 📖 [Documentation](https://github.com/martin-sack/Video-Grabber/wiki)

## 🔄 Updates

### Version 1.0.0 (Current)
- ✅ Download queue system
- ✅ GPU acceleration
- ✅ Format selection (MP4, 4K, 1080p, 720p, MP3)
- ✅ Pause/resume downloads
- ✅ File management
- ✅ Persistent history
- ✅ Modern UI
- ✅ Cross-platform support

---

**Made with ❤️ by the VideoGrabber Team**

**Download videos from anywhere, anytime!** 🚀
