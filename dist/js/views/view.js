export class View {
    constructor(seletor, escape) {
        this.escape = false;
        const elemento = document.querySelector(`${seletor}`);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error(`O seletor ${seletor} não retornou um elemento válido!`);
        }
    }
    update(model) {
        const template = this.template(model);
        if (this.escape) {
            template.replace(/<script>[\s\S]*?<\/script>/, "");
        }
        this.elemento.innerHTML = template;
    }
}
