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
      console.log(races); // Debugging: check if races are properly parsed

      // Populate the race dropdown
      for (let race of races) {
        const raceId = race.getAttribute('id');
        const raceName = race.getAttribute('legacyLabel');
        
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
    // Debugging: Log the raceId to ensure it's correct
    console.log('Selected race ID:', raceId);
    const raceIconUrl = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/races/${raceId}.png`;
    console.log('Race icon URL:', raceIconUrl); // Debugging line
    raceIcon.src = raceIconUrl;
    raceIcon.style.display = 'inline';

    // Fallback icon in case the image fails to load
    raceIcon.onerror = function() {
      console.log('Failed to load race icon, using fallback');
      raceIcon.src = 'https://via.placeholder.com/50x50?text=Race+Icon';
    };
  }

  // Event listener to update class icon when class is selected
  classSelect.addEventListener('change', function() {
    const classId = classSelect.value;
    updateClassIcon(classId);
  });

  // Function to update class icon
  function updateClassIcon(classId) {
    // Debugging: Log the classId to ensure it's correct
    console.log('Selected class ID:', classId);
    const classIconUrl = `https://raw.githubusercontent.com/eyakes/lotro-icons/master/classes/${classId}.png`;
    console.log('Class icon URL:', classIconUrl); // Debugging line
    classIcon.src = classIconUrl;
    classIcon.style.display = 'inline';

    // Fallback icon in case the image fails to load
    classIcon.onerror = function() {
      console.log('Failed to load class icon, using fallback');
      classIcon.src = 'https://via.placeholder.com/50x50?text=Class+Icon';
    };
  }
});
