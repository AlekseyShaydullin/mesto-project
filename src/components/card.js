import { openPopup } from './modal';
import { addLikeCard, delLikeCard } from './api';

const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup__image'); // попап Image
const captionPopup = document.querySelector('.popup__caption-foto'); // подпись фотографии попапа Image
const fotoPopup = document.querySelector('.popup__foto'); // фото попапа Image

// Добавление новых карточек - Element:
function createCard(titleInputCard, photoInputCard, apiConfig, card) {
  const { name, link, likes, owner, _id } = card
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const img = cardElement.querySelector('.element__foto');
  const captionCard = cardElement.querySelector('.element__caption');
  const likeCard = captionCard.querySelector('.element__button-like');
  const buttonTrashCard = cardElement.querySelector('.element__button-trash'); // кнопка удалить
  const counterLikes = cardElement.querySelector('.element__button-like-count');

  img.src = photoInputCard;
  img.alt = titleInputCard;
  cardElement.querySelector('.element__caption-town').textContent = titleInputCard;
  // Каунтер Like:
  counterLikes.textContent = likes.length;
  // Реализация конпки Like:
  likeCard.addEventListener('click', () => {
    getLike(card, likeCard, counterLikes)
  });
  // Фильтр активного лайка:
  if (likes.find((card) => card._id === apiConfig.userId)) {
    likeCard.classList.add('element__button-like_active');
  }
  // Фильтр кнопки Trash:
  if (apiConfig.userId !== card.owner._id) {
    buttonTrashCard.classList.add('element__button-trash_disactiv');
  }

  buttonTrashCard.addEventListener('click', deleteCard);
  // Открытие Popup окна - Image:
  img.addEventListener('click', renderImage);

  return cardElement;
}

//Like:
function getLike(card, likeCard, counterLikes) {
  if (likeCard.classList.contains('element__button-like_active')) {
    delLikeCard(card._id)
      .then(res => counterLikes.textContent = res.likes.length)
      .catch(err => console.log(err))
    likeCard.classList.remove('element__button-like_active');
  } else if (!likeCard.classList.contains('element__button-like_active')) {
    addLikeCard(card._id)
      .then(res => counterLikes.textContent = res.likes.length)
      .catch(err => console.log(err))
    likeCard.classList.add('element__button-like_active');
  }
}

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