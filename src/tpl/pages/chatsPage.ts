import {renderTemplate} from '../index'

const chatsLink = document.querySelector('.chatsLink') as HTMLElement;

chatsLink.addEventListener('click', () => {
    renderTemplate('chats')
});
