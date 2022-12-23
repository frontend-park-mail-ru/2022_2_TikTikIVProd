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
    chatWS: string;
    api: {
        [index: string]: IApiItem;
    },
    default_img: string,
}

const config: IConfig = {
    host: 'https://writesend.online/api',
    // host: 'http://89.208.197.127/api',
    // host: 'http://89.208.197.127:8080',
    // host: 'http://127.0.0.1:8080',
    // host: 'http://localhost:8080',
    chatWS: 'wss://writesend.online/api/ws/{:chat_id}',
    api: {
        logout: {
            url: '/logout',
            method: REQUEST_TYPE.POST,
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
                    '200': 'Успешно',
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
                    '200': 'Получение постов успешно'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
                },
            },
        },

        image: {
            url: '/attachment/{:id}',
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

        imageUpload: {
            url: '/attachment/image/upload',
            method: REQUEST_TYPE.POST,
            headers: {
                // 'Content-Type': 'multipart/form-data',
            },
            statuses: {
                success: {
                    '200': 'Картинка загружена'
                },
                failure: {
                    '401': 'No cookie',
                    '400': 'No csrf',
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
                },
            },
        },
        fileUpload: {
            url: '/attachment/file/upload',
            method: REQUEST_TYPE.POST,
            headers: {
                // 'Content-Type': 'multipart/form-data',
            },
            statuses: {
                success: {
                    '200': 'Картинка загружена'
                },
                failure: {
                    '401': 'No cookie',
                    '400': 'No csrf',
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
        postLike: {
            url: '/post/like/{:id}',
            method: REQUEST_TYPE.PUT,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '204': 'Лайк поста успешно'
                },
                failure: {
                    '401': 'no cookie',
                    '403': 'no csrf',
                    '405': 'Неверный HTTP метод',
                    '500': 'Ошибка сервера',
                },
            },
        },
        postUnlike: {
            url: '/post/unlike/{:id}',
            method: REQUEST_TYPE.PUT,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '204': 'Анлайк поста успешно'
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

        usersSearch: {
            url: '/users/search/{:name}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Пользователи найдены'
                },
                failure: failureDefaultStatuses,
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
                    '204': 'Удаление поста успешно'
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

        userCheckFriend: {
            url: '/friends/check/{:id}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Проверка прошла успешно'
                },
                failure: Object.assign({
                    '404': 'Пользователь не найден',
                }, failureDefaultStatuses),
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

        dialogs: {
            url: '/chat',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Список диалогов получен'
                },
                failure: {
                    '401': 'Нет кук',
                    '405': 'Неверный метод',
                    '500': 'Ошибка сервера',
                },
            },
        },

        chat: {
            url: '/chat/{:id}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Список диалогов получен'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '401': 'Нет кук',
                    '404': 'Чат не найден',
                    '405': 'Неверный метод',
                    '500': 'Ошибка сервера',
                },
            },
        },

        chatSend: {
            url: '/chat/send_message',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Сообщение отправлено'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '401': 'Нет кук',
                    '404': 'Чат не найден',
                    '405': 'Неверный метод',
                    '500': 'Ошибка сервера',
                },
            },
        },

        checkChat: {
            url: '/chat/user/{:id}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Сообщение отправлено'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '401': 'Нет кук',
                    '404': 'Чат не найден',
                    '405': 'Неверный метод',
                    '500': 'Ошибка сервера',
                },
            },
        },

        initws: {
            url: '/ws/{:id}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '400': 'Сообщение отправлено'
                },
                failure: {
                    '400': 'Неверный запрос',
                    '401': 'Нет кук',
                    '404': 'Чат не найден',
                    '405': 'Неверный метод',
                    '500': 'Ошибка сервера',
                },
            },
        },

        communitiesAll: {
            url: '/communities',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Список сообществ получен'
                },
                failure: failureDefaultStatuses,
            },
        },

        communitiesCreate: {
            url: '/communities/create',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Сообщество создано'
                },
                failure: Object.assign({
                    '422': 'unprocessable entity',
                }, failureDefaultStatuses),
            },
        },


        communitiesEdit: {
            url: '/communities/edit',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Сообщество изменено'
                },
                failure: Object.assign({
                    '422': 'unprocessable entity',
                }, failureDefaultStatuses),
            },
        },

        communitiesGet: {
            url: '/communities/{:id}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Сообщество данные получены'
                },
                failure: failureDefaultStatuses,
            },
        },

        communitiesDelete: {
            url: '/communities/{:id}',
            method: REQUEST_TYPE.DELETE,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '204': 'Сообщество удалено'
                },
                failure: Object.assign({
                    '404': 'Сообщество не найдено',
                }, failureDefaultStatuses),
            },
        },

        communitiesPosts: {
            url: '/communities/{:id}/posts',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Записи сообщества получены'
                },
                failure: Object.assign({
                    '404': 'Сообщество не найдено',
                }, failureDefaultStatuses),
            },
        },

        communitiesSearch: {
            url: '/communities/search?q={:name}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Пользователи найдены'
                },
                failure: Object.assign({
                    '404': 'Сообщество не найдено',
                }, failureDefaultStatuses),
            },
        },


        // Comments
        getComments: {

            url: '/post/{:id}/comments',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Комментарии получены'
                },
                failure: Object.assign({
                    '404': 'Комментарии не найдены',
                }, failureDefaultStatuses),
            },
        },

        deleteComment: {

            url: '/post/comment/{:id}',
            method: REQUEST_TYPE.DELETE,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '204': 'Комментарий удалён'
                },
                failure: Object.assign({
                    '404': 'Комментарий не найден',
                }, failureDefaultStatuses),
            },
        },
        addComment: {

            url: '/post/comment/add',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Комментарий создан'
                },
                failure: failureDefaultStatuses,
            },
        },

        editComment: {

            url: '/post/comment/edit',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Комментарий изменён',
                },
                failure: failureDefaultStatuses,
            },
        },

        stickers: {
            url: '/stickers',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Стикеры получены',
                },
                failure: failureDefaultStatuses,
            },
        },

        stickerById: {
            url: '/sticker/{:id}',
            method: REQUEST_TYPE.GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '200': 'Стикер получен',
                },
                failure: failureDefaultStatuses,
            },
        },

        communitiesJoin: {
            url: '/communities/join/{:id}',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '204': 'Вступление успешно',
                },
                failure: failureDefaultStatuses,
            },
        },

        communitiesLeave: {
            url: '/communities/leave/{:id}',
            method: REQUEST_TYPE.POST,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            statuses: {
                success: {
                    '204': 'Выход успешно',
                },
                failure: failureDefaultStatuses,
            },
        },
    },
    default_img: '../src/img/default_avatar.png',
}

export default config;