// DOM:
const  profile = document.querySelector('.profile');
const  profileContainer = profile.querySelector('.profile__bio');
const  nameProfile = profileContainer.querySelector('.profile__name'); // имя владельца профайла
const  jobProfile = profileContainer.querySelector('.profile__about'); // профессия владельца профайла
const  cardBox = document.querySelector('.elements'); // коробка карточек
const  buttonAddInfo = document.querySelector('.profile__edit-button'); // кнопка вызывающая окно редактирование профиля 
const  popupList = document.querySelectorAll('.popup'); // Лист попапов
const  profilePopup = document.querySelector('.popup_profile-edit'); // попап редактировать профиль
const  cardPopup = document.querySelector('.popup_element-edit'); // попап добавление карточек
const  cardButtonAdd = document.querySelector('.profile__add-button'); // кнопка вызывающая окно редактирование карточек
const  buttonCloseList = document.querySelectorAll('.popup__close-icon'); // кнопки закрытия модального окна
const  formUserAddInfo = document.querySelector('.popup__userAddInfo'); // попап форма редактировать профиль
const  nameInput = formUserAddInfo.querySelector('.popup__input_data_name'); // строка ввода имени
const  jobInput = formUserAddInfo.querySelector('.popup__input_data_about'); // строка ввода профессии
const  formUserAddCard = document.querySelector('.popup__cardAdd'); // попап форма редактировать профиль
const  titleInputCard = document.querySelector('.popup__input_data_title'); // строка ввода имени
const  photoInputCard = document.querySelector('.popup__input_data_link'); // строка ввода профессии
const  imagePopup = document.querySelector('.popup__image'); // попап Image
const  fotoPopup = document.querySelector('.popup__foto'); // фото попапа Image
const  captionPopup = document.querySelector('.popup__caption-foto'); // подпись фотографии попапа Image
// Массив ранее созданных карточек - Element:
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

// Открытие Popup окна - Profile:
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Открытие Popup окна - Profile:
buttonAddInfo.addEventListener('click', () => openPopup(profilePopup));

// Закрытие Popup окон:
function closePopup() {
  popupList.forEach((popup) => popup.classList.remove('popup_opened'));
}

buttonCloseList.forEach(button => button.addEventListener('click', (event) => closePopup(event.target.closest('popup')))); 

// Сохранение внесенной информации в Popup окне - Profile:
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

formUserAddInfo.addEventListener('submit', formSubmitHandler);

// Открытие Popup окна - Element:
cardButtonAdd.addEventListener('click', () => openPopup(cardPopup));

// Добавление новых карточек - Element:
const  cardTemplate = document.querySelector('#card-template').content;

function addNewCard(titleInputCard, photoInputCard) {
  const  cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const  img = cardElement.querySelector('.element__foto');
  const  captionCard = cardElement.querySelector('.element__caption');
  img.src = photoInputCard;
  img.alt = titleInputCard;
  cardElement.querySelector('.element__caption-town').textContent = titleInputCard;
  // Реализация конпки Like:
  captionCard.querySelector('.element__button-like').addEventListener('click', (evt) => evt.target.classList.toggle('element__button-like_active'));  
  // Реализация кнопки Trash:
  const  buttonTrashCard = cardElement.querySelector('.element__button-trash'); // кнопка удалить
  buttonTrashCard.addEventListener('click', () => {
    const  cardElement = buttonTrashCard.closest('.element');
    cardElement.remove();
  })
  // Открытие Popup окна - Image:
  img.addEventListener('click', () => {    
    fotoPopup.src = img.src;
    fotoPopup.alt = img.alt;
    captionPopup.textContent = img.alt;
    imagePopup.classList.add('popup_opened');
  });

  return cardElement;
}

// Добавляем карточки
initialCards.forEach((card) => cardBox.prepend(addNewCard(card.name, card.link)));

// Сохранение внесенной информации в Popup окне - Element:
function formSubmitCard (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardBox.prepend(addNewCard(titleInputCard.value, photoInputCard.value));
  closePopup();
  titleInputCard.value = '';
  photoInputCard.value = '';
}

formUserAddCard.addEventListener('submit', formSubmitCard);
