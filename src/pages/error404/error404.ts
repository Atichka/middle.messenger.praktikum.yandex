import {Block} from "../../util/block";
import template from "./error404.pug";
import {compile} from "../../util/compile";

export class Error404Page extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        return compile(template,{});
    }
}

