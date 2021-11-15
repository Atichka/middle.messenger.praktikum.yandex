import {UsersAPI, ProfileData, AvatarData, PasswordData} from "../api/UsersAPI";

class UsersController {
    private _api: UsersAPI;

    constructor() {
        this._api = new UsersAPI()
    }

    async profileEdit(data: ProfileData) {
        try {
            await this._api.put(data);
        } catch (e) {
            console.log(e);
        }
    }

    async avatarEdit(data: AvatarData) {
        try {
            await this._api.putAvatar(data);
        } catch (e) {
            console.log(e);
        }
    }

    async passwordEdit(data: PasswordData) {
        try {
            await this._api.putPassword(data);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UsersController();
