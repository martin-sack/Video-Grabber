const { spawn } = require("child_process");
const EventEmitter = require("events");
const { getYtDlpExecutable } = require("./getYtDlpExecutable");

class DownloadQueue extends EventEmitter {
  constructor() {
    super();
    this.queue = [];
    this.isDownloading = false;
    this.current = null;
    this.currentProcess = null;
  }

  add(url, options) {
    const item = {
      id: Date.now().toString() + Math.random(),
      url,
      options,
      status: "queued",
      progress: 0,
      addedAt: new Date().toISOString()
    };
    
    this.queue.push(item);
    this.emit("queue-updated", this.queue);

    if (!this.isDownloading) {
      this.startNext();
    }
    
    return item.id;
  }

  startNext() {
    if (this.queue.length === 0) {
      this.isDownloading = false;
      this.current = null;
      this.emit("done");
      return;
    }

    this.isDownloading = true;
    this.current = this.queue.shift();
    this.current.status = "downloading";
    this.emit("queue-updated", this.queue);
    this.emit("started", this.current);

    this.downloadCurrent();
  }

  downloadCurrent() {
    const { url, options } = this.current;
    const args = options.args || [];

    console.log("=== Starting Download ===");
    console.log("URL:", url);
    console.log("Args:", args);
    console.log("yt-dlp path:", getYtDlpExecutable());

    const yt = spawn(getYtDlpExecutable(), args);
    this.currentProcess = yt;
    
    let errorOutput = "";

    yt.stdout.on("data", (data) => {
      const output = data.toString();
      
      // Parse progress
      const progressMatch = output.match(/(\d+\.?\d*)%/);
      const speedMatch = output.match(/(\d+\.?\d*\w+\/s)/);
      const etaMatch = output.match(/ETA\s+(\d+:\d+)/);

      if (progressMatch) {
        this.current.progress = parseFloat(progressMatch[1]);
        this.current.speed = speedMatch ? speedMatch[1] : "";
        this.current.eta = etaMatch ? etaMatch[1] : "";
      }

      this.emit("progress", {
        id: this.current.id,
        output,
        progress: this.current.progress,
        speed: this.current.speed,
        eta: this.current.eta
      });
    });

    yt.stderr.on("data", (data) => {
      const error = data.toString();
      errorOutput += error;
      console.error("yt-dlp stderr:", error);
      this.emit("progress", {
        id: this.current.id,
        output: error,
        error: true
      });
    });

    yt.on("close", (code) => {
      console.log("=== Download Finished ===");
      console.log("Exit code:", code);
      console.log("Error output:", errorOutput);
      
      if (code === 0) {
        this.current.status = "completed";
        this.emit("completed", this.current);
      } else {
        this.current.status = "failed";
        this.current.error = errorOutput || "Download failed with code " + code;
        this.emit("failed", this.current);
      }
      this.currentProcess = null;
      this.startNext();
    });

    yt.on("error", (err) => {
      console.error("=== yt-dlp Spawn Error ===");
      console.error("Error:", err);
      console.error("Path tried:", getYtDlpExecutable());
      
      this.current.status = "failed";
      this.current.error = err.message;
      this.emit("failed", this.current);
      this.currentProcess = null;
      this.startNext();
    });
  }

  cancel(id) {
    // Cancel current download
    if (this.current && this.current.id === id) {
      if (this.currentProcess) {
        this.currentProcess.kill();
        this.currentProcess = null;
      }
      this.current.status = "cancelled";
      this.emit("cancelled", this.current);
      this.startNext();
      return true;
    }

    // Remove from queue
    const index = this.queue.findIndex(item => item.id === id);
    if (index !== -1) {
      const item = this.queue.splice(index, 1)[0];
      item.status = "cancelled";
      this.emit("cancelled", item);
      this.emit("queue-updated", this.queue);
      return true;
    }

    return false;
  }

  pause() {
    if (this.currentProcess && process.platform !== 'win32') {
      try {
        this.currentProcess.kill('SIGSTOP');
        this.current.status = "paused";
        this.emit("paused", this.current);
        return true;
      } catch (err) {
        console.error("Pause error:", err);
        return false;
      }
    }
    return false;
  }

  resume() {
    if (this.currentProcess && process.platform !== 'win32') {
      try {
        this.currentProcess.kill('SIGCONT');
        this.current.status = "downloading";
        this.emit("resumed", this.current);
        return true;
      } catch (err) {
        console.error("Resume error:", err);
        return false;
      }
    }
    return false;
  }

  getQueue() {
    return this.queue;
  }

  getCurrent() {
    return this.current;
  }

  clear() {
    this.queue = [];
    this.emit("queue-updated", this.queue);
  }
}

module.exports = new DownloadQueue();
