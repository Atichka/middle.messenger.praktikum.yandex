import {renderTemplate} from '../index'

const signinLink = document.querySelector('.signinLink');

signinLink.addEventListener('click', () => {
    renderTemplate('signin')
});

function sendData() {
    const form = document.querySelector('.form');
    const formData: any = new FormData(form);
    let obj: Record<string, unknown> = {};
    for (let [name, value] of formData) {
        obj[name] = value;
    }
    console.log(obj);
}

window.sendData = sendData
