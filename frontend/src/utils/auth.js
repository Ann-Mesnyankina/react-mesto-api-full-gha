class Auth {
    constructor(setting) {
        this._baseUrl = setting.baseUrl;
        this._headers = setting.headers;
        this._authorization = setting.headers.authorization
    }

    _getResData(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        };
    }

      registration(data) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then(this._getResData)
    }

    authorization(data) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then(this._getResData)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    return data
                }
            })
    }
    getUserToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResData)
    }

}

const auth = new Auth({
    baseUrl: 'https://api.ann.mesnyankina.mesto.nomoredomainsicu.ru',
    headers: { 'Content-Type': 'application/json' }
});
export default auth;