import {TProps} from "./block";

function isEqual(lhs, rhs) {
    return lhs === rhs;
}

function render(query: string, block: TProps) {
    const root = document.querySelector(query);
    root.textContent = block.getContent();
    return root;
}

export type TRouteProps = {
    [key: string]: string;
};

class Route {
    _pathname: string;
    _blockClass: any;
    _block: any;
    _props: TRouteProps;

    constructor(pathname: string, view: any, props: TRouteProps) {
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
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

export class Router {
    static __instance: Router;

    routes: Route[];
    history: History;
    _currentRoute: Route | null;
    _rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: TProps): Router {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        // Возврат this — основа паттерна "Builder" («Строитель»)
        return this;
    }

    start(): void {
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        window.onpopstate = event => {
            this._onRoute(event.currentTarget.location.pathname);
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
