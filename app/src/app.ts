import { NegociacaoController } from "./controllers/negociacao-controller.js";
import { NegociacoesView } from "./views/negociacoes-view.js";

const controller = new NegociacaoController();
const form: HTMLFormElement = document.querySelector(".form") as HTMLFormElement;
if (form){
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        controller.adiciona();
    })
} else {
    throw Error("O elemento form é nulo");
}

const botaoImporta = document.querySelector("#botao-importa") as HTMLButtonElement;
if (botaoImporta){
    botaoImporta.addEventListener("click", () =>{
        controller.importaDados();
    })
}
