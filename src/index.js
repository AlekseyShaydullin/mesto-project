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

const section = new Section(renderer, '.elements');

const profileFormValidation = new FormValidator(constants.validationConfig, constants.formUserAddInfo);
const cardFormValidation = new FormValidator(constants.validationConfig, constants.formUserAddCard);
const avatarFormValidation = new FormValidator(constants.validationConfig, constants.formUserAvatar);

const popupImage = new PopupWithImage('.popup__image');
const popupTrash = new PopupWithDeleteCard('.popup__delete-card', submitDeleteCard);
const popupCard = new PopupWithForm('.popup_element-edit', submitNewCard);
const popupProfile = new PopupWithForm('.popup_profile-edit', submitEditProfile);
const popupAvatar = new PopupWithForm('.popup__refresh-avatar', submitEditAvatar);
const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__about', avatar: '.profile__avatar' })

function submitEditProfile(data) {
  popupProfile.renderLoading(true);
  api.editProfileData(data)
    .then((user) => {
      userInfo.setUserInfo(user);
      popupProfile.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => popupProfile.renderLoading(false))
}

function submitEditAvatar(data) {
  popupAvatar.renderLoading(true);
  api.refreshAvatar(data)
    .then(avatar => {
      userInfo.setUserInfo(avatar);
      popupAvatar.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => popupAvatar.renderLoading(false));
}

function submitNewCard(data) {
  popupCard.renderLoading(true, 'Добавление...')
  api.addNewCard(data)
    .then((card) => {
      section.addItem(renderer(card));
      popupCard.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => popupCard.renderLoading(false, 'Добавить'));
}

function handleLike(card, id) {  
    api.addLikeCard(id)
      .then(res => card.addLike(res))
      .catch(err => console.log(err))
}

function deleteLike(card, id) {
    api.delLikeCard(id)
      .then(res => card.delLike(res))
      .catch(err => console.log(err))
}

function renderer(item) {
  const card = new Card(item, '#card-template', constants.userId, handleLike, deleteLike, openPopupImage, deleteCard);
  return card.createCard()
}

function openPopupImage(name, link) {
  popupImage.openPopup(name, link)
}

function submitDeleteCard(id) {
  api.delNewCard(id)
    .then(() => {
      document.querySelector(`.element[id="${id}"]`).remove();
      popupTrash.closePopup();
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
popupImage.setEventListener();

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
  popupProfile.setInputValues(userInfo.getUserInfo());
});

Promise.allSettled([userApi, cardApi])
  .then(([{ value: user }, { value: cards }]) => {
    userInfo.setUserInfo(user);
    constants.userId._id = user?._id;
    section.rendererItems(cards);
  })
  .catch(err => { console.log(err) });
