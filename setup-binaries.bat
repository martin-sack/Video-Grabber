@echo off
echo 🎬 VideoGrabber - Binary Setup
echo ================================
echo.

REM Create binaries directory
if not exist binaries mkdir binaries

REM Download yt-dlp for Windows
echo 📥 Downloading yt-dlp for Windows...
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe -o binaries/yt-dlp.exe

echo ✅ Windows binary downloaded
echo.

REM Download yt-dlp for macOS/Linux (for cross-platform builds)
echo 📥 Downloading yt-dlp for macOS/Linux...
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o binaries/yt-dlp

echo ✅ macOS/Linux binary downloaded
echo.

echo 🎉 Setup complete!
echo.
echo You can now build the app with:
echo   npm run build:win    # Build for Windows
echo   npm run build:mac    # Build for macOS
echo   npm run build        # Build for both
pause
