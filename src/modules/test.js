const si = require("systeminformation");

const watch = async () => {
  const output = await si.battery();
  console.log(output);
};

watch();
