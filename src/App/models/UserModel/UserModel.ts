import config from "../../configs/config.js";
import ajax from "../../modules/ajax.js";
import IModel from "../IModel/IModel.js"

export interface IUserSignIn { // ПО api
    email: string;
    password: string;
}

export interface IUserSignUp { // ПО api
    first_name: string;
    last_name: string;
    nick_name: string;
    email: string;
    password: string;
}

export interface IUser { // ПО api !!!!Без пароля 
    id: string;
    first_name: string;
    last_name: string;
    nick_name: string;
    email: string;
}

export default class UserModel extends IModel {
    private currentUser: IUser | null;

    constructor() {
        super();
        this.currentUser = null;
    }

    public async authUser(authData: IUserSignIn) {
        const response = await ajax.post(`${config.APIUrl}/signin`, JSON.stringify(authData));
        this.currentUser = {
            first_name: response.parsedBody.body.first_name,
            last_name: response.parsedBody.body.last_name,
            nick_name: response.parsedBody.body.nick_name,
            email: response.parsedBody.body.email,
            id: response.parsedBody.body.id,
        };

        if (response.status === 200) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            })
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            })
        }

    }


    public async registerUser(user: IUserSignUp) {
        const response = await ajax.post(`${config.APIUrl}/signup`, JSON.stringify(user));
        this.currentUser = {
            first_name: response.parsedBody.body.first_name,
            last_name: response.parsedBody.body.last_name,
            nick_name: response.parsedBody.body.nick_name,
            email: response.parsedBody.body.email,
            id: response.parsedBody.body.id,
        };

        if (response.status === 201) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            })
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            })
        }

    }


    public getCurrentUser() {
        return this.currentUser;
    }

    public async isAuthantificated() {
        const response = await ajax.get(`${config.APIUrl}/auth`);
        this.currentUser = {
            first_name: response.parsedBody.body.first_name,
            last_name: response.parsedBody.body.last_name,
            nick_name: response.parsedBody.body.nick_name,
            email: response.parsedBody.body.email,
            id: response.parsedBody.body.id,
        };

        if (response.status === 200) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            })
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            })
        }
    }
}