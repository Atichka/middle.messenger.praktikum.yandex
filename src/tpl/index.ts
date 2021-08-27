import loginTemplate from './pages/login.pug';

const TEMPLATES = {
    login: loginTemplate
};

export function renderTemplate(name: any, locals: object = {}, parent: HTMLElement = document.body) {
    const template = TEMPLATES[name];
    parent.innerHTML = template(locals);
}
