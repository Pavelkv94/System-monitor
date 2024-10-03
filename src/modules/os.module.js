const si = require("systeminformation");
const electron = require("electron");
const os = require("os");

const getOsModule = () => {
  async function getOsInfo() {
    const osInfo = await si.osInfo();

    return [
      { title: "Platform", value: osInfo.platform },
      { title: "Distribution", value: osInfo.distro },
      { title: "Release", value: osInfo.release },
      { title: "Codename", value: osInfo.codename },
      { title: "Architecture", value: osInfo.arch },
      { title: "hostname", value: osInfo.hostname },
      { title: "serial", value: osInfo.serial },
      { title: "UpTime", value: os.uptime() },
    ];
  }

  // Expose the getSystemInfo function to the renderer process
  electron.ipcMain.handle("system-os", async () => getOsInfo());
};

module.exports = getOsModule;
