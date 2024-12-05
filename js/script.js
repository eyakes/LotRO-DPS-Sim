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
        const raceCode = race.getAttribute('code');

        const option = document.createElement('option');
        option.value = raceId;
        option.textContent = raceName;
        raceSelect.appendChild(option);
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
            
            const option = document.createElement('option');
            option.value = classId;
            option.textContent = className;
            classSelect.appendChild(option);
          }
        }
      });
  }

  // Function to update the race icon based on selected race
  function updateRaceIcon(raceId) {
    fetch('https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/races.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
  
        // Find the selected race element
        const race = Array.from(xmlDoc.getElementsByTagName('race')).find(race => race.getAttribute('id') === raceId);
  
        if (race) {
          const genders = race.getElementsByTagName('gender');
          if (genders.length > 0) {
            // Use the first gender's iconId as default
            const firstGender = genders[0];
            const genderIconId = firstGender.getAttribute('iconId');
            if (genderIconId) {
              const raceIconUrl = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/races/${genderIconId}.png`;
              raceIcon.src = raceIconUrl;
              raceIcon.style.display = 'inline';
            }
          }
        }
      });
  }


  // Event listener to update class icon when class is selected
  classSelect.addEventListener('change', function () {
    const selectedClassId = classSelect.value;
    updateClassIcon(selectedClassId);
  });

// Function to update class icon based on selected classId
function updateClassIcon(classId) {
  fetch('https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/classes.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      // Find the selected class in the XML
      const classElement = Array.from(xmlDoc.getElementsByTagName('class')).find(cls => cls.getAttribute('id') === classId);

      if (classElement) {
        const classIconId = classElement.getAttribute('iconId'); // Extract the iconId
        if (classIconId) {
          const classIconUrl = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/classes/${classIconId}.png`;
          classIcon.src = classIconUrl;
          classIcon.style.display = 'inline';
        }
      }
    })
    .catch(error => console.error('Error fetching or parsing classes.xml:', error));
}
