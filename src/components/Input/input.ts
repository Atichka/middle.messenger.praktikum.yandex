import {Block, TProps} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../util/funcForComponents";

export class Input extends Block<TProps> {
    constructor(props: {}) {
        super("input", props);
    }

    render() {
        addClass(this._element, this.props);
        if(this.props.id){
            this._element.setAttribute('id', this.props.id as string);
        }
        if(this.props.type){
            this._element.setAttribute('type', this.props.type as string);
        }
        if(this.props.name){
            this._element.setAttribute('name', this.props.name as string);
        }
        if(this.props.minlength){
            this._element.setAttribute('minlength', this.props.minlength as string);
        }
        if(this.props.maxlength){
            this._element.setAttribute('maxlength', this.props.maxlength as string);
        }
        if(this.props.required){
            this._element.setAttribute('required', this.props.required as string);
        }
        if(this.props.min){
            this._element.setAttribute('required', this.props.min as string);
        }
        if(this.props.max){
            this._element.setAttribute('required', this.props.max as string);
        }
        if(this.props.placeholder){
            this._element.setAttribute('placeholder', this.props.placeholder as string);
        }
        if(this.props.value) {
            this._element.setAttribute('value', this.props.value as string);
        } else if(this.props.value){
            this._element.setAttribute('value', '');
        }
        return compile(template,{...this.props});
    }
}

