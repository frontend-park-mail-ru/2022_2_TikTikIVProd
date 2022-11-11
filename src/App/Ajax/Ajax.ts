import config from "../Configs/Config";

interface IParamsProps {
    url: string;
    method: string;
    headers: {};
};


/**
 * Функция асинхронного запроса на сервер
 * @param  {IParamsProps} params - параметры подключения
 * @param  {string} body - тело запроса
 * @return {Promise} - промис запроса 
 */
export async function ajax(params: IParamsProps, body?: string | FormData) {
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

export default ajax;