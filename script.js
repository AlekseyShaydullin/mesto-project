let profile = document.querySelector('.profile');
let profileContainer = profile.querySelector('.profile__bio');
let addInfoButton = profileContainer.querySelector('.profile__edit-button'); // кнопка вызывающая модальное окно

function openAddInfo() {
  let popup = document.querySelector('.popup_profile-edit'); // попап редактировать профиль
  popup.classList.add('popup_opened');
}

function closeAddInfo() {
  let popupContainer = document.querySelector('.popup__container'); // попап контейнер
  let closeAddInfoButton = popupContainer.querySelector('.popup__close-icon'); // кнопка закрытия модального окна
  popup.classList.remove('popup_opened');
}


addInfoButton.addEventListener('click', openAddInfo);
closeAddInfoButton.addEventListener('click', closeAddInfo);