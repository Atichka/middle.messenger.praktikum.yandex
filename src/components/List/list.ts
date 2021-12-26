import {Block} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../../index";
import store from "../../util/store";

export class List extends Block {
    constructor(props) {
        super('li', {
            ...props,
            events: {
                click: () => this.openChat()
            }
        });
    }

    openChat() {
        const { events, ...chat } = this.props;
        store.set(store.getState(), 'currentChat', chat);
    }

    render() {
        addClass(this._element, this.props);

        return compile(template,{...this.props});
    }
}

