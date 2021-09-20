import {HomePage} from "./src/pages/home";
import {Block} from "./src/util/block";

export function render(query: string, block: Block) {
    const root = document.querySelector(query);

    if(!root) {
        throw new Error("Root not found");
    }

    root.innerHTML = '';

    root.appendChild(block.getContent());

    return root;
}

render('#app', new HomePage());

export function addClass(_element, props) {
    if(Array.isArray(props.classNames)) {
        return _element.classList.add(...props.classNames);
    } else {
        return _element.classList.add(props.classNames);
    }
}
