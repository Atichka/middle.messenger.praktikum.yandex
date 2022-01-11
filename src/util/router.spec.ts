import { Router } from './router';
import { expect } from 'chai';
import {beforeEach} from "mocha";
import {JSDOM} from "jsdom";

describe('router', () => {
    beforeEach(() => {
        const dom = new JSDOM('<!DOCTYPE html><head></head><body><div id="app"></div></body>', {
            url: 'http://localhost:3000'
        });
        (global as any).document = dom.window.document;
        (global as any).window = dom.window;
        class MyBlock {
            getContent() {
                const div = document.createElement('div')

                div.id = 'test-div';

                return div;
            }
        }

        const router = new Router();
        router.use('/', MyBlock as any);

        router.go('/');
    })

    it('should be singletone', () => {
        const router = new Router();

        expect(new Router()).to.eq(router);
    })
    describe('.use', () => {
        it('should return Router instance', () => {
            const router = new Router();

            const result = router.use('/', class {} as any)

            expect(result).to.eq(router);
        });
    });

    describe('.start', () => {
        it('', () => {

        })
    });

    describe('.go', () => {
        it('should render new block', () => {
            expect(document.getElementById('test-div')).not.to.be.null;
        });

        it('should change location pathname', () => {
            expect(window.location.pathname).to.eq('/');
        });
    });

    describe('.back', () => {
        it('should return Router back', () => {
            const router = new Router();
            const blankPage = router.go('/');
            router.go('/login');
            const result = router.back()
            expect(result).to.eq(blankPage);
        });
    });

    describe('.forward', () => {
        it('should return Router forward', () => {
            const router = new Router();

            router.go('/');
            const loginPage = router.go('/login');
            router.back();
            const result = router.forward()

            expect(result).to.eq(loginPage);
        });
    });
});
