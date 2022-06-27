// DOM:
const profile = document.querySelector('.profile');
const profileContainer = profile.querySelector('.profile__bio');
const nameProfile = profileContainer.querySelector('.profile__name'); // имя владельца профайла
const jobProfile = profileContainer.querySelector('.profile__about'); // профессия владельца профайла
const cardBox = document.querySelector('.elements'); // коробка карточек
const buttonAddInfo = document.querySelector('.profile__edit-button'); // кнопка вызывающая окно редактирование профиля 
const popupList = document.querySelectorAll('.popup'); // Лист попапов
const profilePopup = document.querySelector('.popup_profile-edit'); // попап редактировать профиль
const cardPopup = document.querySelector('.popup_element-edit'); // попап добавление карточек
const cardButtonAdd = document.querySelector('.profile__add-button'); // кнопка вызывающая окно редактирование карточек
const buttonCloseList = document.querySelectorAll('.popup__close-icon'); // кнопки закрытия модального окна
const formUserAddInfo = document.querySelector('.popup__userAddInfo'); // попап форма редактировать профиль
const nameInput = formUserAddInfo.querySelector('.popup__input_data_name'); // строка ввода имени
const jobInput = formUserAddInfo.querySelector('.popup__input_data_about'); // строка ввода профессии
const formUserAddCard = document.querySelector('.popup__cardAdd'); // попап форма редактировать карточку
const titleInputCard = document.querySelector('.popup__input_data_title'); // строка ввода названия карточки
const photoInputCard = document.querySelector('.popup__input_data_link'); // строка ввода ссылки
const imagePopup = document.querySelector('.popup__image'); // попап Image
const fotoPopup = document.querySelector('.popup__foto'); // фото попапа Image
const captionPopup = document.querySelector('.popup__caption-foto'); // подпись фотографии попапа Image
const cardTemplate = document.querySelector('#card-template').content;
// Массив ранее созданных карточек - Element:
const initialCards = [
  {
    name: 'Выборг',
    link: 'images/viborg.jpg'
  },
  {
    name: 'Кабардино-Балкария',
    link: 'images/kabardino-balkariya.jpg'
  },
  {
    name: 'Казань',
    link: 'images/kazan.png'
  },
  {
    name: 'Лахденпохья',
    link: 'images/lahdenpokhya.jpg'
  },
  {
    name: 'Йошкар-Ола',
    link: 'images/yoshkar-ola.jpg'
  },
  {
    name: 'Териберка',
    link: 'images/teriberka.jpg'
  },
]

// Открытие Popup окна:
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Открытие Popup окна - Profile:
buttonAddInfo.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(profilePopup);
  checkInputValidity(profilePopup, nameInput);
  checkInputValidity(profilePopup, jobInput);
  enableValidation();
});

// Закрытие Popup окон:
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  formUserAddCard.reset();
}

buttonCloseList.forEach(button => button.addEventListener('click', evt => closePopup(evt.target.closest('.popup'))));

// Сохранение внесенной информации в Popup окне - Profile:
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

formUserAddInfo.addEventListener('submit', formSubmitHandler); // Что-то надо с этим сделать!!!

// Открытие Popup окна - Element:
cardButtonAdd.addEventListener('click', () => {
  openPopup(cardPopup);
  checkInputValidity(cardPopup, titleInputCard);
  checkInputValidity(cardPopup, photoInputCard);
  enableValidation();
});

// Добавление новых карточек - Element:
function addNewCard(titleInputCard, photoInputCard) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const img = cardElement.querySelector('.element__foto');
  const captionCard = cardElement.querySelector('.element__caption');
  img.src = photoInputCard;
  img.alt = titleInputCard;
  cardElement.querySelector('.element__caption-town').textContent = titleInputCard;
  // Реализация конпки Like:
  captionCard.querySelector('.element__button-like').addEventListener('click', evt => evt.target.classList.toggle('element__button-like_active'));
  // Реализация кнопки Trash:
  const buttonTrashCard = cardElement.querySelector('.element__button-trash'); // кнопка удалить
  buttonTrashCard.addEventListener('click', () => {
    const cardElement = buttonTrashCard.closest('.element');
    cardElement.remove();
  })
  // Открытие Popup окна - Image:
  img.addEventListener('click', () => {
    fotoPopup.src = img.src;
    fotoPopup.alt = img.alt;
    captionPopup.textContent = img.alt;
    openPopup(imagePopup);
  });

  return cardElement;
}

// Добавляем карточки:
initialCards.forEach((card) => cardBox.prepend(addNewCard(card.name, card.link)));

// Сохранение внесенной информации в Popup окне - Element:
function formSubmitCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardBox.prepend(addNewCard(titleInputCard.value, photoInputCard.value));
  closePopup(cardPopup);
  formUserAddCard.reset();
  enableValidation();
}

formUserAddCard.addEventListener('submit', formSubmitCard); // Что-то надо с этим сделать!!! 

// Валидация форм
/*
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
*/

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  //console.log(buttonElement);


  toggleButtonState(inputList, buttonElement);


  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
    //console.log(buttonElement);
  } else {
    buttonElement.classList.remove('popup__button_inactive');
    //console.log(buttonElement);
  }
}

/*
if (formElement === formUserAddInfo) {
  formUserAddInfo.addEventListener('submit', formSubmitHandler)
} else {
  formUserAddCard.addEventListener('submit', formSubmitCard);
}
*/

// Закрытие модалок Оверлей и Esc

