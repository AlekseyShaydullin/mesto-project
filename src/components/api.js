import { data } from "autoprefixer"

const apiConfig = {
  serverUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '2c978f21-f56a-4fa6-b5d5-e5052862cd58',
    'Content-Type': 'application/json'
  },
  userId: '3d1d3c501916deae49b17946'
}

// Шаблон обработчика запроса на сервер
const requestConfig = async (url, method, data, headers = apiConfig.headers) => {
  return fetch(`${apiConfig.serverUrl}${url}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => checkConnect(res))
    .catch(err => console.log(err))
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
  return requestConfig('/cards', 'GET')
}

// Получить данные пользователя
const getUserId = () => {
  return requestConfig('/users/me', 'GET')
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

export { apiConfig, getUserId, getCards, editProfileData, addNewCard, delNewCard, addLikeCard, delLikeCard, refreshAvatar };