import { AuthAPI, SignupData, LoginData, UserData } from "../api/AuthAPI";
import store from "../util/store";

class AuthController {
    private _api: AuthAPI;

    constructor() {
        this._api = new AuthAPI()
    }

    async signup(data: SignupData) {
        try {
            await this._api.signup(data);
            await this.fetchUser();
        } catch (e) {
            console.log(e);
        }
    }

    async login(data: LoginData) {
        try {
            await this._api.login(data);
            await this.fetchUser();
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            await this._api.logout();
        } catch (e) {
            console.log(e);
        }
    }

    // @ts-ignore
    async fetchUser(): Promise<UserData> {
        try {
            const user = await this._api.read();
            store.set(store.getState(), 'user', user);
            console.log('user', user);

            return user;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AuthController();
