// DOM:
const  profile = document.querySelector('.profile');
const  profileContainer = profile.querySelector('.profile__bio');
const  nameProfile = profileContainer.querySelector('.profile__name'); // имя владельца профайла
const  jobProfile = profileContainer.querySelector('.profile__about'); // профессия владельца профайла
const  saveProfileButton = document.querySelector('.popup__saveProfile') // кнопка сохранения введенной информации в попапе
const  cardBox = document.querySelector('.elements'); // коробка карточек
const  fotoCard = document.querySelector('.element__foto'); // фотография карточки
const  textCard = document.querySelector('.element__caption-town'); // текст подписи карточки
const  addInfoButton = profileContainer.querySelector('.profile__edit-button'); // кнопка вызывающая окно редактирование профиля
const  popup = document.querySelectorAll('.popup'); // Popup
const  popupContainer = document.querySelector('.popup__container'); // попап контейнер
const  addInfoProfilePopup = document.querySelector('.popup_profile-edit'); // попап редактировать профиль
const  addCardPopup = document.querySelector('.popup_element-edit'); // попап добавление карточек
const  addCardButton = document.querySelector('.profile__add-button'); // кнопка вызывающая окно редактирование карточек
const  closeButtons = document.querySelectorAll('.popup__close-icon'); // кнопки закрытия модального окна
const  formUserAddInfo = popupContainer.querySelector('.popup__userAddInfo'); // попап форма редактировать профиль
const  nameInput = formUserAddInfo.querySelector('.popup__input_data_name'); // строка ввода имени
const  jobInput = formUserAddInfo.querySelector('.popup__input_data_about'); // строка ввода профессии
const  saveCardButton = document.querySelector('.popup__saveCard'); // кнопка сохранения введенной информации в попапе
const  formUserAddCard = document.querySelector('.popup__cardAdd'); // попап форма редактировать профиль
const  formCardAdd = popupContainer.querySelector('.popup__cardAdd'); // попап форма редактировать профиль
const  titleInputCard = document.querySelector('.popup__input_data_title'); // строка ввода имени
const  photoInputCard = document.querySelector('.popup__input_data_link'); // строка ввода профессии


// Открытие Popup окна - Profile:
function openAddInfo() {
  addInfoProfilePopup.classList.add('popup_opened');
}

addInfoButton.addEventListener('click', openAddInfo);

// Закрытие Popup окон:
function closeButton() {
  for (let i = 0; i < popup.length; i++) {
  popup[i].classList.remove('popup_opened');
  }
}

for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', closeButton);
}

// Сохранение внесенной информации в Popup окне - Profile:
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeButton();
}

formUserAddInfo.addEventListener('submit', formSubmitHandler);

// Открытие Popup окна - Element:
function openAddCard() {
  addCardPopup.classList.add('popup_opened');
}

addCardButton.addEventListener('click', openAddCard);

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
  captionCard.querySelector('.element__button-like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button-like_active');
  })
  // Реализация кнопки Trash:
  const  buttonTrashCard = cardElement.querySelector('.element__button-trash'); // кнопка удалить
  buttonTrashCard.addEventListener('click', function() {
    const  cardElement = buttonTrashCard.closest('.element');
    cardElement.remove();
  })
  // Открытие Popup окна - Image:
  const  imagePopup = document.querySelector('.popup__image'); // попап Image
  const  fotoPopup = document.querySelector('.popup__foto'); // фото попапа Image
  const  captionPopup = document.querySelector('.popup__caption-foto'); // подпись фотографии попапа Image
  img.addEventListener('click', function() {
    imagePopup.classList.add('popup_opened');
    fotoPopup.src = img.src;
    fotoPopup.alt = img.alt;
    captionPopup.textContent = img.alt;
  });

  return cardElement;
}

// Добавляем карточки
initialCards.forEach(function(card) {
  cardBox.prepend(addNewCard(card.name, card.link));
})

// Сохранение внесенной информации в Popup окне - Element:
function formSubmitCard (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardBox.prepend(addNewCard(titleInputCard.value, photoInputCard.value));
  closeButton();
  titleInputCard.value = '';
  photoInputCard.value = '';
}

formUserAddCard.addEventListener('submit', formSubmitCard);
