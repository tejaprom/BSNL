export function fetchNoCall(callback, url, method, payload) {
    return new Promise(function (resolve, reject) {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(url, options)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.error?.statusCode === 401 || res.error?.status === 401) {
                    console.log(res.error)
                } else {
                    callback(res);
                    resolve(res);
                }
            })
            .catch((err) => {
                callback(err);
                return err;
            });
    });
}

export function fetchCall(callback, url, method, payload) {
    return new Promise(function (resolve, reject) {
        const options = {
            method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(url, options)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.error?.statusCode === 401 || res.error?.status === 401) {
                    console.log(res.error)
                } else {
                    callback(res);
                    resolve(res);
                }
            })
            .catch((err) => {
                callback(err);
                return err;
            });
    });
}

export function fetchLoginCall(callback, url, method, payload) {
    const token = sessionStorage.getItem('token');
    // console.log(token);
    return new Promise(function (resolve, reject) {
        const options = {
            method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain',
                'authorization': 'Bearer ' + [token]
            }
        };
        fetch(url, options)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.error?.statusCode === 401 || res.error?.status === 401) {
                    if (res.error) {
                        sessionStorage.setItem('url', url);
                        sessionStorage.setItem('method', method);
                        sessionStorage.setItem('payload', JSON.stringify(payload));
                    }
                    const tokenPayload = {
                        refreshToken: sessionStorage.getItem('refreshToken'),
                    };

                } else {
                    callback(res);
                    resolve(res);
                }
            })
            .catch((err) => {
                callback(err);
                return err;
            });
    });
}