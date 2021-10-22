import { EventBus } from './event-bus';

class Store extends EventBus {
    state: Record<string, any> = {};

    constructor() {
        super();
    }

    getState() {

        return this.state;
    }

    set(property: string, value: any) {
        this.state[property] = value;
        this.emit('updated');
    }
}

export default new Store();
