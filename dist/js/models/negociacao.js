export class Negociacao {
    constructor(_data, valor, quantidade) {
        this._data = _data;
        this.valor = valor;
        this.quantidade = quantidade;
    }
    get volume() {
        return this.valor * this.quantidade;
    }
    get data() {
        const date = new Date(this._data.getDate());
        return this._data;
    }
    static criaDe(dataString, valorString, quantidadeString) {
        const exp = /-/g;
        const data = new Date(dataString.replace(exp, ","));
        const valor = parseInt(valorString);
        const quantidade = parseInt(quantidadeString);
        return new Negociacao(data, valor, quantidade);
    }
}
