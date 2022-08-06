import './pages/index.css';
import Api from './components/Api';
import Card from './components/Card';
import FormValidator from './components/FormValidator'
import Section from './components/Section';
import PopupWithImage from './components/PopupWithImage';
import PopupWithDeleteCard from './components/PopupWithDeleteCard';
import PopupWithForm from './components/PopupWithForm';
import UserInfo from './components/UserInfo';
import * as constants from './utils/constants';

const api = new Api(constants.apiConfig);
const cardApi = api.getCards();
const userApi = api.getUserId();

const section = new Section(renderer, 'elements__wrapper');

const profileFormValidation = new FormValidator(constants.validationConfig, constants.formUserAddInfo);
const cardFormValidation = new FormValidator(constants.validationConfig, constants.formUserAddCard);
const avatarFormValidation = new FormValidator(constants.validationConfig, constants.formUserAvatar);

const popupImage = new PopupWithImage('.popup__image');
const popupTrash = new PopupWithDeleteCard('.popup__delete-card', submitDeleteCard);
const popupCard = new PopupWithForm('.popup_element-edit', submitNewCard);
const popupProfile = new PopupWithForm('.popup_profile-edit', submitEditProfile);
const popupAvatar = new PopupWithForm('.popup__refresh-avatar', submitEditAvatar);
const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__about', avatar: '.profile__avatar' })

const user = { name: popupProfile._inputList[0], about: popupProfile._inputList[1] }

function submitEditProfile(data) {
  constants.saveProfileButton.textContent = 'Сохранение...';
  api.editProfileData(data)
    .then((user) => {
      userInfo.setUserInfo(user);
      popupProfile.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => constants.saveProfileButton.textContent = 'Сохранить')
}

function submitEditAvatar(data) {
  constants.saveAvatarButton.textContent = 'Сохранение...';
  api.refreshAvatar(data)
    .then(avatar => {
      userInfo.setUserAvatar(avatar);
      popupAvatar.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => constants.saveAvatarButton.textContent = 'Сохранить');
}

function submitNewCard(data) {
  constants.saveCardButton.textContent = 'Добавление...';
  api.addNewCard(data)
    .then((card) => {
      section.addItem(renderer(card));
      removeLastElement()
      popupCard.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => constants.saveCardButton.textContent = 'Добавить');
}

function removeLastElement() {
  const cards = constants.cardBox.querySelectorAll('.element');
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
  const card = new Card(item, '#card-template', constants.userId, handleLikeCard, openPopupImage, deleteCard);
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
constants.refreshButtonAvatar.addEventListener('click', () => {
  popupAvatar.openPopup();
  avatarFormValidation.clearValidation();
});

// Открытие Popup окна - Element:
constants.cardButtonAdd.addEventListener('click', () => {
  popupCard.openPopup();
  cardFormValidation.clearValidation();
});

// Открытие Popup окна - Profile:
constants.buttonAddInfo.addEventListener('click', () => {
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
    constants.userId._id = user?._id;
    section.rendererItems(cards);
  })
  .catch(err => { console.log(err) });
