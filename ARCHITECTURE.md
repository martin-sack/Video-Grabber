# 🏗️ VideoGrabber Architecture

## Project Structure

```
videograbber/
├── main.js                 # Electron main process (Node.js backend)
├── preload.js              # Secure IPC bridge
├── renderer.js             # Frontend logic (UI interactions)
├── index.html              # UI markup
├── styles.css              # Modern gradient styling
├── package.json            # Dependencies & build configuration
├── setup-binaries.sh       # macOS/Linux binary setup script
├── setup-binaries.bat      # Windows binary setup script
├── binaries/               # yt-dlp executables (created during build)
│   ├── yt-dlp             # macOS/Linux binary
│   └── yt-dlp.exe         # Windows binary
├── README.md               # Full documentation
├── QUICKSTART.md           # Quick start guide
└── ARCHITECTURE.md         # This file
```

## Architecture Overview

### 1. Main Process (main.js)
**Role**: Backend server, handles system operations

**Responsibilities**:
- Window management
- File system operations
- yt-dlp process spawning
- IPC handlers for renderer requests
- Download queue management
- Progress tracking

**Key Functions**:
- `getYtDlpPath()` - Locates yt-dlp binary
- `get-video-info` - Fetches metadata using `--dump-json`
- `download-video` - Spawns yt-dlp with progress tracking
- `cancel-download` - Kills active download process

### 2. Preload Script (preload.js)
**Role**: Security bridge between main and renderer

**Purpose**:
- Exposes safe IPC methods to renderer
- Prevents direct Node.js access from frontend
- Implements contextBridge for security

**Exposed APIs**:
```javascript
window.electronAPI = {
  getClipboard()           // Read clipboard
  selectDownloadPath()     // Open folder picker
  getDefaultPath()         // Get default save location
  getVideoInfo(url)        // Fetch video metadata
  downloadVideo(options)   // Start download
  cancelDownload(id)       // Cancel active download
  onDownloadProgress(cb)   // Listen for progress updates
}
```

### 3. Renderer Process (renderer.js)
**Role**: Frontend logic and UI interactions

**Responsibilities**:
- User input handling
- Video preview rendering
- Progress bar updates
- Download history management
- Settings modal control

**Key Features**:
- Auto-paste from clipboard on load
- Real-time URL validation
- Video metadata preview
- Download queue visualization
- History tracking (last 10 downloads)

### 4. UI Layer (index.html + styles.css)
**Role**: User interface

**Features**:
- Modern gradient design (purple theme)
- Responsive layout
- Smooth animations
- Progress indicators
- Settings modal
- Download history list

## Data Flow

### Download Flow
```
User pastes URL
    ↓
renderer.js validates URL
    ↓
IPC: get-video-info
    ↓
main.js spawns yt-dlp --dump-json
    ↓
Returns metadata (title, thumbnail, duration)
    ↓
renderer.js displays preview
    ↓
User clicks Download
    ↓
IPC: download-video
    ↓
main.js spawns yt-dlp with progress flags
    ↓
Parses stdout for progress (%, speed, ETA)
    ↓
IPC: download-progress events
    ↓
renderer.js updates progress bar
    ↓
Download completes
    ↓
File saved to ~/VideoGrabberDownloads
    ↓
History updated
```

## yt-dlp Integration

### Command Structure

**Get Video Info**:
```bash
yt-dlp --dump-json --no-playlist <URL>
```

**Download Video**:
```bash
yt-dlp --newline --progress \
  -o "~/VideoGrabberDownloads/%(title)s.%(ext)s" \
  -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" \
  <URL>
```

**Download Audio Only**:
```bash
yt-dlp -x --audio-format mp3 <URL>
```

**Download Playlist**:
```bash
yt-dlp <URL>  # (without --no-playlist flag)
```

### Progress Parsing

yt-dlp outputs progress in this format:
```
[download]  45.2% of 123.45MiB at 2.34MiB/s ETA 00:25
```

Regex patterns used:
- Progress: `(\d+\.?\d*)%`
- Speed: `(\d+\.?\d*\w+/s)`
- ETA: `ETA\s+(\d+:\d+)`

## Security Model

### Context Isolation
- Renderer process has NO direct Node.js access
- All system operations go through IPC
- preload.js acts as security boundary

### IPC Communication
```
Renderer → contextBridge → IPC → Main Process
         (preload.js)
```

### File System Access
- Downloads restricted to user-selected folder
- Default: `~/VideoGrabberDownloads`
- No arbitrary file system access from renderer

## Build Process

### Development
```bash
npm start
# Uses system yt-dlp
```

### Production Build
```bash
npm run build
# Bundles yt-dlp from binaries/ folder
# Creates platform-specific installers
```

### electron-builder Configuration

**Included Files**:
- All .js, .html, .css files
- binaries/ folder (as extraResources)

**Output**:
- macOS: .dmg and .zip
- Windows: NSIS installer and portable .exe

**Binary Location in Built App**:
- Dev: Uses system `yt-dlp`
- Prod: `process.resourcesPath/binaries/yt-dlp`

## Cross-Platform Considerations

### Path Handling
```javascript
path.join(os.homedir(), 'VideoGrabberDownloads')
```
- macOS: `/Users/username/VideoGrabberDownloads`
- Windows: `C:\Users\username\VideoGrabberDownloads`
- Linux: `/home/username/VideoGrabberDownloads`

### Binary Selection
```javascript
const binName = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
```

### Process Spawning
```javascript
spawn(ytDlpPath, args)  // Works on all platforms
```

## Performance Optimizations

1. **Async Operations**: All IPC calls are async
2. **Progress Throttling**: Updates sent on newline (not every byte)
3. **Download Queue**: Map-based queue for multiple downloads
4. **Memory Efficient**: Streams stdout instead of buffering

## Error Handling

### Network Errors
- Caught in yt-dlp stderr
- Displayed to user via alert
- Added to history as "failed"

### Invalid URLs
- Validated before API calls
- Preview fails gracefully
- User notified

### Missing yt-dlp
- Checked at runtime
- Clear error message
- Instructions provided

## Future Enhancements

Potential features to add:
- [ ] Batch download from file
- [ ] Format selection (720p, 1080p, 4K)
- [ ] Subtitle download
- [ ] Video conversion
- [ ] Dark/light theme toggle
- [ ] Download scheduling
- [ ] Bandwidth limiting
- [ ] Proxy support
- [ ] Browser extension integration

## Dependencies

### Production
- `electron` - Desktop framework
- `yt-dlp` - Video downloader (bundled)

### Development
- `electron-builder` - Build tool for installers

### System Requirements
- Node.js 16+
- 100MB disk space
- Internet connection

---

**Built with ❤️ using Electron + yt-dlp**
