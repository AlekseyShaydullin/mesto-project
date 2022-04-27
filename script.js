const  profile = document.querySelector('.profile');
const  profileContainer = profile.querySelector('.profile__bio');
const  nameProfile = profileContainer.querySelector('.profile__name'); // имя владельца профайла
const  jobProfile = profileContainer.querySelector('.profile__about'); // профессия владельца профайла
const  cardBox = document.querySelector('.elements'); // коробка карточек
/*const  card = cardBox.querySelector('.element'); // карточка*/
/*const  fotoCard = cardBox.querySelector('.element__foto'); // фотография карточки*/
/*const  captionCard = cardBox.querySelector('.element__caption'); // подпись карточки*/
/*const  textCard = cardBox.querySelector('.element__caption-town'); // текст подписи карточки*/
const  likeCard = cardBox.querySelector('.element__button-like'); // кнопка не активного like карточки
const  addInfoButton = profileContainer.querySelector('.profile__edit-button'); // кнопка вызывающая окно редактирование профиля
const  popupContainer = document.querySelector('.popup__container'); // попап контейнер
const  popup = document.querySelector('.popup_profile-edit'); // для вызова попап редактировать профиль
const  popupCardEdit = document.querySelector('.popup_element-edit'); // для вызова попап редактировать профиль
const  closeAddInfoButton = popupContainer.querySelector('.popup__close-icon'); // кнопка закрытия модального окна
const  formElement = popupContainer.querySelector('.popup__form'); // попап форма редактировать профиль
const  nameInput = formElement.querySelector('.popup__input_data_name'); // строка ввода имени
const  jobInput = formElement.querySelector('.popup__input_data_about'); // строка ввода профессии
const  addCardButton = document.querySelector('.profile__add-button'); // кнопка вызывающая окно редактирование карточек


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

function addCardElement() {
  for (let i=0; i <= 5; i += 1) {
    let card = initialCards[i];
  cardBox.insertAdjacentHTML('beforeend',`
  <article class="element">
  <img class="element__foto" src="${card.link}" />
  <div class="element__caption">
    <h2 class="element__caption-town">${card.name}</h2>
    <button class="element__button-like" type="button" aria-label="Кнопка like"></button>
  </div>
</article>
  `
  )
  } 
}

addCardElement()

function openAddCard() {
  popupCardEdit.classList.add('popup_opened');
}

function closeAddCard() {
  popupCardEdit.classList.remove('popup_opened');
}

addCardButton.addEventListener('click', openAddCard);
closeAddInfoButton.addEventListener('click', closeAddCard);