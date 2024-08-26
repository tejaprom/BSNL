
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

    return new Promise(function (resolve, reject) {
        const options = {
            method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain',
                'authorization': 'Bearer ' + token
            }
        };

        fetch(url, options)
            .then((res) => {
                // Check if the response status is 401 before parsing JSON
                if (res.status === 401) {
                    sessionStorage.setItem('url', url);
                    sessionStorage.setItem('method', method);
                    sessionStorage.setItem('payload', JSON.stringify(payload));
                    window.location.href = '/'; // Redirect to login
                    reject(new Error('Unauthorized - Redirecting to login'));
                } else {
                    return res.json();
                }
            })
            .then((res) => {
                if (res) {
                    callback(res);
                    resolve(res);
                }
            })
            .catch((err) => {
                callback(err);
                reject(err);
            });
    });
}
