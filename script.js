const  profile = document.querySelector('.profile');
const  profileContainer = profile.querySelector('.profile__bio');
const  nameProfile = profileContainer.querySelector('.profile__name'); //имя владельца профайла
const  jobProfile = profileContainer.querySelector('.profile__about'); //профессия владельца профайла
const  addInfoButton = profileContainer.querySelector('.profile__edit-button'); // кнопка вызывающая модальное окно
const  popupContainer = document.querySelector('.popup__container'); // попап контейнер
const  popup = document.querySelector('.popup_profile-edit'); // для вызова попап редактировать профиль
const  closeAddInfoButton = popupContainer.querySelector('.popup__close-icon'); // кнопка закрытия модального окна
const  formElement = popupContainer.querySelector('.popup__form'); // попап форма редактировать профиль
const  nameInput = formElement.querySelector('.popup__input_data_name'); // строка ввода имени
const  jobInput = formElement.querySelector('.popup__input_data_about'); // строка ввода профессии


function openAddInfo() {
  popup.classList.add('popup_opened');
}

function closeAddInfo() {
  popup.classList.remove('popup_opened');
}

addInfoButton.addEventListener('click', openAddInfo);
closeAddInfoButton.addEventListener('click', closeAddInfo);

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 

const initialCards = [

]