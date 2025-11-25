#!/bin/bash

echo "🎬 VideoGrabber - Building Desktop App"
echo "======================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Download binaries if not present
if [ ! -d "binaries" ]; then
    echo "📥 Downloading yt-dlp binaries..."
    ./setup-binaries.sh
fi

# Build the app
echo "🔨 Building app for macOS..."
npm run build:mac

echo ""
echo "✅ Build complete!"
echo ""
echo "Your app is ready in the dist/ folder:"
echo "  - VideoGrabber.dmg (installer)"
echo "  - VideoGrabber.app (application)"
echo ""
echo "To install:"
echo "  1. Open dist/VideoGrabber.dmg"
echo "  2. Drag VideoGrabber to Applications"
echo "  3. Launch from Applications or Spotlight"
