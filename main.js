const { app, BrowserWindow, ipcMain, dialog, clipboard } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn } = require('child_process');
const { getYtDlpExecutable } = require('./getYtDlpExecutable');
const DownloadQueue = require('./queue');

let mainWindow;
const downloadQueue = new Map();
const pausedDownloads = new Map();

const defaultDownloadPath = path.join(os.homedir(), 'VideoGrabberDownloads');
const historyFilePath = path.join(app.getPath('userData'), 'download-history.json');

// Ensure download directory exists
if (!fs.existsSync(defaultDownloadPath)) {
  fs.mkdirSync(defaultDownloadPath, { recursive: true });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#1a1a1a'
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// GPU codec detection
function getGPUCodec() {
  switch (process.platform) {
    case "darwin":
      return "h264_videotoolbox"; // Apple Silicon / Intel Mac
    case "win32":
      return "h264_nvenc"; // NVIDIA default (fallback to software if not available)
    default:
      return "h264"; // Software fallback
  }
}

// Check if yt-dlp is available
function checkYtDlp() {
  return new Promise((resolve) => {
    const ytDlpPath = getYtDlpExecutable();
    console.log('Checking yt-dlp at:', ytDlpPath);
    
    // If it's a bundled binary path, just check if file exists
    if (ytDlpPath.includes('resources/bin') || ytDlpPath.includes('bin/yt-dlp')) {
      const exists = fs.existsSync(ytDlpPath);
      console.log('Bundled yt-dlp exists:', exists);
      resolve(exists);
      return;
    }
    
    // For system yt-dlp, test by running --version
    const testProcess = spawn(ytDlpPath, ['--version']);
    
    testProcess.on('error', (err) => {
      console.error('yt-dlp check error:', err);
      resolve(false);
    });
    
    testProcess.on('close', (code) => {
      console.log('yt-dlp check exit code:', code);
      resolve(code === 0);
    });
  });
}

// IPC Handlers
ipcMain.handle('get-clipboard', () => {
  return clipboard.readText();
});

ipcMain.handle('select-download-path', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory'],
    defaultPath: defaultDownloadPath
  });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('get-default-path', () => {
  return defaultDownloadPath;
});

ipcMain.handle('get-video-info', async (event, url) => {
  // Check if yt-dlp is available
  const isAvailable = await checkYtDlp();
  if (!isAvailable) {
    return Promise.reject(new Error('yt-dlp is not installed. Please install it:\n\nmacOS: brew install yt-dlp\nWindows/Linux: pip install yt-dlp\n\nOr run: ./setup-binaries.sh'));
  }
  
  return new Promise((resolve, reject) => {
    const ytDlp = spawn(getYtDlpExecutable(), [
      '--dump-json',
      '--no-playlist',
      url
    ]);

    let output = '';
    let errorOutput = '';

    ytDlp.stdout.on('data', (data) => {
      output += data.toString();
    });

    ytDlp.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    ytDlp.on('close', (code) => {
      if (code === 0) {
        try {
          const info = JSON.parse(output);
          resolve({
            title: info.title,
            thumbnail: info.thumbnail,
            duration: info.duration,
            uploader: info.uploader,
            formats: info.formats?.length || 0
          });
        } catch (e) {
          reject(new Error('Failed to parse video info'));
        }
      } else {
        reject(new Error(errorOutput || 'Failed to get video info'));
      }
    });
    
    ytDlp.on('error', (err) => {
      reject(new Error('yt-dlp error: ' + err.message));
    });
  });
});

ipcMain.handle('download-video', async (event, { url, downloadPath, audioOnly, isPlaylist }) => {
  // Check if yt-dlp is available
  const isAvailable = await checkYtDlp();
  if (!isAvailable) {
    return Promise.reject(new Error('yt-dlp is not installed. Please install it:\n\nmacOS: brew install yt-dlp\nWindows/Linux: pip install yt-dlp\n\nOr run: ./setup-binaries.sh'));
  }
  
  const downloadId = Date.now().toString();
  
  const args = [
    '--newline',
    '--progress',
    '-o', path.join(downloadPath, '%(title)s.%(ext)s')
  ];

  if (audioOnly) {
    args.push('-x', '--audio-format', 'mp3');
  } else {
    args.push('-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best');
  }

  if (!isPlaylist) {
    args.push('--no-playlist');
  }

  args.push(url);

  const ytDlp = spawn(getYtDlpExecutable(), args);

  downloadQueue.set(downloadId, ytDlp);
  
  ytDlp.on('error', (err) => {
    console.error('yt-dlp spawn error:', err);
    console.error('Path tried:', getYtDlpExecutable());
    downloadQueue.delete(downloadId);
  });

  ytDlp.stdout.on('data', (data) => {
    const output = data.toString();
    const progressMatch = output.match(/(\d+\.?\d*)%/);
    const speedMatch = output.match(/(\d+\.?\d*\w+\/s)/);
    const etaMatch = output.match(/ETA\s+(\d+:\d+)/);

    if (progressMatch) {
      mainWindow.webContents.send('download-progress', {
        id: downloadId,
        progress: parseFloat(progressMatch[1]),
        speed: speedMatch ? speedMatch[1] : '',
        eta: etaMatch ? etaMatch[1] : ''
      });
    }
  });

  ytDlp.stderr.on('data', (data) => {
    console.error('yt-dlp error:', data.toString());
  });

  return new Promise((resolve, reject) => {
    ytDlp.on('close', (code) => {
      downloadQueue.delete(downloadId);
      if (code === 0) {
        resolve({ success: true, id: downloadId });
      } else {
        reject(new Error('Download failed'));
      }
    });

    ytDlp.on('error', (err) => {
      downloadQueue.delete(downloadId);
      reject(new Error('yt-dlp error: ' + err.message));
    });
  });
});

