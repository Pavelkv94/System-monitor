const si = require("systeminformation");
const electron = require("electron");
const os = require("os");

const getCpuInfoModule = () => {
  async function getCpuInfo() {
    const cpu = await si.cpu();
    const cpuSpeed = await si.cpuCurrentSpeed();

    const cpuInfo = [
      { title: "CPU Manufacturer", value: cpu.manufacturer },
      { title: "CPU Brand", value: cpu.brand },
      { title: "CPU Speed", value: `${cpu.speed} GHz` },
      { title: "CPU Cores", value: cpu.cores },
      { title: "CPU Physical Cores", value: cpu.physicalCores },
      { title: "CPU Current Speed", value: `${cpuSpeed.avg} GHz` },
    ];
    // cpus: os.cpus(),

    // const sensorsData = await si.sensors();

    //   sensorsData.main.forEach((sensor) => {
    //     console.log(`  Sensor: ${sensor.label}, Temperature: ${sensor.value} °C`);
    // });
    //   console.log(osInfo);

    //     `
    //           <h2>Operating System</h2>
    //           <pre>
    // Platform: ${info.platform}
    // Architecture: ${info.arch}
    // Release: ${info.release}
    // Hostname: ${info.hostname}
    // Uptime: ${info.uptime} seconds
    // Total Memory: ${info.totalmem / 1024 / 1024} Mbytes
    // Free Memory: ${info.freemem / 1024 / 1024} Mbytes
    // Used Memory: ${(info.totalmem - info.freemem) / 1024 / 1024} Mbytes
    //           </pre>
    //           <h2>Processors</h2>
    //           <pre>${info.cpus
    //             .map(
    //               (cpu, index) => `
    // Core ${index}:
    //   Model: ${cpu.model}
    //   Speed: ${cpu.speed} MHz
    //   Times: ${JSON.stringify(cpu.times)}
    // `
    //             )
    //             .join("")}
    //           </pre>
    //           <h2>Network Interfaces</h2>
    //           <pre>${Object.entries(info.networkInterfaces)
    //             .map(
    //               ([name, interfaces]) => `
    // Interface: ${name}
    // ${interfaces
    //   .map(
    //     (iface) => `
    //   Address: ${iface.address}
    //   Family: ${iface.family}
    //   MAC: ${iface.mac}
    //   Internal: ${iface.internal ? "Yes" : "No"}
    // `
    //   )
    //   .join("")}
    // `
    //             )
    //             .join("")}
    //           </pre>
    //           <h2>Disk Space</h2>
    //           <pre>${info.diskSpace}</pre>
    //         `;
    return cpuInfo;
  }

  electron.ipcMain.handle("system-cpu", async () => getCpuInfo());
};

module.exports = getCpuInfoModule;
