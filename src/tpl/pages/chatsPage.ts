import {renderTemplate} from '../index'

const chatsLink = document.querySelector('.chatsLink');

// @ts-ignore
chatsLink.addEventListener('click', () => {
    renderTemplate('chats')
});
