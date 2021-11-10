import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../../index";

export class Image extends Block {
    constructor(props) {
        super("img", props);
    }

    render() {
        addClass(this._element, this.props);
        if(this.props.src) {
            this._element.setAttribute('src', 'https://ya-praktikum.tech/api/v2/resources' + this.props.src);
        } else {
            this._element.setAttribute('src', 'https://prote.ua/image/cache/no-photo-img-1024x1024.png')
        }
        this._element.setAttribute('id', this.props.id);

        return compile(template,{...this.props});
    }
}

