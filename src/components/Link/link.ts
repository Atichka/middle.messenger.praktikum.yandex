import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../../index";

export class Link extends Block {
    constructor(props) {
        super("link", props);
    }

    render() {
        addClass(this._element, this.props);
        // this._element.setAttribute('href', this.props.href);
        this._element.href = this.props.href;   Ф

        return compile(template,{...this.props});
    }
}

