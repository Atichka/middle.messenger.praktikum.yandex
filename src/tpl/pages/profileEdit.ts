import {renderTemplate} from '../index'

const profileEditLink = document.querySelector('.profileEditLink') as HTMLElement;

profileEditLink.addEventListener('click', () => {
    renderTemplate('profileEdit')
});
