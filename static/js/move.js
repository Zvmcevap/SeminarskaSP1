export function checkDirection(lab, polje, direction, availableMoves, visited) {
    if (direction === 'up' && polje.row === 0) {
        return false;
    }
    if (direction === 'down' && polje.row === lab.length - 1) {
        return false;
    }
    if (direction === 'left' && polje.column === 0) {
        return false;
    }
    if (direction === 'right' && polje.column === lab.length - 1) {
        return false;
    }
    let nextPolje = null;
    switch (direction) {
        case 'up':
            nextPolje = lab[polje.row - 1][polje.column]
            break;
        case 'down':
            nextPolje = lab[polje.row + 1][polje.column]
            break;
        case 'left':
            nextPolje = lab[polje.row][polje.column - 1]
            break;
        case 'right':
            nextPolje = lab[polje.row][polje.column + 1]
            break;
        default:
            return false;
    }
    if ((availableMoves) < nextPolje.stepsFromWin) {
        return false;
    }
    // Last check, returns true if you had not yet visited da place
    return !visited.includes(nextPolje);
}

export function move(lab, polje, direction, makepath) {
    let nextPolje = null;
    let comeFrom = "";
    switch (direction) {
        case 'up':
            nextPolje = lab[polje.row - 1][polje.column];
            comeFrom = 'down';
            break;
        case 'down':
            nextPolje = lab[polje.row + 1][polje.column];
            comeFrom = 'up';
            break;
        case 'left':
            nextPolje = lab[polje.row][polje.column - 1];
            comeFrom = 'right';
            break;
        case 'right':
            nextPolje = lab[polje.row][polje.column + 1];
            comeFrom = 'left';
            break;
        default:
            return null;
    }
    if (makepath) {
        polje.goTo = direction;
        nextPolje.comeFrom = comeFrom;
        nextPolje.setPath(true);
    }
    return nextPolje;
}