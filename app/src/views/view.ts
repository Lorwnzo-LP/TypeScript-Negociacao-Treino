import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export abstract class View<T> {
    protected elemento: HTMLElement;
    constructor(seletor: string){
        const elemento = document.querySelector(seletor);
        if(elemento){
            this.elemento = elemento as HTMLElement;
        } else{
            throw Error("este elemento é nulo");
        }
    }

    protected abstract template(model: T): string;

    
    public update(model: T){
        const template = this.template(model);

        this.elemento.innerHTML = template;
    }
}