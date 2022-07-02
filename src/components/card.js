import { openPopup } from './modal';

const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup__image'); // попап Image
const captionPopup = document.querySelector('.popup__caption-foto'); // подпись фотографии попапа Image
const fotoPopup = document.querySelector('.popup__foto'); // фото попапа Image

// Добавление новых карточек - Element:
function createCard(titleInputCard, photoInputCard) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const img = cardElement.querySelector('.element__foto');
  const captionCard = cardElement.querySelector('.element__caption');
  const likeCard = captionCard.querySelector('.element__button-like');
  const buttonTrashCard = cardElement.querySelector('.element__button-trash'); // кнопка удалить

  img.src = photoInputCard;
  img.alt = titleInputCard;
  cardElement.querySelector('.element__caption-town').textContent = titleInputCard;
  // Реализация конпки Like:
  likeCard.addEventListener('click', getLike);
  // Реализация кнопки Trash:
  buttonTrashCard.addEventListener('click', deleteCard);
  // Открытие Popup окна - Image:
  img.addEventListener('click', renderImage);

  return cardElement;
}

//Like:
const getLike = evt => evt.target.classList.toggle('element__button-like_active');

//Trash:
const deleteCard = evt => evt.target.closest('.element').remove();

//Отрисовка модального окна Image:
const renderImage = (evt) => {
  fotoPopup.src = evt.target.src;
  fotoPopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.alt;
  openPopup(imagePopup);
}

export { createCard }