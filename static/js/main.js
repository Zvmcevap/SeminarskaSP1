import {makeGrid} from "./createLab.js"
import {makePath, getStartingPolje} from "./makePath.js"
import {fromPlayToMoveButtons, fromMoveToPlayButtons} from "./buttons.js"

let visited = [];
const gridSize = 7;
const labirint = document.getElementById("labirint")
const poljaArray = makeGrid(gridSize);
gridCSSSize(gridSize, labirint)

const playButton = document.getElementById("play-button")
playButton.addEventListener('click', play)

const oneButtonDiv = document.getElementById("buttonsDiv-oneButton")

const moveButtonsDiv = document.getElementById("move-buttons")
const earButton = document.getElementById("ear-button")
earButton.addEventListener("click", death)

const pelikaniLevo = document.getElementById("pelikani-levo")
const pelikaniDesno = document.getElementById("pelikani-desno")

const uses1 = document.getElementById("uses1")
const uses2 = document.getElementById("uses2")
const uses3 = document.getElementById("uses3")

const usesa = [uses1, uses2, uses3]

for (let i = 0; i < poljaArray.length; i++) {
    for (let l = 0; l < poljaArray[i].length; l++) {
        labirint.appendChild(poljaArray[i][l].div);
    }
}

function gridCSSSize(gridSize, labirint) {
    labirint.style.setProperty('--numberOfColumns', gridSize);
    labirint.style.setProperty('--numberOfRows', gridSize)
}

function play() {
    for (const polje of visited) {
        polje.setPath(false);
        polje.goTo = "";
        polje.comeFrom = "";
        polje.div.innerHTML = polje.stepsFromWin;
    }
    let start = getStartingPolje(poljaArray)
    visited = [start];

    visited = makePath(poljaArray, 14, visited, getStartingPolje(poljaArray));

    for(const polje of visited) {
        polje.div.innerHTML = polje.goTo;
    }

    fromPlayToMoveButtons(oneButtonDiv, moveButtonsDiv);
    pelikaniDesno.style.display = "flex"
    pelikaniLevo.style.display = "flex"

    for (let i = 0; i < usesa.length; i++) {
        setTimeout(narisiElementNadLabirintom, 100*i, usesa[i])
    }


}

function death() {
    fromMoveToPlayButtons(oneButtonDiv, moveButtonsDiv);
}

function narisiElementNadLabirintom(element) {
    element.classList.add("move-up")
}