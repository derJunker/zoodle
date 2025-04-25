// sample animal fact elemenet:
// {
//     "AnimalName": "Sheep", -> ignore
//     "Region": "FARM", -> ignore
//     "SolutionLength": 9,
//     "Rarity": "COMMON",
//     "Legs": 4,
//     "HopSize": "SMALL",
//     "CoinsPerMin": 6
// },

import {HopSize, Rarity} from "./enums.js";

console.log("⠀⠀⠘⡀⠀⠀HOG RIDAAAAAA⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀\n" +
    "⠀⠀⠀⠑⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡔⠁⠀⠀⠀\n" +
    "⠀⠀⠀⠀⠈⠢⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠴⠊⠀⠀⠀⠀⠀\n" +
    "⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⢀⣀⣀⣀⣀⣀⡀⠤⠄⠒⠈⠀⠀⠀⠀⠀⠀⠀⠀\n" +
    "⠀⠀⠀⠀⠀⠀⠀⠘⣀⠄⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n" +
    "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠉⢈⠩⢙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n" +
    "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢋⠠⠀⠀⠨⠐⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n" +
    "⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢐⠐⠌⡌⢄⢐⢈⠔⡝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n" +
    "⣿⣿⣿⣿⣿⣿⣿⡏⠉⡀⠐⡀⢁⠈⠐⠱⠑⡑⠈⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n" +
    "⣿⣿⣿⣿⣿⣿⣿⢗⠀⠀⠐⡠⡛⠔⡁⢜⡔⡬⢎⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n" +
    "⣿⣿⣿⣿⣿⣿⡿⠡⠀⠀⠀⠀⠂⠁⠀⠄⢂⠈⠂⢂⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n" +
    "⣿⣿⣿⡿⢟⠩⠐⡀⠀⠀⠀⠐⠐⠁⠓⠒⠒⢀⠁⢐⢝⢟⢿⣿⣿⣿⣿⣿⣿⣿⣿\n" +
    "⣿⣿⠫⠡⠡⠨⢀⠂⠠⠀⠀⢁⠑⡱⠛⠗⡓⢂⠠⢸⢸⢨⠣⡝⣻⣿⣿⣿⣿⣿⣿\n" +
    "⣿⢏⢐⢁⠊⢌⠐⡈⠄⠠⠀⠀⠀⠀⠁⠑⠈⠀⢄⢕⠸⡨⠪⡪⡘⣻⣿⡿⣿⣿⣿\n" +
    "⣿⢂⠂⡂⠅⡂⠅⡐⠨⢐⠐⠠⠠⡀⢄⠠⡠⡡⡱⡐⠕⢌⢊⢆⢣⢒⠽⢿⣿⣿⣿\n" +
    "⠣⢂⠂⠄⠡⠐⠐⠈⠌⡐⠨⡈⠢⠨⡂⢌⢂⠆⡪⠨⡊⠂⡂⠢⢡⣢⣣⡣⣍⢿⣿\n" +
    "⠨⢂⢂⠁⡀⠀⠀⠁⠐⠈⠐⠈⢈⠈⠐⡀⠄⠁⠌⠈⠔⣄⡀⠠⡑⡂⠆⠢⢂⠑⠽\n" +
    "⡨⠐⠀⠀⠀⢠⡎⡀⠀⠀⠄⠈⡀⠌⠐⠠⠈⠄⡁⠂⡀⡫⠑⣑⠀⢂⠌⠄⢕⠀⠨\n" +
    "⠺⡪⠢⡀⠀⠞⢇⢂⠀⠂⡀⠠⠀⠄⠁⠌⠨⠀⢄⠢⡁⢂⢿⡟⡀⠀⠈⠈⡀⠂⣰\n" +
    "⢀⢀⠀⠄⠀⠀⡐⠀⡈⠄⡐⠅⡊⠌⢌⠄⡕⡑⡁⢂⠂⢂⠸⣿⡄⠀⠈⣠⣴⣿⣿\n" +
    "⢐⠔⠠⠀⠀⡐⠠⢈⠢⢑⠄⠑⢈⠊⡂⡱⢁⣂⢌⢔⢌⢄⠀⠹⢀⣺⡿⣟⢿⣿⣿\n" +
    "⢀⠡⠁⠂⠐⠠⠈⠄⢈⠠⢈⢢⡣⣗⠕⠄⣕⢮⣞⣞⣗⣯⢯⡷⡴⣹⡪⣷⣿⣿⣿\n" +
    "⠊⠄⠠⠠⠡⠈⠠⢐⠠⡊⡎⣗⢭⢐⠹⡹⣮⡳⡵⣳⣻⢾⣻⣽⣻⣺⣺⣽⣿⣿⣿\n" +
    "⣨⣾⢐⠰⠐⠅⡂⡂⢕⢜⢜⢵⢹⢑⢔⠨⢘⠸⡹⡵⣯⣻⢽⣳⣻⣺⢞⡿⣿⣿⣿\n" +
    "⣿⣿⡔⠠⢈⠐⠐⢠⢱⢸⢸⢸⢸⠰⡡⢘⢔⢕⠝⢮⣳⢽⢝⡾⡵⡯⣏⠯⣿⣿⣿\n" +
    "⣿⣿⣗⢅⢢⠠⠡⠢⡱⡑⡕⡕⢅⠣⡊⢨⢪⡣⡣⡂⡬⡳⢽⢽⢽⢽⣞⣧⠙⣿⣿\n" +
    "⡻⣿⡯⡪⠢⡡⠡⢑⢌⠪⡪⡊⠆⢌⠪⢐⢕⢱⢱⢱⢱⢱⢙⢮⡫⡟⣞⢮⣳⠙⣿\n" +
    "⠊⣿⣯⠪⡊⠄⢅⠂⢂⠁⢇⢇⢃⠂⢕⠐⠌⡲⡰⡡⣇⠇⢇⢕⠪⠉⠂⠅⠂⡑⠹\n" +
    "⣸⢿⣳⢱⠨⡐⡽⡿⡶⡾⡬⡢⢂⠅⡢⢡⣌⠐⠈⢎⢎⢎⢔⠠⠡⠠⠠⠡⡁⡂⠡\n" +
    "⡯⡯⡇⢅⠕⠠⢱⢹⡙⢮⢹⠨⡂⡂⢇⠌⠮⡳⠅⡂⢕⠡⡑⠠⢁⢁⣡⣡⣢⣶⣿\n" +
    "⣗⢽⢌⡢⡡⡡⡸⡢⡣⡣⡱⡑⠔⡈⢎⢆⢂⠂⠅⣢⡳⣽⡐⢅⢂⣊⣿⣿⣿⣿⣿\n" +
    "⣯⢯⢷⢽⢮⢯⣺⣪⢞⡮⣳⢘⠔⢌⢜⣞⣖⣮⣻⢮⣯⢷⣿⣻⣿⣿⣿⣿⣿⣿⣿\n" +
    "⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣾⣷⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿")

