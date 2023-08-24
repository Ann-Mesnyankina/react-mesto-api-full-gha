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

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {           
            headers: {
                authorization: this._authorization
            },
        })
            .then(this._getResData)
    }

    getInfoUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
            .then(this._getResData)
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResData)
    }

    deleteCards(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._getResData)
    }

    replaceUserData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name: data.username, about: data.proffesion })
        })
            .then(this._getResData)
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
        })
            .then(this._getResData)
    }

    replaceAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar: data.avatar }),
        })
            .then(this._getResData)
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3001',
    headers: {
        authorization:`Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
    }
});
export default api;