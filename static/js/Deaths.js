export class Deaths {
    constructor(deathDiv) {
        this.deathDiv = deathDiv
        this.title = document.createElement("h3")
        this.deathPic = document.createElement("img")
        this.subtitle = document.createElement("h4")
        this.paragraph = document.createElement("p")
        this.mortusCausa = {
            "minotaur": 0,
            "hit-wall": 1
        }
    }

    createSubtitle(text) {
        let subtitle = document.createElement("h4")
        subtitle.innerHTML = text
        return subtitle
    }

    createParagraph(text) {
        let paragraph = document.createElement("p")
        paragraph.innerHTML = text
        return paragraph
    }

    createSpecialParagraph(text) {
        let paragraph = document.createElement("p")
        paragraph.innerHTML = text
        paragraph.classList.add("hug-bottom")
        return paragraph
    }

    skrij() {
        this.deathDiv.classList.remove("return-down")
        this.deathDiv.classList.add("remove-up")
    }

    prikazi() {
        this.deathDiv.classList.remove("remove-up")
        this.deathDiv.classList.add("return-down")
    }


    deathMinotaur() {
        this.deathDiv.innerHTML = ""
        this.deathPic.src = "./images/minotaur.png"
        this.deathDiv.append(this.deathPic)
        this.title.innerHTML = "Mauled by minotaur"
        this.deathDiv.append(this.title)
        this.deathDiv.append(this.createSubtitle("Minotaur?"))
        this.deathDiv.append(this.createParagraph("Ah yeah, the minotaur, I forgot to tell you about the minotaur..."))
        this.deathDiv.append(this.createParagraph("Going backsies is not allowed..."))
        this.deathDiv.append(this.createSpecialParagraph("Try again and reach that <b class=\"special\">SPECIAL PRIZE!!!</b>"))
    }

    deathHitWall() {
        this.deathDiv.innerHTML = ""
        this.deathPic.src = "./images/hit-wall.png"
        this.deathDiv.append(this.deathPic)
        this.title.innerHTML = "Took a wrong turn"
        this.deathDiv.append(this.title)
        this.deathDiv.append(this.createSubtitle("And you hit a wall... "))
        this.deathDiv.append(this.createParagraph("Cracked your head wide open."))
        this.deathDiv.append(this.createParagraph("You gotta learn to listen Lue..."))
        this.deathDiv.append(this.createSpecialParagraph("Try again and reach that <b class=\"special\">SPECIAL PRIZE!!!</b>"))
    }
}