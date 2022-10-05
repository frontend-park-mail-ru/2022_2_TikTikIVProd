import config from "../../configs/config.js";
import ajax from "../../modules/ajax.js";
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

    public async authUser() {
        //Remove in the future
        this.currentUser = { firstName: 'Павел' };

        return ajax.post(`${config.APIUrl}/auth`, '');

    }

    public getCurrentUser() {
        return this.currentUser;
    }

    public isAuthantificated(): boolean {
        return this.currentUser !== null ? true : false;
    }
}