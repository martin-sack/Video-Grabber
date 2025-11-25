# 🚀 Quick Start Guide

## For Development (Testing the App)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Install yt-dlp (Required)

**macOS:**
```bash
brew install yt-dlp
```

**Windows:**
```bash
pip install yt-dlp
```

**Linux:**
```bash
pip install yt-dlp
```

### Step 3: Run the App
```bash
npm start
```

That's it! The app will open and you can start downloading videos.

---

## For Distribution (Building Installers)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Download yt-dlp Binaries

**macOS/Linux:**
```bash
./setup-binaries.sh
```

**Windows:**
```bash
setup-binaries.bat
```

Or manually create a `binaries` folder and download:
- macOS/Linux: https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
- Windows: https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe

### Step 3: Build the App

**For macOS:**
```bash
npm run build:mac
```

**For Windows:**
```bash
npm run build:win
```

**For Both:**
```bash
npm run build
```

### Step 4: Find Your App

Built apps will be in the `dist` folder:
- macOS: `dist/VideoGrabber-1.0.0.dmg`
- Windows: `dist/VideoGrabber Setup 1.0.0.exe`

---

## 📝 Usage Tips

1. **Copy any video URL** from TikTok, Instagram, YouTube, etc.
2. **Paste it** into VideoGrabber (it auto-detects from clipboard!)
3. **Click Download** and watch the progress
4. **Find your video** in `~/VideoGrabberDownloads`

### Supported Sites
- TikTok
- Instagram (posts, reels, stories)
- YouTube (videos, shorts)
- Facebook
- Twitter/X
- Reddit
- Vimeo
- And 1000+ more!

### Pro Tips
- ✅ Check "Audio Only" to download as MP3
- ✅ Check "Download Playlist" for YouTube playlists
- ✅ Click the gear icon to change download location
- ✅ Videos are automatically downloaded in best quality

---

## ⚠️ Troubleshooting

**"yt-dlp not found" error?**
- Make sure yt-dlp is installed: `yt-dlp --version`
- Or bundle binaries as described above

**Download fails?**
- Check internet connection
- Verify URL is valid
- Update yt-dlp: `pip install -U yt-dlp`

**App won't start?**
- Make sure Node.js 16+ is installed
- Delete `node_modules` and run `npm install` again

---

Need help? Check the full README.md for more details!
