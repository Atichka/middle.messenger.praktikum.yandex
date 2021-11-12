import {Block} from "../../util/block"
import template from "./home.pug"
import {Button} from "../../components/Button/button"
import {compile} from "../../util/compile"
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
                click: () => {
                    const router = new Router();
                    router.go('/settings');
                }
            },
        });
        const buttonPasswordEdit = new Button( {
            text: "password edit",
            events: {
                click: () => {
                    const router = new Router();
                    router.go('/password-edit');
                }
            },
        });
        const buttonError404 = new Button( {
            text: "error 404",
            events: {
                click: () => {
                    const router = new Router();
                    router.go('/404');
                }
            },
        });
        const buttonError500 = new Button( {
            text: "error 500",
            events: {
                click: () => {
                    const router = new Router();
                    router.go('/500');
                }
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
