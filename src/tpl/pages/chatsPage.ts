import {renderTemplate} from '../index'

const chatsLink = document.querySelector('.chatsLink');

chatsLink.addEventListener('click', () => {
    renderTemplate('chats')
});
