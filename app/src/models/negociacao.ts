import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao> {
    constructor(
        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) {}

    public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao{
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ","));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

    get volume(): number {
        return this.valor * this.quantidade;
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return this._data;
    }

    public ehIgual(negociacao: Negociacao){
        return negociacao.data === this.data 
        && negociacao.quantidade === this.quantidade 
        && negociacao.valor === this.valor
    }

    public paraTexto(): string {
        return `
        Data: ${this.data},
        Quantidade: ${this.quantidade},
        Valor: ${this.valor}.
        `
    }
}