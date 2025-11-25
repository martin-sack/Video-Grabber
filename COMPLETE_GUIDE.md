# 🎬 VideoGrabber - Complete Guide

## ✅ What's Been Built

A **fully-featured desktop video downloader app** with:

### Core Features
- ✅ Download videos from 1000+ sites (TikTok, Instagram, YouTube, etc.)
- ✅ Audio-only download (MP3)
- ✅ Playlist support
- ✅ Best quality detection (1080p, 4K)
- ✅ Real-time progress tracking
- ✅ Beautiful modern UI

### New Advanced Features
- ✅ **Pause/Resume** downloads
- ✅ **Delete** downloaded files
- ✅ **Show in Folder** - reveal files in Finder
- ✅ **Remove from History** - clean up list
- ✅ **Persistent History** - saved between sessions
- ✅ **Clear All History** - fresh start
- ✅ **Audio/Video indicators** - 🎵 and 🎬 emojis
- ✅ **Desktop App** - runs like any Mac app

---

## 🚀 Quick Start

### Open the App Right Now
```bash
open dist/mac-arm64/VideoGrabber.app
```

### Or Install to Applications
1. Open `dist/VideoGrabber-1.0.0-arm64.dmg`
2. Drag to Applications
3. Launch from Spotlight (Cmd+Space → "VideoGrabber")

---

## 📖 How to Use

### Download a Video
1. **Copy** any video URL (TikTok, Instagram, YouTube, etc.)
2. **Paste** into VideoGrabber (auto-detects from clipboard)
3. **Click Download**
4. **Watch progress** in real-time
5. **Find file** in `~/VideoGrabberDownloads`

### Download Audio Only
1. Paste URL
2. Check **"Audio Only (MP3)"**
3. Click Download
4. Get MP3 file

### Pause/Resume
- Click **⏸** to pause
- Click **▶** to resume
- Useful for managing bandwidth

### Manage Downloads
- **Click history item** → Opens download folder
- **📁 button** → Shows file in Finder
- **🗑️ button** → Deletes file (with confirmation)
- **✕ button** → Removes from history (keeps file)
- **Clear All** → Removes all history items

---

## 📂 Project Structure

```
VideoGrabber/
├── dist/
│   ├── mac-arm64/
│   │   └── VideoGrabber.app          ← YOUR APP
│   ├── VideoGrabber-1.0.0-arm64.dmg  ← INSTALLER
│   └── VideoGrabber-1.0.0-arm64-mac.zip
│
├── Core Files
│   ├── main.js           - Backend logic
│   ├── preload.js        - Security bridge
│   ├── renderer.js       - Frontend logic
│   ├── index.html        - UI
│   └── styles.css        - Design
│
├── Configuration
│   ├── package.json      - App config
│   └── .gitignore        - Git rules
│
├── Setup Scripts
│   ├── setup-binaries.sh - Download yt-dlp
│   ├── build-app.sh      - Build desktop app
│   └── setup-binaries.bat
│
└── Documentation
    ├── START_HERE.md
    ├── README.md
    ├── QUICKSTART.md
    ├── NEW_FEATURES.md
    ├── OPEN_APP.md
    └── COMPLETE_GUIDE.md  ← YOU ARE HERE
```

---

## 🎯 Common Tasks

### Open the App
```bash
open dist/mac-arm64/VideoGrabber.app
```

### Rebuild the App
```bash
npm run build:mac
```

### Run in Development Mode
```bash
npm start
```

### Update yt-dlp
```bash
brew upgrade yt-dlp
```

### Clear History Manually
```bash
rm ~/Library/Application\ Support/videograbber/download-history.json
```

---

## 🎨 UI Guide

