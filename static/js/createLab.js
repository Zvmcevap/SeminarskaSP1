export function makeGrid(num) {
    const labirint = [];
    const center = num / 2 - 0.5;
    for (let row = 0; row < num; row++) {
        let newRow = []
        labirint.push(newRow)
        for (let column = 0; column < num; column++) {
            const novoPolje = new Polje(row, column, center)
            labirint[row].push(novoPolje);
            if (row === 0 && column !== 3) {
                novoPolje.div.classList.add("border-top")
            }
            if (row === num - 1 && column !== 3) {
                novoPolje.div.classList.add("border-bottom")
            }
            if (column === 0) {
                novoPolje.div.classList.add("border-left")
            }
            if (column === num - 1) {
                novoPolje.div.classList.add("border-right")
            }
            if (column === 0 && row === 0) {
                novoPolje.div.classList.add("border-radius-top-left")
            }
            if (column === 0 && row === num - 1) {
                novoPolje.div.classList.add("border-radius-bot-left")
            }
            if (column === num - 1 && row === 0) {
                novoPolje.div.classList.add("border-radius-top-right")
            }
            if (column === num - 1 && row === num - 1) {
                novoPolje.div.classList.add("border-radius-bot-right")
            }
        }
    }
    return labirint;
}

class Polje {
    constructor(row, column, center) {
        this.row = row;
        this.column = column;
        this.path = false;
        this.comeFrom = "";
        this.goTo = "";
        this.stepsFromWin = this.row + Math.abs(center - this.column);

        this.div = document.createElement("div");
        this.div.classList.add("polje")
        this.div.setAttribute("id", "" + row + "" + column)
    }

    setPath(bool) {
        this.path = bool;
        if (bool) {
            this.div.dataset.state = "path";
        } else {
            delete this.div.dataset.state;
        }
    }
}