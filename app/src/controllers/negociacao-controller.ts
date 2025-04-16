import { domInject } from "../decorators/domInject.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dia-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-services.js";
import { Imprimir } from "../utils/imprimir.js";
import { Mensagem } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
    @domInject("#data")
    private inputData: HTMLInputElement;
    @domInject("#quantidade")
    private inputQuantidade: HTMLInputElement;
    @domInject("#valor")
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new Mensagem('#mensagemView');
    private negociacaoService = new NegociacoesService();
    private imprimir = new Imprimir();

    constructor() {
        this.negociacoesView.update(this.negociacoes)
    }
    
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if(!this.ehDiaUtil(negociacao.data)){
            this.mensagemView.update('Apenas negociações em dia úteis são aceitas');
            return;
        }
            this.negociacoes.adiciona(negociacao);
            console.log(`
                Data: ${negociacao.data},
                quantidade: ${negociacao.quantidade},
                valor: ${negociacao.valor}
                `)
            this.imprimir.imprimir(negociacao, this.negociacoes)
            this.limparFormulario();
            this.atualizaView();
    }

    @logarTempoDeExecucao()
    importaDados(): void {
        this.negociacaoService
        .obterNegociacoesDoDia()
        .then(negociacoesDeHoje => {
            return negociacoesDeHoje.filter((negociacaoDoDia) => {
                return !this.negociacoes
                    .lista()
                    .some(negociacao => negociacao
                        .ehIgual(negociacaoDoDia))
            })
        })
        .then(negociacoesDeHoje => {
            for(let negociacao of negociacoesDeHoje){
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        })
    }

    private ehDiaUtil(date: Date){
        return date.getDate() > DiasDaSemana.DOMINGO && date.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }

    private atualizaView() {
        this.negociacoesView.update(this.negociacoes)
        this.mensagemView.update("Sua negociação foi realizada com sucesso!")
    };

}