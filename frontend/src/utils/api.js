class Api {
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

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResData)
    }

    getInfoUser(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResData)
    }

    addNewCard(data, token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResData)
    }

    deleteCards(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(this._getResData)
    }

    replaceUserData(data, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name: data.username, about: data.proffesion })
        })
            .then(this._getResData)
    }

    changeLikeCardStatus(cardId, isLiked, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._getResData)
    }

    replaceAvatar(data, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ avatar: data.avatar }),
        })
            .then(this._getResData)
    }
}

const api = new Api({
    baseUrl: 'https://api.ann.mesnyankina.mesto.nomoredomainsicu.ru',
});
export default api;