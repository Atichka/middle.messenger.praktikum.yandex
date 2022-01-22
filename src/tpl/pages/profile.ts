import {renderTemplate} from '../index'

const profileLink = document.querySelector('.profileLink');

// @ts-ignore
profileLink.addEventListener('click', () => {
    renderTemplate('profile')
});
