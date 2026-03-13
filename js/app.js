// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Function to reverse geocode from postcode to coordinates
function postcodeToCoord(postcode) {
    var url = 'https://nominatim.openstreetmap.org/search?format=json&postalcode=' + postcode;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var lat = data[0].lat;
                var lon = data[0].lon;
                // Set map view to the location
                map.setView([lat, lon], 13);
                L.marker([lat, lon]).addTo(map);
            } else {
                console.log('No results found');
            }
        });
}

// Function to geocode from coordinates to postcode
function coordToPostcode(lat, lon) {
    var url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.display_name) {
                console.log('Postcode: ' + data.display_name);
            } else {
                console.log('No results found');
            }
        });
}

// Handle map click to get coordinates
map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    console.log('You clicked the map at latitude: ' + lat + ' and longitude: ' + lon);
    coordToPostcode(lat, lon);
});

// Example usage:
// postcodeToCoord('SW1A 1AA'); // Provide some postcode
