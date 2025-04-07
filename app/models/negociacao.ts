export class Negociacao {
    constructor (
        private _data: Date,
        public readonly valor: number,
        public readonly quantidade: number
    ){}

    get volume(): number {
        return this.valor * this.quantidade;
    }

    get data(): Date {
        const date = new Date(this._data.getDate())
        return this._data;
    }

    public static criaDe(dataString: string, valorString: string, quantidadeString: string) {
        const exp = /-/g;
        const data = new Date(dataString.replace(exp, ","));
        const valor = parseInt(valorString);
        const quantidade = parseInt(quantidadeString);
        return new Negociacao(data, valor, quantidade)
    }
}

  