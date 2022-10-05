import IModel from "../IModel/IModel.js"

interface IAuthUser {
    email: string;
    password: string;
}

export interface IUser {
    firstName: string;
}

export default class UserModel extends IModel {
    private currentUser: IUser | null;

    constructor() {
        super();
        this.currentUser = null;
    }

    public authUser() {
        //TODO

        this.currentUser = { firstName: 'Павел' };
    }

    public getCurrentUser() {
        return this.currentUser;
    }

    public isAuthantificated(): boolean {
        return this.currentUser !== null ? true : false;
    }
}