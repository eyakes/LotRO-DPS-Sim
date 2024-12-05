document.addEventListener('DOMContentLoaded', function() {
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
        raceSelect.appendChild(option);

        // Store the iconId for future use
        option.dataset.iconId = raceIconId;
      }

      // Event listener to update classes based on selected race
      raceSelect.addEventListener('change', function() {
        const selectedRaceId = raceSelect.value;
        updateClassDropdown(selectedRaceId); // Update class dropdown
        updateRaceIcon(selectedRaceId); // Update race icon
      });
    });

  // Function to update the class dropdown based on selected race
  function updateClassDropdown(raceId) {
    fetch('https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/races.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        // Find the selected race element
        const race = Array.from(xmlDoc.getElementsByTagName('race')).find(race => race.getAttribute('id') === raceId);

        // Clear current class options
        classSelect.innerHTML = '<option value="">--Please choose a class--</option>';

        if (race) {
          const allowedClasses = race.getElementsByTagName('allowedClass');
          
          // Populate class dropdown based on allowed classes for the race
          for (let allowedClass of allowedClasses) {
            const classId = allowedClass.getAttribute('id');
            const className = classId; // Assuming classId matches the name of the class
            const classIconId = getClassIconId(classId); // Get the iconId for the class

            const option = document.createElement('option');
            option.value = classId;
            option.textContent = className;
            classSelect.appendChild(option);

            // Store the class iconId for future use
            option.dataset.iconId = classIconId;
          }
        }
      });
  }

  // Function to update the race icon based on selected race
  function updateRaceIcon(raceId) {
    const race = document.querySelector(`#race-select option[value='${raceId}']`);
    const raceIconId = race ? race.dataset.iconId : null;
    if (raceIconId) {
      const raceIconUrl = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/races/${raceIconId}.png`;
      raceIcon.src = raceIconUrl;
      raceIcon.style.display = 'inline';
    } else {
      raceIcon.style.display = 'none';
    }
  }

  // Function to get the class iconId from classes.xml based on the classId
  function getClassIconId(classId) {
    return fetch('https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/classes.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        // Find the class element based on classId
        const classElement = Array.from(xmlDoc.getElementsByTagName('class')).find(cls => cls.getAttribute('id') === classId);

        // If class is found, return the iconId
        return classElement ? classElement.getAttribute('iconId') : null;
      });
  }

  // Event listener to update class icon when class is selected
  classSelect.addEventListener('change', function() {
    const classId = classSelect.value;
    updateClassIcon(classId);
  });

  // Function to update class icon
  function updateClassIcon(classId) {
    getClassIconId(classId).then(classIconId => {
      if (classIconId) {
        const classIconUrl = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/classes/${classIconId}.png`;
        classIcon.src = classIconUrl;
        classIcon.style.display = 'inline';
      } else {
        classIcon.style.display = 'none';
      }
    });
  }
});
