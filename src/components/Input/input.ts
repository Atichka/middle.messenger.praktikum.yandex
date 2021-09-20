import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../../index";

export class Input extends Block {
    constructor(props) {
        super("input", props);
    }

    render() {
        addClass(this._element, this.props);
        this._element.setAttribute('id', this.props.id);
        this._element.setAttribute('type', this.props.type);
        this._element.setAttribute('name', this.props.name);
        this._element.setAttribute('minlength', this.props.minlength);
        this._element.setAttribute('maxlength', this.props.maxlength);
        this._element.setAttribute('required', this.props.required);
        this._element.setAttribute('placeholder', this.props.placeholder);

        return compile(template,{...this.props});
    }
}

