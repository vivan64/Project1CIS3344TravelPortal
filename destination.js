document.addEventListener("DOMContentLoaded",c() => {
    const urlParams = new URLSearchParams(window.location.search);
    const destinationId = urlParams.get("id");

    fetch("destinations.json")
        .then(response => response.json())
        .then(data => {
            const destination = data.find(dest => dest.id == destinationId);
            if (!destination) {
                document.body.innerHTML = "<h2>Destination not found</h2>";
                return;
            }

            document.getElementById("destination-name").innerText = destination.name;
            document.getElementById("destination-image").src = destination.image;
            document.getElementById("destination-description").innerText = destination.details.long_description;

            const itineraryList = document.getElementById("itenerary-list");
            destination.details.itinerary.forEach(item => {
                const li = document.createElement("li");
                li.innerText = item;
                itineraryList.appendChild(li);
            });

            const map = L.map('map').setView([destination.location.latitude, destination.location.longitude], 12);
            L.titleLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '© OpenStreetMap'}).addTo(map);
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