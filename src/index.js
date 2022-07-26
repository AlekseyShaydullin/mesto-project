import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validate.js';
import { editProfileData, addNewCard, refreshAvatar, Api, apiConfig } from './components/api';
import { Card } from './components/CardNew';

const profile = document.querySelector('.profile');
const profileContainer = profile.querySelector('.profile__bio');
const nameProfile = profileContainer.querySelector('.profile__name'); // имя владельца профайла
const jobProfile = profileContainer.querySelector('.profile__about'); // профессия владельца профайла
const buttonAddInfo = document.querySelector('.profile__edit-button'); // кнопка вызывающая окно редактирование профиля
const profilePopup = document.querySelector('.popup_profile-edit'); // попап редактировать профиль
const cardPopup = document.querySelector('.popup_element-edit'); // попап добавление карточек
const cardButtonAdd = document.querySelector('.profile__add-button'); // кнопка вызывающая окно редактирование карточек
const formUserAddInfo = document.querySelector('.popup__userAddInfo'); // попап форма редактировать профиль
const nameInput = formUserAddInfo.querySelector('.popup__input_data_name'); // строка ввода имени
const jobInput = formUserAddInfo.querySelector('.popup__input_data_about'); // строка ввода профессии
const cardBox = document.querySelector('.elements'); // коробка карточек
const formUserAddCard = document.querySelector('.popup__cardAdd'); // попап форма редактировать карточку
const titleInputCard = document.querySelector('.popup__input_data_title'); // строка ввода названия карточки
const photoInputCard = document.querySelector('.popup__input_data_link'); // строка ввода ссылки
const saveProfileButton = document.querySelector('.popup__saveProfile'); // кнопка сохранить введённые данные Юзера
const saveCardButton = document.querySelector('.popup__saveCard'); // кнопка сохранить новую карточку
const refreshButtonAvatar = document.querySelector('.profile__btn-refresh-avatar'); // кнопка изменения аватара
const refreshAvatarPopup = document.querySelector('.popup__refresh-avatar'); // попап редактирования аватара
const inputAvatar = document.querySelector('.popup__input_data_link-avatar'); // строка ввода ссылки на аватар
const saveAvatarButton = document.querySelector('.popup__saveAvatar'); // кнопка сохранить аватар
const profileAvatar = document.querySelector('.profile__avatar'); // аватар профайла

export const userId = {}

const user = {}

const newCard = { owner: {} };

const api = new Api( apiConfig );

Promise.allSettled([api.getUserId(), api.getCards()])
  .then(([{ value: user }, { value: cards }]) => {
    nameProfile.textContent = user?.name;
    jobProfile.textContent = user?.about;
    profileAvatar.src = user?.avatar;
    userId._id = user?._id;
    fillCards(cards)
  })
  .catch(err => { console.log(err) })

// Открытие Popup окна - Profile:
buttonAddInfo.addEventListener('click', () => {
  openPopup(profilePopup);
  clearValidation(profilePopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

formUserAddInfo.addEventListener('submit', submitProfileForm);

// Сохранение внесенной информации в Popup окне - Profile:
function submitProfileForm(evt) {
  evt.preventDefault();
  user.name = nameInput.value;
  user.about = jobInput.value;
  saveProfileButton.textContent = 'Сохранение...';
  editProfileData(user)
    .then((user) => {
      nameProfile.textContent = user.name;
      jobProfile.textContent = user.about;
      closePopup(profilePopup);
    })
    .catch(err => console.log(err))
    .finally(() => saveProfileButton.textContent = 'Сохранить')
}

// Открытие Popup окна - Element:
cardButtonAdd.addEventListener('click', () => {
  openPopup(cardPopup);
  clearValidation(cardPopup);
});

// Сохранение внесенной информации в Popup окне - Element:
function submitCardForm(evt) {
  evt.preventDefault();
  newCard.name = titleInputCard.value;
  newCard.link = photoInputCard.value;
  saveCardButton.textContent = 'Добавление...';
  addNewCard(newCard)
    .then((card) => {
      const cardBoxChild = cardBox.querySelector('.elements__wrapper');
      cardBoxChild.prepend(createCard(card));
      removeLastElement();
      closePopup(cardPopup);
    })
    .catch(err => console.log(err))
    .finally(() => {
      saveCardButton.textContent = 'Добавить';
      formUserAddCard.reset();
    })
}

formUserAddCard.addEventListener('submit', submitCardForm);

// Открытие Popup окна - Refresh Avatar:
refreshButtonAvatar.addEventListener('click', () => {
  openPopup(refreshAvatarPopup);
  clearValidation(refreshAvatarPopup);
})

// Сохранение внесенной информации в Popup окне - Refresh Avatar:
function submitrefreshAvatar(evt) {
  evt.preventDefault();
  saveAvatarButton.textContent = 'Сохранение...';
  refreshAvatar(inputAvatar.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(refreshAvatarPopup);
    })
    .catch(err => console.log(err))
    .finally(() => saveProfileButton.textContent = 'Сохранить')
}

refreshAvatarPopup.addEventListener('submit', submitrefreshAvatar)

function removeLastElement() {
  const cards = cardBox.querySelectorAll('.element');
  cards[cards.length - 1].remove();
}

export function fillCards(cards) {
  const cardsHtml = document.createElement('div')
  cardsHtml.classList.add('elements__wrapper');
  cards.forEach(data => {
    const card = new Card(data, '#card-template', userId);
    cardsHtml.append(card.createCard())
  })
  const cardBoxChild = cardBox.querySelector('.elements__wrapper');
  cardBox.replaceChild(cardsHtml, cardBoxChild);
}

function getLike(card, likeCard, counterLikes) {
  if (likeCard.classList.contains('element__button-like_active')) {
    delLikeCard(card._id)
      .then(res => {
        counterLikes.textContent = res.likes.length;
        likeCard.classList.remove('element__button-like_active');
      })
      .catch(err => console.log(err))
  } else if (!likeCard.classList.contains('element__button-like_active')) {
    addLikeCard(card._id)
      .then(res => {
        counterLikes.textContent = res.likes.length;
        likeCard.classList.add('element__button-like_active');
      })
      .catch(err => console.log(err))
  }
}

enableValidation();