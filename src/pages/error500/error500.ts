import {Block} from "../../util/block";
import template from "./error500.pug";
import {compile} from "../../util/compile";

export class Error500Page extends Block {
    constructor() {
        super('div');
    }

    public render(): DocumentFragment {
        return compile(template,{});
    }
}

