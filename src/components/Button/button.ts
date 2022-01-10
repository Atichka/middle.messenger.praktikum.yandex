import {Block, TProps} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../util/funcForComponents";

export class Button extends Block<TProps> {
    constructor(props: any) {
        super("button", props);
    }

    render() {
        addClass(this._element, this.props);
        if(this.props.avatar) {
            this._element.setAttribute('style', `background-image: url(${this.props.avatar})`);
        }

        return compile(template,{...this.props});
    }
}

