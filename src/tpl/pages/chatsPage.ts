import {renderTemplate} from '../index'

const chatsLink = document.querySelector('.chatsLink');

chatsLink.addEventListener('click', () => {
    renderTemplate('chats')
});

function sendData() {
    const form = document.querySelector('.send-form');
    const formData: any = new FormData(form);
    let obj: Record<string, unknown> = {};
    for (let [name, value] of formData) {
        obj[name] = value;
    }
    console.log(obj);
}

window.sendData = sendData
