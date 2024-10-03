window.api
  .getOsInfo()
  .then((info) => {
    const rootDiv = document.getElementById("os");
    const h2Element = document.createElement("h2");
    h2Element.innerHTML = "Operating System Information";
    rootDiv.append(h2Element);

    info.forEach((element) => {
      const pElement = document.createElement("p");
      pElement.innerHTML = `${element.title}: ${element.value}`;
      rootDiv.append(pElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching system info:", error);
  });

window.api
  .getCpuInfo()
  .then((info) => {
    const rootDiv = document.getElementById("cpu");
    const newh2Element = document.createElement("h2");
    newh2Element.innerHTML = "CPU Information";

    rootDiv.append(newh2Element);

    info.forEach((element) => {
      const pElement = document.createElement("p");
      pElement.innerHTML = `${element.title}: ${element.value}`;
      rootDiv.append(pElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching system max:", error);
  });

window.api
  .getDiskInfo()
  .then((info) => {
    const rootDiv = document.getElementById("disk");
    const newh2Element = document.createElement("h2");
    newh2Element.innerHTML = "Disk Information";

    rootDiv.append(newh2Element);

    info.forEach((element) => {
      const pElement = document.createElement("p");
      pElement.innerHTML = `${element.title}: ${element.value}`;
      rootDiv.append(pElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching system max:", error);
  });

window.api
  .getNetworkInfo()
  .then((info) => {
    const rootDiv = document.getElementById("network");
    const newh2Element = document.createElement("h2");
    newh2Element.innerHTML = "Network Information";

    rootDiv.append(newh2Element);

    info.forEach((element) => {
      const pElement = document.createElement("p");
      pElement.innerHTML = `${element.title}: ${element.value}`;
      rootDiv.append(pElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching system max:", error);
  });
