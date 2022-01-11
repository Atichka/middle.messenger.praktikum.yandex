import {Block, TProps} from "../../util/block";
import template from "./template.pug";
import {compile} from "../../util/compile";
import {addClass} from "../../util/funcForComponents";

export class FormChats extends Block<TProps> {
    constructor(props: {}) {
        super("form", props);
    }

    public render(): DocumentFragment {
        addClass(this._element, this.props);
        this._element.setAttribute('id', this.props.id as string);
        this._element.setAttribute('name', this.props.name as string);
        return compile(template,
            {...this.props}
        );
    }
}
