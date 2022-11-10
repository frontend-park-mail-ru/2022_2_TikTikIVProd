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
    '400': 'Неверный запрос',
    '401': 'No Cookie',
    '405': 'Неверный HTTP метод',
    '500': 'Ошибка сервера',
}

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export interface IApiItem {
    url: string;
    method: string;
    headers: { [index: string]: string };
    statuses: {
        success: { [index: string]: string };
        failure: { [index: string]: string };
    }
}

export interface IConfig {
    host: string;
    api: {
        [index: string]: IApiItem;
    }
}

const config: IConfig = {
    host: 'http://89.208.197.127:8080',
    // host: 'http://127.0.0.1:8080',
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
                    '204': 'Успешно',
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
                success: {
                    '200': 'Успешно'
                },
                failure: failureDefaultStatuses,
            },
        },
        csrf: {
            url: '/create_csrf',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '204': 'Успешно'
                },
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
                success: {
                    '200': 'Авторизация успешна'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '401': 'Неверный пароль',
                    '404': 'Пользователь не найден',
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
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
                success: {
                    '201': 'Регистрация успешна'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '405': 'Неверный HTTP метод',
                    '409': 'Данный email занят',
                    '500': 'Ошибка сервера',
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
                success: {
                    '201': 'Получение постов успешно'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
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
                success: {
                    '200': 'Получение изображения успешно'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
                },
            },
        },
        post: {
            url: '/post/{:id}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Получение поста успешно'
                },
                failure: {
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
                },
            },

        },
        postCreate: {
            url: '/post/create',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Получение постов успешно'
                },
                failure: {
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
                },
            },
        },

        postEdit: {
            url: '/post/edit',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Обновление поста успешно'
                },
                failure: {
                    '401': 'no cookie',
                    '403': 'no csrf',
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
                },
            },
        },

        userPosts: {
            url: '/users/{:id}/posts',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Получение постов успешно'
                },
                failure: {
                    '401': 'no cookie',
                    '403': 'no csrf',
                    '404': 'Пользователь не найден',
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
                },
            },
        },


        userUpdate: {
            url: '/users/update',
            method: REQUEST_TYPE.PUT,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '204': 'Данные обновлены'
                },
                failure: {
                    '404': 'Записи не найдены',
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
                },
            },
        },


        postDelete: {
            url: '/post/{:id}',
            method: REQUEST_TYPE.DELETE,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Удаление поста успешно'
                },
                failure: {
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
                },
            },
        },
        userProfile: {
            url: '/users/{:id}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Профиль получен'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '404': 'Не найден',
                    '405': 'Неверный метод',
                    '500': 'Ошибка сервера',
                },
            },
        },

        userFriends: {
            url: '/friends/{:id}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Друзья пользователя получен'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '401': 'Нет кук',
                    '403': 'Нет csrf',
                    '404': 'Пользователь не найден',
                    '405': 'Неверный метод',
                    '500': 'Ошибка сервера',
                },
            },
        },


        addFriend: {
            url: '/friends/add/{:id}',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '201': 'Друг добавлен'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '401': 'Нет кук',
                    '403': 'Нет csrf',
                    '404': 'Пользователь не найден',
                    '405': 'Неверный метод',
                    '409': 'Уже в друзьях',
                    '500': 'Ошибка сервера',
                },
            },
        },


        deleteFriend: {
            url: '/friends/delete/{:id}',
            method: REQUEST_TYPE.DELETE,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '204': 'Друг Удалён'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '401': 'Нет кук',
                    '403': 'Нет csrf',
                    '404': 'Нет в друзьях',
                    '405': 'Неверный метод',
                    '500': 'Ошибка сервера',
                },
            },
        },
    }

}

export default config;