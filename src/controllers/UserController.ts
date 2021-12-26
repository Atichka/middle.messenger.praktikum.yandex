import { UserAPI, UserData } from "../api/UserAPI";
import store from '../util/store';

class UserController {
    private _api: UserAPI;

    constructor() {
        this._api = new UserAPI()
    }

    async getDataUser() {
        try {
            const UserData = await this._fetchUser();
            store.set(store.getState(),'user', UserData)
            return UserData;
        } catch (e) {
            console.log(e);
        }
    }

    async _fetchUser(): Promise<UserData> {
        const user = await this._api.read();
        console.log('user', user);

        return user;
    }
}

export default new UserController();
