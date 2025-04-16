export class View {
    constructor(seletor) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error("este elemento é nulo");
        }
    }
    update(model) {
        const template = this.template(model);
        this.elemento.innerHTML = template;
    }
}
