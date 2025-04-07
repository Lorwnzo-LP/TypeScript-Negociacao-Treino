import { DiasDaSemana } from "../enum/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView", true);
        this.mensagemView = new MensagemView("#mensagemView");
        this.dataInput = document.querySelector("#data");
        this.valorInput = document.querySelector("#valor");
        this.quantidadeInput = document.querySelector("#quantidade");
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.dataInput.value, this.valorInput.value, this.quantidadeInput.value);
        console.log(negociacao);
        if (!this.diaUtil(negociacao.data)) {
            this.mensagemView.update("Criação de negociações somente em dias úteis!");
            return;
        }
        this.negociacoes.adicionar(negociacao);
        this.atualizaView();
        this.limpaFormulario();
    }
    diaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }
    limpaFormulario() {
        this.dataInput.value = "";
        this.valorInput.value = "";
        this.quantidadeInput.value = "";
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("A negociação foi salva com sucesso!");
    }
}
