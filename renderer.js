// State
let currentDownloadPath = '';
let downloadHistory = [];
let currentDownloadId = null;
let isPaused = false;
let downloadQueue = [];
let gpuCodec = 'h264';

// DOM Elements
const urlInput = document.getElementById('urlInput');
const pasteBtn = document.getElementById('pasteBtn');
const downloadBtn = document.getElementById('downloadBtn');
const formatSelect = document.getElementById('formatSelect');
const playlistCheck = document.getElementById('playlistCheck');
const gpuAccelCheck = document.getElementById('gpuAccelCheck');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeModal');
const downloadPath = document.getElementById('downloadPath');
const selectPathBtn = document.getElementById('selectPathBtn');
const videoPreview = document.getElementById('videoPreview');
const currentDownload = document.getElementById('currentDownload');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const progressSpeed = document.getElementById('progressSpeed');
const progressEta = document.getElementById('progressEta');
const currentTitle = document.getElementById('currentTitle');
const cancelBtn = document.getElementById('cancelBtn');
const historyList = document.getElementById('historyList');
const queueList = document.getElementById('queueList');
const clearQueueBtn = document.getElementById('clearQueueBtn');

// Initialize
async function init() {
  currentDownloadPath = await window.electronAPI.getDefaultPath();
  downloadPath.value = currentDownloadPath;
  
  // Load history from storage
  downloadHistory = await window.electronAPI.loadHistory();
  renderHistory();
  
  // Get GPU codec
  gpuCodec = await window.electronAPI.getGPUCodec();
  console.log('GPU Codec:', gpuCodec);
  
  // Load current queue
  const queueData = await window.electronAPI.queueGet();
  downloadQueue = queueData.queue;
  renderQueue();
  
  // Auto-paste from clipboard on load
  const clipboardText = await window.electronAPI.getClipboard();
  if (clipboardText && isValidUrl(clipboardText)) {
    urlInput.value = clipboardText;
  }
}

// Event Listeners
pasteBtn.addEventListener('click', async () => {
  const text = await window.electronAPI.getClipboard();
  if (text) {
    urlInput.value = text;
    if (isValidUrl(text)) {
      fetchVideoInfo(text);
    }
  }
});

urlInput.addEventListener('paste', async (e) => {
  setTimeout(() => {
    if (isValidUrl(urlInput.value)) {
      fetchVideoInfo(urlInput.value);
    }
  }, 100);
});

downloadBtn.addEventListener('click', startDownload);

settingsBtn.addEventListener('click', () => {
  settingsModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
  settingsModal.classList.remove('active');
});

settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) {
    settingsModal.classList.remove('active');
  }
});

selectPathBtn.addEventListener('click', async () => {
  const path = await window.electronAPI.selectDownloadPath();
  if (path) {
    currentDownloadPath = path;
    downloadPath.value = path;
  }
});

cancelBtn.addEventListener('click', async () => {
  // Get current download from queue
  const queueData = await window.electronAPI.queueGet();
  if (queueData.current) {
    await window.electronAPI.queueCancel(queueData.current.id);
    isPaused = false;
    pauseResumeBtn.textContent = '⏸';
    pauseResumeBtn.title = 'Pause';
  }
});

// Add pause/resume button handler
const pauseResumeBtn = document.getElementById('pauseResumeBtn');
pauseResumeBtn.addEventListener('click', async () => {
  if (isPaused) {
    const result = await window.electronAPI.queueResume();
    if (result) {
      isPaused = false;
      pauseResumeBtn.textContent = '⏸';
      pauseResumeBtn.title = 'Pause';
    }
  } else {
    const result = await window.electronAPI.queuePause();
    if (result) {
      isPaused = true;
      pauseResumeBtn.textContent = '▶';
      pauseResumeBtn.title = 'Resume';
    }
  }
});

// Listen for download progress
window.electronAPI.onDownloadProgress((data) => {
  progressFill.style.width = data.progress + '%';
  progressPercent.textContent = data.progress.toFixed(1) + '%';
  progressSpeed.textContent = data.speed;
  progressEta.textContent = data.eta ? 'ETA: ' + data.eta : '';
});

// Helper Functions
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

async function fetchVideoInfo(url) {
  try {
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = '<span class="btn-text">Loading info...</span>';
    
    const info = await window.electronAPI.getVideoInfo(url);
    
    // Show preview
    document.getElementById('previewThumb').src = info.thumbnail;
    document.getElementById('previewTitle').textContent = info.title;
    document.getElementById('previewMeta').textContent = 
      `${info.uploader || 'Unknown'} • ${formatDuration(info.duration)}`;
    videoPreview.style.display = 'flex';
    
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = '<span class="btn-text">Download</span>';
  } catch (error) {
    console.error('Failed to get video info:', error);
    videoPreview.style.display = 'none';
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = '<span class="btn-text">Download</span>';
  }
}

