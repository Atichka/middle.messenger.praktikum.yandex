import {Block, TProps} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../util/funcForComponents";

export class Link extends Block<TProps> {
    constructor(props: {}) {
        super("a", props);
    }

    render() {
        addClass(this._element, this.props);
        if(this.props.href) {
            this._element.setAttribute('href', this.props.href as string);
        }

        return compile(template,{...this.props});
    }
}

