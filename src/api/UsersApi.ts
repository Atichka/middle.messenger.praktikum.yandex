import BaseAPI from './base-api';

export interface ProfileData {
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string
}

export interface AvatarData {
    avatar: string
}

export interface PasswordData {
    oldPassword: string,
    newPassword: string
}

export class UsersAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    async put(data: ProfileData): Promise<{ id: number }> {
        return this.http.put('/profile', data)
    }

    async putAvatar(data: AvatarData): Promise<{ id: number }> {
        return this.http.put('/profile/avatar', data)
    }

    async putPassword(data: PasswordData): Promise<{ id: number }> {
        return this.http.put('/password', data)
    }

    create: undefined;
    update: undefined;
    delete: undefined;
}
