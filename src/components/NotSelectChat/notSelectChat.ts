import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../../index";

export class NotSelectChat extends Block {
    constructor(props) {
        super("h3", props);
    }

    render() {
        addClass(this._element, this.props);

        return compile(template,{...this.props});
    }
}

