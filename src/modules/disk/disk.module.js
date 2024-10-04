const si = require("systeminformation");
const electron = require("electron");
const os = require("os");
const { execSync } = require("child_process");

const getDiskModule = () => {
  async function getDiskInfo() {
    const disks = await si.diskLayout();
    const diskInfo = disks.map((disk) => ({
      title: disk.name,
      value: `${(disk.size / 1024 ** 3).toFixed(2)} GB, Type: ${disk.type}`,
    }));

    function getDiskSpace() {
      let output;
      try {
        output = execSync("df -h").toString();
      } catch (error) {
        return "Error retrieving disk space";
      }
      const lines = output.split("\n");
      const wrappedLines = lines.map((line) => {
        const lineElements = line.split(/\s+/).filter((word) => word.length > 0);
        return lineElements;
      });

      const result = wrappedLines
        .filter((item) => item.length > 0)
        .map((item) => ({
          filesystem: item[0],
          size: item[1],
          used: item[2],
          avail: item[3],
          use: item[4],
          mounted: item[5],
        }));

      // Join the wrapped lines back into a single string
      return result;
    }
    const diskSpace = getDiskSpace();

    return { diskInfo, diskSpace };
  }

  electron.ipcMain.handle("system-disk", async () => getDiskInfo());
};

module.exports = getDiskModule;
