export const getRamRender = () => {
  const rootDiv = document.getElementById("ram");
  const newh2Element = document.createElement("h2");
  newh2Element.innerHTML = "RAM Information";
  rootDiv.append(newh2Element);
  const ramWraper = document.createElement("div");
  rootDiv.append(ramWraper);

  const wrap = document.createElement("section");
  const wrap2 = document.createElement("section");

  ramWraper.append(wrap);
  ramWraper.append(wrap2);

  function setFill(value) {
    const progressCircle = document.querySelector(".progress");
    const labelElement = document.getElementById("label");

    // Clamp value between 0 and 100
    value = Math.max(0, Math.min(100, value));
    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    // Calculate the stroke-dasharray value
    const fillAmount = (value / 100) * circumference;
    progressCircle.style.strokeDasharray = `${fillAmount} ${circumference}`;

    // Update the label
    labelElement.textContent = `${value}%`;
  }

  const updateRamInfo = () => {
    window.api
      .getRamInfo()
      .then((info) => {
        wrap.querySelectorAll("p").forEach((p) => p.remove());

        info.forEach((element) => {
          const pElement = document.createElement("p");
          pElement.innerHTML = `<b>${element.title}:</b> ${element.value}`;
          wrap.append(pElement);
        });

        const total = info.find((el) => el.title === "Total Memory") || info[0];
        const available = info.find((el) => el.title === "Available Memory") || info[1];

        const totalValue = total.value.split(" ")[0];
        const availableValue = available.value.split(" ")[0];
        const busyMem = (100 - (+availableValue * 100) / +totalValue).toFixed();

        wrap2.innerHTML = `<div class="ring">
      <svg width="150" height="150">
        <circle class="background" cx="75" cy="80" r="60"></circle>
        <circle class="progress" cx="75" cy="80" r="60"></circle>
      </svg>
      <div class="label" id="label">0%</div>
    </div>`;

        setFill(busyMem);
      })
      .catch((error) => {
        console.error("Error fetching system max:", error);
      });
  };

  updateRamInfo();

  const intervalId = setInterval(updateRamInfo, 1500);

  // Optional: Clear interval when no longer needed
  // For example, when the component is unmounted or on window close
  window.addEventListener("unload", () => {
    clearInterval(intervalId);
  });
};
