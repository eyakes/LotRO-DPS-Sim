// Fetch the XML file from GitHub
const xmlUrl = 'https://raw.githubusercontent.com/eyakes/lotro-data/master/lore/classes.xml';

fetch(xmlUrl)
    .then(response => response.text())  // Read the response as text
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))  // Parse XML
    .then(data => {
        // Get all class elements from the XML
        const classes = data.getElementsByTagName("class");
        
        // Get the dropdown element
        const dropdown = document.getElementById('class-select');

        // Loop through each class and add it to the dropdown
        Array.from(classes).forEach(classElement => {
            const className = classElement.getAttribute('name');
            const option = document.createElement("option");
            option.value = className;
            option.text = className;
            dropdown.appendChild(option);
        });
    })
    .catch(err => console.error('Error fetching XML:', err));
