#!/bin/bash

# Setup script for downloading yt-dlp binaries

echo "🎬 VideoGrabber - Binary Setup"
echo "================================"
echo ""

# Create resources/bin directory
mkdir -p resources/bin

# Download yt-dlp for macOS
echo "📥 Downloading yt-dlp for macOS..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o resources/bin/yt-dlp-mac
chmod +x resources/bin/yt-dlp-mac

echo "✅ macOS binary downloaded"
echo ""

# Download yt-dlp for Windows
echo "📥 Downloading yt-dlp for Windows..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe -o resources/bin/yt-dlp-win.exe

echo "✅ Windows binary downloaded"
echo ""

# Download yt-dlp for Linux
echo "📥 Downloading yt-dlp for Linux..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o resources/bin/yt-dlp-linux
chmod +x resources/bin/yt-dlp-linux

echo "✅ Linux binary downloaded"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "Binaries installed in: resources/bin/"
echo "  - yt-dlp-mac (macOS)"
echo "  - yt-dlp-win.exe (Windows)"
echo "  - yt-dlp-linux (Linux)"
echo ""
echo "You can now build the app with:"
echo "  npm run build:mac    # Build for macOS"
echo "  npm run build:win    # Build for Windows"
echo "  npm run build        # Build for both"
