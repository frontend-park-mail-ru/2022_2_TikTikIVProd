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

    public async authUser(email: string, password: string) {

        const response = await ajax.post(`${config.APIUrl}/signin`, JSON.stringify({ email: email, password: password }));
        this.currentUser = { firstName: response.parsedBody.body.first_name };

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


    public async registerUser(email: string, password: string, first_name: string, last_name: string, nickname: string) {

        const response = await ajax.post(`${config.APIUrl}/signup`, JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            nickname: nickname,
            email: email,
            password: password
        }));
        this.currentUser = { firstName: response.parsedBody.body.first_name };

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


    public getCurrentUser() {
        return this.currentUser;
    }

    public async isAuthantificated() {

        const response = await ajax.get(`${config.APIUrl}/auth`);
        this.currentUser = { firstName: response.parsedBody.body.first_name };

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