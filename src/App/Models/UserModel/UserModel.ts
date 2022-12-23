import config from "../../Configs/Config";
import ajax, { checkResponseStatus } from "../../Ajax/Ajax";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import IModel from "../IModel/IModel"

/**
 * Интерфейс данных, необходимых для авторизации
 * @category User 
 * @typedef {Object} IUserSignIn
 * @property {string}  email - Email, привязанный к аккаунту
 * @property {string} password - Пароль от аккаунта
 */
export interface IUserSignIn { // ПО api
    email: string;
    password: string;
}

/**
 * Интерфейс данных, необходимых для регистрании нового пользователя
 * @category User 
 * @typedef {Object} IUserSignUp
 * @property {string}  first_name - Имя пользователя
 * @property {string} last_name - Фамилия пользователя
 * @property {string} nick_name  - Псевдоним
 * @property {string}  email - Email для входа в аккаунт
 * @property {string} password - Пароль от аккаунта
 */
export interface IUserSignUp { // ПО api
    first_name: string;
    last_name: string;
    nick_name: string;
    email: string;
    password: string;
}

/**
 * Интерфейс, содержащий данные о пользователе
 * @category User 
 * @typedef {Object} IUserSignUp
 * @property {string} id - Идентификатор, присвоенный аккаунту
 * @property {string}  first_name - Имя пользователя
 * @property {string} last_name - Фамилия пользователя
 * @property {string} nick_name  - Псевдоним
 * @property {string}  email - Email для входа в аккаунт
 */
export interface IUser { // ПО api !!!!Без пароля 
    [index: string]: string | number;
    id: number;
    first_name: string;
    last_name: string;
    nick_name: string;
    email: string;
    avatar: string;
}


export interface IProfileSettings {
    [index: string]: any;
    first_name?: string;
    last_name?: string;
    nick_name?: string;
    email?: string;
    password?: string;
    avatar?: number;
}
/**
 * Модель пользователя
 * @category Models 
 * @extends {IModel}
 */
class UserModel extends IModel {
    /**
     * Данные о текущем пользователе
     * (приватное поле класса)
     * @type {IUser | null}
     */
    private currentUser: IUser | null; //TODO private

    constructor() {
        super();
        this.currentUser = null;
    }

    private parseUser(json: any): IUser {
        return {
            first_name: json.first_name,
            last_name: json.last_name,
            nick_name: json.nick_name,
            email: json.email,
            id: json.id,
            avatar: json.avatar === 0
                ?
                config.default_img
                :
                config.host + `${config.api.image.url.replace('{:id}', json.avatar)}`,
        };
    }

    private parseUsers(json: any): IUser[] {
        return json.map((rawUser: any) => {
            return this.parseUser(rawUser);
        });
    }

    /**
     * Функция деавторизации пользователя. Сообщает серверу что пользователь вышел из аккаунта
     * @async
     * @return {Promise}
     */
    public async logoutUser() {
        const response = await ajax(config.api.logout);
        await checkResponseStatus(response, config.api.logout);
        this.currentUser = null;
        EventDispatcher.emit('user-changed', this.currentUser);
        EventDispatcher.subscribe('user-update', this.updateUserData.bind(this));
    }

    /**
     * Функция авторизации пользователя. Передаёт серверу данные авторизации.
     * @async
     * @param {IUserSignIn} authData - Данные авторизации
     * @return {Promise}
     */
    public async signInUser(authData: IUserSignIn) {
        const response = await ajax(config.api.signin, JSON.stringify(authData));
        try {
            await checkResponseStatus(response, config.api.signin);
            const userData = this.parseUser(response.parsedBody.body);
            this.currentUser = userData;
        }
        catch {
            this.currentUser = null;
        }
        EventDispatcher.emit('user-changed', this.currentUser);

        if (this.currentUser === null)
            return Promise.reject(response.parsedBody.message);
    }

