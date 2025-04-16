import { Imprimivel } from "./imprimivel.js";

export class Imprimir{
    imprimir(...objetos: Imprimivel[]){
        for(let objeto of objetos){
            console.log(objeto.paraTexto());
        }
    }
}