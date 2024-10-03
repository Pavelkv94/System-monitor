const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const getOsModule = require("./modules/os.module");
const getTempInfoModule = require("./modules/cpu.module");
const getDiskModule = require("./modules/disk.module");
const getNetworkModule = require("./modules/network.module");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(null);

  win.loadFile("index.html");

  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

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

getOsModule();
getTempInfoModule();
getDiskModule();
getNetworkModule();
