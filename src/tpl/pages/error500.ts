import {renderTemplate} from '../index'

const error500Link = document.querySelector('.error500Link') as HTMLElement;

error500Link.addEventListener('click', () => {
    renderTemplate('error500')
});
