import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";

export class Button extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super("button", props);
    }

    render() {
        // this._element.add(...this.props.classNames)

        return compile(template,{ ...this.props });
    }
}

