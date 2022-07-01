import { openPopup, closePopup, titleInputCard, photoInputCard, formUserAddCard } from './modal';

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

  img.src = photoInputCard;
  img.alt = titleInputCard;
  cardElement.querySelector('.element__caption-town').textContent = titleInputCard;
  // Реализация конпки Like:
  likeCard.addEventListener('click', getLike);
  // Реализация кнопки Trash:
  const buttonTrashCard = cardElement.querySelector('.element__button-trash'); // кнопка удалить
  buttonTrashCard.addEventListener('click', deleteCard(buttonTrashCard));
  /*
    buttonTrashCard.addEventListener('click', () => {
      const cardElement = buttonTrashCard.closest('.element');
      cardElement.remove();
  */

  // Открытие Popup окна - Image:
  img.addEventListener('click', () => {
    fotoPopup.src = img.src;
    fotoPopup.alt = img.alt;
    captionPopup.textContent = img.alt;
    openPopup(imagePopup);
  });

  return cardElement;
}

//Like
const getLike = evt => evt.target.classList.toggle('element__button-like_active');

//Trash
//const deleteCard = evt => evt.target.document.querySelector('.element').remove();


function deleteCard(buttonTrashCard) {
  let checker = false;
  buttonTrashCard.onclick = () => checker = true;
  if (hash == '' && checker === true) {
    const deletecardElement = buttonTrashCard.closest('.element');
    deletecardElement.remove();
  }
}

export { createCard }