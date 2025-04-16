var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInject } from "../decorators/domInject.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dia-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-services.js";
import { Imprimir } from "../utils/imprimir.js";
import { Mensagem } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new Mensagem('#mensagemView');
        this.negociacaoService = new NegociacoesService();
        this.imprimir = new Imprimir();
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dia úteis são aceitas');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        console.log(`
                Data: ${negociacao.data},
                quantidade: ${negociacao.quantidade},
                valor: ${negociacao.valor}
                `);
        this.imprimir.imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.atualizaView();
    }
    importaDados() {
        this.negociacaoService
            .obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
            return negociacoesDeHoje.filter((negociacaoDoDia) => {
                return !this.negociacoes
                    .lista()
                    .some(negociacao => negociacao
                    .ehIgual(negociacaoDoDia));
            });
        })
            .then(negociacoesDeHoje => {
            for (let negociacao of negociacoesDeHoje) {
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
    }
    ehDiaUtil(date) {
        return date.getDate() > DiasDaSemana.DOMINGO && date.getDay() < DiasDaSemana.SABADO;
    }
    limparFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Sua negociação foi realizada com sucesso!");
    }
    ;
}
__decorate([
    domInject("#data")
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInject("#quantidade")
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInject("#valor")
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    logarTempoDeExecucao()
], NegociacaoController.prototype, "importaDados", null);
