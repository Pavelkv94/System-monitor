import { getCpuRender } from "./modules/cpu/cpu.render.js";
import { getDiskRender } from "./modules/disk/disk.render.js";
import { getNetworkRender } from "./modules/network/network.render.js";
import { getOsRender } from "./modules/os/os.render.js";
import { getRamRender } from "./modules/ram/ram.render.js";

getNetworkRender();
getCpuRender();
getDiskRender();
getOsRender();
getRamRender()