let animalFacts = {};
let guessHistory = []

document.addEventListener("DOMContentLoaded", function() {
    loadAnimalFacts();
})

window.animalSubmitted = animalSubmitted

function animalSubmitted() {
    const input = document.getElementById("inputText");
    const value = input.value.trim();

    const animalFactsOfValue = animalFacts.filter(animal => animal.AnimalName.toLowerCase() === value.toLowerCase());
    if (animalFactsOfValue && animalFactsOfValue.length === 1) {
        const comparison = compareWithAnimal(animalFactsOfValue)

        addToList(comparisonToString(comparison), input)
    } else {
        console.log("Animal not found");
    }
}

function addToList(listEl, input) {
    const row = document.createElement("tr");

    listEl.forEach(char => {
        const td = document.createElement("td");
        td.textContent = char;
        row.appendChild(td);
    });

    document.querySelector("#itemTable tbody").appendChild(row);
    input.value = ""; // Clear input field
}

function compareWithAnimal(animalFacts) {
    const dailyAnimalFacts = getDailyAnimalFacts()
    const comparison = [];
    // compare each attribute of the animal with the daily animal
    comparison.push(compareAttribute(dailyAnimalFacts.SolutionLength, animalFacts[0].SolutionLength));
    comparison.push(compareAttribute(Rarity[dailyAnimalFacts.Rarity], Rarity[animalFacts[0].Rarity]));
    comparison.push(compareAttribute(dailyAnimalFacts.Legs, animalFacts[0].Legs));
    comparison.push(compareAttribute(HopSize[dailyAnimalFacts.HopSize], HopSize[animalFacts[0].HopSize]));
    comparison.push(compareAttribute(dailyAnimalFacts.CoinsPerMin, animalFacts[0].CoinsPerMin));
    return comparison;
}

function compareAttribute(dailyAnimalAttribute, animalAttribute) {
    if (dailyAnimalAttribute < animalAttribute) {
        return -1;
    } else if (dailyAnimalAttribute > animalAttribute) {
        return 1;
    } else {
        return 0;
    }
}
// comaprison is array of {-1, 0, 1} for each attribute convert it into arrow down, green and up emojis
function comparisonToString(comparison) {
    const emojiMap = {
        '-1': '⬇️',
        '0': '🟢',
        '1': '⬆️'
    };
    return comparison.map(num => emojiMap[num]);
}

function loadAnimalFacts() {
    fetch("animal-facts.json")
        .then(response => response.json())
        .then(data => {
            animalFacts = data;
        })
        .catch(error => console.error('Error loading animal facts:', error));
}


function getDailyAnimalFacts() {
    // current day:
    const today = new Date()
    // get random animal dependent and consistent with the day

    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const animalIndex = dayOfYear % animalFacts.length;

    return animalFacts[animalIndex];
}