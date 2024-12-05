document.addEventListener('DOMContentLoaded', function() {
  const raceSelect = document.getElementById('race-select');
  const classSelect = document.getElementById('class-select');
  const raceIcon = document.getElementById('race-icon');
  const classIcon = document.getElementById('class-icon');
  
  let raceData = {}; // Cache race data
  let classData = {}; // Cache class data
  
  // Fetch race data from the XML file once and cache it
  fetch('https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/races.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      // Store the parsed data in the cache
      raceData = xmlDoc;

      // Populate the race dropdown
      const races = xmlDoc.getElementsByTagName('race');
      for (let race of races) {
        const raceId = race.getAttribute('id');
        const raceName = race.getAttribute('legacyLabel');
        
        const option = document.createElement('option');
        option.value = raceId;
        option.textContent = raceName;
        raceSelect.appendChild(option);
      }

      // Set the first race icon and update classes for the first race
      updateRaceIcon(raceSelect.value);
      updateClassDropdown(raceSelect.value);
    });

  // Event listener to update classes based on selected race
  raceSelect.addEventListener('change', function() {
    const selectedRaceId = raceSelect.value;
    updateClassDropdown(selectedRaceId);
    updateRaceIcon(selectedRaceId);
  });

  // Function to update the class dropdown based on selected race (using cached data)
  function updateClassDropdown(raceId) {
    // If class data is cached, use it directly
    if (classData[raceId]) {
      populateClassDropdown(classData[raceId]);
    } else {
      // Fetch and cache class data if not already cached
      const race = Array.from(raceData.getElementsByTagName('race')).find(race => race.getAttribute('id') === raceId);
      
      if (race) {
        const allowedClasses = race.getElementsByTagName('allowedClass');
        
        // Cache the class data for the selected race
        classData[raceId] = allowedClasses;

        // Populate class dropdown
        populateClassDropdown(allowedClasses);
      }
    }
  }

  // Function to populate the class dropdown
  function populateClassDropdown(allowedClasses) {
    classSelect.innerHTML = '<option value="">--Please choose an option--</option>';
    
    for (let allowedClass of allowedClasses) {
      const classId = allowedClass.getAttribute('id');
      const className = classId; // Assuming classId matches the name of the class

      const option = document.createElement('option');
      option.value = classId;
      option.textContent = className;
      classSelect.appendChild(option);
    }
  }

  // Function to update the race icon based on selected race
  function updateRaceIcon(raceId) {
    const raceIconUrl = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/races/${raceId}.png`;
    raceIcon.src = raceIconUrl;
    raceIcon.style.display = 'inline';

    // Fallback if race icon fails to load
    raceIcon.onerror = function() {
      raceIcon.src = 'path/to/default-race-icon.png';  // Set to a default icon
    };
  }

  // Event listener to update class icon when class is selected
  classSelect.addEventListener('change', function() {
    const classId = classSelect.value;
    updateClassIcon(classId);
  });

  // Function to update class icon
  function updateClassIcon(classId) {
    const classIconUrl = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/classes/${classId}.png`;
    classIcon.src = classIconUrl;
    classIcon.style.display = 'inline';

    // Fallback if class icon fails to load
    classIcon.onerror = function() {
      classIcon.src = 'path/to/default-class-icon.png';  // Set to a default icon
    };
  }
});
