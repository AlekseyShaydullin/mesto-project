import { data } from "autoprefixer"

const apiConfig = {
  serverUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '2c978f21-f56a-4fa6-b5d5-e5052862cd58',
    'Content-Type': 'application/json'
  }
}

// Шаблон обработчика запроса на сервер
const requestConfig = (url, method, data, headers = apiConfig.headers) => {
  return fetch(`${apiConfig.serverUrl}${url}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => checkConnect(res))
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