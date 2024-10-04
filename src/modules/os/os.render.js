export const getOsRender = () => {
  const rootDiv = document.getElementById("os");
  const h2Element = document.createElement("h2");
  h2Element.innerHTML = "Operating System Information";
  rootDiv.append(h2Element);

  // Function to update OS info
  const updateOsInfo = () => {
    window.api
      .getOsInfo()
      .then((info) => {
        // Clear previous info
        rootDiv.querySelectorAll("p").forEach((p) => p.remove());

        // Append new info
        info.forEach((element) => {
          const pElement = document.createElement("p");
          pElement.innerHTML = `<b>${element.title}:</b> ${element.value}`;
          rootDiv.append(pElement);
        });
      })
      .catch((error) => {
        console.error("Error fetching system info:", error);
      });
  };

  updateOsInfo();

  const intervalId = setInterval(updateOsInfo, 1000);

  // Optional: Clear interval when no longer needed
  // For example, when the component is unmounted or on window close
  window.addEventListener("unload", () => {
    clearInterval(intervalId);
  });
};
