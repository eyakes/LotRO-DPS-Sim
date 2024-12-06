document.addEventListener("DOMContentLoaded", function () {
  const raceSelect = document.getElementById("race-select");
  const classSelect = document.getElementById("class-select");
  const raceIcon = document.getElementById("race-icon");
  const classIcon = document.getElementById("class-icon");
  const levelInput = document.getElementById("level-input");

  let racesData = [];
  let classesData = [];

  // Fetch race data
  fetch("https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/races.xml")
    .then((res) => res.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      racesData = Array.from(xmlDoc.getElementsByTagName("race"));

      populateRaceDropdown();
      updateRaceIcon();
      filterClasses(); // Populate class dropdown based on default race
    });

  // Fetch class data
  fetch("https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/classes.xml")
    .then((res) => res.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      classesData = Array.from(xmlDoc.getElementsByTagName("class"));

      populateClassDropdown(); // Initial population
      updateClassIcon();
    });

  // Populate race dropdown
  function populateRaceDropdown() {
    raceSelect.innerHTML = ""; // Clear existing options
    racesData.forEach((race) => {
      const raceId = race.getAttribute("id");
      const raceName = race.getAttribute("legacyLabel");
      const genderIcon = race.querySelector("gender").getAttribute("iconId");

      const option = document.createElement("option");
      option.value = raceId;
      option.textContent = raceName;
      option.dataset.iconId = genderIcon;

      raceSelect.appendChild(option);
    });
  }

  // Populate class dropdown based on the selected race
  function filterClasses() {
    const selectedRaceId = raceSelect.value;
    const selectedRace = racesData.find((race) => race.getAttribute("id") === selectedRaceId);
    const allowedClasses = Array.from(selectedRace.getElementsByTagName("allowedClass")).map(
      (allowedClass) => allowedClass.getAttribute("id")
    );

    classSelect.innerHTML = ""; // Clear existing options

    let firstCompatibleClassId = null;

    classesData.forEach((cls) => {
      const classId = cls.getAttribute("id");
      const className = cls.getAttribute("name");
      const classIcon = cls.getAttribute("iconId");

      if (allowedClasses.includes(classId)) {
        const option = document.createElement("option");
        option.value = classId;
        option.textContent = className;
        option.dataset.iconId = classIcon;

        classSelect.appendChild(option);

        // Set the first compatible class as default
        if (!firstCompatibleClassId) {
          firstCompatibleClassId = classId;
        }
      }
    });

    if (classSelect.value !== firstCompatibleClassId) {
      classSelect.value = firstCompatibleClassId;
    }

    updateClassIcon();
  }

  // Update race icon
  function updateRaceIcon() {
    const selectedOption = raceSelect.options[raceSelect.selectedIndex];
    const iconId = selectedOption.dataset.iconId;
    raceIcon.src = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/races/${iconId}.png`;

    filterClasses(); // Update class dropdown when race changes
  }

  // Update class icon
  function updateClassIcon() {
    const selectedOption = classSelect.options[classSelect.selectedIndex];
    const iconId = selectedOption.dataset.iconId;
    classIcon.src = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/classes/${iconId}.png`;
  }

  // Ensure level input stays between 1 and 150
  levelInput.addEventListener("input", function () {
    if (levelInput.value > 150) {
      levelInput.value = 150;
    } else if (levelInput.value < 1) {
      levelInput.value = 1;
    }
  });

  // Event listeners
  raceSelect.addEventListener("change", updateRaceIcon);
  classSelect.addEventListener("change", updateClassIcon);
});
