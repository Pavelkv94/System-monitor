const si = require("systeminformation");
const electron = require("electron");
const os = require("os");

const getRamModule = () => {
  async function getRamInfo() {
    const memory = await si.mem();

    const memoryInfo = [
      { title: "Total Memory", value: (memory.total / 1024 ** 3).toFixed(2) + " GB" },
      { title: "Available Memory", value: (memory.available / 1024 ** 3).toFixed(2) + " GB" },
      { title: "Free Memory", value: (memory.free / 1024 ** 3).toFixed(2) + " GB" },
      { title: "Used Memory", value: ((memory.total - memory.free) / 1024 ** 3).toFixed(2) + " GB" },
      { title: "Active Memory", value: (memory.active / 1024 ** 3).toFixed(2) + " GB" },
      { title: "Cached Memory", value: (memory.cached / 1024 ** 3).toFixed(2) + " GB" },
    ];

    return memoryInfo;
  }

  electron.ipcMain.handle("system-ram", async () => getRamInfo());
};

module.exports = getRamModule;
