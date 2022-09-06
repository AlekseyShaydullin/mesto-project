export default class Api {
  constructor(data) {
    this._serverUrl = data.serverUrl;
    this._headers = data.headers;
  }

  _checkConnect(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`)
    }
    return res.json()
  }

  _setRequest(url, method, data) {
    return fetch(`${this._serverUrl}${url}`, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkConnect)
  }

  _getRequest(url, method) {
    return fetch(`${this._serverUrl}${url}`, {
      method: method,
      headers: this._headers
    })
      .then(this._checkConnect)
  }

  getCards = () => {
    return this._getRequest('/cards')
  }

  // Получить данные пользователя
  getUserId = () => {
    return this._getRequest('/users/me')
  }

  // Отправить данные пользователя на сервер
  editProfileData = (user) => {
    return this._setRequest('/users/me', 'PATCH', user)
  }

  // Отправить данные новой карточки на сервер
  addNewCard = (newCard) => {
    return this._setRequest('/cards', 'POST', newCard)
  }

  // Удалить карточку добавленную пользователем
  delNewCard = (cardId) => {
    return this._getRequest(`/cards/${cardId}`, 'DELETE')
  }

  // Добавить лайк карточке
  addLikeCard = (cardId) => {
    return this._getRequest(`/cards/likes/${cardId}`, 'PUT')
  }

  // Удалить лайк карточки
  delLikeCard = (cardId) => {
    return this._getRequest(`/cards/likes/${cardId}`, 'DELETE')
  }

  // Обновить аватар пользователя
  refreshAvatar = ({ avatar: imageUrl }) => {
    return this._setRequest('/users/me/avatar', 'PATCH', { avatar: imageUrl })
  }
}