async function startDownload() {
  const url = urlInput.value.trim();
  
  if (!url || !isValidUrl(url)) {
    alert('Please enter a valid URL');
    return;
  }
  
  videoPreview.style.display = 'none';
  
  // Build arguments
  const args = buildYtDlpArgs(url, currentDownloadPath);
  
  // Add to queue
  try {
    const result = await window.electronAPI.queueAdd({
      url: url,
      options: { args }
    });
    
    urlInput.value = '';
    alert('Added to download queue!');
  } catch (error) {
    console.error('Failed to add to queue:', error);
    alert('Failed to add to queue: ' + error.message);
  }
}

function addToHistory(title, status, downloadPath, isAudio = false) {
  const item = {
    id: Date.now().toString(),
    title: title,
    status: status,
    timestamp: new Date().toLocaleString(),
    path: downloadPath,
    type: isAudio ? 'audio' : 'video',
    fileName: title // Store filename for deletion
  };
  
  downloadHistory.unshift(item);
  
  // Save to persistent storage
  window.electronAPI.saveHistory(downloadHistory);
  
  renderHistory();
}

function renderHistory() {
  if (downloadHistory.length === 0) {
    historyList.innerHTML = '<p class="empty-state">No downloads yet</p>';
    return;
  }
  
  historyList.innerHTML = downloadHistory.map((item, index) => `
    <div class="history-item" data-index="${index}">
      <div class="history-item-content" data-index="${index}">
        <span class="history-item-type">${item.type === 'audio' ? '🎵' : '🎬'}</span>
        <span class="history-item-title">${item.title}</span>
      </div>
      <div class="history-item-actions">
        <span class="history-item-status ${item.status}">${item.status}</span>
        ${item.status === 'success' ? `
          <button class="history-btn show-btn" data-index="${index}" title="Show in folder">📁</button>
          <button class="history-btn delete-btn" data-index="${index}" title="Delete file">🗑️</button>
        ` : ''}
        <button class="history-btn remove-btn" data-index="${index}" title="Remove from history">✕</button>
      </div>
    </div>
  `).join('');
  
  // Add click handlers to history items
  document.querySelectorAll('.history-item-content').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index);
      const historyItem = downloadHistory[index];
      if (historyItem.status === 'success' && historyItem.path) {
        window.electronAPI.openDownloadFolder(historyItem.path);
      }
    });
  });
  
  // Add handlers for action buttons
  document.querySelectorAll('.show-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index);
      const historyItem = downloadHistory[index];
      if (historyItem.path) {
        const filePath = path.join(historyItem.path, historyItem.fileName + (historyItem.type === 'audio' ? '.mp3' : '.mp4'));
        await window.electronAPI.showItemInFolder(filePath);
      }
    });
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index);
      const historyItem = downloadHistory[index];
      
      if (confirm(`Delete "${historyItem.title}"?`)) {
        const filePath = path.join(historyItem.path, historyItem.fileName + (historyItem.type === 'audio' ? '.mp3' : '.mp4'));
        const deleted = await window.electronAPI.deleteFile(filePath);
        
        if (deleted) {
          historyItem.status = 'deleted';
          window.electronAPI.saveHistory(downloadHistory);
          renderHistory();
        } else {
          alert('Failed to delete file. It may have been moved or already deleted.');
        }
      }
    });
  });
  
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index);
      const historyItem = downloadHistory[index];
      
      if (confirm(`Remove "${historyItem.title}" from history?`)) {
        downloadHistory.splice(index, 1);
        window.electronAPI.saveHistory(downloadHistory);
        renderHistory();
      }
    });
  });
}

