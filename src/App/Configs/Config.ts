/**
 * Основная конфигурация приложения
 * @category Application
 * @type {object}
 * @property {string} APIUrl - URL и порт сервера
 * @property {object} API - API взаиподействия с сервером
 * @property {object} API.item - Именованный элемент API 
 * @property {string} API.item.url - url элемента API
 * @property {object} API.item.status - статусы ответа сервера
 * @property {number} API.item.status.item - Именованный код ответа сервера
 */
const config = {
    APIUrl: 'http://localhost:8080',
    API: {
        logout: {
            url: '/logout',
            status: {
                success: 204,
            }
        },
        signin: {
            url: '/signin',
            status: {
                success: 200,
            },
        },
        signup: {
            url: '/signup',
            status: {
                success: 201,
            },
        },
        checkCookie: {
            url: '/auth',
            status: {
                success: 200,
            },
        },
        feed: {
            url: '/feed',
            status: {
                success: 200,
            },
        },
        image: {
            url: '/image',
        },
    },
};

export default config;


/*

const failureDefaultStatuses : {[index: string]: string}= {
    400: 'Неверный запрос',
    401: 'No Cookie',
    405: 'Неверный HTTP метод',
    500: 'Ошибка сервера',
}

interface IApiReqRes {
    urn: string;
    method: string;
    headers: [string, string][],
    statuses: {
        success: {[index: number]: string}, 
        failure: {[index: number]: string}
    }
}
interface IAppCfg {
    host: string,
    api: {[index: string]: IApiReqRes},
}

const appcfg : IAppCfg= {
    host: 'http://127.0.0.1:8080',
    api: {
        logout: {
            urn: '/logout',
            method: 'DELETE',
            headers: [
                ['Content-Type', 'application/json;charset=utf-8'],
            ],
            statuses: {
                success: {
                    200: 'Успешно',
                },
                failure: failureDefaultStatuses,
            },
        },
        auth: {
            urn: '/auth',
            method: 'GET',
            headers: [
                ['Content-Type', 'application/json;charset=utf-8'],
            ],
            statuses: {
                success: {
                    200: 'Успешно',
                },
                failure: failureDefaultStatuses,
            },
        },
        signin: {
            urn: '/signin',
            method: 'POST',
            headers: [
                ['Content-Type', 'application/json;charset=utf-8'],
            ],
            statuses: {
                success: {
                    200: 'Авторизация успешна'
                },
                failure: {
                    400: 'Неверный запрос',
                    401: 'Неверный пароль',
                    404: 'Пользователь не найден',
                    405: 'Неверный HTTP метод',
                    500: 'Ошибка сервера',
                },
            },
        },
        signup: {
            urn: '/signup',
            method: 'POST',
            headers: [
                ['Content-Type', 'application/json;charset=utf-8'],
            ],
            statuses: {
                success: {
                    201: 'Регистрация успешна',
                },
                failure: {
                    400: 'Неверный запрос',
                    405: 'Неверный HTTP метод',
                    409: 'Данный email занят',
                    500: 'Ошибка сервера',
                },
            },
        },
    }
}

export default appcfg;

*/