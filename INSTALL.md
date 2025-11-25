# 📦 Installation Guide

## Prerequisites

Before you begin, ensure you have:
- **Node.js 16 or higher** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

## Installation Methods

### Method 1: Quick Install (Recommended for Testing)

This method uses your system's yt-dlp installation.

```bash
# 1. Navigate to project folder
cd videograbber

# 2. Install dependencies
npm install

# 3. Install yt-dlp on your system
# macOS:
brew install yt-dlp

# Windows:
pip install yt-dlp

# Linux:
pip install yt-dlp

# 4. Run the app
npm start
```

### Method 2: Full Build Setup (For Distribution)

This method bundles yt-dlp inside the app.

```bash
# 1. Navigate to project folder
cd videograbber

# 2. Install dependencies
npm install

# 3. Download yt-dlp binaries
# macOS/Linux:
./setup-binaries.sh

# Windows:
setup-binaries.bat

# 4. Build the app
npm run build:mac    # For macOS
npm run build:win    # For Windows
npm run build        # For both

# 5. Find your installer in the dist/ folder
```

## Platform-Specific Instructions

### macOS

```bash
# Install Node.js
brew install node

# Install yt-dlp
brew install yt-dlp

# Clone and setup
git clone <your-repo-url>
cd videograbber
npm install
npm start
```

**For Building**:
```bash
./setup-binaries.sh
npm run build:mac
# Find VideoGrabber.dmg in dist/
```

### Windows

```powershell
# Install Node.js from https://nodejs.org/

# Install yt-dlp
pip install yt-dlp

# Clone and setup
git clone <your-repo-url>
cd videograbber
npm install
npm start
```

**For Building**:
```powershell
setup-binaries.bat
npm run build:win
# Find VideoGrabber Setup.exe in dist/
```

### Linux

```bash
# Install Node.js
sudo apt install nodejs npm  # Ubuntu/Debian
sudo dnf install nodejs      # Fedora

# Install yt-dlp
pip install yt-dlp

# Clone and setup
git clone <your-repo-url>
cd videograbber
npm install
npm start
```

## Verifying Installation

### Check Node.js
```bash
node --version
# Should show v16.0.0 or higher
```

### Check npm
```bash
npm --version
# Should show 7.0.0 or higher
```

### Check yt-dlp
```bash
yt-dlp --version
# Should show version number
```

## Troubleshooting

### "node: command not found"
- Install Node.js from https://nodejs.org/
- Restart your terminal

### "yt-dlp: command not found"
- Install yt-dlp: `pip install yt-dlp`
- Or use homebrew on macOS: `brew install yt-dlp`
- Or download binary from: https://github.com/yt-dlp/yt-dlp/releases

### "npm install" fails
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### "Permission denied" on macOS/Linux
- Run: `chmod +x setup-binaries.sh`
- Then: `./setup-binaries.sh`

### Build fails
- Make sure binaries are downloaded: `ls binaries/`
- Should see `yt-dlp` and/or `yt-dlp.exe`
- Re-run setup script if missing

### App won't start
- Check console for errors
- Verify all dependencies installed: `npm install`
- Try deleting `node_modules` and reinstalling

## File Permissions (macOS/Linux)

If you get permission errors:

```bash
# Make scripts executable
chmod +x setup-binaries.sh

# Make yt-dlp executable (if bundled)
chmod +x binaries/yt-dlp
```

## Updating

### Update Dependencies
```bash
npm update
```

### Update yt-dlp
```bash
# System installation:
pip install -U yt-dlp

# Bundled version:
./setup-binaries.sh  # Re-download latest
```

## Uninstalling

### Remove App
```bash
# Delete project folder
rm -rf videograbber

# Remove downloaded videos (optional)
rm -rf ~/VideoGrabberDownloads
```

### Remove yt-dlp (if installed system-wide)
```bash
pip uninstall yt-dlp
# or
brew uninstall yt-dlp
```

## Next Steps

After installation:
1. Read [QUICKSTART.md](QUICKSTART.md) for usage guide
2. Check [README.md](README.md) for full documentation
3. See [ARCHITECTURE.md](ARCHITECTURE.md) for technical details

## Getting Help

If you encounter issues:
1. Check this guide first
2. Verify all prerequisites are installed
3. Check the troubleshooting section
4. Review error messages carefully
5. Ensure you have internet connection

---

**Ready to start?** Run `npm start` and enjoy VideoGrabber! 🎬
