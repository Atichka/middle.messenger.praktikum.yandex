import { EventBus } from './event-bus';
// @ts-ignore
import { v4 as uuid } from 'uuid';

export type TProps = {
    [key: string]: string | number | boolean | Function | undefined,
};

export class Block<T extends TProps> {

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update",
    };
    public id = uuid(6);

    _element: HTMLElement;
    _meta: any;

    props: T;
    eventBus: () => EventBus;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props: TProps = {}) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };

        this.props = this._makePropsProxy(props || {} as T);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init(): void {
        this._createResources();
        // @ts-ignore
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount(): void {
        // @ts-ignore
        this.componentDidMount();
        // @ts-ignore
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    // @ts-ignore
    componentDidMount(oldProps: any): void {}

    _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            // @ts-ignore
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    // @ts-ignore
    componentDidUpdate(oldProps: any, newProps: any) {
        return true;
    }

    setProps = (nextProps: T) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render(): void {
        const fragment = this.render();

        this._removeEvents();
        this._element!.innerHTML = '';

        this._element!.appendChild(fragment);
        this._addEvents();
    }

    // Может переопределять пользователь, необязательно трогать
    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent() {
        return this._element;
    }

    _makePropsProxy(props: any): any {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set: (target, prop, value) => {
                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                // @ts-ignore
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: keyof HTMLElementTagNameMap) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if(!events || !this._element) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        })
    }

    _addEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if(!events) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        })
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }
}
