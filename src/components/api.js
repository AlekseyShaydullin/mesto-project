import { data } from "browserslist"

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

//console.log(checkConnect)

function getCards() {
  return fetch(`${apiConfig.serverUrl}/cards`, {
    headers: apiConfig.headers,
  })
    .then(res => checkConnect(res))
}

const cardData = {
  name: '',
  link: '',
  likes: '',
  owner: {

  }
}

export { apiConfig, getCards };