export const getCpuRender = () => {
  const rootDiv = document.getElementById("cpu");
  const newh2Element = document.createElement("h2");
  newh2Element.innerHTML = "CPU Information";
  rootDiv.append(newh2Element);

  const updateCpuInfo = () => {
    window.api
      .getCpuInfo()
      .then((info) => {
        rootDiv.querySelectorAll("p").forEach((p) => p.remove());

        info.forEach((element) => {
          const pElement = document.createElement("p");
          pElement.innerHTML = `<b>${element.title}:</b> ${element.value}`;
          rootDiv.append(pElement);
        });
      })
      .catch((error) => {
        console.error("Error fetching system max:", error);
      });
  };

  updateCpuInfo();

  const intervalId = setInterval(updateCpuInfo, 3000);

  // Optional: Clear interval when no longer needed
  // For example, when the component is unmounted or on window close
  window.addEventListener("unload", () => {
    clearInterval(intervalId);
  });
};
