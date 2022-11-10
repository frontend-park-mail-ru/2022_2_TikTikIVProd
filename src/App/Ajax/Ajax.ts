import config from "../Configs/Config";

interface IParamsProps {
    url: string;
    method: string;
    headers: {};
};


function getCookie(name: string) {
    if (!document.cookie) {
        return null;
    }

    const xsrfCookies = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
        return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

/**
 * Функция асинхронного запроса на сервер
 * @param  {IParamsProps} params - параметры подключения
 * @param  {string} body - тело запроса
 * @return {Promise} - промис запроса 
 */
export async function ajax(params: IParamsProps, body?: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');

    const csrfToken = getCookie('CSRF-Token');
    if (csrfToken !== null) {
        headers.append('X-CSRF-Token', csrfToken);
    }

    let response = await fetch(`${config.host}${params.url}`,
        {
            method: params.method,
            headers: headers,
            body: body,
            credentials: 'include',
        }
    );

    if (response.status === 403) {
        fetch(`${config.host}${config.api.csrf.url}`, {
            method: config.api.csrf.method
        })

        const csrfToken = getCookie('CSRF-TOKEN');
        if (csrfToken !== null) {
            headers.append('X-CSRFToken', csrfToken);
        }

        response = await fetch(`${config.host}${params.url}`,
            {
                method: params.method,
                headers: headers,
                body: body,
                credentials: 'include',
            }
        );
    }

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