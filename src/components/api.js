import { data } from "browserslist"

const apiConfig = {
  serverUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  token: '2c978f21-f56a-4fa6-b5d5-e5052862cd58',
  userId: '3d1d3c501916deae49b17946'
}

function getTest() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-12/users/me', {
    headers: {
      authorization: '2c978f21-f56a-4fa6-b5d5-e5052862cd58',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(e => {
      console.error(e);
    });
}

getTest();

/*const checkConnect = res => {
  if (!res.ok) {
    return Promise.reject(`Ошибка ${res}`)
  }
  return res.json()
}

const getCards = async (data) {
  return fetch(`${apiConfig.serverUrl}/cards`, {
    meto
  })
}*/

//export { apiConfig };