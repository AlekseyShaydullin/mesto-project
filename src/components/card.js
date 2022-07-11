import { openPopup, closePopup } from './modal';
import { addLikeCard, delLikeCard, delNewCard } from './api';
import { userId } from '../index';

const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup__image'); // попап Image
const captionPopup = document.querySelector('.popup__caption-foto'); // подпись фотографии попапа Image
const fotoPopup = document.querySelector('.popup__foto'); // фото попапа Image
const deleteCardPopup = document.querySelector('.popup__delete-card'); //попап подтверждения удаления картинки

// Добавление новых карточек - Element:
function createCard(card) {
  const { name, link, likes, owner, _id } = card;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const img = cardElement.querySelector('.element__foto');
  const captionCard = cardElement.querySelector('.element__caption');
  const likeCard = captionCard.querySelector('.element__button-like');
  const buttonTrashCard = cardElement.querySelector('.element__button-trash'); // кнопка удалить
  const counterLikes = cardElement.querySelector('.element__button-like-count');

  cardElement.id = card._id;
  img.src = card.link;
  img.alt = card.name;
  cardElement.querySelector('.element__caption-town').textContent = card.name;

  // Каунтер Like:
  counterLikes.textContent = likes.length;

  // Реализация конпки Like:
  likeCard.addEventListener('click', () => {
    getLike(card, likeCard, counterLikes)
  });

  // Фильтр активного лайка:
  if (likes.find((card) => card._id === userId._id)) {
    likeCard.classList.add('element__button-like_active');
  }

  // Фильтр кнопки Trash:
  if (userId._id !== card.owner._id) {
    buttonTrashCard.classList.add('element__button-trash_disactiv');
  }

  // Открываем Popup окно - Delite Card
  buttonTrashCard.addEventListener('click', (evt) => {
    openPopup(deleteCardPopup);
    deleteCardPopup.dataset.id = _id;
  })

  // Удаление карточки  
  deleteCardPopup.addEventListener('submit', deleteCard);

  // Открытие Popup окна - Image:
  img.addEventListener('click', renderImage);

  return cardElement;
}

//Like:
function getLike(card, likeCard, counterLikes) {
  if (likeCard.classList.contains('element__button-like_active')) {
    delLikeCard(card._id)
      .then(res => {
        counterLikes.textContent = res.likes.length;
        likeCard.classList.remove('element__button-like_active');
      })
      .catch(err => console.log(err))
  } else if (!likeCard.classList.contains('element__button-like_active')) {
    addLikeCard(card._id)
      .then(res => {
        counterLikes.textContent = res.likes.length;
        likeCard.classList.add('element__button-like_active');
      })
      .catch(err => console.log(err))
  }
}

//Trash:
function deleteCard(evt) {
  evt.preventDefault();
  const deleteCardId = deleteCardPopup.dataset.id;
  const deleteCard = document.querySelector(`.element[id="${deleteCardId}"]`)
  delNewCard(deleteCardId)
    .then(() => {
      deleteCard.remove();
      closePopup(deleteCardPopup);
    })
    .catch(err => console.log(err))
    .finally(() => deleteCardPopup.dataset.id = "");
}

//Отрисовка модального окна Image:
const renderImage = (evt) => {
  fotoPopup.src = evt.target.src;
  fotoPopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.alt;
  openPopup(imagePopup);
}

export { createCard }