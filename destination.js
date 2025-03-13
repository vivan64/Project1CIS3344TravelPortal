document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const destinationId = parseInt(urlParams.get("id"));

    fetch("destinations.json")
        .then(response => response.json())
        .then(data => {
            const destination = data.find(dest => dest.id === destinationId);
            if (!destination) {
                document.body.innerHTML = "<h2>Destination not found</h2>";
                return;
            }

            const itineraryList = document.getElementById("itinerary-list");
            const locationDiv = document.getElementById("location-details");
            const mapDiv = document.getElementById("map");

            if (!itineraryList || !locationDiv || !mapDiv) {
                console.error("One or more elements missing in destination.html");
                return;
            }

            document.getElementById("destination-name").innerText = destination.name;
            document.getElementById("destination-image").src = destination.image;
            document.getElementById("destination-description").innerText = destination.details.long_description;

            itineraryList.innerHTML = "";
            destination.details.itinerary.forEach(item => {
                const li = document.createElement("li");
                li.innerText = item;
                itineraryList.appendChild(li);
            });

            locationDiv.innerHTML = `
                <p><strong>Latitude:</strong> ${destination.location.latitude}</p>
                <p><strong>Longtitude:</strong> ${destination.location.longitude}</p>
            `;

            const map = L.map('map').setView([destination.location.latitude, destination.location.longitude], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '© OpenStreetMap'}).addTo(map);
            L.marker([destination.location.latitude, destination.location.longitude]).addTo(map)
                .bindPopup(destination.name)
                .openPopup();
        })
        .catch(error => console.error("Error loading details:", error));
});

document.getElementById("booking-form").addEventListener("submit", function(event){
    event.preventDefault();
    alert("Tour Booked!");
    this.reset();
});