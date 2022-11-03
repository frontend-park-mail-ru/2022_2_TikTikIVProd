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

const failureDefaultStatuses: { [index: string]: string } = {
    400: 'Неверный запрос',
    401: 'No Cookie',
    405: 'Неверный HTTP метод',
    500: 'Ошибка сервера',
}

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const config = {
    host: 'http://89.208.197.127:8080',
    // host: 'http://localhost:8080',
    api: {
        logout: {
            url: '/logout',
            method: REQUEST_TYPE.DELETE,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    200: 'Успешно',
                },
                failure: failureDefaultStatuses,
            },
        },
        auth: {
            url: '/auth',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: 200, // 'Успешно',
                failure: failureDefaultStatuses,
            },
        },
        signin: {
            url: '/signin',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: 200, //'Авторизация успешна'
                failure: {
                    400: 400,   //'Неверный запрос',
                    401: 400,   //'Неверный пароль',
                    404: 400,   //'Пользователь не найден',
                    405: 400,   //'Неверный HTTP метод',
                    500: 400,   //'Ошибка сервера',
                },
            },
        },
        signup: {
            url: '/signup',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: 201, // 'Регистрация успешна',
                failure: {
                    400: 'Неверный запрос',
                    405: 'Неверный HTTP метод',
                    409: 'Данный email занят',
                    500: 'Ошибка сервера',
                },
            },
        },
        feed: {
            url: '/feed',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: 201, // 'Получение постов успешно',
                failure: {
                    400: 'Неверный запрос',
                    405: 'Неверный HTTP метод',
                    500: 'Ошибка сервера',
                },
            },
        },
        image: {
            url: '/image',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: 200, // 'Получение изображения успешно',
                failure: {
                    400: 'Неверный запрос',
                    405: 'Неверный HTTP метод',
                    500: 'Ошибка сервера',
                },
            },
        },
    }
}

export default config;