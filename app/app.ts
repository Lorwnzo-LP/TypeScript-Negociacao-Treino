import { NegociacaoController } from "./controllers/negociacao-controller.js";

const negociacao = new NegociacaoController()
const form: HTMLElement = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    negociacao.adiciona()
})