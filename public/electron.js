const path = require("path");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
    show: false,
  });

  win.maximize();
  win.show();

  // Load from Vite dev server in development or built files in production
  win.loadURL(
    isDev
      ? "http://localhost:5173"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools in development
  if (isDev) {
    win.webContents.openDevTools({ mode: "right" });
  }

  require("@electron/remote/main").enable(win.webContents)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
