document.addEventListener("DOMContentLoaded", function () {
  const raceSelect = document.getElementById("race-select");
  const classSelect = document.getElementById("class-select");
  const raceIcon = document.getElementById("race-icon");
  const classIcon = document.getElementById("class-icon");

  // Fetch race data
  fetch("https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/races.xml")
    .then((res) => res.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const races = Array.from(xmlDoc.getElementsByTagName("race"));

      races.forEach((race) => {
        const raceId = race.getAttribute("id");
        const raceName = race.getAttribute("legacyLabel");
        const genderIcon = race.querySelector("gender").getAttribute("iconId");

        const option = document.createElement("option");
        option.value = raceId;
        option.textContent = raceName;
        option.dataset.iconId = genderIcon;

        raceSelect.appendChild(option);
      });

      updateRaceIcon();
    });

  // Fetch class data
  fetch("https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/classes.xml")
    .then((res) => res.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const classes = Array.from(xmlDoc.getElementsByTagName("class"));

      classes.forEach((cls) => {
        const classId = cls.getAttribute("id");
        const className = cls.getAttribute("name");
        const classIcon = cls.getAttribute("iconId");

        const option = document.createElement("option");
        option.value = classId;
        option.textContent = className;
        option.dataset.iconId = classIcon;

        classSelect.appendChild(option);
      });

      updateClassIcon();
    });

  // Update race icon
  function updateRaceIcon() {
    const selectedOption = raceSelect.options[raceSelect.selectedIndex];
    const iconId = selectedOption.dataset.iconId;
    raceIcon.src = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/races/${iconId}.png`;
  }

  // Update class icon
  function updateClassIcon() {
    const selectedOption = classSelect.options[classSelect.selectedIndex];
    const iconId = selectedOption.dataset.iconId;
    classIcon.src = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/classes/${iconId}.png`;
  }

  // Event listeners
  raceSelect.addEventListener("change", updateRaceIcon);
  classSelect.addEventListener("change", updateClassIcon);
});
