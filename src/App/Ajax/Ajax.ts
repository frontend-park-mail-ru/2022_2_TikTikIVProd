import config, { IApiItem } from "../Configs/Config";

interface IParamsProps {
    url: string;
    method: string;
    headers: {};
};

export interface IResponse {
    status: number;
    parsedBody: Object;
}

/**
 * Функция асинхронного запроса на сервер
 * @param  {IParamsProps} params - параметры подключения
 * @param  {string} body - тело запроса
 * @return {Promise} - промис запроса 
 */
export default async function ajax(params: IParamsProps, body?: string | FormData) {
    const mainHeaders = new Headers(params.headers);

    /** Получение CSRF токена для небезопасных запросов */
    if (params.method !== 'GET') {
        const csrfResponse = await fetch(`${config.host}${config.api.csrf.url}`, {
            method: config.api.csrf.method,
            headers: new Headers(config.api.csrf.headers),
            credentials: 'include',
        });

        const csrfToken = csrfResponse.headers.get('X-CSRF-Token');
        if (csrfToken !== null) {
            mainHeaders.append('X-CSRF-Token', csrfToken);
        }
        // console.log(csrfToken);

    }

    // console.log(mainHeaders.keys, mainHeaders.values);

    /** Основной запрос в сеть */
    let response = await fetch(`${config.host}${params.url}`,
        {
            method: params.method,
            headers: mainHeaders,
            body: body,
            credentials: 'include',

        }
    );

    let parsedBody;
    try {
        parsedBody = await response.json();
    } catch (error) {
        parsedBody = {};
    }

    return {
        status: response.status,
        parsedBody
    };
}


export async function checkResponseStatus(response: IResponse, conf: IApiItem) {
    if (response.status.toString() in conf.statuses.success) {
        return Promise.resolve();
    }

    if (response.status.toString() in conf.statuses.failure) {
        const keyStatus = response.status.toString() as keyof typeof conf.statuses.failure;
        return Promise.reject({
            msg: config.api.signin.statuses.failure[keyStatus],
        });
    }

    return Promise.reject({
        msg: 'Неожиданная ошибка',
    });
}
