const si = require("systeminformation");
const electron = require("electron");
const os = require("os");

function formatUpTime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${days}d ${hours}h ${minutes}m ${secs.toFixed(0)}s`;
}

const getOsModule = () => {
  async function getOsInfo() {
    const osInfo = await si.osInfo();
    const upTime = os.uptime();

    return [
      { title: "Platform", value: osInfo.platform },
      { title: "Distribution", value: osInfo.distro },
      { title: "Release", value: osInfo.release },
      { title: "Codename", value: osInfo.codename },
      { title: "Architecture", value: osInfo.arch },
      { title: "Hostname", value: osInfo.hostname },
      { title: "Serial", value: osInfo.serial },
      { title: "UpTime", value: formatUpTime(upTime) },
    ];
  }

  electron.ipcMain.handle("system-os", async () => getOsInfo());
};

module.exports = getOsModule;
