
const buttonCloseList = document.querySelectorAll('.popup__close-icon'); // кнопки закрытия модального окна
const keyCodeEsc = 27;

// Открытие Popup окна:
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escClose);
  popup.addEventListener('mousedown', overlayClose);
}

// Закрытие Popup окон:
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClose);
  popup.removeEventListener('mousedown', overlayClose);
}

// Закрытие модалок Оверлей и Esc

function escClose(evt) {
  if (evt.keyCode === keyCodeEsc) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function overlayClose(evt) {
  const popupOverlay = document.querySelector('.popup_opened');
  if (evt.target === popupOverlay) {
    closePopup(popupOverlay);
  }
}

buttonCloseList.forEach(button => button.addEventListener('click', evt => closePopup(evt.target.closest('.popup'))));

export { openPopup, closePopup };