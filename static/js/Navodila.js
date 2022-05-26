export class Navodila {
    constructor(podanDiv) {
        this.celotendiv = document.getElementById("navodila")
        this.prikazano = true
    }

    skrij() {
        this.celotendiv.classList.remove("return-down")
        this.celotendiv.classList.add("remove-up")
        this.prikazano = false
    }

    prikazi() {
        this.celotendiv.classList.remove("remove-up")
        this.celotendiv.classList.add("return-down")
        this.prikazano = true
    }
     toggleSkrij() {
        if (this.prikazano) {
            this.skrij()
        } else {
            this.prikazi()
        }
    }
}