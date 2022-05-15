export function makeGrid(num) {
    const labirint = [];
    const center = num / 2 - 0.5;
    for (let row = 0; row < num; row++) {
        let newRow = []
        labirint.push(newRow)
        for (let column = 0; column < num; column++) {
            const novoPolje = new Polje(row, column, center)
            labirint[row].push(novoPolje);
        }
    }
    return labirint;
}

class Polje {
    constructor(row, column, center) {
        this.row = row;
        this.column = column;
        this.path = false;
        this.player = false;
        this.comeFrom = "";
        this.goTo = "";
        this.stepsFromWin = this.row + Math.abs(center - this.column);

        this.div = document.createElement("div");
        this.div.classList.add("polje")
        this.div.setAttribute("id", "" + row + "" + column)
        this.div.innerHTML = this.stepsFromWin;
    }

    printInfo() {
        console.log("Steps from Win: " + this.stepsFromWin + ", Polje id: " + this.div.getAttribute("id"))
    }

    setPath(bool) {
        this.path = bool;
        if (bool) {
            this.div.dataset.state = "path";
        }
        else {
            delete this.div.dataset.state;
        }
    }
}