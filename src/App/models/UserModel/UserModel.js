import config from "../../configs/config.js";
import ajax from "../../modules/ajax.js";
import IModel from "../IModel/IModel.js";
export default class UserModel extends IModel {
    constructor() {
        super();
        this.currentUser = null;
    }
    async authUser(authData) {
        // console.log(authData);
        console.log(JSON.stringify(authData));
        const response = await ajax.post(`${config.APIUrl}/signin`, JSON.stringify(authData));
        // TODO .body.body
        this.currentUser = {
            first_name: response.parsedBody.body.body.first_name,
            last_name: response.parsedBody.body.body.last_name,
            nick_name: response.parsedBody.body.body.nick_name,
            email: response.parsedBody.body.body.email,
            id: response.parsedBody.body.body.id,
        };
        if (response.status === 200) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            });
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            });
        }
    }
    async registerUser(user) {
        console.log(user);
        console.log(JSON.stringify(user));
        const response = await ajax.post(`${config.APIUrl}/signup`, JSON.stringify(user));
        // TODO .body.body
        this.currentUser = {
            first_name: response.parsedBody.body.body.first_name,
            last_name: response.parsedBody.body.body.last_name,
            nick_name: response.parsedBody.body.body.nick_name,
            email: response.parsedBody.body.body.email,
            id: response.parsedBody.body.body.id,
        };
        if (response.status === 201) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            });
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            });
        }
    }
    getCurrentUser() {
        return this.currentUser;
    }
    async isAuthantificated() {
        const response = await ajax.get(`${config.APIUrl}/auth`);
        // TODO Fix .body.body
        this.currentUser = {
            first_name: response.parsedBody.body.body.first_name,
            last_name: response.parsedBody.body.body.last_name,
            nick_name: response.parsedBody.body.body.nick_name,
            email: response.parsedBody.body.body.email,
            id: response.parsedBody.body.body.id,
        };
        if (response.status === 200) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            });
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            });
        }
    }
}
