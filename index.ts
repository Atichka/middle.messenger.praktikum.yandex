import {HomePage} from "./src/pages/home";
import {Block} from "./src/util/block";

export function render(query: string, block: Block) {
    const root = document.querySelector(query);

    if(!root) {
        throw new Error("Root not found");
    }

    root.appendChild(block.getContent());

    return root;
}

render('#app', new HomePage())