    /**
     * Функция авторизации пользователя. Передаёт серверу данные авторизации.
     * @async
     * @param {IUserSignUp} user - Данные регистрации
     * @return {Promise}
     */
    public async signUpUser(user: IUserSignUp) {
        const response = await ajax(config.api.signup, JSON.stringify(user));
        try {
            await checkResponseStatus(response, config.api.signup);
            const userData = this.parseUser(response.parsedBody.body);
            this.currentUser = userData;
        }
        catch {
            this.currentUser = null;
        }
        EventDispatcher.emit('user-changed', this.currentUser);

        if (this.currentUser === null)
            return Promise.reject(response.parsedBody.message);
    }

    public async getUser(id: number | string) {
        let conf = Object.assign({}, config.api.userProfile);
        conf.url = conf.url.replace('{:id}', id.toString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const user: IUser = this.parseUser(response.parsedBody.body);
        return Promise.resolve(user);
    }

    /**
     * Функция возвращает данные авторизованного пользователя
     * @returns {IUser|null}
     */
    public getCurrentUser(): IUser | null {
        return this.currentUser;
    }

    /**
     * Функция проверки авторизации с использованием куки.
     * @async
     * @return {Promise}
     */
    public async authUserByCookie() {
        const response = await ajax(config.api.auth);
        try {
            await checkResponseStatus(response, config.api.auth);
            const userData = this.parseUser(response.parsedBody.body);
            this.currentUser = userData;
        }
        catch {
            this.currentUser = null;
            return Promise.reject();
        }
        EventDispatcher.emit('user-changed', this.currentUser);
    }


    public async getFriends(userId: string | number) {
        let conf = Object.assign({}, config.api.userFriends);
        conf.url = conf.url.replace('{:id}', userId.toString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const users = this.parseUsers(response.parsedBody.body);
        return Promise.resolve(users);
    }

    public async isFriend(userId: number | string) {
        const currentUserId = this.currentUser?.id;
        if (!currentUserId) {
            return Promise.reject();
        }

        let conf = Object.assign({}, config.api.userCheckFriend);
        conf.url = conf.url.replace('{:id}', userId.toString());

        const response = await ajax(conf);

        await checkResponseStatus(response, conf);
        const res = Boolean(response.parsedBody.body);
        return Promise.resolve(res);


        // const currentUserId = this.currentUser?.id;
        // if (!currentUserId) {
        //     return Promise.reject();
        // }

        // const friends = (await this.getFriends(currentUserId)).users;

        // return Promise.resolve(friends.find(user => user.id.toString() === userId.toString()) !== undefined ? true : false);
    }

    public async addFriend(userId: string | number) {
        let conf = Object.assign({}, config.api.addFriend);
        conf.url = conf.url.replace('{:id}', userId.toString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        return Promise.resolve();
    }

    public async removeFriend(userId: string | number) {
        let conf = Object.assign({}, config.api.deleteFriend);
        conf.url = conf.url.replace('{:id}', userId.toString());

        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        return Promise.resolve();
    }

    public async findUsers(searchQuery: string) {
        let conf = Object.assign({}, config.api.usersSearch);
        conf.url = conf.url.replace('{:name}', searchQuery);
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const users = this.parseUsers(response.parsedBody.body);
        return Promise.resolve(users);
    }



    public async updateUserData(newData: IProfileSettings) {
        const response = await ajax(config.api.userUpdate, JSON.stringify(newData));
        await checkResponseStatus(response, config.api.userUpdate);
        try {
            let newCurrentUser = Object.assign({}, this.currentUser);
            Object.keys(newData).forEach(key => {
                if (key === 'avatar') {
                    const id = newData[key] ?? 0;
                    newCurrentUser[key] = id === 0
                        ?
                        config.default_img
                        : config.host + `${config.api.image.url.replace('{:id}', id.toString())}`;

                    return;
                }
                newCurrentUser[key] = newData[key];
            });
            this.currentUser = newCurrentUser;
            EventDispatcher.emit('user-changed', this.currentUser);

        }
        catch (error) {
            console.log(error);
        }

        return Promise.resolve();
    }
}

export default UserModel;