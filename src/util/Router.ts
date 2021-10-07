import {TProps} from "./block";

class Route {
    _pathname: string;
    _blockClass: any;
    _block: any;
    _props: any;

    constructor(pathname: string, view: any, props: фтн) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.getContent().remove();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
        }

        const root = document.querySelector(this.props.rootQuery);

        if (!root) {
            throw new Error('Root not found');
        }

        root.innerHTML = '';
        root.appendChild(this._block.getContent());
    }
}

export class Router {
    static __instance: Router;

    routes: Route[];
    history: window.history;
    _currentRoute: Route | null;
    _rootQuery: string;

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        Router.__instance = this;
    }

    use(pathname: string, block: TProps): Router {
        const route = new Route(pathname, block, {rootQuery: '#app'});
        this.routes.push(route);
        // Возврат this — основа паттерна "Builder" («Строитель»)
        return this;
    }

    start(): void {
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route: any = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export function withRouter(Component: typeof TProps) {
    return class WithRouter extends Component {
        constructor(props: any) {
            const router = new Router()

            super({...props, router: router});
        }
    }
}
