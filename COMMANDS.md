# 🎯 Command Cheat Sheet

Quick reference for all VideoGrabber commands.

## Development Commands

### Start the App
```bash
npm start
```
Launches the app in development mode.

### Install Dependencies
```bash
npm install
```
Installs all required packages.

## Build Commands

### Build for macOS
```bash
npm run build:mac
```
Creates `.dmg` and `.zip` installers for macOS.

### Build for Windows
```bash
npm run build:win
```
Creates `.exe` installer and portable version for Windows.

### Build for All Platforms
```bash
npm run build
```
Builds for both macOS and Windows.

## Setup Commands

### Download Binaries (macOS/Linux)
```bash
./setup-binaries.sh
```
Downloads yt-dlp binaries for distribution.

### Download Binaries (Windows)
```bash
setup-binaries.bat
```
Downloads yt-dlp binaries for distribution.

### Make Script Executable (macOS/Linux)
```bash
chmod +x setup-binaries.sh
```
Fixes permission issues.

## yt-dlp Commands

### Install yt-dlp (macOS)
```bash
brew install yt-dlp
```

### Install yt-dlp (Windows/Linux)
```bash
pip install yt-dlp
```

### Update yt-dlp
```bash
pip install -U yt-dlp
```

### Check yt-dlp Version
```bash
yt-dlp --version
```

### Test yt-dlp
```bash
yt-dlp --help
```

## Troubleshooting Commands

### Clean Install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### List Installed Packages
```bash
npm list
```

### Check for Outdated Packages
```bash
npm outdated
```

## File Management

### View Project Structure
```bash
ls -la
```

### Check Binaries Folder
```bash
ls -la binaries/
```

### View Build Output
```bash
ls -la dist/
```

### Clean Build Files
```bash
rm -rf dist/
```

## Git Commands (if using version control)

### Initialize Git
```bash
git init
```

### Add All Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Initial commit"
```

### Create Repository
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

## Quick Workflows

### First Time Setup (Development)
```bash
npm install
brew install yt-dlp  # or pip install yt-dlp
npm start
```

### First Time Setup (Distribution)
```bash
npm install
./setup-binaries.sh  # or setup-binaries.bat
npm run build
```

### Update and Rebuild
```bash
npm update
./setup-binaries.sh  # Get latest yt-dlp
npm run build
```

### Clean and Rebuild
```bash
rm -rf node_modules dist
npm install
./setup-binaries.sh
npm run build
```

## Platform-Specific Commands

### macOS Only
```bash
# Open built app
open dist/mac/VideoGrabber.app

# Install from DMG
open dist/VideoGrabber-1.0.0.dmg
```

### Windows Only
```powershell
# Run portable version
.\dist\VideoGrabber.exe

# Install from setup
.\dist\VideoGrabber Setup 1.0.0.exe
```

### Linux Only
```bash
# Make AppImage executable
chmod +x dist/VideoGrabber-1.0.0.AppImage

# Run AppImage
./dist/VideoGrabber-1.0.0.AppImage
```

## Useful One-Liners

### Complete Fresh Start
```bash
rm -rf node_modules dist binaries && npm install && ./setup-binaries.sh && npm start
```

### Quick Test
```bash
npm install && npm start
```

### Quick Build
```bash
./setup-binaries.sh && npm run build
```

### Update Everything
```bash
npm update && pip install -U yt-dlp && ./setup-binaries.sh
```

## Environment Variables (Optional)

### Set Custom Download Path
```bash
export VIDEOGRABBER_PATH="$HOME/MyVideos"
```

### Enable Debug Mode
```bash
export ELECTRON_ENABLE_LOGGING=1
npm start
```

## Package.json Scripts

All available npm scripts:
- `npm start` - Run the app
- `npm run build` - Build for all platforms
- `npm run build:mac` - Build for macOS
- `npm run build:win` - Build for Windows
- `npm run setup` - Show setup instructions

## Quick Reference

| Task | Command |
|------|---------|
| Run app | `npm start` |
| Build all | `npm run build` |
| Build macOS | `npm run build:mac` |
| Build Windows | `npm run build:win` |
| Get binaries | `./setup-binaries.sh` |
| Install deps | `npm install` |
| Update yt-dlp | `pip install -U yt-dlp` |
| Clean install | `rm -rf node_modules && npm install` |

## Help Commands

### Get Help
```bash
npm start -- --help
```

### Electron Version
```bash
npx electron --version
```

### electron-builder Help
```bash
npx electron-builder --help
```

---

**Pro Tip**: Bookmark this file for quick command reference! 📌
