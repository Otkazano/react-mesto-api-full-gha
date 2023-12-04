class Api {
  constructor ({ url, headers }) {
    this._url = url
    this._userUrl = `${this._url}/users/me`
    this._cardsUrl = `${this._url}/cards`
    this._headers = headers
  }

  _getResponse (res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(new Error(`${res.status}`))
  }

  setAuthorizationHeader (jwt) {
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${jwt}`
    }
  }

  getAllCards () {
    return fetch(this._cardsUrl, {
      headers: this._headers
    }).then(this._getResponse)
  }

  deleteCard (id) {
    return fetch(`${this._cardsUrl}/${id}`, {
      headers: this._headers,
      method: 'DELETE'
    }).then(this._getResponse)
  }

  createCard ({ nameNewImage, linkNewImage }) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: nameNewImage,
        link: linkNewImage
      })
    }).then(this._getResponse)
  }

  likeCard (id) {
    return fetch(`${this._cardsUrl}/${id}/likes`, {
      headers: this._headers,
      method: 'PUT'
    }).then(this._getResponse)
  }

  dislikeCard (id) {
    return fetch(`${this._cardsUrl}/${id}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    }).then(this._getResponse)
  }

  getUserData () {
    return fetch(this._userUrl, {
      headers: this._headers
    }).then(this._getResponse)
  }

  saveUserChanges ({ nameProfile, aboutProfile }) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameProfile,
        about: aboutProfile
      })
    }).then(this._getResponse)
  }

  changeUserAvatar (linkNewAvatar) {
    return fetch(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkNewAvatar
      })
    }).then(this._getResponse)
  }
}

const api = new Api({
  url: 'https://api.mesto.media.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
