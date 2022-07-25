
export const apiConfig = {
  serverUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '2c978f21-f56a-4fa6-b5d5-e5052862cd58',
    'Content-Type': 'application/json'
  }
}

export class Api {
  constructor(data) {
    this._apiConfig = data.apiConfig;
    this._url = data.url;
  }

  _checkConnect(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`)
    }
    return res.json()
  }

  _requestConfig(url, method, data, headers = this._apiConfig.headers) {
    return fetch(`${this._apiConfig.serverUrl}${url}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
    })
      .then(this._checkConnect)
  }

  getData(method) {
    return this._requestConfig(this._url, method)
  }

  setData(method, data) {
    return this._requestConfig(this._url, method, data)
  }


  /*getCards = () => {
    return this._requestConfig('/cards')
  }
  
  // Получить данные пользователя
  getUserId = () => {
    return this._requestConfig('/users/me')
  }
  
  // Отправить данные пользователя на сервер
  editProfileData = (user) => {
    return this._requestConfig('/users/me', 'PATCH', user)
  }
  
  // Отправить данные новой карточки на сервер
  addNewCard = (newCard) => {
    return this._requestConfig('/cards', 'POST', newCard)
  }
  
  // Удалить карточку добавленную пользователем
  delNewCard = (cardId) => {
    return this._requestConfig(`/cards/${cardId}`, 'DELETE')
  }
  
  // Добавить лайк карточке
  addLikeCard = (cardId) => {
    return this._requestConfig(`/cards/likes/${cardId}`, 'PUT')
  }
  
  // Удалить лайк карточки
  delLikeCard = (cardId) => {
    return this._requestConfig(`/cards/likes/${cardId}`, 'DELETE')
  }
  
  // Обновить аватар пользователя
  refreshAvatar = (imageUrl) => {
    return this._requestConfig('/users/me/avatar', 'PATCH', { avatar: imageUrl })
  }*/
}

// Шаблон обработчика запроса на сервер
const requestConfig = async (url, method, data, headers = apiConfig.headers) => {
  const res = await fetch(`${apiConfig.serverUrl}${url}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(data)
  })
  return checkConnect(res)
}

// Запрос на сервер:
const checkConnect = res => {
  if (!res.ok) {
    return Promise.reject(`Ошибка ${res.status}`)
  }
  return res.json()
}

// Получить карточки
const getCards = () => {
  return requestConfig('/cards')
}

// Получить данные пользователя
const getUserId = () => {
  return requestConfig('/users/me')
}

// Отправить данные пользователя на сервер
const editProfileData = (user) => {
  return requestConfig('/users/me', 'PATCH', user)
}

// Отправить данные новой карточки на сервер
const addNewCard = (newCard) => {
  return requestConfig('/cards', 'POST', newCard)
}

// Удалить карточку добавленную пользователем
const delNewCard = (cardId) => {
  return requestConfig(`/cards/${cardId}`, 'DELETE')
}

// Добавить лайк карточке
const addLikeCard = (cardId) => {
  return requestConfig(`/cards/likes/${cardId}`, 'PUT')
}

// Удалить лайк карточки
const delLikeCard = (cardId) => {
  return requestConfig(`/cards/likes/${cardId}`, 'DELETE')
}

// Обновить аватар пользователя
const refreshAvatar = (imageUrl) => {
  return requestConfig('/users/me/avatar', 'PATCH', { avatar: imageUrl })
}

export { getUserId, getCards, editProfileData, addNewCard, delNewCard, addLikeCard, delLikeCard, refreshAvatar };