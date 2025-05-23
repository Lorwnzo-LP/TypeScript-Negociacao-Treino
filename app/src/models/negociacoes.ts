import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes> {
    private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    public lista(): readonly Negociacao[]{
        return this.negociacoes;
    }

    paraTexto(): string {
        return `${JSON.stringify(this.negociacoes, null, 2)}`
    }

    ehIgual(parameter: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(parameter.lista())
    }
}