import { EventBus } from './event-bus';

type Indexed<T = unknown> = {
    [key in string]: T;
};

class Store extends EventBus {
    state: Record<string, any> = {};

    constructor() {
        super();
    }

    getState() {

        return this.state;
    }
    set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
        if (typeof path as string === "string") {
            const pList = path.split('.');
            const key: any = pList.pop();
            const pointer = pList.reduce((accumulator: any, currentValue) => {
                if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
                return accumulator[currentValue];
            }, object);
            pointer[key] = value;
            this.emit('updated');
            return object;
        } else {
            throw new SyntaxError("path must be string");
        }
    }
}

export default new Store();
