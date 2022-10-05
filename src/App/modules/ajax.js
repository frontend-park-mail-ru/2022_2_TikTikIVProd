;
const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
};
class Ajax {
    async asyncFetch(params) {
        const response = await fetch(params.url, {
            method: params.method,
            body: params.body,
            credentials: 'same-origin',
            mode: 'no-cors'
        });
        const parsedBody = await response.json();
        return {
            status: response.status,
            parsedBody
        };
    }
    async get(url) {
        return this.asyncFetch({ url: url, method: REQUEST_TYPE.GET });
    }
    ;
    async post(url, body) {
        return this.asyncFetch({ url: url, method: REQUEST_TYPE.POST, body: body });
    }
    ;
    async put(url, body) {
        return this.asyncFetch({ url: url, method: REQUEST_TYPE.PUT, body: body });
    }
    ;
    async getTest(url) {
        return Promise.reject({ status: 400, parsedBody: 'none' });
    }
    ;
}
const ajax = new Ajax();
export default ajax;
