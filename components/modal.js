import { jobProfile, nameProfile } from '../index.js';

const titleInputCard = document.querySelector('.popup__input_data_title'); // строка ввода названия карточки
const photoInputCard = document.querySelector('.popup__input_data_link'); // строка ввода ссылки
const cardPopup = document.querySelector('.popup_element-edit'); // попап добавление карточек
const cardBox = document.querySelector('.elements'); // коробка карточек
const buttonCloseList = document.querySelectorAll('.popup__close-icon'); // кнопки закрытия модального окна
const formUserAddCard = document.querySelector('.popup__cardAdd'); // попап форма редактировать карточку

// Открытие Popup окна:
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escClose);
  popup.addEventListener('click', overlayClose);
}

// Закрытие Popup окон:
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClose);
  popup.removeEventListener('click', overlayClose);
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

formUserAddInfo.addEventListener('submit', formSubmitHandler);

// Сохранение внесенной информации в Popup окне - Element:
function formSubmitCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardBox.prepend(addNewCard(titleInputCard.value, photoInputCard.value));
  closePopup(cardPopup);
  formUserAddCard.reset();
}

formUserAddCard.addEventListener('submit', formSubmitCard);

// Закрытие модалок Оверлей и Esc

function escClose(evt) {
  if (evt.keyCode === 27) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function overlayClose(evt) {
  const popupOverlay = document.querySelector('.popup_opened');
  if (evt.target === popupOverlay) {
    closePopup(popupOverlay);
  }
}

export { openPopup, titleInputCard, photoInputCard };