import {renderTemplate} from '../index'

const profileLink = document.querySelector('.profileLink');

profileLink.addEventListener('click', () => {
    renderTemplate('profile')
});
