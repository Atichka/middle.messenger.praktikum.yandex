import { EventBus } from './event-bus';
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

    _element: HTMLElement;
    _meta: any;

    props: T;
    eventBus: EventBus;

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
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = eventBus;

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
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount(): void {
        this.componentDidMount();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(): void {}

    _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(): Boolean {
        return true;
    }

    setProps(nextProps: T) {
        if (!nextProps) {
            return;
        }
        nextProps = this._makePropsProxy(nextProps);
        Object.assign(this.props, nextProps);
        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        this._render();
    };

    get element() {
        return this._element;
    }

    _render(): void {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._element.innerHTML = block;
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string { return ""; }

    getContent() {
        return this._element;
    }

    _makePropsProxy(props: T): T {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        // const self = this;

        const proxyProps = new Proxy(props, {
            get: function(obj: T, prop: string) {
                if (typeof obj[prop] === 'function') {
                    return obj[prop].bind(props);
                } else {
                    if (prop.indexOf('_') !== 0) {
                        return obj[prop];
                    } else {
                        throw Error('Нет прав');
                    }
                }
            },
            set: function(obj: T, prop: string, value) {
                if (prop.indexOf('_') === 0) {
                    throw Error('Нет прав');
                }
                obj[prop] = value;
                return true;
                //const prevVal = obj[prop];

                //self.eventBus().emit(Block.EVENTS.FLOW_CDU, prevVal, value);
                //return obj[prop] = value;
            },
            deleteProperty: function() {
                throw Error('Нет прав');
            }
        });

        return proxyProps;
    }

    _createDocumentElement(tagName: HTMLElement) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }
}