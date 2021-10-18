import { UserAPI, UserData } from "../api/UserAPI";

class UserController {
    private _api: UserAPI;

    constructor() {
        this._api = new UserAPI()
    }

    async getDataUser() {
        try {
            await this._fetchUser();
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
