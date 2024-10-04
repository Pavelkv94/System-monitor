export const getDiskRender = () => {
  const rootDiv = document.getElementById("disk");
  const newh2Element = document.createElement("h2");
  newh2Element.innerHTML = "Disk Information";
  rootDiv.append(newh2Element);

  const updateDiskInfo = () => {
    window.api
      .getDiskInfo()
      .then((info) => {
        rootDiv.innerHTML = "";
        rootDiv.append(newh2Element); 

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        table.append(thead);
        table.append(tbody);

        const headers = Object.values(info.diskSpace[0]); 

        headers.forEach((el) => {
          const th = document.createElement("th");
          th.innerHTML = el;
          thead.append(th);
        });

        info.diskSpace.forEach((el) => {
          const tr = document.createElement("tr");
          const data = Object.values(el);
          data.forEach((obj) => {
            const td = document.createElement("td");
            td.innerHTML = obj;
            tr.append(td);
          });
          tbody.append(tr);
        });

        info.diskInfo.forEach((element) => {
          const pElement = document.createElement("p");
          pElement.innerHTML = `<b>${element.title}:</b> ${element.value}`;
          rootDiv.append(pElement);
        });

        rootDiv.append(table);
      })
      .catch((error) => {
        console.error("Error fetching disk info:", error);
      });
  };

  updateDiskInfo();

  const intervalId = setInterval(updateDiskInfo, 5000);

  window.addEventListener("unload", () => {
    clearInterval(intervalId);
  });
};
