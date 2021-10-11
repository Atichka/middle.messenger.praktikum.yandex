import {Block} from "../../util/block";
import template from "./error404.pug";
import {compile} from "../../util/compile";
import {Link} from "../../components/Link/link";

export class Error404Page extends Block {
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

