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
    },
};

export default config;