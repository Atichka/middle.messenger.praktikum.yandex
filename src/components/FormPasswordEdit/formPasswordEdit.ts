import {Block} from "../../util/block";
import template from "./template.pug";
import {compile} from "../../util/compile";
import {addClass} from "../../../index";

export class FormPasswordEdit extends Block {
    constructor(props) {
        super("form", props);
    }

    public render(): DocumentFragment {
        addClass(this._element, this.props)
        this._element.setAttribute('id', this.props.id);
        this._element.setAttribute('name', this.props.name);
        return compile(template,
            {...this.props}
        );
    }
}
