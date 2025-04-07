import { DiasDaSemana } from "../enum/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController{
    private dataInput: HTMLInputElement;
    private valorInput: HTMLInputElement;
    private quantidadeInput: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView: NegociacoesView = new NegociacoesView("#negociacoesView", true);
    private mensagemView: MensagemView = new MensagemView("#mensagemView");

    constructor() {
        this.dataInput = document.querySelector("#data");
        this.valorInput = document.querySelector("#valor");
        this.quantidadeInput = document.querySelector("#quantidade");
    }

    public adiciona(){
        const negociacao = Negociacao.criaDe(
            this.dataInput.value, 
            this.valorInput.value, 
            this.quantidadeInput.value
        );
        console.log(negociacao);

        if (!this.diaUtil(negociacao.data)){
            this.mensagemView.update("Criação de negociações somente em dias úteis!");
            return
        }
        this.negociacoes.adicionar(negociacao);
        this.atualizaView();
        this.limpaFormulario();
    }

    private diaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    private limpaFormulario() {
        this.dataInput.value = "";
        this.valorInput.value = "";
        this.quantidadeInput.value = "";
    }

    private atualizaView () {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("A negociação foi salva com sucesso!");
    }
}