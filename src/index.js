import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validate.js';
import { apiConfig, getUserId, getCards, editProfileData } from './components/api';

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

const user = {
  name: '',
  about: '',
  avatar: '',
  owner: {
    name: '',
    about: '',
    avatar: '',
    _id: `${apiConfig.userId}`
  },
  _id: '',
};

getUserId()
  .then(userProfile => {
    nameProfile.textContent = userProfile.name;
    jobProfile.textContent = userProfile.about;
  })

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

// Добавляем карточки:
getCards()
  .then(data => data.forEach((card) => cardBox.prepend(createCard(card.name, card.link))));

// Сохранение внесенной информации в Popup окне - Element:
function submitCardForm(evt) {
  evt.preventDefault();
  cardBox.prepend(createCard(titleInputCard.value, photoInputCard.value));
  closePopup(cardPopup);
  formUserAddCard.reset();
}

formUserAddCard.addEventListener('submit', submitCardForm);

enableValidation();
