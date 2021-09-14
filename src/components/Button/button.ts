import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";

export class Button extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super("button", props);
    }

    render() {
        // const fragment = compile(
        //     template,
        //     {
        //         text: "text",
        //
        //     }
        // );
        //
        // this._element.appendChild(fragment); // this.root — корневой элемент компонента, можно брать просто fragment.firstChild например
        //
        // // можем тут навешивать ивенты, дергать lifecycle хуки, манипулировать DOM и тд и тп
        //
        // return this._element;
        return compile(template,{ ...this.props });
    }
}

