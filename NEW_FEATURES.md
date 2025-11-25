# 🎉 New Features Added

## ⏸️ Pause/Resume Downloads
- Click the **⏸** button to pause an active download
- Click **▶** to resume a paused download
- Downloads can be paused and resumed at any time

## 🗑️ Delete Downloaded Files
- Click the **🗑️** button next to any successful download in history
- Confirms before deleting
- Removes the file from your computer
- Updates history status to "deleted"

## 📁 Show in Folder
- Click the **📁** button to reveal the file in Finder/Explorer
- Opens the folder and highlights the downloaded file
- Quick access to your downloads

## ✕ Remove from History
- Click the **✕** button to remove an item from history
- Does NOT delete the file, only removes from list
- Confirms before removing

## 💾 Persistent History
- Download history is now saved automatically
- History persists between app restarts
- Stored in your user data folder
- Never lose track of your downloads

## 🧹 Clear All History
- Click **Clear All** button at the top of history section
- Removes all items from history
- Does NOT delete files
- Confirms before clearing

## 🎵 Audio Download Indicator
- Shows "Downloading audio:" when audio-only is selected
- Audio files marked with 🎵 emoji in history
- Video files marked with 🎬 emoji in history

## 📱 Desktop App
- Build as a standalone desktop application
- No need to run from terminal
- Launch from Applications (macOS) or Start Menu (Windows)
- Runs like any other app on your computer

## 🎨 Improved UI
- Better button layout with icons
- Hover effects on all interactive elements
- Status indicators for cancelled and deleted items
- More intuitive controls

---

## 🚀 How to Build Desktop App

### Quick Build (macOS)
```bash
./build-app.sh
```

### Manual Build
```bash
# Install dependencies
npm install

# Download yt-dlp binaries
./setup-binaries.sh

# Build for macOS
npm run build:mac

# Build for Windows
npm run build:win

# Build for both
npm run build
```

### Install the App
1. Open `dist/VideoGrabber.dmg` (macOS) or `dist/VideoGrabber Setup.exe` (Windows)
2. Follow installation instructions
3. Launch VideoGrabber from Applications/Start Menu
4. Enjoy!

---

## 📝 Usage Tips

### Pause/Resume
- Useful for managing bandwidth
- Pause when you need internet for other tasks
- Resume when ready to continue

### History Management
- Click on any history item to open its folder
- Use action buttons for quick file management
- Clear history periodically to keep it clean

### File Organization
- All files saved to `~/VideoGrabberDownloads` by default
- Change location in Settings
- Files named after video title automatically

---

## 🔧 Technical Details

### History Storage
- Stored in: `~/Library/Application Support/videograbber/download-history.json` (macOS)
- Stored in: `%APPDATA%/videograbber/download-history.json` (Windows)
- JSON format for easy backup/restore

### Pause/Resume Implementation
- Uses SIGSTOP/SIGCONT signals (Unix)
- Process suspension for Windows
- Maintains download state

### File Deletion
- Safe deletion with confirmation
- Checks file existence before deleting
- Updates history status automatically

---

## 🎯 Keyboard Shortcuts (Coming Soon)
- `Cmd/Ctrl + V` - Paste URL
- `Cmd/Ctrl + D` - Start download
- `Space` - Pause/Resume
- `Escape` - Cancel download

---

**Enjoy the new features!** 🎬
