import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";

export class Button extends Block {
    constructor(props) {
        super("button", props);
    }

    render() {
        if(Array.isArray(this.props.classNames)) {
            this._element.classList.add(...this.props.classNames)
        } else {
            this._element.classList.add(this.props.classNames)
        }

        return compile(template,{...this.props});
    }
}

