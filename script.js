document.addEventListener("DOMContentLoaded", () => {
    fetch("destination.json")
    .then(response => response.json())
    .then(data => {
        displayDestinations(data);
        window.destinationsData = data;  //Storing data globally for filtering
    })
    .catch(error => console.error("Error loading destinations:", error));
});

function displayDestinations(destination) {
    const container = document.getElementById("destinations-container");
    container.innerHTML = ""; //Clears previous results

    destination.forEach(destination => {
        const card = document.createElement("div");
        card.classList.add("destination-card");

        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}">
            <h2>${destination.name}</h2>
            <p>${destination.description}</p>
            <button onclick="goToDetails(${destination.id})">View Details</button>
            `;
    })
}