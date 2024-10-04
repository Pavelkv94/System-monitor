export const getNetworkRender = () => {
  window.api
    .getNetworkInfo()
    .then((info) => {
      const rootDiv = document.getElementById("network");
      const newh2Element = document.createElement("h2");
      newh2Element.innerHTML = "Network Interfaces";

      rootDiv.append(newh2Element);

      info.forEach((element, i) => {
        const pElement = document.createElement("p");
        pElement.innerHTML = `${i + 1}. <b>${element.title}:</b> ${element.value}`;
        rootDiv.append(pElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching system max:", error);
    });
};
