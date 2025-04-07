export abstract class View<T> {
    protected elemento: HTMLElement;
    private escape: boolean = false;
    constructor(seletor: string, escape?: boolean) {
        this.elemento = document.querySelector(`${seletor}`);
    }

    protected abstract template(model: T): string;

    public update(model: T) {
        const template = this.template(model);
        if(this.escape){
            template.replace(/<script>[\s\S]*?<\/script>/,"");
        }
        this.elemento.innerHTML = template;
    }
}