const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getOsInfo: () => ipcRenderer.invoke("system-os"),
  getCpuInfo: () => ipcRenderer.invoke("system-cpu"),
  getDiskInfo: () => ipcRenderer.invoke("system-disk"),
  getNetworkInfo: () => ipcRenderer.invoke("system-network"),
  getRamInfo: () => ipcRenderer.invoke("system-ram"),

});
