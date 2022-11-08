import config from "../../Configs/Config";
import ajax from "../../Ajax/Ajax";
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
    id: number;
    first_name: string;
    last_name: string;
    nick_name: string;
    email: string;
    avatar: string;
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

    /**
     * Функция деавторизации пользователя. Сообщает серверу что пользователь вышел из аккаунта
     * @async
     * @return {Promise}
     */
    public async logoutUser() {
        const response = await ajax(config.api.logout);
        // console.log(
        // 'logout (succ, failed else err)',
        // response.status.toString() in config.api.logout.statuses.success,
        // response.status.toString() in config.api.logout.statuses.failure
        // );

        this.currentUser = null;
        EventDispatcher.emit('user-changed', this.currentUser);
    }

    /**
     * Функция авторизации пользователя. Передаёт серверу данные авторизации.
     * @async
     * @param {IUserSignIn} authData - Данные авторизации
     * @return {Promise}
     */
    public async signInUser(authData: IUserSignIn) {
        const response = await ajax(config.api.signin, JSON.stringify(authData));

        if (response.status.toString() in config.api.signin.statuses.success) {
            // console.log('signin success');

            this.currentUser = {
                first_name: response.parsedBody.body.first_name,
                last_name: response.parsedBody.body.last_name,
                nick_name: response.parsedBody.body.nick_name,
                email: response.parsedBody.body.email,
                id: response.parsedBody.body.id,
                avatar: '../src/img/test_avatar.jpg',
            };
            EventDispatcher.emit('user-changed', this.currentUser);
            const keyStatus = response.status.toString() as keyof typeof config.api.signin.statuses.success;
            return Promise.resolve({
                status: response.status,
                msg: config.api.signin.statuses.success[keyStatus],
                body: response.parsedBody
            })
        }


        this.currentUser = null;
        EventDispatcher.emit('user-changed', this.currentUser);

        if (response.status.toString() in config.api.signin.statuses.failure) {
            // console.log('signin fail');

            const keyStatus = response.status.toString() as keyof typeof config.api.signin.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.signin.statuses.failure[keyStatus],
                body: response.parsedBody
            })
        }
        // console.log('signin err');

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }

    /**
     * Функция авторизации пользователя. Передаёт серверу данные авторизации.
     * @async
     * @param {IUserSignUp} user - Данные регистрации
     * @return {Promise}
     */
    public async signUpUser(user: IUserSignUp) {
        const response = await ajax(config.api.signup, JSON.stringify(user));

        if (response.status.toString() in config.api.signup.statuses.success) {
            // console.log('signup success');

            this.currentUser = {
                first_name: response.parsedBody.body.first_name,
                last_name: response.parsedBody.body.last_name,
                nick_name: response.parsedBody.body.nick_name,
                email: response.parsedBody.body.email,
                id: response.parsedBody.body.id,
                avatar: '../src/img/test_avatar.jpg',
            };
            EventDispatcher.emit('user-changed', this.currentUser);
            const keyStatus = response.status.toString() as keyof typeof config.api.signup.statuses.success;
            return Promise.resolve({
                status: response.status,
                msg: config.api.signup.statuses.success[keyStatus],
                body: response.parsedBody
            })
        }

        this.currentUser = null;
        EventDispatcher.emit('user-changed', this.currentUser);

        if (response.status.toString() in config.api.signup.statuses.failure) {
            // console.log('signup fail');

            const keyStatus = response.status.toString() as keyof typeof config.api.signup.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.signup.statuses.failure[keyStatus],
                body: response.parsedBody
            })
        }
        // console.log('signup err');

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }

    public async getUser(id : number | string) {
        let conf = Object.assign({}, config.api.userProfile);
        conf.url = conf.url.replace('{:id}', id.toString());
        
        const response = await ajax(conf);
        
        if(response.status.toString() in config.api.userProfile.statuses.success)
        {
            const user: IUser = {
                first_name: response.parsedBody.body.first_name,
                last_name: response.parsedBody.body.last_name,
                nick_name: response.parsedBody.body.nick_name,
                email: response.parsedBody.body.email,
                id: response.parsedBody.body.id,
                avatar: '../src/img/test_avatar.jpg',
            };
            return Promise.resolve(user);
        }

        return Promise.reject({status: response.status, body: response.parsedBody});
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

        if (response.status.toString() in config.api.auth.statuses.success) {
            // console.log('auth success');

            this.currentUser = {
                first_name: response.parsedBody.body.first_name,
                last_name: response.parsedBody.body.last_name,
                nick_name: response.parsedBody.body.nick_name,
                email: response.parsedBody.body.email,
                id: response.parsedBody.body.id,
                avatar: '../src/img/test_avatar.jpg',
            };
            EventDispatcher.emit('user-changed', this.currentUser);
            const keyStatus = response.status.toString() as keyof typeof config.api.auth.statuses.success;
            return Promise.resolve({
                status: response.status,
                msg: config.api.auth.statuses.success[keyStatus],
                body: response.parsedBody
            })
        }

        this.currentUser = null;
        EventDispatcher.emit('user-changed', this.currentUser);

        if (response.status.toString() in config.api.auth.statuses.failure) {
            // console.log('auth fail');

            const keyStatus = response.status.toString() as keyof typeof config.api.auth.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.auth.statuses.failure[keyStatus],
                body: response.parsedBody
            })
        }

        // console.log('auth err');
        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }
}

export default UserModel;