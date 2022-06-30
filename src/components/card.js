import { initialCards } from './cards';
import { openPopup, titleInputCard, photoInputCard, formUserAddCard } from './modal';

const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup__image'); // попап Image
const captionPopup = document.querySelector('.popup__caption-foto'); // подпись фотографии попапа Image
const fotoPopup = document.querySelector('.popup__foto'); // фото попапа Image
const cardBox = document.querySelector('.elements'); // коробка карточек

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
}

formUserAddCard.addEventListener('submit', formSubmitCard);

export { formSubmitCard };