### Main Window
```
┌─────────────────────────────────────┐
│ 🎬 VideoGrabber              ⚙️     │
├─────────────────────────────────────┤
│                                     │
│  [Paste video URL here...    ] 📋  │
│  ☐ Audio Only  ☐ Playlist          │
│  [        Download        ]         │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Downloading video: Title    │   │
│  │ ⏸ ✕                         │   │
│  │ ████████░░░░░░░░░░ 45%      │   │
│  │ 2.3MB/s  ETA 00:25          │   │
│  └─────────────────────────────┘   │
│                                     │
│  Download History    [Clear All]   │
│  ┌─────────────────────────────┐   │
│  │ 🎬 Video Title              │   │
│  │    success  📁 🗑️ ✕         │   │
│  ├─────────────────────────────┤   │
│  │ 🎵 Audio Title              │   │
│  │    success  📁 🗑️ ✕         │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Button Guide
- **📋** - Paste from clipboard
- **⏸** - Pause download
- **▶** - Resume download
- **✕** - Cancel/Remove
- **📁** - Show in Finder
- **🗑️** - Delete file
- **⚙️** - Settings

---

## 🔧 Advanced Features

### Persistent History
- Automatically saved after each download
- Survives app restarts
- Stored in: `~/Library/Application Support/videograbber/`

### File Management
- Click any history item to open folder
- Show in Folder reveals exact file location
- Delete removes file from disk
- Remove only removes from history

### Download Control
- Pause to save bandwidth
- Resume anytime
- Cancel to stop immediately
- All operations are safe

---

## 📱 Installation Options

### Option 1: Run from dist folder
```bash
open dist/mac-arm64/VideoGrabber.app
```
- Quick and easy
- No installation needed
- Can run immediately

### Option 2: Install to Applications
1. Open `dist/VideoGrabber-1.0.0-arm64.dmg`
2. Drag VideoGrabber to Applications
3. Eject DMG
4. Launch from Applications or Spotlight

- Permanent installation
- Available in Launchpad
- Searchable in Spotlight

### Option 3: Create Alias
```bash
ln -s "$(pwd)/dist/mac-arm64/VideoGrabber.app" ~/Desktop/VideoGrabber.app
```
- Quick desktop access
- No installation needed

---

## 🆘 Troubleshooting

### App Won't Open
**Problem**: "VideoGrabber can't be opened"

**Solution**:
1. Right-click app → Open
2. Or: System Settings → Privacy & Security → Open Anyway

### yt-dlp Not Found
**Problem**: "yt-dlp is not installed"

**Solution**:
```bash
brew install yt-dlp
```

### Download Fails
**Problem**: Download starts but fails

**Solutions**:
- Check internet connection
- Verify URL is valid
- Update yt-dlp: `brew upgrade yt-dlp`
- Try different quality settings

### History Not Saving
**Problem**: History disappears after restart

**Solution**:
- Check permissions: `ls -la ~/Library/Application\ Support/videograbber/`
- Manually create folder: `mkdir -p ~/Library/Application\ Support/videograbber/`

### Pause Not Working
**Problem**: Pause button doesn't work

**Note**: Pause/Resume uses Unix signals (SIGSTOP/SIGCONT)
- Works on macOS and Linux
- May not work on Windows (use Cancel instead)

---

## 🎓 Tips & Tricks

### Keyboard Shortcuts
- **Cmd+V** - Paste URL (in input field)
- **Enter** - Start download (when input focused)
- **Escape** - Close settings modal

### Best Practices
1. **Check preview** before downloading
2. **Use audio-only** for music videos
3. **Pause downloads** when bandwidth needed
4. **Clear history** periodically
5. **Organize downloads** by moving to folders

### Power User Features
- History is JSON - can be edited manually
- Downloads folder can be changed in Settings
- Multiple instances can run simultaneously
- Files are named after video titles automatically

---

## 📊 File Locations

| Item | Location |
|------|----------|
| App | `dist/mac-arm64/VideoGrabber.app` |
| Installer | `dist/VideoGrabber-1.0.0-arm64.dmg` |
| Downloads | `~/VideoGrabberDownloads` |
| History | `~/Library/Application Support/videograbber/download-history.json` |
| Logs | `~/Library/Logs/videograbber/` |

---

## 🔄 Updates

### Update the App
1. Pull latest code: `git pull`
2. Install dependencies: `npm install`
3. Rebuild: `npm run build:mac`
4. Reinstall or run new version

### Update yt-dlp
```bash
brew upgrade yt-dlp
```

---

## 🎉 You're All Set!

VideoGrabber is ready to use. Open it now:

```bash
open dist/mac-arm64/VideoGrabber.app
```

Or install to Applications and launch from Spotlight!

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Open app | `open dist/mac-arm64/VideoGrabber.app` |
| Rebuild | `npm run build:mac` |
| Dev mode | `npm start` |
| Update yt-dlp | `brew upgrade yt-dlp` |
| Clear history | Delete `~/Library/Application Support/videograbber/download-history.json` |
| View downloads | `open ~/VideoGrabberDownloads` |

---

**Enjoy VideoGrabber!** 🎬✨
