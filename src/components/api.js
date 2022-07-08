import { data } from "autoprefixer"

const apiConfig = {
  serverUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '2c978f21-f56a-4fa6-b5d5-e5052862cd58',
    'Content-Type': 'application/json'
  },
  userId: '3d1d3c501916deae49b17946'
}

const checkConnect = res => {
  if (!res.ok) {
    return Promise.reject(`Ошибка ${res.status}`)
  }
  return res.json()
}

const getCards = async () => {
  return fetch(`${apiConfig.serverUrl}/cards`, {
    headers: apiConfig.headers,
  })
    .then(res => checkConnect(res))
    .catch(err => console.log(err))
}

getCards()
  .then(data => console.log(data))

const getUserId = async () => {
  return fetch(`${apiConfig.serverUrl}/users/me`, {
    headers: apiConfig.headers,
  })
    .then(res => checkConnect(res))
    .catch(err => console.log(err))
}

getUserId()
  .then(id => console.log(id));

const editProfileData = async (user) => {
  return fetch(`${apiConfig.serverUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(user),
  })
    .then(res => checkConnect(res))
    .catch(err => console.log(err))
}

const addNewCard = async (newCard) => {
  return fetch(`${apiConfig.serverUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(newCard),
  })
    .then(res => checkConnect(res))
    .catch(err => console.log(err))
}

const delNewCard = async (cardId) => {
  return fetch(`${apiConfig.serverUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
    .then(res => checkConnect(res))
    .catch(err => console.log(err))
}

const addLikeCard = async (cardId) => {
  return fetch(`${apiConfig.serverUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  })
    .then(res => checkConnect(res))
    .catch(err => console.log(err))
}

const delLikeCard = async (cardId) => {
  return fetch(`${apiConfig.serverUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
    .then(res => checkConnect(res))
    .catch(err => console.log(err))
}

export { apiConfig, getUserId, getCards, editProfileData, addNewCard, delNewCard, addLikeCard, delLikeCard };