export function inspect(){
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ){
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]){
            console.log(`O metodo: ${propertyKey}`);
            console.log(`Os parâmetros ${JSON.stringify(args)}`)
            const retorno = metodoOriginal.apply(this, args);
            console.log(`O retorno ${JSON.stringify(retorno)}`)
            retorno
        }
        return descriptor
    }
}