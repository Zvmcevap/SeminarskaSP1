function moveButtonLeft(button) {
    button.classList.remove("return-left")
    button.classList.add("move-left")
}

function returnButtonLeft(button) {
    button.classList.remove("move-left")
    button.classList.add("return-left")
}

function moveButtonRight(button) {
    button.classList.remove("return-right")
    button.classList.add("move-right")
}

function returnButtonRight(button) {
    button.classList.remove("move-right")
    button.classList.add("return-right")
}

export function fromMoveToPlayButtons(playButton, moveButtonsDiv) {
    moveButtonRight(moveButtonsDiv)
    setTimeout(returnButtonLeft, 300, playButton)

}

export function fromPlayToMoveButtons(playButton, moveButtonsDiv) {
    moveButtonLeft(playButton)
    setTimeout(returnButtonRight, 300, moveButtonsDiv)
    setTimeout(setDisplayGrid, 300, moveButtonsDiv)
}

function setDisplayGrid(buttonDiv) {
    buttonDiv.style.display = "grid";
}