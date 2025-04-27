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

let animalFacts = {};
let guessHistory = []
let won = false;

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
      addToList(comparison, input, animalFactsOfValue[0].AnimalName)
      if (comparison.every(char => char === 0)) {
        onWon()
      }
    } else {
      console.log("Animal not found");
    }
}

function onWon() {
  won = true;
  let shareBtn = document.getElementById("share-btn");
  shareBtn.removeAttribute("disabled");
  shareBtn.classList.remove("color-action-disabled");
  shareBtn.classList.add("color-action-share");

  shareBtn.addEventListener("click", shareResults);

  let submitBtn = document.getElementById("submit-btn");
  submitBtn.setAttribute("disabled", "true");
  submitBtn.classList.add("color-action-disabled");
  submitBtn.classList.remove("color-action-good");
}

function addToList(listEl, input, animalName) {
  guessHistory.push(listEl)
  const container = document.querySelector("#results")

  const animalPicture = document.createElement("div")
  animalPicture.classList.add("guess-animal")
  animalPicture.classList.add("guess")
  const img = document.createElement("img");
  img.src = `./assets/img/animals/${animalName.toLowerCase()}.png`;
  img.alt = animalName;
  animalPicture.appendChild(img);
  container.appendChild(animalPicture)


  listEl.forEach(char => {
    const div = document.createElement("div");
    div.classList.add("guess");
    if (char === -1) {
      div.classList.add("guess-down");
    } else if (char === 0) {
      div.classList.add("guess-correct");
    } else if (char === 1) {
      div.classList.add("guess-up");
    }
    if (char === -1 || char === 1) {
      const img = document.createElement("img");
      img.src = "./assets/img/arrow.png";
      img.alt = "arrow down";
      div.appendChild(img);
    }
    container.appendChild(div);
  })
  input.value = ""; // Clear input field
}

function compareWithAnimal(animalFacts) {
    const dailyAnimalFacts = getDailyAnimalFacts()
    const comparison = [];
    // compare each attribute of the animal with the daily animal
    comparison.push(compareAttribute(Rarity[dailyAnimalFacts.Rarity], Rarity[animalFacts[0].Rarity]));
    comparison.push(compareAttribute(dailyAnimalFacts.Legs, animalFacts[0].Legs));
    comparison.push(compareAttribute(HopSize[dailyAnimalFacts.HopSize], HopSize[animalFacts[0].HopSize]));
    comparison.push(compareAttribute(dailyAnimalFacts.CoinsPerMin, animalFacts[0].CoinsPerMin));
    comparison.push(compareAttribute(dailyAnimalFacts.SolutionLength, animalFacts[0].SolutionLength));
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

function loadAnimalFacts() {
    fetch("animal-facts.json")
        .then(response => response.json())
        .then(data => {
            animalFacts = data;
            return data;
        })
        .then(data => {
          const dataList = document.getElementById('animalList');

          dataList.innerHTML = '';
          data.forEach(animal => {
            const option = document.createElement('option');
            option.value = animal.AnimalName;
            dataList.appendChild(option);
          });
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

function shareResults() {
  const startDate = new Date('2025-04-26');
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const sharePreText = "Zoodle #" + diffDays + " Attempts: " + guessHistory.length + "\n";
  const guessHistoryText = convertGuessHistoryToEmoji();
  const shareText = sharePreText + guessHistoryText + "\nhttps://derjunker.github.io/zoodle/";
  if (navigator.canShare && navigator.canShare({ text: shareText })) {
    navigator.share({ text: shareText })
  } else {
    navigator.clipboard.writeText(shareText)
             .then(() => alert("Text wurde in die Zwischenablage kopiert!"))
             .catch(err => console.error("Fehler beim Kopieren des Textes:", err));
  }
}

function convertGuessHistoryToEmoji() {
  const emojiMap = {
    '-1': '⬇️',
    '0': '🟩',
    '1': '⬆️'
  };
  return guessHistory.map(guess => guess.map(num => emojiMap[num]).join('')).join('\n');
}
