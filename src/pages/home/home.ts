import {Block} from "../../util/block"
import template from "./home.pug"
import {Button} from "../../components/Button/button"
import {compile} from "../../util/compile"
import {ChatsPage} from "../chats/index"
import {ProfilePage} from "../profile/profile"
import {ProfileEditPage} from "../profileEdit/profileEdit"
import {PasswordEditPage} from "../passwordEdit/passwordEdit"
import {Error404Page} from "../error404/error404"
import {Error500Page} from "../error500/error500"
import {Router} from "../../util/router"

export class HomePage extends Block {
    constructor() {
        super('div');
    }

    public render(): DocumentFragment {
        const buttonLogin = new Button( {
            text: "login",
            events: {
                click: () => {
                    const router = new Router();
                    router.go('/login');
                },
            },
        });
        const buttonSignin = new Button( {
            text: "signin",
            events: {
                click: () => {
                    const router = new Router();
                    router.go('/sign-up');
                }
            },
        });
        const buttonChats = new Button( {
            text: "chats",
            events: {
                click: () => {
                    const router = new Router();
                    router.go('/messenger');
                }
            },
        });
        const buttonProfile = new Button( {
            text: "profile",
            events: {
                click: () => {
                    const router = new Router();
                    router.go('/profile');
                }
            },
        });
        const buttonProfileEdit = new Button( {
            text: "profile edit",
            events: {
                click: () => render('#app', new ProfileEditPage()),
            },
        });
        const buttonPasswordEdit = new Button( {
            text: "password edit",
            events: {
                click: () => render('#app', new PasswordEditPage()),
            },
        });
        const buttonError404 = new Button( {
            text: "error 404",
            events: {
                click: () => render('#app', new Error404Page()),
            },
        });
        const buttonError500 = new Button( {
            text: "error 500",
            events: {
                click: () => render('#app', new Error500Page()),
            },
        });
        return compile(template,{
            buttonLogin: buttonLogin,
            buttonSignin: buttonSignin,
            buttonChats: buttonChats,
            buttonProfile: buttonProfile,
            buttonProfileEdit: buttonProfileEdit,
            buttonPasswordEdit: buttonPasswordEdit,
            buttonError404: buttonError404,
            buttonError500: buttonError500,
        });
    }
}
