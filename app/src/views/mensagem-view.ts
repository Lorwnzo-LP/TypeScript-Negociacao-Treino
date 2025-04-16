import { View } from "./view.js";

export class Mensagem extends View<string> {

    protected template(model: string){
        return `
            <p class="alert alert-info">${model}</p>
        `
    }

}