import {Block} from "../../tpl/classes/block";
import {compile} from "../../util/compile";
import template from "./template.pug";

export class Button extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super("button", props);
    }

    render() {
        // В проекте должен быть ваш собственный шаблонизатор
        // return `<div>${this.props.text}</div>`;

        const fragment = compile(
            template,
            {
                name: 'John Doe',
            }
        );

        this._element.appendChild(fragment); // this.root — корневой элемент компонента, можно брать просто fragment.firstChild например

        // можем тут навешивать ивенты, дергать lifecycle хуки, манипулировать DOM и тд и тп

        return this._element;
    }
}

