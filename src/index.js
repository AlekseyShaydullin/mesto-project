import './pages/index.css';
import './components/card';
import { openPopup, formSubmitHandler } from './components/modal';
import { enableValidation, clearValidation } from './components/validate.js'

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

//Объект данных для Валидации:
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Открытие Popup окна - Profile:
buttonAddInfo.addEventListener('click', () => {
  openPopup(profilePopup);
  clearValidation(profilePopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

formUserAddInfo.addEventListener('submit', formSubmitHandler);

// Открытие Popup окна - Element:
cardButtonAdd.addEventListener('click', () => {
  openPopup(cardPopup);
  clearValidation(cardPopup);
});

enableValidation();

export { nameProfile, jobProfile, validationConfig, profilePopup, cardPopup };