ipcMain.handle('cancel-download', (event, downloadId) => {
  const process = downloadQueue.get(downloadId);
  if (process) {
    process.kill();
    downloadQueue.delete(downloadId);
    return true;
  }
  return false;
});

ipcMain.handle('open-download-folder', async (event, folderPath) => {
  const { shell } = require('electron');
  try {
    await shell.openPath(folderPath);
    return true;
  } catch (error) {
    console.error('Failed to open folder:', error);
    return false;
  }
});

ipcMain.handle('pause-download', (event, downloadId) => {
  const process = downloadQueue.get(downloadId);
  if (process) {
    try {
      if (process.platform === 'win32') {
        // Windows: use taskkill to suspend (requires external tool)
        // For now, just track as paused - full implementation would need ntsuspend
        pausedDownloads.set(downloadId, true);
        return { success: true, message: 'Pause not fully supported on Windows. Use Cancel instead.' };
      } else {
        // Unix: use SIGSTOP
        process.kill('SIGSTOP');
        pausedDownloads.set(downloadId, true);
        return { success: true, message: 'Download paused' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  return { success: false, message: 'Download not found' };
});

ipcMain.handle('resume-download', (event, downloadId) => {
  const process = downloadQueue.get(downloadId);
  if (process && pausedDownloads.has(downloadId)) {
    try {
      if (process.platform === 'win32') {
        pausedDownloads.delete(downloadId);
        return { success: true, message: 'Resume not fully supported on Windows' };
      } else {
        // Unix: use SIGCONT
        process.kill('SIGCONT');
        pausedDownloads.delete(downloadId);
        return { success: true, message: 'Download resumed' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  return { success: false, message: 'Download not found or not paused' };
});

ipcMain.handle('delete-file', async (event, filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to delete file:', error);
    return false;
  }
});

// History management
ipcMain.handle('save-history', async (event, history) => {
  try {
    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to save history:', error);
    return false;
  }
});

ipcMain.handle('load-history', async () => {
  try {
    if (fs.existsSync(historyFilePath)) {
      const data = fs.readFileSync(historyFilePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
});

ipcMain.handle('show-item-in-folder', async (event, filePath) => {
  const { shell } = require('electron');
  try {
    shell.showItemInFolder(filePath);
    return true;
  } catch (error) {
    console.error('Failed to show item:', error);
    return false;
  }
});

// Queue management
ipcMain.handle('queue-add', (event, payload) => {
  const id = DownloadQueue.add(payload.url, payload.options);
  return { success: true, id };
});

ipcMain.handle('queue-cancel', (event, id) => {
  return DownloadQueue.cancel(id);
});

ipcMain.handle('queue-pause', () => {
  return DownloadQueue.pause();
});

ipcMain.handle('queue-resume', () => {
  return DownloadQueue.resume();
});

ipcMain.handle('queue-get', () => {
  return {
    queue: DownloadQueue.getQueue(),
    current: DownloadQueue.getCurrent()
  };
});

ipcMain.handle('queue-clear', () => {
  DownloadQueue.clear();
  return true;
});

ipcMain.handle('get-gpu-codec', () => {
  return getGPUCodec();
});

// Queue event listeners
DownloadQueue.on("progress", (data) => {
  if (mainWindow) {
    mainWindow.webContents.send("queue-progress", data);
  }
});

DownloadQueue.on("queue-updated", (queue) => {
  if (mainWindow) {
    mainWindow.webContents.send("queue-updated", queue);
  }
});

DownloadQueue.on("started", (item) => {
  if (mainWindow) {
    mainWindow.webContents.send("queue-item-started", item);
  }
});

DownloadQueue.on("completed", (item) => {
  if (mainWindow) {
    mainWindow.webContents.send("queue-item-completed", item);
  }
});

DownloadQueue.on("failed", (item) => {
  if (mainWindow) {
    mainWindow.webContents.send("queue-item-failed", item);
  }
});

DownloadQueue.on("cancelled", (item) => {
  if (mainWindow) {
    mainWindow.webContents.send("queue-item-cancelled", item);
  }
});

DownloadQueue.on("paused", (item) => {
  if (mainWindow) {
    mainWindow.webContents.send("queue-item-paused", item);
  }
});

DownloadQueue.on("resumed", (item) => {
  if (mainWindow) {
    mainWindow.webContents.send("queue-item-resumed", item);
  }
});

DownloadQueue.on("done", () => {
  if (mainWindow) {
    mainWindow.webContents.send("queue-done");
  }
});
