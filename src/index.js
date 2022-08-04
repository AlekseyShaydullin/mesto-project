import './pages/index.css';
import Api from './components/api';
import Card from './components/CardNew';
import FormValidator from './components/FormValidator'
import Section from './components/Section';
import PopupWithImage from './components/PopupWithImage';
import PopupWithDeleteCard from './components/PopupWithDeleteCard';
import PopupWithForm from './components/PopupWithForm';
import UserInfo from './components/UserInfo';

const buttonAddInfo = document.querySelector('.profile__edit-button'); // кнопка вызывающая окно редактирование профиля
const cardButtonAdd = document.querySelector('.profile__add-button'); // кнопка вызывающая окно редактирование карточек
const formUserAddInfo = document.querySelector('.popup__userAddInfo'); // попап форма редактировать профиль
const cardBox = document.querySelector('.elements'); // коробка карточек
const formUserAddCard = document.querySelector('.popup__cardAdd'); // попап форма редактировать карточку
const refreshButtonAvatar = document.querySelector('.profile__btn-refresh-avatar'); // кнопка изменения аватара
const refreshAvatarPopup = document.querySelector('.popup__refresh-avatar'); // попап редактирования аватара
const formUserAvatar = refreshAvatarPopup.querySelector('.popup__avatar-edit');

const apiConfig = {
  serverUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '2c978f21-f56a-4fa6-b5d5-e5052862cd58',
    'Content-Type': 'application/json'
  }
}

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const userId = {}

const api = new Api(apiConfig);
const cardApi = api.getCards();
const userApi = api.getUserId();

const section = new Section(renderer, 'elements__wrapper');

const profileFormValidation = new FormValidator(validationConfig, formUserAddInfo);
const cardFormValidation = new FormValidator(validationConfig, formUserAddCard);
const avatarFormValidation = new FormValidator(validationConfig, formUserAvatar);

const popupImage = new PopupWithImage('.popup__image');
const popupTrash = new PopupWithDeleteCard('.popup__delete-card', submitDeleteCard);
const popupCard = new PopupWithForm('.popup_element-edit', submitNewCard);
const popupProfile = new PopupWithForm('.popup_profile-edit', submitEditProfile);
const popupAvatar = new PopupWithForm('.popup__refresh-avatar', submitEditAvatar);
const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__about', avatar: '.profile__avatar' })

const user = { name: popupProfile._inputList[0], about: popupProfile._inputList[1] }

function submitEditProfile(data) {
  api.editProfileData(data)
    .then((user) => {
      userInfo.setUserInfo(user);
      popupProfile.closePopup();
    })
    .catch(err => console.log(err))
}

function submitEditAvatar(data) {
  api.refreshAvatar(data)
    .then(avatar => {
      userInfo.setUserAvatar(avatar);
      popupAvatar.closePopup();
    })
    .catch(err => console.log(err))
}

function submitNewCard(data) {
  api.addNewCard(data)
    .then((card) => {
      section.addItem(renderer(card));
      removeLastElement()
      popupCard.closePopup();
    })
    .catch(err => console.log(err))
}

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

[profileFormValidation, cardFormValidation, avatarFormValidation].forEach(form => form.enableValidation());

popupTrash.setEventListener();
popupCard.setEventListener();
popupProfile.setEventListener();
popupAvatar.setEventListener();

// Открытие Popup окна - Refresh Avatar:
refreshButtonAvatar.addEventListener('click', () => {
  popupAvatar.openPopup();
  avatarFormValidation.clearValidation();
});

// Открытие Popup окна - Element:
cardButtonAdd.addEventListener('click', () => {
  popupCard.openPopup();
  cardFormValidation.clearValidation();
});

// Открытие Popup окна - Profile:
buttonAddInfo.addEventListener('click', () => {
  popupProfile.openPopup();
  profileFormValidation.clearValidation();
  const { name, about } = userInfo.getUserInfo();
  user.name.value = name;
  user.about.value = about;
});

Promise.allSettled([userApi, cardApi])
  .then(([{ value: user }, { value: cards }]) => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    userId._id = user?._id;
    section.rendererItems(cards);
  })
  .catch(err => { console.log(err) });
