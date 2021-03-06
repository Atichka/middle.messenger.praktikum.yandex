import {Block, TProps} from "../../util/block";
import {compile} from "../../util/compile";
import template from "./template.pug";
import {addClass} from "../../util/funcForComponents";
import ChatsController from "../../controllers/ChatsController";

export class List extends Block<TProps> {
    constructor(props: {}) {
        super('li', {
            ...props,
            events: {
                // @ts-ignore
                click: () => ChatsController.openChat(this.props.id)
            }
        });
    }

    render() {
        addClass(this._element, this.props);

        return compile(template,{...this.props});
    }
}

