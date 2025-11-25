# 🚀 How to Open VideoGrabber

## ✅ App Successfully Built!

Your VideoGrabber app is ready in the `dist` folder.

## 📱 Quick Start

### Option 1: Open from Finder
1. Open Finder
2. Navigate to this project folder
3. Go to `dist/mac-arm64/`
4. Double-click **VideoGrabber.app**

### Option 2: Open from Terminal
```bash
open dist/mac-arm64/VideoGrabber.app
```

### Option 3: Install to Applications
1. Open `dist/VideoGrabber-1.0.0-arm64.dmg`
2. Drag VideoGrabber to Applications folder
3. Open from Applications or Spotlight (Cmd+Space, type "VideoGrabber")

## 🎬 First Time Setup

When you first open the app:
1. macOS may show a security warning (app from unidentified developer)
2. Go to **System Settings > Privacy & Security**
3. Click **Open Anyway** next to VideoGrabber
4. Or right-click the app and select **Open**

## 🎯 Using the App

Once opened:
1. Paste any video URL
2. Click Download
3. Watch the progress
4. Find your video in `~/VideoGrabberDownloads`

## 🆕 New Features

- **⏸️ Pause/Resume** - Control your downloads
- **🗑️ Delete Files** - Remove downloaded files
- **📁 Show in Folder** - Quick access to files
- **✕ Remove from History** - Clean up your list
- **💾 Persistent History** - Never lose track
- **🧹 Clear All** - Fresh start anytime

## 📂 File Locations

- **App**: `dist/mac-arm64/VideoGrabber.app`
- **Installer**: `dist/VideoGrabber-1.0.0-arm64.dmg`
- **Downloads**: `~/VideoGrabberDownloads`
- **History**: `~/Library/Application Support/videograbber/download-history.json`

## 🔧 Troubleshooting

### "App can't be opened"
- Right-click app → Open
- Or: System Settings → Privacy & Security → Open Anyway

### "yt-dlp not found"
- Install: `brew install yt-dlp`
- Or download binaries: `./setup-binaries.sh`

### App won't start
- Check Console.app for errors
- Try running from terminal: `open dist/mac-arm64/VideoGrabber.app`

## 🎉 You're Ready!

Open the app and start downloading videos!

---

**Quick Command:**
```bash
open dist/mac-arm64/VideoGrabber.app
```
