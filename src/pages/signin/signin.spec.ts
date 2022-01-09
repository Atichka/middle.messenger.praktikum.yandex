import {beforeEach} from "mocha";
import {Router} from "../../util/router";
import {expect} from "chai";

describe.only('render', () => {
    beforeEach(() => {
        class MyBlock {
            getContent() {
                const button = document.createElement('<button ' +
                    'class="form__button form__top-login">' +
                    'Авторизоваться' +
                    '</button>')

                return button;
            }
        }

        const router = new Router();
        router.use('/login', MyBlock as any);

        router.go('/login');
    });

    it.only('should render new block', () => {
        expect(document.querySelector('form__button')).not.to.be.null;
    });
});
