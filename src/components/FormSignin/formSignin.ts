import {Block} from "../../util/block";
import template from "./template.pug";
import {compile} from "../../util/compile";

export class FormSignin extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super("form", props);
    }

    public render(): DocumentFragment {
        if(Array.isArray(this.props.classNames)) {
            this._element.classList.add(...this.props.classNames)
        } else {
            this._element.classList.add(this.props.classNames)
        }
        this._element.setAttribute('id', this.props.id);
        this._element.setAttribute('name', this.props.name);
        return compile(template,
            {...this.props}
        );
    }
}
