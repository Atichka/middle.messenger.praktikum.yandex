import {Router} from './router'

console.log('router', Router);

export function addClass(_element, props) {
    if(Array.isArray(props.classNames)) {
        return _element.classList.add(...props.classNames);
    } else {
        return _element.classList.add(props.classNames);
    }
}
