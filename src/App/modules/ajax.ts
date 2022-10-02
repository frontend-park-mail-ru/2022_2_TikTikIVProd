(function () {
    const REQUEST_TYPE = {
        GET: 'GET',
        POST: 'POST'
    };

    const noop = () => { };

    class Ajax {
        get({ url, callback }) {
            this._ajax({
                method: REQUEST_TYPE.GET,
                url,
                callback,
            })
        }

        post({ url, body, callback }) {
            this._ajax({
                method: REQUEST_TYPE.POST,
                url,
                body,
                callback
            })
        }

        _ajax({
            method,
            url,
            body = null,
            callback = noop
        }) {

            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;

                callback(xhr.status, xhr.responseText);
            });

            if (body) {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
                xhr.send(JSON.stringify(body));
                return;
            }

            xhr.send();
        }
    }

    window.ajax = new Ajax();
})();
