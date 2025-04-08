import { NegociacaoController } from "./controllers/negociacao-controller.js";
const negociacao = new NegociacaoController();
const form = document.querySelector(".form");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        negociacao.adiciona();
    });
}
else {
    throw Error(`O seletor ${form} não retornou um elemento válido`);
}
