const si = require("systeminformation");
const electron = require("electron");
const os = require("os");

const getDiskModule = () => {
  async function getDiskInfo() {
    const disks = await si.diskLayout();
    const diskInfo = disks.map((disk) => ({
      title: disk.name,
      value: `${(disk.size / 1024 ** 3).toFixed(2)} GB, Type: ${disk.type}, Mountpoint: ${disk.mountpoint}`,
    }));
    const memory = await si.mem();
    const memoryInfo = [
      { title: "Total Memory", value: (memory.total / 1024 ** 3).toFixed(2) + " GB" },
      { title: "Free Memory", value: (memory.free / 1024 ** 3).toFixed(2) + " GB" },
      { title: "Used Memory", value: ((memory.total - memory.free) / 1024 ** 3).toFixed(2) + " GB" },
      { title: "Active Memory", value: (memory.active / 1024 ** 3).toFixed(2) + " GB" },
      { title: "Available Memory", value: (memory.available / 1024 ** 3).toFixed(2) + " GB" },
    ];
    function getDiskSpace() {
      let output;
      try {
        output = execSync("df -h").toString();
      } catch (error) {
        console.error("Ошибка при получении информации о дисковом пространстве:", error);
        return "Error retrieving disk space";
      }
      return output;
    }

    return [...diskInfo, ...memoryInfo];
  }

  electron.ipcMain.handle("system-disk", async () => getDiskInfo());
};

module.exports = getDiskModule;
