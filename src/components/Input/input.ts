import {Block, TProps} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../util/funcForComponents";

export class Input extends Block<TProps> {
    constructor(props: any) {
        super("input", props);
    }

    render() {
        addClass(this._element, this.props);
        if(this.props.id){
            this._element.setAttribute('id', <string>this.props.id);
        }
        if(this.props.type){
            this._element.setAttribute('type', <string>this.props.type);
        }
        if(this.props.name){
            this._element.setAttribute('name', <string>this.props.name);
        }
        if(this.props.minlength){
            this._element.setAttribute('minlength', <string>this.props.minlength);
        }
        if(this.props.maxlength){
            this._element.setAttribute('maxlength', <string>this.props.maxlength);
        }
        if(this.props.required){
            this._element.setAttribute('required', <string>this.props.required);
        }
        if(this.props.min){
            this._element.setAttribute('required', <string>this.props.min);
        }
        if(this.props.max){
            this._element.setAttribute('required', <string>this.props.max);
        }
        if(this.props.placeholder){
            this._element.setAttribute('placeholder', <string>this.props.placeholder);
        }
        if(this.props.value) {
            this._element.setAttribute('value', <string>this.props.value);
        } else if(this.props.value){
            this._element.setAttribute('value', '');
        }
        return compile(template,{...this.props});
    }
}

