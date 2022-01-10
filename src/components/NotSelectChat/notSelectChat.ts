import {Block, TProps} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../util/funcForComponents";

export class NotSelectChat extends Block<TProps> {
    constructor(props: any) {
        super("h3", props);
    }

    render() {
        addClass(this._element, this.props);

        return compile(template,{...this.props});
    }
}

