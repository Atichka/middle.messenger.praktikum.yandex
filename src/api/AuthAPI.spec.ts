import {AuthAPI} from "./AuthAPI";
import sinon from 'sinon';
import { expect } from 'chai';

describe('AuthAPI', () => {
    const requests: sinon.SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        let xhr: sinon.SinonFakeXMLHttpRequestStatic;

        (global as any).XMLHttpRequest = xhr = sinon.useFakeXMLHttpRequest();
        (global as any).FormData = class FormData {};

        xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
            requests.push(request)
        };
    });

    afterEach(() => {
        (global as any).XMLHttpRequest.restore();

        requests.length = 0;
    })

    it('send POST /auth/signup', (done) => {
        const api = new AuthAPI();
        const data = {
            first_name: '',
            second_name: '',
            login: '',
            email: '',
            password: '',
            phone: ''
        };
        api.signup(data);
        requests[0].respond(200, { "Content-Type": "application/json" },
            '[{ "first_name": "", "second_name": "", "login": "", "email": "", "password": "", "phone": "" }]');
        expect(requests.length).to.eq(1);
        expect(requests[0].method).to.eq('Post');
        expect(requests[0].requestBody).to.eq(JSON.stringify(data));
        expect(requests[0].url).to.eq('https://ya-praktikum.tech/api/v2/auth/signup');
        done();
    });
    it('send POST /auth/signin', (done) => {
        const api = new AuthAPI();
        const data = {
            first_name: '',
            second_name: '',
            login: '',
            email: '',
            password: '',
            phone: ''
        };
        api.login(data);
        requests[0].respond(200, { "Content-Type": "application/json" },
            '["login": "", "password": "" }]');
        expect(requests.length).to.eq(1);
        expect(requests[0].method).to.eq('Post');
        expect(requests[0].requestBody).to.eq(JSON.stringify(data));
        expect(requests[0].url).to.eq('https://ya-praktikum.tech/api/v2/auth/signin');
        done();
    });
    it('send POST /auth/logout', (done) => {
        const api = new AuthAPI();
        api.logout();
        expect(requests.length).to.eq(1);
        expect(requests[0].method).to.eq('Post');
        expect(requests[0].url).to.eq('https://ya-praktikum.tech/api/v2/auth/logout');
        done();
    });
    it('send GET /auth/user', (done) => {
        const api = new AuthAPI();
        api.read();
        expect(requests.length).to.eq(1);
        expect(requests[0].method).to.eq('Get');
        expect(requests[0].url).to.eq('https://ya-praktikum.tech/api/v2/auth/user');
        done();
    });
});
