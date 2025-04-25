let animalFacts = {};

document.addEventListener("DOMContentLoaded", function() {
    loadAnimalFacts();
})

function compareWithAnimal(animalName) {
}

function loadAnimalFacts() {
    fetch("animal-facts.json")
        .then(response => response.json())
        .then(data => {
            animalFacts = data;
            console.log(animalFacts);
        })
        .catch(error => console.error('Error loading animal facts:', error));
}


function getDailyAnimal() {
    // current day:
    const today = new Date()
    // get random animal dependent and consistent with the day

    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const animalIndex = dayOfYear % animals.length;

    return animals[animalIndex];
}