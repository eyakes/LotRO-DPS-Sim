document.addEventListener('DOMContentLoaded', function () {
  const raceSelect = document.getElementById('race-select');
  const classSelect = document.getElementById('class-select');
  const raceIcon = document.getElementById('race-icon');
  const classIcon = document.getElementById('class-icon');

  let raceData = null; // Cache for race data
  let classData = null; // Cache for class data

  // Fetch race data on initialization
  fetch('https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/races.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      raceData = parser.parseFromString(data, "text/xml");
      populateRaceDropdown();
    })
    .catch(error => console.error('Error fetching races.xml:', error));

  // Fetch class data on initialization
  fetch('https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/classes.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      classData = parser.parseFromString(data, "text/xml");
    })
    .catch(error => console.error('Error fetching classes.xml:', error));

  // Populate the race dropdown
  function populateRaceDropdown() {
    if (!raceData) return;
    const races = raceData.getElementsByTagName('race');
    for (let race of races) {
      const raceId = race.getAttribute('id');
      const raceName = race.getAttribute('legacyLabel');
      const option = document.createElement('option');
      option.value = raceId;
      option.textContent = raceName;
      raceSelect.appendChild(option);
    }
  }

  // Update class dropdown based on selected race
  raceSelect.addEventListener('change', function () {
    const selectedRaceId = raceSelect.value;
    updateClassDropdown(selectedRaceId);
    updateRaceIcon(selectedRaceId);
  });

  function updateClassDropdown(raceId) {
    if (!raceData) return;
    const race = Array.from(raceData.getElementsByTagName('race')).find(r => r.getAttribute('id') === raceId);
    if (race) {
      const allowedClasses = race.getElementsByTagName('allowedClass');
      classSelect.innerHTML = ''; // Clear the dropdown
      for (let allowedClass of allowedClasses) {
        const classId = allowedClass.getAttribute('id');
        const className = allowedClass.getAttribute('name') || classId; // Use name if available
        const option = document.createElement('option');
        option.value = classId;
        option.textContent = className;
        classSelect.appendChild(option);
      }
    } else {
      classSelect.innerHTML = ''; // Clear if no race selected
    }
  }

  function updateRaceIcon(raceId) {
    if (!raceData) return;
    const race = Array.from(raceData.getElementsByTagName('race')).find(r => r.getAttribute('id') === raceId);
    if (race) {
      const genders = race.getElementsByTagName('gender');
      if (genders.length > 0) {
        const genderIconId = genders[0].getAttribute('iconId');
        raceIcon.src = genderIconId
          ? `https://raw.githubusercontent.com/eyakes/lotro-icons/master/races/${genderIconId}.png`
          : 'https://via.placeholder.com/64'; // Fallback image
        raceIcon.style.display = 'inline';
      }
    }
  }

  classSelect.addEventListener('change', function () {
    const selectedClassId = classSelect.value;
    updateClassIcon(selectedClassId);
  });

  function updateClassIcon(classId) {
    if (!classData) return;
    const classElement = Array.from(classData.getElementsByTagName('class')).find(cls => cls.getAttribute('id') === classId);
    if (classElement) {
      const classIconId = classElement.getAttribute('iconId');
      classIcon.src = classIconId
        ? `https://raw.githubusercontent.com/eyakes/lotro-icons/master/classes/${classIconId}.png`
        : 'https://via.placeholder.com/64'; // Fallback image
      classIcon.style.display = 'inline';
    }
  }
});
