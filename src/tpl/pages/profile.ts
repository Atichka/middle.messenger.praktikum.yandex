import {renderTemplate} from '../index'

const profileLink = document.querySelector('.profileLink') as HTMLElement;

profileLink.addEventListener('click', () => {
    renderTemplate('profile')
});
