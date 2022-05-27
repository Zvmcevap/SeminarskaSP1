export class Player {
    constructor(visited, playerImg) {
        this.stevilkaPolja = 0
        this.seznamPoti = visited
        this.playerImg = playerImg
    }

    setPlayerImgMale() {
        this.playerImg.src = "./images/player_m.png"
    }

    setPlayerImgFemale() {
        this.playerImg.src = "./images/player_f.png"
    }

    moveUp() {

    }
}