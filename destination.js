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
        })
})