import {move, checkDirection} from "./move.js";

// Beno tries recursion :S
export function makePath(labirint, movesAvailable, visited, currentPolje) {

    let directions = getThreeDirections(currentPolje)
    let movesLeft = movesAvailable - visited.length;
    let nextPolje = null;

    // Get available directions
    shuffleArray(directions);

    for (let i = 0; i < directions.length; i++) {
        let direction = directions[i];
        if (checkDirection(labirint, currentPolje, direction, movesLeft, visited)) {
            nextPolje = move(labirint, currentPolje, direction, true)
            visited.push(nextPolje);
            makePath(labirint, movesAvailable, visited, nextPolje);
        }
        movesLeft = movesAvailable - visited.length;
        if (movesLeft === -1) {
            return visited;
        }
    }

    currentPolje.setPath(false);
    visited.pop();


    /* Relic from an age where I didn't solve it with recursion... it didn't work well...

        for (let i = 0; i <= pathLength; i++) {
            let randomInt = getRandomInt(0, 4);
            let possibleDirections = [...directions];
            let availableMoves = pathLength - visited.length;

            while (possibleDirections.length > 0) {
                if (!checkDirection(labirint, currentPolje, directions[randomInt], true, availableMoves ,visited)) {
                    possibleDirections.splice(randomInt, 1);
                    randomInt = getRandomInt(0, possibleDirections.length);
                } else {
                    break
                }
            }
            if (possibleDirections.length === 0) {
                i--;
                if (visited.length > 1) {
                    currentPolje.setPath(false)
                    visited.pop();
                    currentPolje = visited[visited.length - 1];
                }
                continue
            }
            nextPolje = move(labirint, currentPolje, directions[randomInt], true);
            if (nextPolje !== null) {
                currentPolje = nextPolje;
                visited.push(currentPolje);
                console.log(visited)
            }
        }
        return visited
     */
}

function getThreeDirections(polje) {
    switch (polje.comeFrom) {
        case 'up':
            return ['down', 'left', 'right']
        case 'down':
            return ['up', 'left', 'right']
        case 'left':
            return ['up', 'down', 'right']
        case 'right':
            return ['up', 'down', 'left']
    }
}

export function getStartingPolje(labirint) {
    const startRow = labirint.length - 1;
    const startColumn = startRow / 2;
    let startingPolje = labirint[startRow][startColumn];
    startingPolje.comeFrom = 'down';
    startingPolje.setPath(true);
    return startingPolje;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
