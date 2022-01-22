import {renderTemplate} from '../index'

const profileEditLink = document.querySelector('.profileEditLink');

// @ts-ignore
profileEditLink.addEventListener('click', () => {
    renderTemplate('profileEdit')
});
