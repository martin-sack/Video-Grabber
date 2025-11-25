const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getClipboard: () => ipcRenderer.invoke('get-clipboard'),
  selectDownloadPath: () => ipcRenderer.invoke('select-download-path'),
  getDefaultPath: () => ipcRenderer.invoke('get-default-path'),
  getVideoInfo: (url) => ipcRenderer.invoke('get-video-info', url),
  downloadVideo: (options) => ipcRenderer.invoke('download-video', options),
  cancelDownload: (id) => ipcRenderer.invoke('cancel-download', id),
  pauseDownload: (id) => ipcRenderer.invoke('pause-download', id),
  resumeDownload: (id) => ipcRenderer.invoke('resume-download', id),
  deleteFile: (path) => ipcRenderer.invoke('delete-file', path),
  openDownloadFolder: (path) => ipcRenderer.invoke('open-download-folder', path),
  showItemInFolder: (path) => ipcRenderer.invoke('show-item-in-folder', path),
  saveHistory: (history) => ipcRenderer.invoke('save-history', history),
  loadHistory: () => ipcRenderer.invoke('load-history'),
  
  // Queue management
  queueAdd: (payload) => ipcRenderer.invoke('queue-add', payload),
  queueCancel: (id) => ipcRenderer.invoke('queue-cancel', id),
  queuePause: () => ipcRenderer.invoke('queue-pause'),
  queueResume: () => ipcRenderer.invoke('queue-resume'),
  queueGet: () => ipcRenderer.invoke('queue-get'),
  queueClear: () => ipcRenderer.invoke('queue-clear'),
  getGPUCodec: () => ipcRenderer.invoke('get-gpu-codec'),
  
  // Event listeners
  onDownloadProgress: (callback) => {
    ipcRenderer.on('download-progress', (event, data) => callback(data));
  },
  onQueueProgress: (callback) => {
    ipcRenderer.on('queue-progress', (event, data) => callback(data));
  },
  onQueueUpdated: (callback) => {
    ipcRenderer.on('queue-updated', (event, data) => callback(data));
  },
  onQueueItemStarted: (callback) => {
    ipcRenderer.on('queue-item-started', (event, data) => callback(data));
  },
  onQueueItemCompleted: (callback) => {
    ipcRenderer.on('queue-item-completed', (event, data) => callback(data));
  },
  onQueueItemFailed: (callback) => {
    ipcRenderer.on('queue-item-failed', (event, data) => callback(data));
  },
  onQueueItemCancelled: (callback) => {
    ipcRenderer.on('queue-item-cancelled', (event, data) => callback(data));
  },
  onQueueDone: (callback) => {
    ipcRenderer.on('queue-done', () => callback());
  },
  onQueueItemPaused: (callback) => {
    ipcRenderer.on('queue-item-paused', (event, data) => callback(data));
  },
  onQueueItemResumed: (callback) => {
    ipcRenderer.on('queue-item-resumed', (event, data) => callback(data));
  }
});
