document.addEventListener("DOMContentLoaded", () => {
    fetch("destination.json")
    .then(response => response.json())
    .then(data => {
        displayDestinations(data);
        window.destinationsData = data;  //Storing data globally for filtering
    })
    .catch(error => console.error("Error loading destinations:", error));
});