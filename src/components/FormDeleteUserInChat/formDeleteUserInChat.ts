import {Block, TProps} from "../../util/block";
import template from "./template.pug";
import {compile} from "../../util/compile";
import {addClass} from "../../util/funcForComponents";

export class FormDeleteUserInChat extends Block<TProps> {
    constructor(props: any) {
        super("form", props);
    }

    public render(): DocumentFragment {
        addClass(this._element, this.props);
        this._element.setAttribute('id', <string>this.props.id);
        this._element.setAttribute('name', <string>this.props.name);
        return compile(template,
            {...this.props}
        );
    }
}
