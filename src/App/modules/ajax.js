;
const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
};
class Ajax {
    async asyncFetch(params) {
        let headers = new Headers();
        // headers.append('Content-Type', 'text/plain');
        // headers.append('Accept', 'application/json');
        // headers.append('Access-Control-Allow-Origin', '*');
        // headers.append('Access-Control-Allow-Credentials', 'true');
        const response = await fetch(params.url, {
            method: params.method,
            headers: headers,
            body: params.body,
            // credentials: 'include',
            //     mode: 'cors'
            referrerPolicy: 'unsafe-url',
        });
        const parsedBody = await response.json();
        return {
            status: response.status,
            parsedBody
        };
    }
    async get(url) {
        return await this.asyncFetch({ url: url, method: REQUEST_TYPE.GET });
    }
    ;
    async post(url, body) {
        return await this.asyncFetch({ url: url, method: REQUEST_TYPE.POST, body: body });
    }
    ;
    async put(url, body) {
        return await this.asyncFetch({ url: url, method: REQUEST_TYPE.PUT, body: body });
    }
    ;
    async getTest(url) {
        return Promise.reject({ status: 400, parsedBody: 'none' });
    }
    ;
}
const ajax = new Ajax();
export default ajax;
