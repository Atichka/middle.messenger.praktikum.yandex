import {renderTemplate} from '../index'

const loginLink = document.querySelector('.loginLink');

loginLink.addEventListener('click', () => {
    renderTemplate('login')
});

function sendData(form) {
    const formData: any = new FormData(form);
    let obj: Record<string, unknown> = {};
    for (let [name, value] of formData) {
        obj[name] = value;
    }
    console.log(obj);
}

window.sendData = sendData
