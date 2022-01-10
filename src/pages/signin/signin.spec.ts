import {beforeEach} from "mocha";
import {Router} from "../../util/router";
import {expect, use} from "chai";
import {JSDOM} from "jsdom";
import {SigninPage} from "./signin";
import chaiDom from 'chai-dom';

use(chaiDom);

describe.only('render', () => {
    beforeEach(() => {
        const dom = new JSDOM('<!DOCTYPE html><head></head><body><div id="app"></div></body>', {
            url: 'http://localhost:3000'
        });
        (global as any).document = dom.window.document;
        (global as any).window = dom.window;
        class MyBlock {
            getContent() {
                const button = document.createElement('button');
                button.classList.add('form__button', 'form__top-login');

                return button;
            }
        }

        const router = new Router();
        router.use('/login', MyBlock as any);

        router.go('/login');
    });

    it.only('should render new block', () => {
        const signin = new SigninPage();
        const element = signin.getContent();
        expect(element).to.be.instanceof(window.HTMLElement);
        expect(element.querySelector('.login')).to.null;
    });
});
