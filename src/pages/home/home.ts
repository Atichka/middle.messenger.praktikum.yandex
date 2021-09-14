import {Block} from "../../util/block"
import template from "./home.pug"
import {Button} from "../../components/Button/button"
import {compile} from "../../util/compile";

export class HomePage extends Block {
    constructor() {
        super('div')
    }

    public render(): DocumentFragment {
        const button = new Button( {
            text: 'Jump',
            events: {
                click: () => console.log("Clicked")
            },
        });
        return compile(template,{
            button: button,
        });
    }
}
