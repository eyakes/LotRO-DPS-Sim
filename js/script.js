document.addEventListener('DOMContentLoaded', function () {
  const raceSelect = document.getElementById('race-select');
  const classSelect = document.getElementById('class-select');
  const raceIcon = document.getElementById('race-icon');
  const classIcon = document.getElementById('class-icon');

  // Fetch race data from the XML file
  fetch('https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/races.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      // Get all race entries
      const races = xmlDoc.getElementsByTagName('race');

      // Populate the race dropdown
      for (let race of races) {
        const raceId = race.getAttribute('id');
        const raceName = race.getAttribute('legacyLabel');
        const raceIconId = race.getAttribute('iconId'); // Extract iconId for the race

        const option = document.createElement('option');
        option.value = raceId;
        option.textContent = raceName;
        option.dataset.iconId = raceIconId; // Store iconId in dataset
        raceSelect.appendChild(option);
      }

      // Event listener to update classes based on selected race
      raceSelect.addEventListener('change', function () {
        const selectedRaceId = raceSelect.value;
        updateClassDropdown(selectedRaceId, xmlDoc);
        updateRaceIcon(selectedRaceId);
      });
    });

  // Function to update the class dropdown based on selected race
  function updateClassDropdown(raceId, raceData) {
    // Clear current class options
    classSelect.innerHTML = '<option value="">--Please choose an option--</option>';

    // Find the selected race element
    const race = Array.from(raceData.getElementsByTagName('race')).find(race => race.getAttribute('id') === raceId);

    if (race) {
      const allowedClasses = race.getElementsByTagName('allowedClass');

      // Populate class dropdown based on allowed classes for the race
      for (let allowedClass of allowedClasses) {
        const classId = allowedClass.getAttribute('id');
        const className = allowedClass.getAttribute('name') || classId; // Use name if available
        const classIconId = classId; // Assuming classId directly maps to the class iconId

        const option = document.createElement('option');
        option.value = classId;
        option.textContent = className;
        option.dataset.iconId = classIconId; // Store iconId in dataset
        classSelect.appendChild(option);
      }
    }
  }

  // Function to update the race icon based on selected race
  function updateRaceIcon(raceId) {
    const raceOption = raceSelect.querySelector(`option[value='${raceId}']`);
    const raceIconId = raceOption ? raceOption.dataset.iconId : null;

    if (raceIconId) {
      raceIcon.src = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/races/${raceIconId}.png`;
      raceIcon.style.display = 'inline';
    } else {
      raceIcon.style.display = 'none';
    }
  }

  // Event listener to update class icon when class is selected
  classSelect.addEventListener('change', function () {
    const classId = classSelect.value;
    updateClassIcon(classId);
  });

  // Function to update class icon
  function updateClassIcon(classId) {
    const classOption = classSelect.querySelector(`option[value='${classId}']`);
    const classIconId = classOption ? classOption.dataset.iconId : null;

    if (classIconId) {
      classIcon.src = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/classes/${classIconId}.png`;
      classIcon.style.display = 'inline';
    } else {
      classIcon.style.display = 'none';
    }
  }
});
