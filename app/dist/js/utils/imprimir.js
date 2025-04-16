export class Imprimir {
    imprimir(...objetos) {
        for (let objeto of objetos) {
            console.log(objeto.paraTexto());
        }
    }
}
