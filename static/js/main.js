import {makeGrid} from "./createLab.js"
import {makePath, getStartingPolje} from "./makePath.js"
import {fromPlayToMoveButtons, fromMoveToPlayButtons} from "./buttons.js"
import {Navodila} from "./Navodila.js";

let visited = [];
const gridSize = 7;
const labirint = document.getElementById("labirint")
const poljaArray = makeGrid(gridSize);
gridCSSSize(gridSize, labirint)

const navodila = new Navodila()
const gumbInfo = document.getElementById("info-button")
gumbInfo.addEventListener('mouseover', ()=> gumbInfo.classList.remove("come-into-from-top"))
gumbInfo.addEventListener('click', toggleNavodila)

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

const banana1 = document.getElementById("banana1")
const banana2 = document.getElementById("banana2")
const banana3 = document.getElementById("banana3")

const banane = [banana1, banana2, banana3]

function gridCSSSize(gridSize, labirint) {
    labirint.style.setProperty('--numberOfColumns', gridSize);
    labirint.style.setProperty('--numberOfRows', gridSize)
}

for (let i = 0; i < poljaArray.length; i++) {
    for (let l = 0; l < poljaArray[i].length; l++) {
        labirint.appendChild(poljaArray[i][l].div);
    }
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

    for (const polje of visited) {
        polje.div.innerHTML = polje.goTo;
    }

    navodila.skrij()
    fromPlayToMoveButtons(oneButtonDiv, moveButtonsDiv);
    pelikaniDesno.classList.remove("odletijo")
    pelikaniDesno.classList.add("priletijo")
    pelikaniLevo.classList.remove("odletijo")
    pelikaniLevo.classList.add("priletijo")

    for (let i = 0; i < usesa.length; i++) {
        setTimeout(narisiElementNadLabirintom, 100 * i, usesa[i])
        setTimeout(narisiElementNadLabirintom, 100* i, banane[i])
    }
}

function death() {
    fromMoveToPlayButtons(oneButtonDiv, moveButtonsDiv);
    pelikaniDesno.classList.replace("priletijo", "odletijo")
    pelikaniLevo.classList.replace("priletijo", "odletijo")

    for (let i = 0; i < 3; i++) {
        setTimeout(odrisiElementeNadLabirintom, 100 * i, usesa[i])
        setTimeout(odrisiElementeNadLabirintom, 100*i, banane[i])
    }

    navodila.prikazi()
}

function narisiElementNadLabirintom(element) {
    element.classList.remove("move-down")
    element.classList.add("move-up")
}

function odrisiElementeNadLabirintom(element) {
    element.classList.remove("move-up")
    element.classList.add("move-down")
}

function toggleNavodila() {
    navodila.toggleSkrij()
}