export const buttonAddInfo = document.querySelector('.profile__edit-button'); // кнопка вызывающая окно редактирование профиля
export const cardButtonAdd = document.querySelector('.profile__add-button'); // кнопка вызывающая окно редактирование карточек
export const formUserAddInfo = document.querySelector('.popup__userAddInfo'); // попап форма редактировать профиль
export const cardBox = document.querySelector('.elements'); // коробка карточек
export const formUserAddCard = document.querySelector('.popup__cardAdd'); // попап форма редактировать карточку
export const refreshButtonAvatar = document.querySelector('.profile__btn-refresh-avatar'); // кнопка изменения аватара
export const refreshAvatarPopup = document.querySelector('.popup__refresh-avatar'); // попап редактирования аватара
export const formUserAvatar = refreshAvatarPopup.querySelector('.popup__avatar-edit');
export const saveProfileButton = document.querySelector('.popup__saveProfile'); // кнопка сохранить введённые данные Юзера
export const saveAvatarButton = document.querySelector('.popup__saveAvatar'); // кнопка сохранить аватар
export const saveCardButton = document.querySelector('.popup__saveCard'); // кнопка сохранить новую карточку

export const userId = {}

export const apiConfig = {
  serverUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '2c978f21-f56a-4fa6-b5d5-e5052862cd58',
    'Content-Type': 'application/json'
  }
}

export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}