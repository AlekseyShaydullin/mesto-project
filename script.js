const  profile = document.querySelector('.profile');
const  profileContainer = profile.querySelector('.profile__bio');
const  nameProfile = profileContainer.querySelector('.profile__name'); // имя владельца профайла
const  jobProfile = profileContainer.querySelector('.profile__about'); // профессия владельца профайла
const  cardBox = document.querySelector('.elements'); // коробка карточек
/*const  card = cardBox.querySelector('.element'); // карточка*/
const  fotoCard = document.querySelector('.element__foto'); // фотография карточки
const  textCard = document.querySelector('.element__caption-town'); // текст подписи карточки
const  likeCard = document.querySelector('.element__button-like'); // кнопка не активного like карточки
const  addInfoButton = profileContainer.querySelector('.profile__edit-button'); // кнопка вызывающая окно редактирование профиля
const  popup = document.querySelectorAll('.popup') // Popup
const  popupContainer = document.querySelector('.popup__container'); // попап контейнер
const  addInfoProfilePopup = document.querySelector('.popup_profile-edit'); // попап редактировать профиль
const  addCardPopup = document.querySelector('.popup_element-edit'); // попап добавление карточек
const  addCardButton = document.querySelector('.profile__add-button'); // кнопка вызывающая окно редактирование карточек
const  closeButtons = document.querySelectorAll('.popup__close-icon'); // кнопки закрытия модального окна
const  formUserAddInfo = popupContainer.querySelector('.popup__userAddInfo'); // попап форма редактировать профиль
const  nameInput = formUserAddInfo.querySelector('.popup__input_data_name'); // строка ввода имени
const  jobInput = formUserAddInfo.querySelector('.popup__input_data_about'); // строка ввода профессии
const  saveCardButton = document.querySelector('.popup__button') // кнопка сохранения введенной информации в попапе




function openAddInfo() {
  addInfoProfilePopup.classList.add('popup_opened');
}

addInfoButton.addEventListener('click', openAddInfo);


function closeButton() {
  for (let i = 0; i < popup.length; i++) {
  popup[i].classList.remove('popup_opened');
  }
}

for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', closeButton)
}

function openAddCard() {
  addCardPopup.classList.add('popup_opened');
}

addCardButton.addEventListener('click', openAddCard);



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


function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

}

formUserAddInfo.addEventListener('submit', formSubmitHandler); 


const  formCardAdd = popupContainer.querySelector('.popup__cardAdd'); // попап форма редактировать профиль
const  titleInputCard = document.querySelector('.popup__input_data_title'); // строка ввода имени
const  photoInputCard = document.querySelector('.popup__input_data_link'); // строка ввода профессии
const  cardTemplate = document.querySelector('#card-template').content;


function addNewCard(titleInputCard, photoInputCard) {  
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const  img = cardElement.querySelector('.element__foto');

  img.src = photoInputCard;
  img.alt = titleInputCard;
  cardElement.querySelector('.element__caption-town').textContent = titleInputCard;

  return cardElement;
}

function formSubmitCard (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  
  img.src = photoInputCard;
  img.alt = titleInputCard;
}

saveCardButton.addEventListener('submit', formSubmitCard); 

initialCards.forEach(function(i) {
  cardBox.prepend(addNewCard(i.name, i.link))
})

