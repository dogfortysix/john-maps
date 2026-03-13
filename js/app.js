// Initialize the map and geocoding functionality

// Include your map credentials here
const mapCredentials = {
  apiKey: 'YOUR_API_KEY',
};

// Function to initialize the map
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

// Function to geocode an address
function geocodeAddress(address) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === 'OK') {
      const map = initMap();
      map.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        position: results[0].geometry.location,
        map: map,
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// Event listener for the address input
document.getElementById('submit').addEventListener('click', () => {
  const address = document.getElementById('address').value;
  geocodeAddress(address);
});

// Load the Google Maps API asynchronously
function loadScript() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${mapCredentials.apiKey}&callback=initMap`;
  document.body.appendChild(script);
}

window.onload = loadScript();