import {Block, TProps} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../util/funcForComponents";

export class Chat extends Block<TProps> {
    constructor(props: {}) {
        super("main", props);
    }

    render() {
        addClass(this._element, this.props);

        return compile(template,{...this.props});
    }
}

