export function escapar(target, propertyKey, descriptor) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args) {
        let retorno = metodoOriginal.apply(this, args);
        if (typeof retorno === "string") {
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, "");
            console.log(`O metodo ${propertyKey} foi alterado!`);
        }
        return retorno;
    };
    return descriptor;
}
