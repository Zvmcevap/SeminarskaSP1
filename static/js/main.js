import {makeGrid} from "./createLab.js"
import {makePath, getStartingPolje} from "./makePath.js"
import {
    fromPlayToMoveButtons,
    fromMoveToPlayButtons,
    buttonBeepRed,
    buttonBoopWhite,
    returnMovementButtons, hideMovementButtons
} from "./buttons.js"
import {Deaths} from "./Deaths.js";
import {Navodila} from "./Navodila.js";

let visited = [];
const gridSize = 7;
const labirint = document.getElementById("labirint")
const playerImage = document.getElementById("player-img")
const playerStartingDiv = document.getElementById("player-start")
let currentPoljeIndex = -1

const poljaArray = makeGrid(gridSize);
gridCSSSize(gridSize, labirint)

const deathScreen = document.getElementById("death-screen")
const deaths = new Deaths(deathScreen)

const navodila = new Navodila()
const gumbInfo = document.getElementById("info-button")
gumbInfo.addEventListener('mouseover', () => gumbInfo.classList.remove("come-into-from-top"))
gumbInfo.addEventListener('click', toggleNavodila)

const playButton = document.getElementById("play-button")
let isBeep = false;
let playButtonBeepInterval = null;
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

const moveButtonUp = document.getElementById("move-up")
moveButtonUp.addEventListener("click", movementUp)

let moveButtonBeepInterval = null
const moveButtonDown = document.getElementById("move-down")
moveButtonDown.addEventListener("click", movementDown)
const moveButtonLeft = document.getElementById("move-left")
moveButtonLeft.addEventListener("click", movementLeft)
const moveButtonRight = document.getElementById("move-right")
moveButtonRight.addEventListener("click", movementRight)

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
    document.addEventListener("keydown", handleKeyPress)
    currentPoljeIndex = -1
    playerStartingDiv.appendChild(playerImage)
    playerImage.classList.remove("dead")
    if (playButtonBeepInterval != null) {
        clearInterval(playButtonBeepInterval)
    }
    for (const polje of visited) {
        polje.setPath(false);
        polje.goTo = "";
        polje.comeFrom = "";
    }
    let start = getStartingPolje(poljaArray)
    visited = [start];

    visited = makePath(poljaArray, 14, visited, getStartingPolje(poljaArray));

    navodila.skrij()
    deaths.skrij()
    fromPlayToMoveButtons(oneButtonDiv, moveButtonsDiv);
    pelikaniPriletijo()
    moveButtonBeepInterval = setInterval(buttonBeepBoop, 750, moveButtonUp)

    for (let i = 0; i < usesa.length; i++) {
        setTimeout(narisiElementNadLabirintom, 100 * i, usesa[i])
        setTimeout(narisiElementNadLabirintom, 100 * i, banane[i])
    }
}

function death(causa) {
    document.removeEventListener("keydown", handleKeyPress)
    hideMovementButtons([moveButtonDown, moveButtonRight, moveButtonLeft, earButton])
    fromMoveToPlayButtons(oneButtonDiv, moveButtonsDiv);
    playerImage.classList.add("dead")
    pelikaniOdletijo()


    for (let i = 0; i < 3; i++) {
        setTimeout(odrisiElementeNadLabirintom, 100 * i, usesa[i])
        setTimeout(odrisiElementeNadLabirintom, 100 * i, banane[i])
    }

    switch (causa) {
        case "minotaur":
            deaths.deathMinotaur()
            break
        case "hit-wall":
            deaths.deathHitWall()
            break
    }
    deaths.prikazi()
    playButtonBeepInterval = setInterval(buttonBeepBoop, 750, playButton)
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

function buttonBeepBoop(button) {
    if (isBeep) {
        buttonBeepRed(button)
        isBeep = false;
    } else {
        buttonBoopWhite(button)
        isBeep = true
    }
}

function pelikaniPriletijo() {
    pelikaniDesno.classList.remove("odletijo")
    pelikaniDesno.classList.add("priletijo")
    pelikaniLevo.classList.remove("odletijo")
    pelikaniLevo.classList.add("priletijo")
}

function pelikaniOdletijo() {
    pelikaniDesno.classList.replace("priletijo", "odletijo")
    pelikaniLevo.classList.replace("priletijo", "odletijo")
}


function movementUp() {
    if (currentPoljeIndex === -1) {
        returnMovementButtons([moveButtonDown, moveButtonRight, moveButtonLeft, earButton])
        clearInterval(moveButtonBeepInterval)
        moveButtonUp.style.fill = "white"
        visited[0].div.appendChild(playerImage)
        currentPoljeIndex = 0
        console.log(currentPoljeIndex)
    } else {
        if (visited[currentPoljeIndex].goTo === "up") {
            currentPoljeIndex += 1
            visited[currentPoljeIndex].div.appendChild(playerImage)
        } else if (visited[currentPoljeIndex].comeFrom === "up") {
            death("minotaur")
        } else {
            death("hit-wall")
        }
    }
}

function movementDown() {
    if (currentPoljeIndex < 0) {
        return
    }

    if (visited[currentPoljeIndex].goTo === "down") {
        currentPoljeIndex += 1
        visited[currentPoljeIndex].div.appendChild(playerImage)
    } else if (visited[currentPoljeIndex].comeFrom === "down") {
        death("minotaur")
    } else {
        death("hit-wall")
    }
}

function movementLeft() {
    if (currentPoljeIndex < 0) {
        return
    }

    if (visited[currentPoljeIndex].goTo === "left") {
        currentPoljeIndex += 1
        visited[currentPoljeIndex].div.appendChild(playerImage)
    } else if (visited[currentPoljeIndex].comeFrom === "left") {
        death("minotaur")
    } else {
        death("hit-wall")
    }
}

function movementRight() {
    if (currentPoljeIndex < 0) {
        return
    }
    if (visited[currentPoljeIndex].goTo === "right") {
        currentPoljeIndex += 1
        visited[currentPoljeIndex].div.appendChild(playerImage)
    } else if (visited[currentPoljeIndex].comeFrom === "right") {
        death("minotaur")
    } else {
        death("hit-wall")
    }
}

function handleKeyPress(e) {
    console.log(e.key)
    if (e.key === "v") {
        movementUp()
        return;
    }
    if (e.key === "m") {
        movementDown()
        return;
    }
    if (e.key === "p") {
        movementRight()
        return;
    }
    if (e.key === "q") {
        movementLeft()
    }
}