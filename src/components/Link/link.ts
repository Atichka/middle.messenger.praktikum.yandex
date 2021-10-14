import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../../index";

export class Link extends Block {
    constructor(props) {
        super("a", props);
    }

    render() {
        addClass(this._element, this.props);
        if(this.props.href) {
            this._element.setAttribute('href', this.props.href);
        }

        return compile(template,{...this.props});
    }
}

