const si = require("systeminformation");
const electron = require("electron");

const getNetworkModule = () => {
  async function getNetworkInfo() {
    const networkInterfaces = await si.networkInterfaces();

    const networkInfo = networkInterfaces.map((iface) => ({
      title: iface.iface,
      value: `IP: ${iface.ip4 || "N/A"}, MAC: ${iface.mac}, Speed: ${iface.speed || "N/A"} Mbps`,
    }));
    return networkInfo;
  }

  electron.ipcMain.handle("system-network", async () => getNetworkInfo());
};

module.exports = getNetworkModule;
