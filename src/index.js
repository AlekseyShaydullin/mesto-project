import './pages/index.css';
//import { createCard } from './components/card.js';
import { validationConfig } from './components/validate.js';
import { Api, apiConfig } from './components/api';
import Card from './components/CardNew';
import FormValidator from './components/FormValidator'
import Section from './components/Section';
import PopupWithImage from './components/PopupWithImage';
import PopupWithDeleteCard from './components/PopupWithDeleteCard';
import PopupWithForm from './components/PopupWithForm';

const profile = document.querySelector('.profile');
const profileContainer = profile.querySelector('.profile__bio');
const nameProfile = profileContainer.querySelector('.profile__name'); // имя владельца профайла
const jobProfile = profileContainer.querySelector('.profile__about'); // профессия владельца профайла
const buttonAddInfo = document.querySelector('.profile__edit-button'); // кнопка вызывающая окно редактирование профиля
// const profilePopup = document.querySelector('.popup_profile-edit'); // попап редактировать профиль
const cardButtonAdd = document.querySelector('.profile__add-button'); // кнопка вызывающая окно редактирование карточек
const formUserAddInfo = document.querySelector('.popup__userAddInfo'); // попап форма редактировать профиль
const cardBox = document.querySelector('.elements'); // коробка карточек
const formUserAddCard = document.querySelector('.popup__cardAdd'); // попап форма редактировать карточку
const refreshButtonAvatar = document.querySelector('.profile__btn-refresh-avatar'); // кнопка изменения аватара
const refreshAvatarPopup = document.querySelector('.popup__refresh-avatar'); // попап редактирования аватара
const profileAvatar = document.querySelector('.profile__avatar'); // аватар профайла
const formUserAvatar = refreshAvatarPopup.querySelector('.popup__avatar-edit');

export const userId = {}

const api = new Api(apiConfig);
const cardApi = api.getCards();
const userApi = api.getUserId();

const section = new Section(renderer, 'elements__wrapper');

const profileFormValidation = new FormValidator(validationConfig, formUserAddInfo);
const cardFormValidation = new FormValidator(validationConfig, formUserAddCard);
const avatarFormValidation = new FormValidator(validationConfig, formUserAvatar);
[profileFormValidation, cardFormValidation, avatarFormValidation].forEach(form => form.enableValidation())

const popupImage = new PopupWithImage('.popup__image');
const popupTrash = new PopupWithDeleteCard('.popup__delete-card', submitDeleteCard);
const popupCard = new PopupWithForm('.popup_element-edit', submitNewCard);
const popupProfile = new PopupWithForm('.popup_profile-edit', submitEditProfile);
const popupAvatar = new PopupWithForm('.popup__refresh-avatar', submitEditAvatar);

Promise.allSettled([userApi, cardApi])
  .then(([{ value: user }, { value: cards }]) => {
    nameProfile.textContent = user?.name;
    jobProfile.textContent = user?.about;
    profileAvatar.src = user?.avatar;
    userId._id = user?._id;
    section.rendererItems(cards)
  })
  .catch(err => { console.log(err) })

// Открытие Popup окна - Profile:
buttonAddInfo.addEventListener('click', () => {
  popupProfile.openPopup();
  profileFormValidation.clearValidation();
});

function submitEditProfile(data) {
  api.editProfileData(data)
    .then((profile) => {
      console.log(profile);
      popupProfile.closePopup();
    })
    .catch(err => console.log(err))
}

function submitEditAvatar(data) {
  api.refreshAvatar(data)
    .then(res => console.log(res))
}

// Открытие Popup окна - Element:
cardButtonAdd.addEventListener('click', () => {
  popupCard.openPopup();
  cardFormValidation.clearValidation();
});

function submitNewCard(data) {
  api.addNewCard(data)
    .then((card) => {
      section.addItem(renderer(card));
      removeLastElement()
      popupCard.closePopup();
    })
    .catch(err => console.log(err))
}

// Открытие Popup окна - Refresh Avatar:
refreshButtonAvatar.addEventListener('click', () => {
  popupAvatar.openPopup();
  avatarFormValidation.clearValidation();
})

function removeLastElement() {
  const cards = cardBox.querySelectorAll('.element');
  cards[cards.length - 1].remove();
}

function handleLikeCard(id, likeCard) {
  if (likeCard.classList.contains('element__button-like_active')) {
    api.delLikeCard(id)
      .then(res => this._delLike(res))
      .catch(err => console.log(err))
  } else if (!likeCard.classList.contains('element__button-like_active')) {
    api.addLikeCard(id)
      .then(res => this._addLike(res))
      .catch(err => console.log(err))
  }
}

function renderer(item) {
  const card = new Card(item, '#card-template', userId, handleLikeCard, openPopupImage, deleteCard);
  return card.createCard()
}

function openPopupImage(name, link) {
  popupImage.openPopup(name, link)
}

function submitDeleteCard(id) {
  api.delNewCard(id)
    .then(() => {
      api.getCards()
        .then((cards) => {
          section.rendererItems(cards)
          popupTrash.closePopup();
        })
    })
    .catch(err => console.log(err))
}

function deleteCard(id) {
  popupTrash.openPopup(id)
}

popupTrash.setEventListener();
popupCard.setEventListener();
popupProfile.setEventListener();
popupAvatar.setEventListener();