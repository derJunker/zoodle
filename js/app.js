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
let todayOnLoad = getCurrentDay();

// Rarity
// Legs
// HopSize
// CoinsPerMin
// SolutionLength
function getToolTipForIndex(animalFacts, index) {
  switch (index) {
    case 0:
      return animalFacts.Rarity
    case 1:
      return animalFacts.Legs + " legs";
    case 2:
      return animalFacts.HopSize;
    case 3:
      return animalFacts.CoinsPerMin + " c/min";
    case 4:
      return animalFacts.SolutionLength + " clicks";
    default:
      return null;
  }
}

setInterval(checkDayChange, 2000)

function checkDayChange() {
  const onLoadDiff = getDiffDays()
  const currDiff = getDiffDaysWithEnd(getCurrentDay())
  if (currDiff > onLoadDiff) {
    // refresh page to get new animal
    window.location.reload()
    alert("A new wordle started! Good Luck ;)")
  }
}

function getCurrentDay() {
  return new Date(new Date().toUTCString().slice(0, -4));
}

document.addEventListener("DOMContentLoaded", function() {
    loadAnimalFacts();
})

window.animalSubmitted = animalSubmitted

function animalSubmitted() {
    const input = document.getElementById("inputText");
    const value = input.value.trim();

    const animalFactsOfValue = animalFacts.filter(animal => animal.AnimalName.toLowerCase() === value.toLowerCase());
    if (animalFactsOfValue && animalFactsOfValue.length === 1) {
      if (guessHistory.filter(guess => guess[0].toLowerCase() === value.toLowerCase()).length > 0) {
        alert("You already guessed this animal!");
        return;
      }
      const comparison = compareWithAnimal(animalFactsOfValue)
      addToList(comparison, input, animalFactsOfValue[0].AnimalName, animalFactsOfValue[0])
      if (comparison.every(char => char === 0) && animalFactsOfValue[0].AnimalName.toLowerCase() === getDailyAnimalFacts().AnimalName.toLowerCase()) {
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

  let copyBtn = document.getElementById("copy-btn");
  copyBtn.removeAttribute("disabled");
  copyBtn.classList.remove("color-action-disabled");
  copyBtn.classList.add("color-action-info");

  copyBtn.addEventListener("click", copyResults);



  let submitBtn = document.getElementById("submit-btn");
  submitBtn.setAttribute("disabled", "true");
  submitBtn.classList.add("color-action-disabled");
  submitBtn.classList.remove("color-action-good");

  setTimeout(() => alert("You guessed it correctly! Congrats :D"), 500)
}

function addToList(listEl, input, animalName, animalFacts) {
  guessHistory.push([animalName, ...listEl]);
  const container = document.querySelector("#results")

  const animalPicture = document.createElement("div")
  animalPicture.classList.add("guess-animal")
  animalPicture.classList.add("guess")
  const img = document.createElement("img");
  img.src = `./assets/img/animals/${animalName.toLowerCase()}.png`;
  img.alt = animalName;
  img.id = animalName;
  animalPicture.appendChild(img);
  container.appendChild(animalPicture)

  createToolTipFor(animalPicture, animalName)


  for (let i = 0; i < listEl.length; i++){
    const char = listEl[i];
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
    createToolTipFor(div, getToolTipForIndex(animalFacts, i))
    container.appendChild(div);
  }
  input.value = ""; // Clear input field
}

function createToolTipFor(parent, text) {
  parent.classList.add("tooltip")
  const animalToolTip = document.createElement("span")
  animalToolTip.textContent= text
  animalToolTip.classList.add("tooltiptext")
  parent.appendChild(animalToolTip)
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
            let seed = 314159265358979;
            const animalIterations = Math.floor(getDiffDays() / data.length) + 1;
            seed *= animalIterations;
            animalFacts = shuffleArray(data, seed);
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

function seededRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function shuffleArray(array, seed) {
  let result = array.slice(); // copy array to avoid modifying original
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}


function getDailyAnimalFacts() {
    const diffDays = getDiffDays()
    const animalIndex = diffDays % animalFacts.length;

    return animalFacts[animalIndex];
}

function shareResults() {
  const shareText = getShareText()
  if (navigator.canShare && navigator.canShare({ text: shareText })) {
    navigator.share({ text: shareText })
  } else {
    navigator.clipboard.writeText(shareText)
             .then(() => alert("Text was copied to clipboard!"))
             .catch(err => console.error("Error while trying to copy :( Sorry couldn't share\n", err));
  }
}

function copyResults() {
  const shareText = getShareText()
  navigator.clipboard.writeText(shareText)
           .then(() => alert("Text was copied to clipboard!"))
           .catch(err => console.error("Error while trying to copy :( Sorry couldn't share\n", err));
}

function getShareText() {
  const diffDays = getDiffDays()
  const sharePreText = "Zoodle #" + diffDays + " Attempts: " + guessHistory.length + "\n";
  const guessHistoryText = "```\n"+ convertGuessHistoryToEmoji() + "\n```\n";
  return sharePreText + guessHistoryText;
}

function getDiffDays() {
  return getDiffDaysWithEnd(todayOnLoad)
}

function getDiffDaysWithEnd(end) {
  const startDate = new Date(new Date('2025-04-26').toUTCString().slice(0, -4));
  return Math.floor((end - startDate) / 86400000);
}

function convertGuessHistoryToEmoji() {

  const emojiMap = {
    '-1': '↓',
    '0': '☐',
    '1': '↑'
  };
  return guessHistory.map(guess => guess.slice(1).map(num => emojiMap[num]).join('')).join('\n');
}