function formatDuration(seconds) {
  if (!seconds) return 'Unknown';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Clear history button
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
clearHistoryBtn.addEventListener('click', () => {
  if (confirm('Clear all download history? This will not delete the files.')) {
    downloadHistory = [];
    window.electronAPI.saveHistory(downloadHistory);
    renderHistory();
  }
});

// Clear queue button
clearQueueBtn.addEventListener('click', async () => {
  if (confirm('Clear download queue? Current download will continue.')) {
    await window.electronAPI.queueClear();
  }
});

// Queue event listeners
window.electronAPI.onQueueProgress((data) => {
  progressFill.style.width = data.progress + '%';
  progressPercent.textContent = data.progress.toFixed(1) + '%';
  progressSpeed.textContent = data.speed || '';
  progressEta.textContent = data.eta ? 'ETA: ' + data.eta : '';
  
  renderQueue();
});

window.electronAPI.onQueueUpdated((queue) => {
  downloadQueue = queue;
  renderQueue();
});

window.electronAPI.onQueueItemStarted((item) => {
  currentDownload.style.display = 'block';
  currentTitle.textContent = `Downloading: ${item.url}`;
  progressFill.style.width = '0%';
  progressPercent.textContent = '0%';
  renderQueue();
});

window.electronAPI.onQueueItemCompleted((item) => {
  addToHistory(item.url, 'success', currentDownloadPath, formatSelect.value === 'mp3');
  renderQueue();
});

window.electronAPI.onQueueItemFailed((item) => {
  console.error('Download failed:', item);
  addToHistory(item.url, 'failed', currentDownloadPath, formatSelect.value === 'mp3');
  renderQueue();
  
  // Show error to user
  const errorMsg = item.error || 'Unknown error';
  alert(`Download failed!\n\nURL: ${item.url}\n\nError: ${errorMsg}\n\nCheck the console for more details.`);
});

window.electronAPI.onQueueItemCancelled((item) => {
  addToHistory(item.url, 'cancelled', currentDownloadPath, formatSelect.value === 'mp3');
  renderQueue();
});

window.electronAPI.onQueueDone(() => {
  currentDownload.style.display = 'none';
  downloadBtn.disabled = false;
  isPaused = false;
  pauseResumeBtn.textContent = '⏸';
  pauseResumeBtn.title = 'Pause';
  alert('All downloads completed!');
});

// Listen for pause/resume events
window.electronAPI.onQueueItemPaused?.(() => {
  isPaused = true;
  pauseResumeBtn.textContent = '▶';
  pauseResumeBtn.title = 'Resume';
});

window.electronAPI.onQueueItemResumed?.(() => {
  isPaused = false;
  pauseResumeBtn.textContent = '⏸';
  pauseResumeBtn.title = 'Pause';
});

// Render queue
function renderQueue() {
  if (downloadQueue.length === 0) {
    queueList.innerHTML = '<p class="empty-state">No items in queue</p>';
    return;
  }
  
  queueList.innerHTML = downloadQueue.map((item, index) => `
    <div class="queue-item ${item.status === 'downloading' ? 'active' : ''}">
      <div class="queue-item-info">
        <div class="queue-item-title">${item.url}</div>
        <div class="queue-item-status">${item.status} ${item.progress ? `- ${item.progress.toFixed(0)}%` : ''}</div>
        ${item.progress ? `
          <div class="queue-item-progress">
            <div class="queue-item-progress-fill" style="width: ${item.progress}%"></div>
          </div>
        ` : ''}
      </div>
      <div class="queue-item-actions">
        <button class="queue-item-btn cancel-queue-btn" data-id="${item.id}">✕</button>
      </div>
    </div>
  `).join('');
  
  // Add cancel handlers
  document.querySelectorAll('.cancel-queue-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      await window.electronAPI.queueCancel(id);
    });
  });
}

// Build yt-dlp arguments based on format selection
function buildYtDlpArgs(url, downloadPath) {
  const args = [
    '--newline',
    '--progress',
    '-o', `${downloadPath}/%(title)s.%(ext)s`
  ];
  
  const format = formatSelect.value;
  const useGPU = gpuAccelCheck.checked;
  
  // Format selection
  switch (format) {
    case 'mp3':
      args.push('-x', '--audio-format', 'mp3');
      break;
    case '4k':
      args.push('-f', 'bestvideo[height>=2160]+bestaudio/best');
      if (useGPU) {
        args.push('--postprocessor-args', `ffmpeg:-c:v ${gpuCodec}`);
      }
      break;
    case '1080p':
      args.push('-f', 'bestvideo[height<=1080]+bestaudio/best');
      if (useGPU) {
        args.push('--postprocessor-args', `ffmpeg:-c:v ${gpuCodec}`);
      }
      break;
    case '720p':
      args.push('-f', 'bestvideo[height<=720]+bestaudio/best');
      if (useGPU) {
        args.push('--postprocessor-args', `ffmpeg:-c:v ${gpuCodec}`);
      }
      break;
    default: // mp4
      args.push('-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best');
      if (useGPU) {
        args.push('--postprocessor-args', `ffmpeg:-c:v ${gpuCodec}`);
      }
  }
  
  // Playlist option
  if (!playlistCheck.checked) {
    args.push('--no-playlist');
  }
  
  args.push(url);
  
  return args;
}

// Initialize app
init();
