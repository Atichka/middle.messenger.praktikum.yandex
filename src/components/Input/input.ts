import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../../index";

export class Input extends Block {
    constructor(props) {
        super("input", props);
    }

    render() {
        addClass(this._element, this.props);
        if(this.props.id){
            this._element.setAttribute('id', this.props.id);
        }
        if(this.props.type){
            this._element.setAttribute('type', this.props.type);
        }
        if(this.props.name){
            this._element.setAttribute('name', this.props.name);
        }
        if(this.props.minlength){
            this._element.setAttribute('minlength', this.props.minlength);
        }
        if(this.props.maxlength){
            this._element.setAttribute('maxlength', this.props.maxlength);
        }
        if(this.props.required){
            this._element.setAttribute('required', this.props.required);
        }
        if(this.props.placeholder){
            this._element.setAttribute('placeholder', this.props.placeholder);
        }
        if(this.props.value) {
            this._element.setAttribute('value', this.props.value);
        } else if(this.props.value){
            this._element.setAttribute('value', '');
        }
        return compile(template,{...this.props});
    }
}

