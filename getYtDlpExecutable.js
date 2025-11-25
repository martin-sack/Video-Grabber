const path = require("path");
const fs = require("fs");
const { app } = require("electron");

function getLocalYtDlpPath() {
  const base = app.isPackaged
    ? path.join(process.resourcesPath, "bin")
    : path.join(__dirname, "resources/bin");

  switch (process.platform) {
    case "darwin": // macOS
      return path.join(base, "yt-dlp-mac");
    case "win32":
      return path.join(base, "yt-dlp-win.exe");
    case "linux":
      return path.join(base, "yt-dlp-linux");
    default:
      return null;
  }
}

function getYtDlpExecutable() {
  const localPath = getLocalYtDlpPath();

  // 1) Try local bundled version first
  if (localPath && fs.existsSync(localPath)) {
    console.log("Using bundled yt-dlp at:", localPath);
    return localPath;
  }

  // 2) Fallback to system-installed yt-dlp
  console.log("Using system yt-dlp");
  return "yt-dlp";
}

module.exports = { getYtDlpExecutable };
