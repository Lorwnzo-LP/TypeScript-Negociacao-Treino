import { Negociacao } from "./negociacao.js";

export class Negociacoes{
    public negociacoes: Negociacao[] = [];

    public adicionar(negociacao: Negociacao){
        this.negociacoes.push(negociacao);
    }

    public lista(): readonly Negociacao[]{
        return this.negociacoes
    }
}