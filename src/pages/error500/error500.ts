import {Block, TProps} from "../../util/block";
import template from "./error500.pug";
import {compile} from "../../util/compile";
import {Link} from "../../components/Link/link";

export class Error500Page extends Block<TProps> {
    constructor() {
        super('div');
    }

    public render(): DocumentFragment {
        const linkChats = new Link( {
            text: 'Назад к чатам',
            href: '/messenger',
            classNames: ["error__link"],
        });
        return compile(template,{
            linkChats: linkChats
        });
    }
}

