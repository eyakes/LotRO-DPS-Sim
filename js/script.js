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
        race.dataset.iconId = raceIconId;
      }

      // Event listener to update classes based on selected race
      raceSelect.addEventListener('change', function() {
        const selectedRaceId = raceSelect.value;
        updateClassDropdown(selectedRaceId);
        updateRaceIcon(selectedRaceId);
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
        classSelect.innerHTML = '<option value="">--Please choose an option--</option>';

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
    }
  }

  // Function to get the class iconId from classes.xml (assumed to be pre-loaded elsewhere)
  function getClassIconId(classId) {
    // Hardcoded mapping or fetch the classes.xml to extract iconId for the class
    // For example: you could add logic to fetch the classes XML and parse it for each classId
    // For now, assuming classId directly maps to the class iconId:
    return classId;
  }

  // Event listener to update class icon when class is selected
  classSelect.addEventListener('change', function() {
    const classId = classSelect.value;
    updateClassIcon(classId);
  });

  // Function to update class icon
  function updateClassIcon(classId) {
    const classOption = document.querySelector(`#class-select option[value='${classId}']`);
    const classIconId = classOption ? classOption.dataset.iconId : null;
    if (classIconId) {
      const classIconUrl = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/classes/${classIconId}.png`;
      classIcon.src = classIconUrl;
      classIcon.style.display = 'inline';
    }
  }
});
