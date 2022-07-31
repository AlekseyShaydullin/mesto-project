import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { validationConfig } from './components/validate.js';
import { editProfileData, addNewCard, refreshAvatar, Api, apiConfig } from './components/api';
import Card from './components/CardNew';
import FormValidator from './components/FormValidator'
import Section from './components/Section';
import Popup from './components/Popup';

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
const formUserAvatar = refreshAvatarPopup.querySelector('.popup__avatar-edit');

export const userId = {}

const user = {}

const newCard = { owner: {} };

const api = new Api(apiConfig);
const cardApi = api.getCards();
const userApi = api.getUserId();

const profileFormValidation = new FormValidator(validationConfig, formUserAddInfo);
const cardFormValidation = new FormValidator(validationConfig, formUserAddCard);
const avatarFormValidation = new FormValidator(validationConfig, formUserAvatar);
[profileFormValidation, cardFormValidation, avatarFormValidation].forEach(form => form.enableValidation())


Promise.allSettled([userApi, cardApi])
  .then(([{ value: user }, { value: cards }]) => {
    nameProfile.textContent = user?.name;
    jobProfile.textContent = user?.about;
    profileAvatar.src = user?.avatar;
    userId._id = user?._id;
    const card = new Section({items: cards, renderer: renderer}, 'elements__wrapper');
    card.rendererItems()
  })
  .catch(err => { console.log(err) })


const popupProfile = new Popup('.popup_profile-edit');

// Открытие Popup окна - Profile:
buttonAddInfo.addEventListener('click', () => {
  popupProfile.openPopup()
  // openPopup(profilePopup);
  profileFormValidation.clearValidation();
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
  cardFormValidation.clearValidation();
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
  avatarFormValidation.clearValidation();
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
  const card = new Card(item, '#card-template', userId, handleLikeCard);
  return card.createCard()
}
