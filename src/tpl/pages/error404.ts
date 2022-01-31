import {renderTemplate} from '../index'

const error404Link = document.querySelector('.error404Link') as HTMLElement;

error404Link.addEventListener('click', () => {
    renderTemplate('error404')
});
