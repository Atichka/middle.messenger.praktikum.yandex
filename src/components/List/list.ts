import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../../index";
import ChatsController from "../../controllers/ChatsController";

export class List extends Block {
    constructor(props) {
        super('li', {
            ...props,
            events: {
                click: () => ChatsController.openChat(this.props.id)
            }
        });
    }

    render() {
        addClass(this._element, this.props);

        return compile(template,{...this.props});
    }
}

