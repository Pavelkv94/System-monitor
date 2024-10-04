const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const getOsModule = require("./modules/os/os.module");
const getTempInfoModule = require("./modules/cpu/cpu.module");
const getDiskModule = require("./modules/disk/disk.module");
const getNetworkModule = require("./modules/network/network.module");
const getRamModule = require("./modules/ram/ram.module");

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 600,
    minWidth: 800,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(null);

  win.loadFile("index.html");

  // win.webContents.openDevTools();
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
getRamModule();
