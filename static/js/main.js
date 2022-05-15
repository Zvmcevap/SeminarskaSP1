import {makeGrid} from "./createLab.js"
import {makePath, getStartingPolje} from "./makePath.js"

let visited = [];
const gridSize = 7;
const labirint = document.getElementById("labirint")
const poljaArray = makeGrid(gridSize);
gridCSSSize(gridSize, labirint)

const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', reset)

for (let i = 0; i < poljaArray.length; i++) {
    for (let l = 0; l < poljaArray[i].length; l++) {
        labirint.appendChild(poljaArray[i][l].div);
    }
}

function gridCSSSize(gridSize, labirint) {
    labirint.style.setProperty('--numberOfColumns', gridSize);
    labirint.style.setProperty('--numberOfRows', gridSize)
}

function reset() {
    for (const polje of visited) {
        polje.setPath(false);
    }
    let start = getStartingPolje(poljaArray)
    visited = [start];

    visited = makePath(poljaArray, 10, visited, getStartingPolje(poljaArray));
    console.log("Reset finished")
    console.log(visited)
}