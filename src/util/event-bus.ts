interface Ilistener {
    [key: string]: (() => void)[];
}

export class EventBus {
    public listeners: Ilistener;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: (...args: any) => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: (...args: any) => void): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: []): void {
        if (!this.listeners[event]) {
            return
        }

        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}
